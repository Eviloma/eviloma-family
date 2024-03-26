import { StatusCodes } from 'http-status-codes';

export class ApiErrorClass extends Error {
  code: StatusCodes;

  detailedMessage?: string;

  constructor(code: StatusCodes, message: string, detailedMessage?: string) {
    super(message);
    this.code = code;
    this.detailedMessage = detailedMessage;
  }
}

const ErrorFetchingUserInfo = new ApiErrorClass(
  StatusCodes.INTERNAL_SERVER_ERROR,
  'Не вдалось завантажити інформацію про користувача'
);
const UnauthorizedError = new ApiErrorClass(StatusCodes.UNAUTHORIZED, 'Не авторизовано');
const ForbiddenError = new ApiErrorClass(StatusCodes.FORBIDDEN, 'Доступ заборонено');
const NotFoundError = new ApiErrorClass(StatusCodes.NOT_FOUND, 'Не знайдено');

export { ErrorFetchingUserInfo, ForbiddenError, NotFoundError, UnauthorizedError };
