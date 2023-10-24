import { FolderIcon } from 'assets/icons'
import { Button, Card } from 'components'
import TrajectoriesDropzone from 'components/dropzone/trajectoriesDropzone'
import List from 'components/list/list'
import { FileInput } from 'models'
import { useEffect, useState } from 'react'
import { useFilePicker } from 'use-file-picker'
import { FileValidator } from '@types'
import ErrorList from 'components/errorList/errorList'

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

export const FilePicker = (): JSX.Element => {
  const [fileErrors, setFileErrors] = useState<FileValidator[]>([])
  const [filesInput, setFilesInput] = useState<FileInput[]>([])
  const [currentTrajectory, setCurrentTrajectory] = useState<FileInput | null>(
    null,
  )
  const { openFilePicker } = useFilePicker({
    accept: '.json',
    multiple: true,
    onFilesSelected: ({ filesContent }) => {
      const validationResults = filesContent.map((file: FileInput) =>
        isValidJsonFile(file, file.content as string),
      )

      const validFiles = filesContent.filter(
        (file: FileInput, index: string | number) =>
          validationResults[index].isValid,
      )

      setFileErrors((prevErrors) => [
        ...prevErrors,
        ...validationResults.filter((res: FileValidator) => !res.isValid),
      ])

      setFilesInput((prevFiles: FileInput[]) => {
        const newFiles = validFiles.filter(
          (file: FileInput) =>
            !prevFiles.some((existingFile) => existingFile.name === file.name),
        )
        return [...prevFiles, ...newFiles]
      })
    },
  })

  const handleSetCurrentTrajectory = (file: FileInput): void => {
    setCurrentTrajectory(file)
  }

  const handleRemoveFileInput = (name: string): void => {
    setFilesInput(filesInput.filter((file) => file.name !== name))
  }

  return (
    <>
      <Button onClick={openFilePicker}>
        <FolderIcon />
        Open trajectories
      </Button>

      {filesInput.length <= 0 ? (
        <TrajectoriesDropzone handleSetFilesInput={setFilesInput} />
      ) : (
        <Card>
          <List
            filesInput={filesInput}
            handleRemoveFileInput={handleRemoveFileInput}
            handleSetCurrentTrajectory={handleSetCurrentTrajectory}
          />
        </Card>
      )}

      {fileErrors.length > 0 && filesInput.length > 0 && (
        <ErrorList fileErrors={fileErrors} />
      )}
    </>
  )
}
