// src/types/coreTypes/index.ts
export type {
  TErrorType,
  TErrorCodes,
  TStatusCodeKey,
  IErrorTypeResponse,
  IErrorInfo,
  IAppErrorParams,
  IHandleErrorParams,
  I_ApiResponseError,
  IApiResponseError,
  IErrorFallbackProps,
  IErrorBoundaryProps,
  IErrorBoundaryState,
} from "./error.types"
export type {
  TThemeMode,
  TTheme,
  IThemeContext,
  IThemeProviderProps,
  IToggleThemeProps,
  IThemeDropDownProps,
} from "./theme.types"
export type {
  TNotificationPosition,
  TNotificationType,
  IPopupNotificationItemProps,
  TToastState,
  IToastContext,
  IModalContext,
} from "./popup.types"
export type { IPutInStorage, IGetFromStorage, IHandleTokenStorage, ITokenStorageParams } from "./indexDB.types"
export { defaultToastContext, defaultModalContext } from "./popup.types"
export type { AriaDecision, IStrictAriaProps } from "./aria.types"
export type { IFormState, IFormErrors } from "./authForm.types"
export type { TimerProps } from "./timer.types"
