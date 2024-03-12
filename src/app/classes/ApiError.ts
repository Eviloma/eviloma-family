import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  code: StatusCodes;

  error_code: string;

  constructor(code: StatusCodes, error_code: string) {
    super(error_code);
    this.code = code;
    this.error_code = error_code;
  }
}

const ErrorFetchingUserInfo = new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'error_fetching_user_info');
const UnauthorizedError = new ApiError(StatusCodes.UNAUTHORIZED, 'unauthorized');
const ForbiddenError = new ApiError(StatusCodes.FORBIDDEN, 'forbidden');
const NotFoundError = new ApiError(StatusCodes.NOT_FOUND, 'not_found');

export { ErrorFetchingUserInfo, ForbiddenError, NotFoundError, UnauthorizedError };
