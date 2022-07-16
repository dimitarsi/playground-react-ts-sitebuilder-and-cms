import { RequestHandler } from "express";

export const restricted: RequestHandler = (req, res, next) => {
  if (req.session.authorized) {
    res.sendStatus(403);
    return;
  }
  next();
};
