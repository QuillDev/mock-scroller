import { PropsWithChildren } from "react"

interface ButtonProps extends PropsWithChildren<any> {
    className?: String,
    onClick?: () => void

}
export const Button = ({ children, className = "", onClick = () => {} }: ButtonProps) => {
    return (
        <>
            <button className={`rounded-md p-2 ${className}`} onClick={() => onClick()}>
                {children}
            </button>
        </>
    )
}