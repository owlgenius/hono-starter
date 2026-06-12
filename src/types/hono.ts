import pino from "pino";

export type AppEnv = {
  Variables: {
    logger: pino.Logger;
    userId: number;
  };
};
