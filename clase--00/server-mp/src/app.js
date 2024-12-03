//npm i express cors mercadopago

import express from "express";
import cors from "cors";
const app = express(); 
const PUERTO = 8080; 

import {MercadoPagoConfig, Preference} from "mercadopago";

const client = new MercadoPagoConfig({accessToken: "APP_USR-4761637634041891-102919-8df8f865d2cd9aeae072969573eff48b-1841948220"}); 

//Middleware: 
app.use(express.json());
app.use(cors()); 

app.get("/", (req, res) => {
    res.send("Y Seba nunca contaste que paso con el coder camp y la gente"); 
})

app.post("/create-preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title, 
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price), 
                    currency_id: "ARS"
                }
            ],
            back_urls: {
                success: "https://www.mercadolibre.com.ar/",
                failure: "https://www.mercadolibre.com.ar/",
                pending: "https://www.mercadolibre.com.ar/"
            },
            auto_return: "approved", 
        };
       const preference = new Preference(client); 
       const result = await preference.create({body}); 

       //se lo enviamos al front: 
       res.json({
        id: result.id
       })
    } catch (error) {
        console.log(error); 
        res.send("Error mortal"); 
    }
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})