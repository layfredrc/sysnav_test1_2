import { FolderIcon } from 'assets/icons'
import { Button } from 'components'
import { FileInput } from 'models'
import { useEffect } from 'react'
import { useFilePicker } from 'use-file-picker'

export const FilePicker = ({
  onFilesInput,
}: {
  onFilesInput: (files: FileInput[]) => void
}): JSX.Element => {
  const { openFilePicker, filesContent } = useFilePicker({
    accept: '.json',
  })

  useEffect(() => {
    onFilesInput(filesContent)
  }, [filesContent])

  return (
    <Button onClick={openFilePicker}>
      <FolderIcon />
      Open trajectories
    </Button>
  )
}
