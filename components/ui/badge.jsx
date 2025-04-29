'use client'

export function Badge({
  variant = 'outline',
  className = '',
  children,
  ...props
}) {
  const baseStyles = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium cursor-default'

  const variantStyles = {
    outline: 'border border-gray-200 bg-white text-gray-800',
    available: 'border border-green-200 bg-green-50 text-green-800',
    reserved: 'border border-orange-200 bg-orange-50 text-orange-800',
    rented: 'border border-blue-200 bg-blue-50 text-blue-800',
    sold: 'border border-purple-200 bg-purple-50 text-purple-800',
    apartment: 'border border-sky-200 bg-sky-50 text-sky-800',
    house: 'border border-amber-200 bg-amber-50 text-amber-800',
    commercial: 'border border-indigo-200 bg-indigo-50 text-indigo-800'
  }

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}