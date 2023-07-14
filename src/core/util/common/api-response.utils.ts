import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

export function sendApiResponse(
    res: Response,
    status: boolean,
    statusCode: number,
    message: string,
    data: any,
): void {
    res.status(statusCode).json({
        status,
        statusCode,
        message,
        data,
    });
}