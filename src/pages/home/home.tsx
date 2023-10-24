import { Card } from 'components'
import { FilePicker } from 'views'

import style from './home.module.css'
import { useState } from 'react'
import { FileInput } from 'models'
import MapsView from 'components/maps/mapsView'

export const Home = (): JSX.Element => {
  const [currentTrajectory, setCurrentTrajectory] = useState<FileInput | null>(
    null,
  )

  return (
    <div className={style.main}>
      <div className={style.side}>
        <FilePicker setCurrentTrajectory={setCurrentTrajectory} />
      </div>
      <Card>
        <MapsView currentTrajectory={currentTrajectory} />
      </Card>
    </div>
  )
}
