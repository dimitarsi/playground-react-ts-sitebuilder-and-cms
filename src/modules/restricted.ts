import { RequestHandler } from "express";

export const restricted: RequestHandler = (req, res, next) => {
  // @ts-ignore
  if (!req.session.authorized) {
    res.sendStatus(403);
    return;
  }
  next();
};
