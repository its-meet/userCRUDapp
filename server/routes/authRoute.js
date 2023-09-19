const router = require("express").Router();
const User = require("../models/UserModel");

router.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      address1,
      address2,
      country,
      state,
      city,
      zipcode,
    } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      mobile,
      address1,
      address2,
      country,
      state,
      city,
      zipcode,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({email:req.body.email});
      if(!user){
          res.status(400).json('Wrong Credentials!')
      }
      else{
          if(req.body.mobile !== user.mobile){
              res.status(400).json('Wrong Credentials!')
          }
          else{
              const {mobile, ...others} = user._doc;
              res.status(200).json(others)
          }
      }
  } catch (error) {
      res.status(500).json(error)
  }
});



module.exports = router;
