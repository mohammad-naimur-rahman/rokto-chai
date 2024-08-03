'use client'

import Form from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'
import { useForm } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import districtUpozzilaData from '@/data/district_upozilla.json'
import { useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
//import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AutoComplete, type Option } from '@/components/ui/autocomplete'
import SelectDistrict from '@/components/common/select-district'
import SelectUpozilla from '@/components/common/select-upozilla'

export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function Donate() {
  const methods = useForm()
  const { register, handleSubmit } = methods

  const [district, setdistrict] = useState<string | undefined>(undefined)
  const [upozilla, setupozilla] = useState<string | undefined>(undefined)

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className='container py-10'>
      <Typography variant='h2'>রক্ত দান করুন</Typography>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='name'
          label='আপনার নাম'
          placeholder='আপনার নাম (ছদ্মনাম ব্যবহার করুন)'
          required
          className='max-w-sm'
        />
        <Select {...register('group')}>
          <SelectTrigger className='max-w-sm'>
            <SelectValue placeholder='Group' />
          </SelectTrigger>
          <SelectContent>
            {bloodGroups.map(group => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <SelectDistrict district={district} setdistrict={setdistrict} />
        <SelectUpozilla
          data={districtUpozzilaData.find(dist => dist.district_name === district)?.upozilla || []}
          upozilla={upozilla}
          setupozilla={setupozilla}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}
