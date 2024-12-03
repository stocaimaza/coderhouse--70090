/** APP WHATSAPP LOCO WEB **/
//npm i express whatsapp-web.js cors qrcode-terminal   

import express from "express";
import cors from "cors"; 
import qrcode from "qrcode-terminal"; 
import { Client } from "whatsapp-web.js";

const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(cors()); 

//Inicializando el cliente de WhatsApp: 

const client = new Client({
    //Configuramos el Puppeteer, para controlar el navegador sin una interfaz grafica. 
    puppeteer: {
        headless: true, //Ejecutamos el navegador en modo "sin cabeza", es decir, sin mostrar la interfaz grafica. 
    }
})

//Almacenar la sesión de WhatsApp (autenticacion): 
let estaAutenticado = false; 

//Escuchamos eventos y generamos el qr de autenticacion: 
//Escuchamos el evento "qr", que se dispara cuando se necesita que el usuario escanee el codigo QR. 

client.on("qr", qr => {
    //Usamos "qrcode-terminal" para generar y mostrar el qr en la terminal. 
    qrcode.generate(qr, {small: true}); 
})

//Confirmamos que el cliente esta listo para enviar mensajes: 

client.on("ready", () => {
    console.log("Cliente de WhatsApp listo!"); 
    estaAutenticado = true; 
})

//Manejo de errores de autenticacion: 
client.on("auth_failure", msg => {
    console.log("Error de autenticacion: ", msg);
})

//Inicializar el cliente.

client.initialize(); 

//Ruta para enviar un mensaje: 

app.post("/send-message", (req, res) => {
    // Paso 1: Verificamos la autenticación. 
    if(!estaAutenticado) {
        return res.status(401).json({error: "Cliente no autenticado. Por favor escanea el qr primero!!"});
    }

    // Paso 2: Obtener los datos del cuerpo de la solicitud (req.body) en donde tenemos el numero y el mensaje a enviar. 
    const {numeroDestino, mensajeDestino} = req.body; 

    // Paso 3: Formatear el ID del chat
    // WhatsApp Web usa un formato especial para los IDs de chat. El numero debe tener el sufijo "@c.us"
    const chatId = `${numeroDestino}@c.us`; 


    // Paso 4: Enviar el mensaje a traves de WhatsApp Web. 
    client.sendMessage(chatId, mensajeDestino)
        .then(response => {
            res.json({success: true, response});
        })
        .catch( error => {
            res.status(500).json({error: "No se puede enviar el mensaje, moriraaas!"}); 
        })
})



//Rutas


app.listen(PUERTO, () => {
    console.log(`Escuchando el partido de Riestra en el puerto 8080`); 
})