import { forwardRef, InputHTMLAttributes } from 'react'

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {}

export type Ref = HTMLInputElement

const InputText = forwardRef<Ref, InputTextProps>(({ className, ...props }, ref) => {
  return (
    <input
      type="text"
      ref={ref}
      className={
        `border border-neutral-900 py-1 px-3 text-center text-base focus:rounded-none focus:border focus:border-blue-500 focus:outline-none disabled:border-neutral-400 disabled:bg-gray-200 disabled:text-gray-500` +
        ` ${className}`
      }
      {...props}
    />
  )
})

InputText.displayName = 'InputText'

export default InputText
