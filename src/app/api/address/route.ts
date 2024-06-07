// get addressess for a user

import applyMiddleware from "@/lib/middleware/appylyMiddleware";
import withAuth from "@/lib/middleware/withAuth";
import { getAuthenticatedUser } from "@/lib/utils/auth";
import { addressService } from "@/services/service.address";
import { NextRequest, NextResponse } from "next/server";
import withRequestBody, { IWithRequestBody } from '@/lib/middleware/withRequestBody'
import { z } from 'zod'


export const GET = applyMiddleware<any>([
    withAuth
], async function (req: NextRequest, { params }) {

    try {
        const user = await getAuthenticatedUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        const addresses = await addressService.getAllAddressesForUser(user?.id)
        return NextResponse.json(addresses, { status: 200 })
    } catch (error) {
        console.error("Error fetching addresses:", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
})


// create address
const schema = z.object({
    street: z.string(),
})

type CreateAddressParams = IWithRequestBody<z.infer<typeof schema>>

export const POST = applyMiddleware(
    [withAuth, withRequestBody(schema)],
    async function (req: NextRequest, { params }) {
        try {
            const user = await getAuthenticatedUser()
            if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
            const addressData = params.body
            const address = await addressService.createAddress({
                ...addressData,
                userId: user.id,
            })
            return NextResponse.json(address, { status: 201 })
        } catch (error) {
            console.error("Error creating address:", error)
            return NextResponse.json({ message: "Bad Request" }, { status: 400 })
        }
    }
)