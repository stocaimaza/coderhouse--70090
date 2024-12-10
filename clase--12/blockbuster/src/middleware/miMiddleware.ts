//Importaremos algunas excelentisimas herramientas de Express: 
import { Request, Response, NextFunction } from "express";

//Importamos NestMiddlware
import { NestMiddleware } from "@nestjs/common";

export default class MiMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`${req.method} a la ruta ${req.url}`); 
        next();
    }
}