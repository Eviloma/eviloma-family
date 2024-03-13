import { StatusCodes } from 'http-status-codes';

export class ApiErrorClass extends Error {
  code: StatusCodes;

  error_code: string;

  constructor(code: StatusCodes, error_code: string) {
    super(error_code);
    this.code = code;
    this.error_code = error_code;
  }
}

const ErrorFetchingUserInfo = new ApiErrorClass(StatusCodes.INTERNAL_SERVER_ERROR, 'error_fetching_user_info');
const UnauthorizedError = new ApiErrorClass(StatusCodes.UNAUTHORIZED, 'unauthorized');
const ForbiddenError = new ApiErrorClass(StatusCodes.FORBIDDEN, 'forbidden');
const NotFoundError = new ApiErrorClass(StatusCodes.NOT_FOUND, 'not_found');

export { ErrorFetchingUserInfo, ForbiddenError, NotFoundError, UnauthorizedError };
