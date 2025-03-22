import { MongoClient } from 'mongodb';
import express from 'express';
import 'dotenv/config';

// Configuración de la base de datos
const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI);
const dbName = "cine";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./public'));
app.use(express.json());

async function startServer() {
    try {
        await client.connect();
        console.log('✅ Conectado a MongoDB');

        const db = client.db(dbName);
        const peliculasCollection = db.collection('peliculas');

        // Ruta para obtener las películas
        app.get('/api/v2/peliculas', async (req, res) => {
            try {
                const peliculas = await peliculasCollection.find().toArray();
                res.json(peliculas);
            } catch (error) {
                res.status(500).json({ error: 'Error al obtener las películas' });
            }
        });

        // Iniciar el servidor solo si la DB está conectada
        app.listen(port, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
        });

    } catch (error) {
        console.error('❌ Error de conexión a MongoDB:', error);
        process.exit(1);
    }
}

// Manejar cierre seguro de la conexión
process.on('SIGINT', async () => {
    await client.close();
    console.log('🔴 Conexión a MongoDB cerrada');
    process.exit(0);
});

// Ejecutar la función principal
startServer();
