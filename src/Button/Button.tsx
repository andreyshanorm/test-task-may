import { type ReactNode } from 'react'
import styles from "./Button.module.scss"
type Props = {
    children: ReactNode;
    onClick: () => void
}

export const Button = ({children, onClick}: Props) => {
  return (
    <button onClick={onClick} className={styles["button"]}>{children}</button>
  )
}