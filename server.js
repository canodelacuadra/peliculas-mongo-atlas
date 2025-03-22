import { MongoClient } from 'mongodb';
import express from 'express';
import 'dotenv/config'

// Configuración de la base de datos
const uri = process.env.URI ||'mongodb://localhost:27017/';
const client = new MongoClient(uri);
const dbName = "cine";


// Inicializar Express
const app = express();
const port = process.env.PORT||3000;
app.use(express.static('./public'));
app.use(express.json());

// Conectar a la base de datos antes de iniciar el servidor
client.connect()
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch(error => {
        console.error('Error de conexión a MongoDB:', error);
        process.exit(1);
    });
const db = client.db(dbName);
const peliculasCollection = db.collection('peliculas');



// Ruta para obtener las películas
app.get('/api/v2/peliculas', (req, res) => {
    peliculasCollection.find().toArray()
        .then(peliculas => res.json(peliculas))
        .catch(error => res.status(500).json({ error: 'Error al obtener las películas' }));
});



// Iniciar el servidor después de conectarse a la base de datos
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});