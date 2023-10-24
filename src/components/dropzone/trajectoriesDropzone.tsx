import Dropzone from 'react-dropzone'
import style from './trajectoriesDropzone.module.css'
import { DropIcon } from 'assets/icons/large'
import { FileInput } from 'models'
import { FileValidator } from '@types'
import FileValidationUtils from 'utils/FileValidationUtils'

const { isValidJsonFile } = FileValidationUtils

interface TrajectoriesDropzonePropsType {
  handleFiles: (filesContent: FileInput[]) => void
}

export default function TrajectoriesDropzone({
  handleFiles,
}: TrajectoriesDropzonePropsType): JSX.Element {
  const onDrop = (acceptedFiles: File[]): void => {
    // Use Promise.all to wait for all files to be read before calling handleSetFilesInput
    const filePromises: Promise<FileInput>[] = acceptedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()

        fileReader.onloadend = (event) => {
          if (event.target && event.target.result) {
            const content = event.target.result as string
            resolve({
              name: file.name,
              content,
            })
          } else {
            reject(new Error('File reading has failed'))
          }
        }

        fileReader.onerror = () => {
          fileReader.abort()
          reject(new Error('File reading was aborted'))
        }

        fileReader.readAsText(file)
      })
    })

    Promise.all(filePromises)
      .then((files) => {
        handleFiles(files)
      })
      .catch((error) => {
        console.error('Error reading files:', error)
      })
  }

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <section>
          <div {...getRootProps()} className={style.main}>
            <input {...getInputProps()} />
            <DropIcon className={style.icon} />
            <p>Drag and drop trajectories</p>
          </div>
        </section>
      )}
    </Dropzone>
  )
}
