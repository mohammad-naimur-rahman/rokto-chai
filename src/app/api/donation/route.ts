import dbConnect from '@/db/dbConnect'
import { Donation } from '@/models/donation'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const blood_group = searchParams.get('blood_group')
  const district = searchParams.get('district')
  const upozilla = searchParams.get('upozilla')

  console.log(blood_group, district, upozilla)

  if (!blood_group || !district || !upozilla) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
  }

  console.log(blood_group, district, upozilla)
  await dbConnect()

  const donations = await Donation.find({
    blood_group,
    district,
    upozilla,
  })
  return NextResponse.json({ data: donations, message: 'Donations found successfully' })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  await dbConnect()
  const newDonation = await Donation.create(body)

  if (!newDonation) {
    return NextResponse.json({ message: 'Donation failed to create' })
  }

  return NextResponse.json({ data: newDonation, message: 'Donation created successfully' })
}
