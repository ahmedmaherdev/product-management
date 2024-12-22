import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();
        let message = exception.message || 'Internal Server Error';
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
            
        if (exception instanceof HttpException) {
            status = exception.getStatus();
        }

        if (exception instanceof BadRequestException) {
            const errorResponse: any = exception.getResponse();
            message = typeof errorResponse === 'string' ? errorResponse : errorResponse.message;
        }

        response
            .status(status)
            .json({
                statusCode: status,
                message,
                timestamp: new Date().toISOString(),
                path: request.url
            });
    }
    
}