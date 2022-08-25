import { FC, InputHTMLAttributes } from 'react'

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputText: FC<InputTextProps> = ({ className, ...props }) => {
  return (
    <input
      type="text"
      className={
        `rounded-md border border-neutral-900 py-2 px-4 text-base disabled:border-neutral-400 disabled:bg-gray-200 disabled:text-gray-500` +
        ` ${className}`
      }
      {...props}
    />
  )
}

export default InputText
