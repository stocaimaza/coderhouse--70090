const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://backend70080:coderhouse@cluster0.4fw2i.mongodb.net/JWT?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conectado a la BD"))
    .catch( (error) => console.log(error))