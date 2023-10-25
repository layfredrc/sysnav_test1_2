import { FileInput } from 'models'
import style from './list.module.css'
import { CheckIcon } from 'assets/icons'
import { CloseIcon } from 'assets/icons'
import { useState } from 'react'
interface ListPropsTypes {
  filesInput: FileInput[]
  handleRemoveFileInput: (name: string) => void
  setCurrentTrajectory: (file: FileInput) => void
}

export default function List({
  filesInput,
  handleRemoveFileInput,
  setCurrentTrajectory,
}: ListPropsTypes): JSX.Element {
  const [clickedItem, setClickedItem] = useState<string | null>(null)

  const handleSelectCurrentTrajectory = (name: string): void => {
    setClickedItem(name)
    setCurrentTrajectory(filesInput.find((file) => file.name === name)!)
  }

  return (
    <div className={style.main}>
      {filesInput.map((file) => (
        <div key={file.name} className={style.item}>
          <div
            className={`${style.left} ${
              file.name === clickedItem && style.selected
            }`}
            onClick={() => handleSelectCurrentTrajectory(file.name)}
          >
            <div className={style.circle}>
              <CheckIcon className={style.check} />
            </div>

            <p>{file.name}</p>
          </div>

          <CloseIcon onClick={() => handleRemoveFileInput(file.name)} />
        </div>
      ))}
    </div>
  )
}
