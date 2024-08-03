'use client'

import SelectDistrict from '@/components/common/select-district'
import SelectUpozilla from '@/components/common/select-upozilla'
import { Button } from '@/components/ui/button'
import Form from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Typography from '@/components/ui/typography'
import districtUpozzilaData from '@/data/district_upozilla.json'
import axios from 'axios'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export const bloodGroups = [
  { label: 'A+', value: 'a-plus' },
  { label: 'A-', value: 'a-minus' },
  { label: 'B+', value: 'b-plus' },
  { label: 'B-', value: 'b-minus' },
  { label: 'AB+', value: 'ab-plus' },
  { label: 'AB-', value: 'ab-minus' },
  { label: 'O+', value: 'o-plus' },
  { label: 'O-', value: 'o-minus' },
]

export default function Donate() {
  const { push } = useRouter()
  const methods = useForm()
  const { handleSubmit } = methods

  const [bloodGroup, setbloodGroup] = useState<string | undefined>(undefined)
  const [district, setdistrict] = useState<string | undefined>(undefined)
  const [upozilla, setupozilla] = useState<string | undefined>(undefined)

  const [isLoading, setisLoading] = useState(false)

  const onSubmit = async (data: any) => {
    if (!bloodGroup) return toast.error('রক্তের গ্রুপ নির্বাচন করুন')
    if (!district) return toast.error('জেলা নির্বাচন করুন')
    if (!upozilla) return toast.error('উপজেলা নির্বাচন করুন')

    const allData = { ...data, blood_group: bloodGroup, district, upozilla }

    console.log({ ...data, blood_group: bloodGroup, district, upozilla })

    try {
      setisLoading(true)
      const response = await axios.post('/api/donation', allData)

      if (response.status === 200) {
        toast.success('আপনার সহযোগিতার জন্য অসংখ্য ধন্যবাদ!')
        push('/')
      }
      setisLoading(false)
    } catch (error) {
      setisLoading(false)
      console.error(error)
      toast.error('আবার চেষ্টা করুন!')
    }
  }

  return (
    <div className='container py-10'>
      <div className='flex items-center gap-x-3 mb-8'>
        <Link href='/'>
          <Button variant='outline'>
            <ArrowLeftIcon className='size-5' />
          </Button>
        </Link>
        <Typography variant='h2'>রক্ত দান করুন</Typography>
      </div>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='name'
          label='আপনার নাম'
          placeholder='আপনার নাম (ছদ্মনাম ব্যবহার করুন)'
          required
          className='max-w-sm'
        />
        <Input
          name='contact_number'
          label='আপনার মোবাইল নাম্বার'
          placeholder='017XXXXXXXX'
          required
          className='max-w-sm'
        />
        <Input
          name='secondary_contact_number'
          label='আপনার দ্বিতীয় মোবাইল নাম্বার'
          placeholder='017XXXXXXXX (যদি থাকে)'
          className='max-w-sm'
        />
        <div className='space-y-1 mb-5'>
          <Label>রক্তের গ্রুপ*</Label>
          <Select value={bloodGroup} onValueChange={setbloodGroup}>
            <SelectTrigger className='max-w-sm'>
              <SelectValue placeholder='রক্তের গ্রুপ' />
            </SelectTrigger>
            <SelectContent>
              {bloodGroups.map(group => (
                <SelectItem key={group.value} value={group.value}>
                  {group.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <SelectDistrict district={district} setdistrict={setdistrict} />
        <SelectUpozilla
          data={districtUpozzilaData.find(dist => dist.district_name === district)?.upozilla || []}
          upozilla={upozilla}
          setupozilla={setupozilla}
        />
        <Textarea name='address' label='ঠিকানা' placeholder='ঠিকানা (অপশনাল)' className='max-w-sm' />
        <Button type='submit' variant='secondary' isLoading={isLoading}>
          তথ্য জমা দিন
        </Button>
      </Form>
    </div>
  )
}
