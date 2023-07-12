import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";
import { ERROR_MESSAGES } from "src/constant/api.message";
import { CustomException } from "../exception/custom-exception";

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus()).json({
      status: false,
      statusCode: exception.getStatus(),
      errorMessage: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      error: exception.getResponse(),
      timestamp: new Date().toISOString(),
    });
  }
}
