//Armamos nuestro Schema y Modelo de Usuarios. 

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

//1) El schema lo voy a armar a partir de una clase: 
//2) Agregamos los decoradores Schema y Prop
//3) Hidratamos el documento para que tenga algunos metodos de Mongoose

export type UsersDocument = HydratedDocument<User>
//Recuerda que el documento hidratado hace referencia a que los resultados devueltos por la base sean devueltos como Instancias de documento de mongo, lo cual significa que cuenta con múltiples funcionalidades adicionales de mongo.
 

@Schema()
export class User {
    @Prop({required: true})
    first_name: string; 

    @Prop()
    last_name: string; 

    @Prop()
    email: string;

    @Prop()
    password: string; 
}

//4) Al final del archivo, colocaremos la creacion del schema final. 

export const userSchema = SchemaFactory.createForClass(User);