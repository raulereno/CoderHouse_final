const winston = require('winston');


let logger;

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: "red",
        error: "magenta",
        warning: "yellow",
        info: "blue",
        debug: "white"
    }
}

const devLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        }),

        new winston.transports.File({
            level: "warning",
            filename: "./logs/errors.log",
            format: winston.format.simple()
        }),
    ]
})

const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "warning",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: "error",
            filename: "./logs/errors.log",
            format: winston.format.simple()
        }),
    ]
})


if (process.env.ENV === 'production') logger = prodLogger
else logger = devLogger


const addLogger = (req, res, next) => {
    req.logger = logger
    next()
}

module.exports = addLogger 