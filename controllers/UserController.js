const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc register user
//@route POST /register
//@access public

const createUser = async (req, res) => {
  const { username, email, password} = req.body;

  if (!username || !email || !password ) {
    res.status(400).send({ message: "Missing Values" });
    return;
  }
  const availableUser = await User.findOne({ where: { email } });
  if (availableUser) {
    res.status(409).send({ message: "Email already Exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  User.create({
    username,
    email,
    password: hashedPassword,
  
   
  })
    .then((user) => {
      res.status(201).json({ status:201, message: "user created succesfully " });
    })
    .catch((error) => {
      res.status(400).send({ status:400, message: "Failed to create user " + error });
    });
};
//@desc login user
//@route POST /login
//@access public

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "Missing Values" });
  }

  const user = await User.findOne({ where: { email } });

  //compare password

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          user_id: user.user_id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ status:200, message: user, accessToken });
  } else if (user == null) {
    res.status(404).send({status:404, message: "Email not registered" });
  } else {
    res.status(401).send({status:401, message: "Invalid Password or Email" });
  }
};
//@desc logout user
//@route POST /logout
//@access private
const logoutUser = async (req, res) => {
  async () => await sequelize.sync({ force: true });
  const { user_id } = req.body;
  const token = req.headers.Authorization || req.headers.authorization;
  async () => await sequelize.sync({ force: true });
  if (token && token.startsWith("Bearer ")) {
    const tokenToInvalidate = token.split(" ")[1];
    await InvalidToken.create({
      user_id,
      token: tokenToInvalidate,
    })
      .then(() => {
        return;
      })
      .catch((err) => {
        return res.status(400).send({ message: "Invalid request", err });
      });
    res.status(200).send({ message: "User logged out" });
  } else {
    res.status(400).send({ message: "Invalid request" });
  }
};
module.exports = { createUser, loginUser, logoutUser };
