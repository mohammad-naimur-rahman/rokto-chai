import dbConnect from '@/db/dbConnect'
import { Donation } from '@/models/donation'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  await dbConnect()
  const newDonation = await Donation.create(body)

  if (!newDonation) {
    return NextResponse.json({ message: 'Donation failed to create' })
  }

  return NextResponse.json({ data: newDonation, message: 'Donation created successfully' })
}
