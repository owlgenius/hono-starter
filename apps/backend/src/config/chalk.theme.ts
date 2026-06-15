import chalk from "chalk";

export const theme = {
  success: chalk.green.bold,
  error: chalk.red.bold,
  warning: chalk.yellow.bold,
  info: chalk.blue.bold,
  muted: chalk.gray,

  server: chalk.cyan.bold,
  database: chalk.magenta.bold,
  request: chalk.white.bold,

  status: {
    ok: chalk.green.bold,
    redirect: chalk.cyan.bold,
    clientError: chalk.yellow.bold,
    serverError: chalk.red.bold,
  },
};
