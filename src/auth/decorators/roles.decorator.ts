import { SetMetadata } from '@nestjs/common';

/** Metadata key for the roles list stored on route handler metadata */
export const ROLES_KEY = 'roles';

/**
 * Attaches required role names to a route handler or controller class.
 * Consumed by RolesGuard to enforce role-based access control.
 *
 * @example
 * \@Roles('ADMIN')
 * \@UseGuards(JwtAuthGuard, RolesGuard)
 * \@Get('users')
 * getUsers() { ... }
 */
export const Roles = (...roles: string[]): MethodDecorator & ClassDecorator =>
  SetMetadata(ROLES_KEY, roles);
