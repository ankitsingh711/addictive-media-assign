import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

interface IUserPayload extends JwtPayload {
  id: string;
  email: string;
}

interface CustomRequest extends Request {
  user?: IUserPayload;
}

export const authorization = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    jwt.verify(token, "your_jwt_secret", (err, decoded) => {
      if (err) {
        logger.error(`Invalid Token: ${err.message}`);
        return res.status(401).json({ message: "Invalid token" });
      }

      logger.info(`this is a decoded payload: ${JSON.stringify(decoded)}`);

      req.user = decoded as IUserPayload;

      logger.info(`Token verified successfully for user ${req.user.id}`);
      next();
    });
  } catch (error) {
    logger.error(`Authorization Error: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

