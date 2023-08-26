import commentModel from "../model/comment.js";

const commentController = {

  getAll: async (req, res) => {
    const comment = await commentModel.find().populate(["user_id","posts_id"]);
    return res.json(comment);
  },

  getSingle: async (req, res) => {
    const { id } = req.params;
    const comment = await commentModel.findById(id).populate(["user_id","posts_id"]);
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    return res.json(comment);
  },

  create: async (req, res) => {
    const body = req.body;
    const comments = await commentModel.create({
      comment: body.comment,
      user_id: body.user_id,
      posts_id: body.posts_id,
      
    });
    return res.json({ message: "Post created", comments });
},

  update: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const comment = await commentModel.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    comment.comment=body.comment;

    await comment.save();
    return res.json({ message: "User Updated successfully", comment });
  },

  delete: async (req, res) => {
    const commentid=req.params.id;
    const comment = await commentModel.findById(commentid);
     const del=await commentModel.deleteOne({_id: commentid});
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
   
    return res.json({ message: "comment deleted successfully",del });
  },
};

export default commentController;
