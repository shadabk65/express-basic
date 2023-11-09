import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {

	// user registration
	static userRegistration = async(req, res) => {
		const { name, email, password, password_confirmation, tc } = req.body;
		const user = await UserModel.findOne({email:email});
		if(user){
			res.send({ "status":"failed", "message":"Email already exists" });
		}else{
			if(name && email && password && password_confirmation && tc){
				if(password === password_confirmation){
					try {
						const salt = await bcrypt.genSalt(10);
						const hashPassword = await bcrypt.hash(password, salt);
						const userData = new UserModel({
							name:name,
							email:email,
							password:hashPassword,
							tc:tc
						});
						await userData.save();
						const saved_user = await UserModel.findOne({email: email})
						const token = jwt.sign({ userID: saved_user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '3d'})
            res.status(201).send({"status":"success", "message":"User registered successfully", "token":token});
					}catch(error){
						res.send({"status":"failed", "message":"Unable to register"});
					}
				}else{
					res.send({"status":"failed", "message":"password and confirm password doesn't match"});
				}
			}else{
				res.send({ "status":"failed", "message":"All field required" });
			}
		}
	}

  // user login
	static userLogin = async(req, res) => {
		try {
			const { email, password } = req.body;
			if(email && password){
				const user = await UserModel.findOne({email:email});
				if(user != null) {
					const isMatch = await bcrypt.compare(password, user.password);
					if((user.email === email) && isMatch){
						const token = jwt.sign({ userID: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '3d'}) 
						res.send({"status":"success", "message":"Logged in successfully", "token":token});
					}else{
						res.send({"status":"failed", "message":"email or password is not valid"});
					}
				}else {
					res.send({ "status":"failed", "message":"You are not registered user" });
				}
			}else {
				res.send({"status":"failed", "message":"All field required"});
			}
		}catch(error){
			res.send({"status":"failed", "message":"Unable to login"});
		};
	};

  // change user password
	static chageUserPassword = async() => {
		const { password, password_confirmation } = req.body
		if(password && password_confirmation){
			if (password === password_confirmation) {
				const salt = await bcrypt.genSalt(10)
				const newHashPassword = bcrypt.hash(password, salt)
				res.send({"status":"success", "message":"Password changed successfully"})
			}else {
				res.send({"status":"failed", "message":"password and confirm password doesn't match"})
			}
		}else {
			res.send({"status":"failed", "message":"All fields are required"});
		}
	}
}

export default UserController