import style from './card.module.css'

export const Card = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  return <div className={style.main}>{children}</div>
}
