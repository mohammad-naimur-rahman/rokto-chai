import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <div className='flex items-center gap-x-3'>
        <Link href='/get-donation'>
          <Button size='lg'>রক্ত চাই</Button>
        </Link>
        <Link href='/donate'>
          <Button variant='secondary' size='lg'>
            রক্ত দিতে চাই
          </Button>
        </Link>
      </div>
    </main>
  )
}
