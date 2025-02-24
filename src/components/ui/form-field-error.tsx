import { formatFieldName } from '@/utils/form/formatFieldName'
import React from 'react'
import { FieldErrors, FieldValues } from 'react-hook-form'

interface Props {
  required?: boolean
  name?: string
  errors: FieldErrors<FieldValues>
  label?: string
}

export default function FormFieldError({ required, name, errors, label }: Props) {
  return (
    <>
      {required && name ? (
        <div className='flex justify-start'>
          {errors[name] && errors[name]?.type === 'required' ? (
            <span className='text-red-500 text-xs h-5 leading-none !text-left'>
              {label || formatFieldName(name)} is required
            </span>
          ) : (
            <div className='w-full h-5' />
          )}
        </div>
      ) : (
        <div className='w-full h-5' />
      )}
    </>
  )
}
