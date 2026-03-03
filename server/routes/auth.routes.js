const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

router.post("/login", async (req, res) => {
  console.log("LOGIN HIT");
  console.log("BODY:", req.body);

  const { username, password } = req.body;

  try {
    console.log("QUERYING DB...");
    const result = await pool.query(
      "SELECT id, username, rol, nombre, apellido, password, activo FROM usuarios WHERE username = $1",
      [username]
    );
    console.log("DB RESULT ROWS:", result.rows.length);

    const user = result.rows[0];

    if (!user || user.activo === false) {
      console.log("NO USER OR INACTIVE");
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }

    console.log("CHECKING PASSWORD...");
    const ok = await bcrypt.compare(password, user.password);
    console.log("PASSWORD OK:", ok);

    if (!ok) {
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }

    console.log("SIGNING TOKEN...");
    const token = jwt.sign(
      { id: user.id, rol: user.rol, nombre: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    console.log("SENDING RESPONSE...");
    return res.json({
      success: true,
      token,
      user: { username: user.username, rol: user.rol, nombre: user.nombre, apellido: user.apellido }
    });
  } catch (e) {
    console.error("LOGIN ERROR:", e);
    return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
});

module.exports = router;