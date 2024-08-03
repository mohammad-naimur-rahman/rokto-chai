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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function Donate() {
  const methods = useForm()
  const { handleSubmit } = methods

  const [bloodGroup, setbloodGroup] = useState<string | undefined>(undefined)
  const [district, setdistrict] = useState<string | undefined>(undefined)
  const [upozilla, setupozilla] = useState<string | undefined>(undefined)

  const onSubmit = (data: any) => {
    if (!bloodGroup) return toast.error('রক্তের গ্রুপ নির্বাচন করুন')
    if (!district) return toast.error('জেলা নির্বাচন করুন')
    if (!upozilla) return toast.error('উপজেলা নির্বাচন করুন')

    console.log({ ...data, bloodGroup, district, upozilla })
  }

  return (
    <div className='container py-10'>
      <Typography variant='h2' className='mb-8'>
        রক্ত দান করুন
      </Typography>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='full_name'
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
                <SelectItem key={group} value={group}>
                  {group}
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
        <Textarea name='name' label='ঠিকানা' placeholder='ঠিকানা (অপশনাল)' className='max-w-sm' />
        <Button type='submit' variant='secondary'>
          তথ্য জমা দিন
        </Button>
      </Form>
    </div>
  )
}
