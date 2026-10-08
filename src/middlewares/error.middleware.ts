import { Request, Response, NextFunction } from "express";
import logger from "../logger.ts";

export function errorHandler(err: Error & { status?: number }, req: Request, res: Response, next: NextFunction) {
  logger.error(`${req.method} ${req.url} - ${err.message}`, { stack: err.stack });

  if (res.headersSent) return next(err);

  const status = err.status ?? 500;
  res.status(status).json({
    error: status === 500 ? "Algo salió mal, intenta más tarde" : err.message,
  });
}