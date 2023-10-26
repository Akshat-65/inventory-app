import UserModel from "../models/user.model.js";

export default class UserController {
    getRegister(req,res){
        res.render('register');
    }

    getLogin(req,res){
        res.render('login');
    }

    postRegister(req,res){
        const {name, email, password} = req.body;
        UserModel.add(name, email, password);
        res.redirect('/login');
    }

}