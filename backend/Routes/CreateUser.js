const jwtSecret="MynameisHimanshuDaddy";
const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')



router.post(
  "/createuser",
  
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "INCORRECT PASSWORD").isLength({ min: 5 }),
  ],


  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword= await bcrypt.hash(req.body.password,salt)
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//---------------- LOGIN-----------------------------

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "INCORRECT PASSWORD").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "TRY logging with correct credentials" });
      }
      let pwdcompare=bcrypt.compare(req.body.password,userdata.password)
      if (!pwdcompare) {
        return res
          .status(400)
          .json({ errors: "TRY logging with correct credentials" });
      }
      const data={
        user:{
          id:userdata.id
        }
      }
      const authToken=jwt.sign(data,jwtSecret)



      return res.json({ success: true,authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
