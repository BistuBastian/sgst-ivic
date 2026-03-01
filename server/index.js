const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

// Configuración de variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Esto permite visualizar en consola las peticiones realizadas al servidor
app.use(morgan('dev'));

// Esto permite que el Frontend (puerto 5173) lea los recursos del Backend (puerto 5000)
app.use(cors({
    origin: 'http://localhost:5173', // URL exacta del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middlewares de procesamiento
app.use(express.json()); // Permite recibir datos en formato JSON

// Ruta base de prueba
app.get('/', (req, res) => {
    res.send('Servidor del SGST-Local IVIC funcionando correctamente');
});

// Importación de las rutas de autenticación
const authRoutes = require('./routes/auth.routes');

// Vincular las rutas al endpoint /api/auth
app.use('/api/auth', authRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Error interno en el servidor local' });
});

// Inicio del servidor persistente
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
    console.log('Presione Ctrl+C para detener');
});