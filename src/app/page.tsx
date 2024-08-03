import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <div className='flex items-center gap-x-3'>
        <Button size='lg'>রক্ত চাই</Button>
        <Button variant='secondary' size='lg'>
          রক্ত দিতে চাই
        </Button>
      </div>
    </main>
  )
}
