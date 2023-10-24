import { Card } from 'components'
import { FilePicker } from 'views'

import style from './home.module.css'
import { useState } from 'react'
import { FileInput } from 'models'

export const Home = (): JSX.Element => {
  const [currentTrajectory, setCurrentTrajectory] = useState<FileInput | null>(
    null,
  )

  return (
    <div className={style.main}>
      <div className={style.side}>
        <FilePicker setCurrentTrajectory={setCurrentTrajectory} />
      </div>
      <Card>MAP VIEW GOES HERE</Card>
    </div>
  )
}
