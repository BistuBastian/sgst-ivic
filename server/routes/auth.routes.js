const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const usersPath = path.join(__dirname, '../db/users.json');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Lectura del archivo JSON local
    const data = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    const user = data.users.find(u => u.username === username && u.password === password);

    if (user) {
        // Generación del Token (expira en 8 horas según RF-144)
        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name },
            process.env.JWT_SECRET || 'secret_key_local',
            { expiresIn: '8h' }
        );

        res.json({
            success: true,
            token,
            user: { username: user.username, role: user.role, name: user.name }
        });
    } else {
        res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
});

module.exports = router;