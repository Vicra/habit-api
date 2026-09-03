import { SignOptions } from 'jsonwebtoken';
import { createRequire } from 'node:module';

const { sign } = createRequire(__filename)('jsonwebtoken') as {
  sign: (
    payload: string | Buffer | object,
    secretOrPrivateKey: string,
    options?: SignOptions,
  ) => string;
};

export function signToken(
  payload: Record<string, unknown>,
  secret: string,
  options?: SignOptions,
): string {
  return sign(payload, secret, options);
}
