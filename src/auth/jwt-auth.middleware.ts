import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from './jwt.util';

const JWT_SECRET = 'supersecret';
const REQUIRED_PERMISSION = 'view:habits';

type AuthUser = {
  id?: string;
  email?: string;
  name?: string;
  permissions?: string[];
};

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    const token = authorization.slice('Bearer '.length).trim();
    if (!token) {
      throw new UnauthorizedException('Missing or invalid token');
    }

    let payload: Record<string, unknown>;
    try {
      payload = verifyToken(token, JWT_SECRET);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const user: AuthUser = {
      id: typeof payload.id === 'string' ? payload.id : undefined,
      email: typeof payload.email === 'string' ? payload.email : undefined,
      name: typeof payload.name === 'string' ? payload.name : undefined,
      permissions: Array.isArray(payload.permissions)
        ? payload.permissions.filter(
            (permission): permission is string =>
              typeof permission === 'string',
          )
        : undefined,
    };

    if (!user.permissions?.includes(REQUIRED_PERMISSION)) {
      throw new ForbiddenException('Missing permission: view:habits');
    }

    req.user = user;
    next();
  }
}
