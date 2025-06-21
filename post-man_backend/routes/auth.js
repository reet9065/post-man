const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = '1d';


function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

router.get('/', async (req, res) => {
  const token = req.cookies?.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return res.status(200).json({ userId: decoded.userId });
    } catch (err) {
      
      try {
        const decoded = jwt.decode(token);
        if (decoded?.userId) {
          await prisma.requests.deleteMany({ where: { userId: decoded.userId } });
          await prisma.user.delete({ where: { id: decoded.userId } });
        }
      } catch (e) {
        console.error('Cleanup failed:', e.message);
      }
    }
  }

  // Create new user
  const newUser = await prisma.User.create({ data: {} });
  const newToken = generateToken(newUser.id);

  res
    .cookie('token', newToken, {
      httpOnly: true,
      secure: true, 
      sameSite: 'Strict',
      maxAge: 1000 * 60 * 60 * 24, 
    })
    .status(201)
    .json({ userId: newUser.id });
});

module.exports = router;
