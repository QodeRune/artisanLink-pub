// !token manager types
export interface IPutInStorage {
  valueDict: Record<string, any> // Dictionary of key-value pairs to store
  useSessionStorage?: boolean // Whether to use sessionStorage (default: false for localStorage)
}

export interface IGetFromStorage {
  key: string | string[] // A single key or list of keys to retrieve
  useSessionStorage?: boolean // Whether to use sessionStorage (default: false for localStorage)
}

export interface IHandleTokenStorage {
  responseData: Record<string, any> // API response data
  useSessionStorage?: boolean // Whether to use sessionStorage (default: false for localStorage)
  tokenKeyList?: string[] // List of token keys to process (default: authTokenList)
}

export interface ITokenStorageParams {
  accessToken: string
  refreshToken: string
  useSessionStorage?: boolean
  [key: string]: any // Allows additional keys dynamically
}
