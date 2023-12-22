import winston = require("winston");
import chalk from "chalk";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          const colors = {
            info: chalk.blue,
            warn: chalk.yellow,
            error: chalk.red,
            debug: chalk.green,
          };

          const coloredLevel = colors[
            level.toLowerCase() as keyof typeof colors
          ](level.toUpperCase());
          return `${timestamp} ${coloredLevel}: ${message}`;
        }),
      ),
    }),
  ],
});

export { logger };
