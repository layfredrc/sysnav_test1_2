import { FolderIcon } from 'assets/icons'
import { Button, Card } from 'components'
import TrajectoriesDropzone from 'components/dropzone/trajectoriesDropzone'
import List from 'components/list/list'
import { FileInput } from 'models'
import { useEffect, useState } from 'react'
import { useFilePicker } from 'use-file-picker'
import { FileValidator } from '@types'
import ErrorList from 'components/errorList/errorList'
import FileValidationUtils from 'utils/FileValidationUtils'

const { isValidJsonFile } = FileValidationUtils

interface FilePickerPropsType {
  setCurrentTrajectory: (file: FileInput) => void
}

export const FilePicker = ({
  setCurrentTrajectory,
}: FilePickerPropsType): JSX.Element => {
  const [fileErrors, setFileErrors] = useState<FileValidator[]>([])
  const [filesInput, setFilesInput] = useState<FileInput[]>([])

  const handleFiles = (filesContent: FileInput[]) => {
    const validationResults = filesContent.map((file: FileInput) =>
      isValidJsonFile(file, file.content as string),
    )

    const validFiles = filesContent.filter(
      (file: FileInput, index: number) => validationResults[index].isValid,
    )

    setFileErrors((prevErrors) => {
      const filteredErrors = prevErrors.filter(
        (error) => !filesContent.some((file) => file.name === error.fileName),
      )
      return [
        ...filteredErrors,
        ...validationResults.filter((res: FileValidator) => !res.isValid),
      ]
    })

    setFilesInput((prevFiles: FileInput[]) => {
      const newFiles = validFiles.filter(
        (file: FileInput) =>
          !prevFiles.some((existingFile) => existingFile.name === file.name),
      )
      return [...prevFiles, ...newFiles]
    })
  }

  const { openFilePicker } = useFilePicker({
    accept: '.json',
    multiple: true,
    onFilesSelected: ({ filesContent }) => handleFiles(filesContent),
  })

  const handleRemoveFileInput = (name: string): void => {
    setFilesInput(filesInput.filter((file) => file.name !== name))
  }

  useEffect(() => {
    if (filesInput.length === 0) {
      setFileErrors([])
    }
  }, [filesInput])

  return (
    <>
      <Button onClick={openFilePicker}>
        <FolderIcon />
        Open trajectories
      </Button>

      {filesInput.length <= 0 ? (
        <TrajectoriesDropzone handleFiles={handleFiles} />
      ) : (
        <Card>
          <List
            filesInput={filesInput}
            handleRemoveFileInput={handleRemoveFileInput}
            setCurrentTrajectory={setCurrentTrajectory}
          />
        </Card>
      )}

      {fileErrors.length > 0 && filesInput.length > 0 && (
        <ErrorList fileErrors={fileErrors} />
      )}
    </>
  )
}
