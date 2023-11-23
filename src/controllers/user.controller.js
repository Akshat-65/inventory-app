import UserModel from "../models/user.model.js";

export default class UserController {
  getRegister(req, res) {
    res.render("register");
  }

  getLogin(req, res) {
    res.render("login", { errorMessage: null,userEmail:req.session.userEmail });
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    res.redirect("/login");
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.isValidUser(email, password);
    if (!user) {
      return res.render("login", {
        errorMessage: "Invalid Credentials",
      });
    }
    req.session.userEmail = email;
    return res.redirect("/");
  }

  logout(req,res){
    req.session.destroy((err)=>{
      if(err){
        console.log(err)
      }else{
        res.redirect('/login');
      }
    })
  }
}
