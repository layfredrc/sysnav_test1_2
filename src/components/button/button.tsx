import style from './button.module.css'

export const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: (event: React.MouseEvent) => void
}): JSX.Element => {
  return (
    <button role='button' onClick={onClick} className={style.main}>
      {children}
    </button>
  )
}
