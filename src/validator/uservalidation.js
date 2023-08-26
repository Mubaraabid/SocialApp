import joi from "joi";
const uservalidator={
    signup: (req, res, next)=>{
        const schema = joi.object({
            name: joi.string().min(3).max(40).required(),
            email: joi.string().email().required(),
            password: joi.string().min(6).required(),
            role: joi.string().required(),
            otp:joi.string().required(),
    
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
            name: joi.string().min(3).max(40).required(),
            email: joi.string().email().required(),
        });
        const validate=schema.validate(req.body);
        console.log(validate);
        if (validate.error) {
            return res.status(400).json({ message: validate.error.details[0].message });
        }
        next();
    },
}
export default uservalidator;