import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException({ message: 'Unauthorized' });
      }

      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Unauthorized' });
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      // Check if user has 'admin' role
      if (!user.role || !requiredRoles.includes(user.role)) {
        throw new UnauthorizedException({
          message: 'Forbidden! Only For Admin',
        });
      }

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'Forbidden! Only for Admin' });
    }
  }
}
