// fetch trees
import applyMiddleware from '@/lib/middleware/appylyMiddleware'
import withAuth from '@/lib/middleware/withAuth'
import { NextResponse } from 'next/server'
import { treeService } from '@/services/service.tree'
import { getAuthenticatedUser } from '@/lib/utils/auth'
import withRequestBody, { IWithRequestBody } from '@/lib/middleware/withRequestBody'
import { z } from 'zod'



export const GET = applyMiddleware(
    [withAuth],
    async function (req, { params }) {
        try {
            const user = await getAuthenticatedUser()
            if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
            const trees = await treeService.getAllTreesForUser(user?.id)
            return NextResponse.json(trees, { status: 200 })
        } catch (error) {
            console.error("Error fetching trees:", error)
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
        }
    }
)

// create tree
const schema = z.object({
    tree: z.object({
        name: z.string(),
        species: z.string(),
        height: z.number(),
        trunkCircumference: z.number(),
        yearPlanted: z.string(),
        addressId: z.string(),
    }),
    addressId: z.string(),

})
type CreateTreeParams = IWithRequestBody<z.infer<typeof schema>>

export const POST = applyMiddleware<CreateTreeParams>(
    [withAuth, withRequestBody(schema)],
    async function (req, { params }) {
        try {
            const user = await getAuthenticatedUser()
            if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
            const treeData = params.body.tree
            const addressId = params.body.addressId
            const tree = await treeService.createTree({
                ...treeData,
                userId: user.id,
                addressId
            })
            return NextResponse.json(tree, { status: 201 })
        } catch (error) {
            console.error("Error creating tree:", error)
            return NextResponse.json({ message: "Bad Request" }, { status: 400 })
        }
    }
)


