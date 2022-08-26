import { forwardRef, InputHTMLAttributes } from 'react'

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {}

export type Ref = HTMLInputElement

const InputNumber = forwardRef<Ref, InputTextProps>(({ className, ...props }, ref) => {
  return (
    <input
      type="number"
      ref={ref}
      className={
        `border border-neutral-900 py-1 px-3 text-center text-base focus:rounded-none focus:border focus:border-blue-500 focus:outline-none disabled:border-neutral-400 disabled:bg-gray-200 disabled:text-gray-500` +
        ` ${className}`
      }
      {...props}
    />
  )
})

InputNumber.displayName = 'InputNumber'

export default InputNumber
