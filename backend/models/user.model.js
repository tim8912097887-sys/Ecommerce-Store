import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minLength: [2,"Name at least two characters"]
    },
    last_name: {
        type: String,
        required: true,
        minLength: [2,"Name at least two characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6,"Password at least six characters"]
    },
	cartItems: [
		{
			quantity: {
				type: Number,
				default: 1,
			},
			product: {
    			type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
		},
	],
	role: {
		type: String,
		enum: ["customer", "admin","member"],
		default: "customer",
	},
})

// hash the password before store in the database
userSchema.pre('save',async function(next) {
   if(!this.isModified('password')) return next();
   try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    return next();
   } catch (error) {
    return next(error);
   }
})
// validate password
userSchema.methods.validatePassword = async function (loginPassword) {
    const isMatch = await bcrypt.compare(loginPassword,this.password);
    return isMatch;
}

export const UserModel = mongoose.model('user',userSchema);