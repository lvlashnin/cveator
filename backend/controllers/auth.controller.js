const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User, PersonalDetails } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { loginEmail: email } });

    if (existingUser)
      return res.status(400).json({ message: 'user with this email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      loginEmail: email,
      passwordHash: hashedPassword,
    });

    await PersonalDetails.create({
      userId: newUser.id,
      fullName: username,
      workEmail: email,
      phone: '',
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.loginEmail }, JWT_SECRET, {
      expiresIn: '24h',
    });

    res.status(201).json({
      message: 'user created success',
      token,
      user: { id: newUser.id, email: newUser.loginEmail },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'registering error user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { loginEmail: email } });

    if (!user) return res.status(401).json({ message: 'no user with such email' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) return res.status(401).json({ message: 'invalid password' });

    const token = jwt.sign({ id: user.id, email: user.loginEmail }, JWT_SECRET, {
      expiresIn: '24h',
    });

    res.status(201).json({
      message: 'access allowed',
      token,
      user: { id: user.id, email: user.loginEmail, username: user.username },
    });
  } catch (error) {
    console.error('login error:', error);
    res.status(500).json({ message: 'server error during login' });
  }
};
