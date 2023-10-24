import { FileValidator } from '@types'
import { FileInput } from 'models'

const isValidJsonFile = (file: FileInput, content: string): FileValidator => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase()
  if (fileExtension !== 'json')
    return {
      isValid: false,
      errorMessage: 'Invalid file format',
      fileName: file.name,
    }

  try {
    JSON.parse(content)
    return {
      isValid: true,
      fileName: file.name,
    }
  } catch (error) {
    let errorMessage: string

    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = 'An unexpected error occurred.'
    }

    return {
      isValid: false,
      errorMessage,
      fileName: file.name,
    }
  }
}

const FileValidationUtils = {
  isValidJsonFile,
}

export default FileValidationUtils
