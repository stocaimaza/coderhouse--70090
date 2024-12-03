import winston from "winston";

//Pueden traer del configObject: node_env

//const {node_env} = configObject; 

const niveles = {
    fatal: 0,
    error: 1, 
    warning: 2,
    info: 3, 
    http: 4, 
    debug: 5
}

//Logger para desarrollo: 

const loggerDev = winston.createLogger({
    levels: niveles, 
    transports: [
        new winston.transports.Console({
            level: "debug"
        })
    ]
})


//Logger para produccion: 

const loggerProd = winston.createLogger({
    levels: niveles, 
    transports: [
        new winston.transports.Console({
            level: "http"
        }),
        new winston.transports.File({
            filename: "./errors.log", 
            level: "warning"
        })
    ]
})

//Determinar que logger usar de acuerdo a la variable de entorno: 

const logger = node_env === "produccion" ? loggerProd : loggerDev;


//Creamos un middleware: 

const addLogger = (req, res, next) => {
    req.logger = logger; 
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`);
    next(); 
}

export default addLogger;