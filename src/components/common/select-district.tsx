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

export interface District {
  district_name: string
  upozilla: Array<string>
}

interface Props {
  district: string | undefined
  setdistrict: Dispatch<SetStateAction<string | undefined>>
}

export default function SelectDistrict({ district, setdistrict }: Props) {
  return (
    <div className='space-y-1 mb-5'>
      <Label>জেলা*</Label>
      <Select value={district} onValueChange={setdistrict}>
        <SelectTrigger className='max-w-sm'>
          <SelectValue placeholder='জেলা' />
        </SelectTrigger>
        <SelectContent className='relative pt-10'>
          <Input
            icon={<Search className='size-4' />}
            containerClassName='fixed top-0 left-0 w-full'
            placeholder='জেলা খুঁজুন'
          />
          {districtUpozzilaData.map(dist => (
            <SelectItem key={dist.district_name} value={dist.district_name}>
              {dist.district_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
