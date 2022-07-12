import multer from "multer";

const multerMiddleware = multer({ dest: "./uploads" });

export const middleware = multerMiddleware.single("attachment");
