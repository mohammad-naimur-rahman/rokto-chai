'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '../ui/button'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { bloodGroups } from '@/app/donate/Donate'
import { Input } from '../ui/input'
import districtUpozzilaData from '@/data/district_upozilla.json'
import { Label } from '../ui/label'

interface Props {
  data: Array<string>
  upozilla: string | undefined
  setupozilla: Dispatch<SetStateAction<string | undefined>>
}

export default function SelectUpozilla({ data, upozilla, setupozilla }: Props) {
  return (
    <div className='space-y-1 mb-5'>
      <Label>উপজেলা*</Label>
      <Select value={upozilla} onValueChange={setupozilla} disabled={!data}>
        <SelectTrigger className='max-w-sm'>
          <SelectValue placeholder='উপজেলা' />
        </SelectTrigger>
        <SelectContent className='relative pt-10'>
          <Input
            icon={<Search className='size-4' />}
            containerClassName='fixed top-0 left-0 w-full'
            placeholder='উপজেলা খুঁজুন'
          />
          {data.map(upozilla => (
            <SelectItem key={upozilla} value={upozilla}>
              {upozilla}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}