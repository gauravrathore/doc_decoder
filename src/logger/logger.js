const { createLogger, format, transports, addColors } = require("winston");
const { combine, colorize, label, timestamp, printf } = format;
const { LOGGER_MSG_COLORS, LOGGER_MSG_ICONS } = require("../util/constant");

const customFormat = format.combine(
  colorize({ all: true }),
  label({ label: "[LOGGER]" }),
  timestamp({ format: "YY-MM-DD HH:MM:SS" }),
  printf((info) => {
    // eslint-disable-next-line no-control-regex
    const cleanLevel = info.level.replace(/\u001b\[.*?m/g, "");
    const pre = LOGGER_MSG_ICONS[cleanLevel] || "";
    return ` ${pre}${info.label} ${info.timestamp} ${info.level}: ${info.message}`;
  })
);

addColors(LOGGER_MSG_COLORS);

const logger = createLogger({
  level: "info",
  transports: [new transports.Console({ format: combine(customFormat) })],
});

module.exports = logger;
