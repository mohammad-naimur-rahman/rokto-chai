import { cn } from '@/lib/utils'
import { ElementType, forwardRef, ReactNode } from 'react'

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-small' | 'small'

interface Props {
  variant: Variant
  children: ReactNode
  className?: string
  as?: ElementType
}

const tags: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  'body-small': 'p',
  small: 'span',
}

const sizes: Record<Variant, string> = {
  h1: 'font-semibold text-3xl lg:text-4xl xl:text-5xl',
  h2: 'font-semibold text-2xl lg:text-3xl xl:text-4xl',
  h3: 'font-semibold text-xl lg:text-2xl xl:text-3xl',
  h4: 'font-semibold text-xl sm:text-2xl',
  h5: 'font-semibold text-lg sm:text-xl',
  h6: 'font-semibold',
  body: 'text-lg sm:text-md',
  'body-small': 'text-md sm:text-sm',
  small: 'text-sm sm:text-xs',
}

const Typography = forwardRef<HTMLElement, Props>(({ variant, children, className, as, ...rest }, ref) => {
  const sizeClasses = sizes[variant]
  const Tag = as || tags[variant]

  return (
    <Tag ref={ref} className={cn(sizeClasses, className)} {...rest}>
      {children}
    </Tag>
  )
})

Typography.displayName = 'Typography'

export default Typography
