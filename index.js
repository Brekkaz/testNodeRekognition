require('dotenv').config()
const AWS = require('aws-sdk')
const fs = require('fs');

const {
    AWS_KEY_VALUE,
    AWS_SECRET_KEY_VALUE,
    AWS_REGION_VALUE,
} = process.env;


AWS.config.update({ region: 'us-east-1' }); // Configura la región AWS

// Crea una instancia de Rekognition
const rekognition = new AWS.Rekognition({
    accessKeyId: AWS_KEY_VALUE,
    secretAccessKey: AWS_SECRET_KEY_VALUE,
    region: AWS_REGION_VALUE,
});

// Lee el archivo de imagen
const img = fs.readFileSync('rick.jpg');

// Define los parámetros de detección de objetos
const params = {
    Image: {
        Bytes: img
    },
    MaxLabels: 10, // Número máximo de etiquetas a retornar
    MinConfidence: 20, // Confianza mínima requerida para considerar una etiqueta
};

// Ejecuta la detección de objetos en la imagen
rekognition.detectLabels(params, (err, data) => {
    if (err) {
        console.log(err, err.stack); // Si hay un error, lo muestra en la consola
    } else {
        data.Labels.forEach(item => {
            console.log(item); // Si todo va bien, muestra las etiquetas detectadas
        });
    }
});
