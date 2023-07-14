import { SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const JWT_CONSTANTS = {
    secret: 'ITS_TOO_SECRET_MAN_PLEASE_AVOID_HACKING_IT',
    expiresIn: '60s'
};
