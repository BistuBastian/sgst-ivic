const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Buscar usuario
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE username = $1 AND activo = TRUE",
      [username]
    );

    const user = result.rows[0];

    // 2. Validar existencia
    if (!user) {
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }

    // 3. Validar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }

    // 4. Generar Token
    const token = jwt.sign(
      { id: user.id, rol: user.rol, nombre: user.nombre },
      process.env.JWT_SECRET || "secret_key_local",
      { expiresIn: "8h" }
    );

    // 5. Enviar respuesta
    res.json({
      success: true,
      token,
      user: {
        username: user.username,
        rol: user.rol,
        nombre: user.nombre,
        apellido: user.apellido
      }
    });

  } catch (error) {
    console.error("ERROR EN LOGIN:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

module.exports = router;