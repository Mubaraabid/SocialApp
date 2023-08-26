import postModel from "../model/posts.js";
import moment from "moment/moment.js";
const PostController = {

  latestpost: async(req,res)=>{
     const twentyFourHoursAgo = moment().subtract(24, 'hours');
    const { page = 1, limit = 5 } = req.query;
  
    try { 
         const latestPosts = await postModel.aggregate([   
       {
         $match: {
           createdAt: { $gte: twentyFourHoursAgo.toDate() } 
         }
       },
       {
         $sort: { createdAt: -1 } // Sort in descending order 
       }
     ]) .limit(limit * 1) .skip((page - 1) * limit).exec();
   
      const count = await postModel.countDocuments([
        {
            $match: {
              createdAt: { $gte: twentyFourHoursAgo.toDate() } 
            }
          },
          {
            $sort: { createdAt: -1 } // Sort in descending order 
          }
      ]);
      const totalPages=Math.ceil(count / limit);
      res.json({latestPosts,totalPages ,currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }
   },
 
  emailpost: async (req, res) => {
    const emailreq = req.body.email;
    console.log(emailreq);

    try {
        const posts = await postModel.aggregate([
            {
                $lookup: {
                    from: "users", 
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $match: {
                    "user.email": emailreq
                }
            }
        ]);
    
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No posts found for this user" });
        }
    
        return res.status(200).json({ message: "Posts retrieved successfully", posts });
    } catch (error) {
        console.error(error);
        return res.json({ message: "An error occurred", error });
    }
},

  getAll: async (req, res) => {
//    const posts = await postModel.find().populate("user_id");
//     return res.json(posts);
//   },

    const { page = 1, limit = 5 } = req.query;
  
    try {
      const posts = await postModel.find().populate("user_id")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
   
      const count = await postModel.countDocuments();
      const totalPages=Math.ceil(count / limit)
      res.json({
        posts,
        totalPages ,
        currentPage: page
      });
    } catch (err) {
      console.error(err.message);
    }

  },

  getSingle: async (req, res) => {
    const { id } = req.params;
    const post = await postModel.findById(id).populate('user_id','email');
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(post);
  },

  getuserpost:async (req,res)=>{
    const user_id=req.body.user_id;
    const post =await postModel.find({user_id});
    console.log(post);
    if (!post){
      return res.json({message:"post not found"});
    }
    return res.status(201).json(post);
  },

  create: async (req, res) => {
    const body = req.body;
    const post = await postModel.create({
      title: body.title,
      description: body.description,
      user_id: body.user_id,
    });

    return res.json({ message: "Post created", post });
  },
  
  update: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const posts = await postModel.findById(id);
    if (!posts) {
      return res.status(404).json({ message: "Post not found" });
    }
    posts.title = body.title;
    posts.description = body.description;

    await posts.save();
    return res.status(200).json({ message: "post Updated successfully", posts });
  },

  like:async(req,res)=>{
    const id=req.params.id;
    const post=await postModel.findById(id);
    if (!post)
    {
      return res.status(404).json({message:"post not found"});
    }
    const like= await postModel.updateOne(
      { _id: id },
      { $inc: { likes: 1 } }
   )
   return res.json(like);
  },


  share:async(req,res)=>{
    const id=req.params.id;
    const post=await postModel.findById(id);
    if (!post)
    {
      return res.status(404).json({message:"post not found"});
    }
    const share= await postModel.updateOne(
      { _id: id },
      { $inc: { share: 1 } }
   )
   return res.json(share);
  },

  dislike:async(req,res)=>{
    const id=req.params.id;
    const post=await postModel.findById(id);
    if (!post)
    {
      return res.status(404).json({message:"post not found"});
    }
    const dislike= await postModel.updateOne(
      { _id: id },
      { $inc: { dislikes: 1 } }
   )
   return res.json(dislike);
  },



  delete: async (req, res) => {
    const id=req.params.id;
    const posts = await postModel.findById(id);
    if (!posts) {
      return res.status(404).json({ message:"Post not found" });
    }
    const del=await postModel.deleteOne({_id: id});
    return res.json({ message: "Post deleted successfully",del });
  },
};

export default PostController;
