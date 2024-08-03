'use client'

import districtUpozzilaData from '@/data/district_upozilla.json'
import { Search } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export interface District {
  district_name: string
  upozilla: Array<string>
}

interface Props {
  district: string | undefined
  setdistrict: Dispatch<SetStateAction<string | undefined>>
}

export default function SelectDistrict({ district, setdistrict }: Props) {
  const [filter, setFilter] = useState('')
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>(districtUpozzilaData)

  useEffect(() => {
    const lowercasedFilter = filter.toLowerCase()
    const filteredData = districtUpozzilaData.filter(dist =>
      dist.district_name.toLowerCase().includes(lowercasedFilter)
    )
    setFilteredDistricts(filteredData)
  }, [filter])

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
            value={filter}
            onChange={e => setFilter(e.target.value)}
            onKeyDown={e => e.stopPropagation()}
            onFocus={e => e.stopPropagation()}
          />
          {filteredDistricts.map(dist => (
            <SelectItem key={dist.district_name} value={dist.district_name}>
              {dist.district_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
