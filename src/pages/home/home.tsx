import { Card } from 'components'
import { FileInput } from 'models'
import { useState } from 'react'
import { FilePicker } from 'views'

import style from './home.module.css'

export const Home = (): JSX.Element => {
  const [filesInput, setFilesInput] = useState<FileInput[]>([])

  return (
    <div className={style.main}>
      <div className={style.side}>
        <FilePicker onFilesInput={setFilesInput} />
        <Card>FILES LIST GOES HERE</Card>
      </div>
      <Card>MAP VIEW GOES HERE</Card>
    </div>
  )
}
