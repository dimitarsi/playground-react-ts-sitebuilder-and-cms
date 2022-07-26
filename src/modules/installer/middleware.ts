import multer from "multer";
import { UPLOADS_PATH } from "../constants";

const multerMiddleware = multer({ dest: UPLOADS_PATH });

export const middleware = multerMiddleware.single("attachment");
