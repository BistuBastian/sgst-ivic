const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Esto permite visualizar en consola las peticiones realizadas al servidor
app.use(morgan("dev"));

// Configuración de CORS para permitir Vercel
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
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
