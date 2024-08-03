import bloodTypeImg from '@/assets/images/blood-type.jpeg'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='container flex flex-col md:flex-row min-h-screen items-center justify-center md:justify-between space-y-12 space-x-10 py-20 md:py-5'>
      <div className='w-full md:w-1/2 flex flex-col space-y-5 items-center justify-center min-h-[50vh] md:min-h-[auto'>
        <Typography variant='h2' className='text-center text-balance'>
          রক্ত দিন, জীবন বাঁচান
        </Typography>
        <p className='text-muted-foreground text-balance text-center mb-3'>
          আপনার প্রয়োজন অনুযায়ী রক্তদাতা খুঁজুন এবং জরুরি অবস্থায় জীবন রক্ষা করুন। আমাদের প্ল্যাটফর্মে সহজেই
          রক্তদাতাদের সাথে সংযোগ স্থাপন করুন।
        </p>
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
      </div>
      <div className='w-full md:w-1/2 flex flex-col items-center justify-center gap-y-2 m-0'>
        <Image src={bloodTypeImg} alt='blood type' width={500} height={500} />
        <p className='text-center text-sm italic text-gray-500'>Collected image</p>
      </div>
    </main>
  )
}
