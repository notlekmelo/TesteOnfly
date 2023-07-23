/**
 * Usuario data authentication
 *
 * Token data
 */
export class JwtPayload {
  usuarioID: number;
  email: string;
  refreshToken: string;
}
