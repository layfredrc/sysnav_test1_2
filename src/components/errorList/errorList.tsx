import { FileValidator } from '@types'
import style from './errorList.module.css'

interface ErrorListPropsType {
  fileErrors: FileValidator[]
}

export default function ErrorList({
  fileErrors,
}: ErrorListPropsType): JSX.Element {
  return (
    <div className={style.container}>
      {fileErrors.map((err) => {
        return (
          <div key={err.fileName} className={style.column}>
            <span>{err.fileName}</span>
            <span className={style.error}>{err.errorMessage}</span>
          </div>
        )
      })}
    </div>
  )
}
