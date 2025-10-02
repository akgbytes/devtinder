import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncRequestHandler<T> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;

export const asyncHandler =
  <T>(fn: AsyncRequestHandler<T>): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
