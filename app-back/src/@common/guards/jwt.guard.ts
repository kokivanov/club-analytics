import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super()
    }

    canActivate(context: ExecutionContext) {
        if (this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ])) return true

        return super.canActivate(context)
    }
}