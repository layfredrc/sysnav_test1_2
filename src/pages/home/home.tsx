import { Card } from 'components'
import { FilePicker } from 'views'

import style from './home.module.css'

export const Home = (): JSX.Element => {
  return (
    <div className={style.main}>
      <div className={style.side}>
        <FilePicker />
      </div>
      <Card>MAP VIEW GOES HERE</Card>
    </div>
  )
}
