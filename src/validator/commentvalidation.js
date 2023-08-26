import joi from "joi";
const commentvalidator={
    create: (req, res, next)=>{
        const schema = joi.object({
            comment: joi.string().min(3).max(40).required(),
            user_id:  joi.string().required(),
            posts_id: joi.string().required(),
        });
        const validate=schema.validate(req.body);
        console.log(validate);
        if (validate.error) {
            return res.status(400).json({ message: validate.error.details[0].message });
        }
        next();
    },
    update: (req, res, next)=>{
        const schema = joi.object({
            comment: joi.string().min(3).max(40).required(),
        });
        const validate=schema.validate(req.body);
        console.log(validate);
        if (validate.error) {
            return res.status(400).json({ message: validate.error.details[0].message });
        }
        next();
    },
 
}
export default commentvalidator;