const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Esto permite visualizar en consola las peticiones realizadas al servidor
app.use(morgan("dev"));

// Configuración de CORS para permitir Vercel y localhost
app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requests sin Origin (Postman/curl)
      if (!origin) return callback(null, true);

      const allowed = [
        (process.env.CORS_ORIGIN || "").replace(/\/$/, ""), // quita "/" final
        "http://localhost:5173",
      ].filter(Boolean);

      const normalized = origin.replace(/\/$/, "");

      // Permitir tu dominio y también cualquier subdominio de Vercel
      if (allowed.includes(normalized) || normalized.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error(`CORS bloqueado para: ${origin}`), false);
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares de procesamiento
app.use(express.json()); // Permite recibir datos en formato JSON

// Endpoint de prueba
app.get("/health", (req, res) => {
  res.json({ status: "Servidor operativo", database: "Conectada a Supabase" });
});

// Importación de las rutas de autenticación
const authRoutes = require("./routes/auth.routes");

// Vincular las rutas al endpoint /api/auth
app.use("/api/auth", authRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Error interno en el servidor local" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
