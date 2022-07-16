import "express-session";

declare module "express-session" {
  interface SessionData {
    authorized?: boolean | number | string;
  }
}
