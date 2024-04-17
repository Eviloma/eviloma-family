import { StatusCodes } from "http-status-codes";

interface IDetailedError {
  code?: string;
  message?: string;
  telegram?: string;
}

export class ApiErrorClass extends Error {
  code: StatusCodes;

  details: IDetailedError;

  constructor(code: StatusCodes, message: string, details: IDetailedError = {}) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

const ErrorFetchingUserInfo = (details?: IDetailedError) =>
  new ApiErrorClass(StatusCodes.INTERNAL_SERVER_ERROR, "Не вдалось завантажити інформацію про користувача", {
    code: "ERROR_FETCHING_USER_INFO",
    ...details,
  });
const UnauthorizedError = (details?: IDetailedError) =>
  new ApiErrorClass(StatusCodes.UNAUTHORIZED, "Не авторизовано", { code: "UNAUTHORIZED", ...details });
const ForbiddenError = (details?: IDetailedError) =>
  new ApiErrorClass(StatusCodes.FORBIDDEN, "Доступ заборонено", { code: "FORBIDDEN", ...details });
const NotFoundError = (details?: IDetailedError) =>
  new ApiErrorClass(StatusCodes.NOT_FOUND, "Не знайдено", { code: "NOT_FOUND", ...details });
const UserNotFoundError = (details?: IDetailedError) =>
  new ApiErrorClass(StatusCodes.NOT_FOUND, "Користувача не знайдено", { code: "USER_NOT_FOUND", ...details });
const MissingRequiredParamsError = (details?: IDetailedError) =>
  new ApiErrorClass(StatusCodes.BAD_REQUEST, "Один або декілька обов`язкових параметрів не встановлено", {
    code: "MISSING_REQUIRED_PARAMS",
    ...details,
  });

export {
  ErrorFetchingUserInfo,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  UserNotFoundError,
  MissingRequiredParamsError,
};
