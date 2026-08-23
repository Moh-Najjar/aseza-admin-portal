/** Shape of the payload encoded inside every JWT issued by this API */
export interface JwtPayload {
  /** Subject — the authenticated user's primary key */
  sub: number;
  /** User's email address */
  email: string;
  /** Role claim used by RolesGuard — currently always "ADMIN" */
  role: string;
  /** Unique token identifier — used to blacklist individual tokens on logout */
  jti: string;
  /** Standard issued-at timestamp (seconds) */
  iat?: number;
  /** Standard expiry timestamp (seconds) */
  exp?: number;
}

/**
 * The object attached to `request.user` after the JWT strategy validates a token.
 * Contains the decoded payload plus the raw token string needed for blacklisting.
 */
export interface AuthenticatedUser {
  userId: number;
  email: string;
  role: string;
  jti: string;
  /** Raw Bearer token — stored so the logout endpoint can blacklist it */
  token: string;
}
