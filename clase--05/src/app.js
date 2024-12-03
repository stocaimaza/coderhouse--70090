/** CLASE 5 -- CLUSTERIZACION Y ESCALABILIDAD **/

//Temas:
//1) Escalabilidad
//2) Clusterizar nuestra app

import express from "express"; 
import cluster from "cluster"; 
import { cpus } from "os";
const numeroDeProcesadores = cpus().length; 
console.log(numeroDeProcesadores);

if(cluster.isPrimary) {
    console.log("Proceso Primario"); 
    for(let i = 0; i < numeroDeProcesadores; i++ ) {
        cluster.fork(); 
    }
}else {
    console.log(`Me presento, soy un proceso worker con el id ${process.pid}`);
    const app = express(); 
    
    app.get("/", (req, res) => {
        res.send("Peticion atentida por un proceso worker"); 
    })

    app.get("/operacionsimple", (req, res) => {
        let suma = 0; 

        for (let i = 0; i < 1000000; i++ ) {
            suma += i; 
        }
        res.send({suma}); 
    })

    app.get("/operacioncompleja", (req, res) => {
        let suma = 0; 
        for (let i = 0; i < 5e8; i++ ) {
            suma += i; 
        }
        res.send({suma}); 
    })

    app.listen(8080, () => console.log("Escuchando en el puerto 8080"));
}


