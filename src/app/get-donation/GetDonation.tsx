'use client'

import SelectDistrict from '@/components/common/select-district'
import SelectUpozilla from '@/components/common/select-upozilla'
import { Button } from '@/components/ui/button'
import Form from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Typography from '@/components/ui/typography'
import districtUpozzilaData from '@/data/district_upozilla.json'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { bloodGroups } from '../donate/Donate'

export default function GetDonation() {
  const methods = useForm()
  const { handleSubmit } = methods
  const [isLoading, setisLoading] = useState(false)

  const [bloodGroup, setbloodGroup] = useState<string | undefined>(undefined)
  const [district, setdistrict] = useState<string | undefined>(undefined)
  const [upozilla, setupozilla] = useState<string | undefined>(undefined)

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
      <Typography variant='h2' className='mb-8'>
        রক্ত দান করুন
      </Typography>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
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

        <Button type='submit' isLoading={isLoading}>
          রক্ত দানকারী খুঁজুন
        </Button>
      </Form>
    </div>
  )
}
