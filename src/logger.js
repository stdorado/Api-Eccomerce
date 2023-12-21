import winston from "winston"


const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
        http: 5, 
    },
    colors: {
        fatal: "red",
        error: "yellow",
        warning: "black",
        info: 'magenta',
        debug: "cyan",
        http: "green", 
    },
};


const logger = winston.createLogger({
    levels : customLevelsOptions.levels,
    transports : [
        new winston.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',

            format : winston.format.combine(
                winston.format.colorize({colors : customLevelsOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename : "./errors.log",
            level : process.env.NODE_ENV === 'production' ? 'error' : 'debug',
            format : winston.format.simple()
        })
    ]
});


export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
};

export  {logger}