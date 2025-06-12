// Define interfaces for env structure types
export interface NestedEnvStructure<T = string> {
  [category: string]: {
    [key: string]: T
  }
}

export interface MixedEnvStructure<T = string, K = any> {
  [key: string]:
    | K
    | {
        [nestedKey: string]: T
      }
}
