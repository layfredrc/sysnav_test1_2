export interface FileValidator {
  isValid: boolean
  fileName: string
  errorMessage?: string
}
