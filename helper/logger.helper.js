require('winston-daily-rotate-file');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp, meta }) => {
    return `${timestamp} [${level}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
            level: "info",
            filename: "application-%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: '1m',
            maxFiles: '14d'
        })
    ],
});

module.exports = {
    logger
};
