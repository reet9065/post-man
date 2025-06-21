const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const prisma = require('../prisma/client');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Token missing' });

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.userId = user.userId;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}

router.post('/', authenticateToken, async (req, res) => {
    const { reqObj } = req.body;
    if (!reqObj) return res.status(400).json({ error: 'reqObj is required' });

    try {
        const newReq = await prisma.requests.create({
            data: {
                userId: req.userId,
                reqObj: JSON.stringify(reqObj),
            },
        });

        res.status(201).json(newReq);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save request' });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    try {
        const requestsList = await prisma.requests.findMany({
            where: { userId: req.userId },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        });

        res.json(requestsList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
});

module.exports = router;
