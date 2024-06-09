import applyMiddleware from '@/lib/middleware/appylyMiddleware'
import withRequestBody from '@/lib/middleware/withRequestBody'
import { createClientServer } from '@/lib/utils/supabase/server'
import { userService } from '@/services/service.user'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { cookies } from 'next/headers';


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const POST = applyMiddleware([
    withRequestBody(loginSchema)
], async (request: NextRequest, { body }: { body: z.infer<typeof loginSchema> }) => {
    const client = createClientServer()

    const { error, data: session } = await client.auth.signInWithPassword({
        email: body.email,
        password: body.password
    })

    // get user data
    const user = userService.getUserByEmail(body.email)

    if (error) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }

    const response = NextResponse.json(user, { status: 200 })

    return response
})