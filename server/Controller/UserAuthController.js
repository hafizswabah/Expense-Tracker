import UserModel from "../Model/UserModel.js";
import jwt from "jsonwebtoken"
export async function userSignup(req, res) {
    let { name, email, password, profession } = req.body
    if (name.trim() === "" || email.trim() === "" || profession.trim() === "" || password.length == "") {
        res.json({ err: true, message: "Enter required Details" })
    }
    let user = await UserModel.findOne({ email })
    if (user) {
        return res.json({ err: true, message: 'You already have an account please do sign In' })
    }
    const NewUser = new UserModel({ name, email, password, profession })
    await NewUser.save()
    let token = jwt.sign({
        id: NewUser._id
    }, "jwt-screte")
    return res.cookie("token",token,{
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 10,
        sameSite: "none"
    }).json({err:false})
}
export async function check(req, res) {
    try {
     
      const token = req.cookies.token;
      if (!token) {
        return res.json({ loggedIn: false });
      }
      const verifiedJWT = jwt.verify(token,"jwt-screte");
      const user = await UserModel.findById(verifiedJWT.id, { password: 0 });
  
      if (!user) {
        return res.json({ loggedIn: false });
      } else {
        if (user.block) {
          return res.json({ loggedIn: false, message: 'User is blocked' });
        } else {
          return res.json({ user, loggedIn: true });
        }
      }
    } catch (err) {
      console.log(err);
      return res.json({ err: true, message: 'something happened' });
    }
  }
  export async function userLogin(req, res) {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })
    
        if (!user) {
            return res.json({ err: true, message: "User Not Found Please Signup" })
        }
        if(user.block){
            return res.json({err:true,message:'Sorry your account is blocked'})
        }
        
        if (password!=user.password) {
            return res.json({ err: true, message: "Incorrect Password" })
        }
        const token = jwt.sign(
            {
                id: user._id
            },
            "jwt-screte"
        )
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
            sameSite: "none",
        }).json({ err: false, user: user._id })

    } catch (err) {
        console.log(err);
        res.json({ err: true, message: "server error" })
    }
}
export async function userLogout(req, res) {
  res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
  }).json({ message: "logged out", error: false });
}