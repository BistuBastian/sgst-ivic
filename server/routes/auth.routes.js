const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

router.post("/login", async (req, res) => {
  const login = async (username, password) => {
    try {
      const response = await api.post("/api/auth/login", {
        username,
        password,
      });

      // Render devuelve: { success, token, user: { username, rol, nombre } }
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); // Guardamos el objeto completo

      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };
});

module.exports = router;
