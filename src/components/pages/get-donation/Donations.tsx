import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { IDonation } from '@/models/donation'
import { CopyIcon } from 'lucide-react'
import toast from 'react-hot-toast'

export type DonationType = IDonation & { _id: string }

interface Props {
  data: DonationType[]
  isLoading: boolean
}

function formatBloodGroup(bloodGroup: string) {
  const [group, sign] = bloodGroup.split('-')
  const formattedGroup = group.toUpperCase()
  const formattedSign = sign === 'positive' ? '+' : '-'
  return `${formattedGroup}${formattedSign}`
}

function B({ children }: { children: string }) {
  return <span className='font-semibold'>{children}</span>
}

function CopyText({ text }: { text: string }) {
  return (
    <CopyIcon
      onClick={() => {
        navigator.clipboard.writeText(text)
        toast.success('ক্লিপবোর্ডে কপি করা হয়েছে!')
      }}
      className='size-4 text-muted-foreground cursor-pointer inline-block ml-2'>
      {text}
    </CopyIcon>
  )
}

export default function Donations({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className='grid grid-cols-4 gap-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className='w-full h-48' />
        ))}
      </div>
    )
  }

  return (
    <div className='grid grid-cols-4 gap-4 mt-10'>
      {data?.map(d => (
        <div key={d?._id} className='p-3 rounded-lg shadow-lg border text-sm space-y-1'>
          <div className='flex items-center justify-between gap-x-3'>
            <Typography variant='h5'>{d?.name}</Typography>
            <Typography variant='h3' className='text-primary'>
              {formatBloodGroup(d?.blood_group)}
            </Typography>
          </div>
          <p>
            <B>Contact:</B> <span className='text-sky-600'>{d?.contact_number}</span>{' '}
            <CopyText text={d?.contact_number} />
          </p>
          {d?.secondary_contact_number && (
            <p>
              <span className='text-sky-600'>{d?.secondary_contact_number}</span>
              <CopyText text={d?.secondary_contact_number} />
            </p>
          )}
          {d?.address && (
            <p>
              <B>Address:</B> {d?.address}
            </p>
          )}
          <p className='font-semibold'>
            {d?.upozilla}, {d.district}
          </p>
        </div>
      ))}
    </div>
  )
}
