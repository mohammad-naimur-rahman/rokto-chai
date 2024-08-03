'use client'

import { Search } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface Props {
  data: Array<string>
  upozilla: string | undefined
  setupozilla: Dispatch<SetStateAction<string | undefined>>
}

export default function SelectUpozilla({ data, upozilla, setupozilla }: Props) {
  const [filter, setFilter] = useState('')
  const [filteredUpozillas, setFilteredUpozillas] = useState<Array<string>>([])

  useEffect(() => {
    const lowercasedFilter = filter.toLowerCase()
    const filteredData = (data && data?.filter(u => u.toLowerCase().includes(lowercasedFilter))) || []
    setFilteredUpozillas(filteredData)
  }, [filter, upozilla, data])

  return (
    <div className='space-y-1 mb-5'>
      <Label>উপজেলা*</Label>
      <Select value={upozilla} onValueChange={setupozilla} disabled={!data.length}>
        <SelectTrigger className='max-w-sm'>
          <SelectValue placeholder='উপজেলা' />
        </SelectTrigger>
        <SelectContent className='relative pt-10'>
          <Input
            icon={<Search className='size-4' />}
            containerClassName='fixed top-0 left-0 w-full'
            placeholder='উপজেলা খুঁজুন'
            value={filter}
            onChange={e => setFilter(e.target.value)}
            onKeyDown={e => e.stopPropagation()}
            onFocus={e => e.stopPropagation()}
          />
          {filteredUpozillas.map(upozilla => (
            <SelectItem key={upozilla} value={upozilla}>
              {upozilla}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
