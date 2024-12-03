import mongoose from "mongoose";
import assert from "assert";
//Modulo nativo de Node JS que nos permite hacer las validaciones. 
import User from "../src/dao/Users.dao.js" ; 

//Me conecto a mi Base de Datos. 
mongoose.connect("mongodb+srv://backend70080:coderhouse@cluster0.4fw2i.mongodb.net/Documentacion?retryWrites=true&w=majority&appName=Cluster0")

//Describe: es una función que me permite agrupar un conjunto de pruebas relacionadas bajo un mismo bloque descriptivo. 

describe("Testeamos el DAO de Usuarios", function () {
    //Le asignamos un nombre o titulo. 
    //Pasamos una función callback que contiene todas las pruebas individuales.
    
    before(function () {
        this.usersDao = new User(); 
    })

    //Limpiamos la BD cada vez que testeamos: 
    beforeEach(async function() {
        await mongoose.connection.collections.users.drop(); 
        this.timeout(5000); 
        //Ademas le damos un tiempo maximo para completar la operacion en 5 segundos. 
    })


    //Pruebas: 

    it("El get de usuarios me debe retornar un array", async function () {
        const resultado = await this.usersDao.get();
        assert.strictEqual(Array.isArray(resultado), true);
    })

    //TEST 1: 
    it("El DAO debe poder agregar un usuario nuevo a la Base de Datos", async function() {
        let usuario = {
            first_name: "Mirtha",
            last_name: "Martinez", 
            email: "tengo1000años@eltrece.com", 
            password: "1234"
        }

        const resultado = await this.usersDao.save(usuario);
        assert.ok(resultado._id); 
        //Aca verificamos que el valor qeu recibimos es "verdadero"
    })

    //TEST 2: 
    it("Validamos que el usuario tenga un array de mascotas vacio", async function () {
        let usuario = {
            first_name: "Mirtha",
            last_name: "Martinez", 
            email: "tengo1000años@eltrece.com", 
            password: "1234"
        }

        const resultado = await this.usersDao.save(usuario); 
        assert.deepStrictEqual(resultado.pets, []); 
    })

    //TEST 3: 
    it("El DAO puede obtener un usuario por email", async function() {
        let usuario = {
            first_name: "Lia",
            last_name: "Crucet", 
            email: "lia@inmortal.com", 
            password: "1234"
        }

        await this.usersDao.save(usuario); 

        const user = await this.usersDao.getBy({email: usuario.email}); 

        assert.strictEqual(typeof user, "object"); 
    })

    after(async function() {
        await mongoose.disconnect(); 
    })

})
