import withRequestBody, { IWithRequestBody } from '@/lib/middleware/withRequestBody'
import withAuth from '@/lib/middleware/withAuth'
import { NextResponse } from 'next/server'
import { treeService } from '@/services/service.tree'
import { getAuthenticatedUser } from '@/lib/utils/auth'
import { z } from 'zod'
import applyMiddleware from '@/lib/middleware/appylyMiddleware'


// update tree
const updateSchema = z.object({
    name: z.string(),
    species: z.string(),
    height: z.number(),
    trunkCircumference: z.number(),
    yearPlanted: z.string(),
})

type UpdateTreeParams = IWithRequestBody<z.infer<typeof updateSchema>>

export const PUT = applyMiddleware<UpdateTreeParams>(
    [withAuth, withRequestBody(updateSchema)],
    async function (req, { params }) {
        try {
            const user = await getAuthenticatedUser()
            if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
            const treeData = params.body
            const tree = await treeService.updateTree({
                ...treeData,
                id: params.id,
            })
            return NextResponse.json(tree, { status: 200 })
        } catch (error) {
            console.error("Error updating tree:", error)
            return NextResponse.json({ message: "Bad Request" }, { status: 400 })
        }
    }
)


// delete tree

export const DELETE = applyMiddleware<{ id: string }>([
    withAuth,
], async function (req, { params }) {
    try {
        const user = await getAuthenticatedUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        const treeId = params.id
        await treeService.deleteTree(treeId)
        return NextResponse.json({ message: "Tree deleted" }, { status: 200 })
    } catch (error) {
        console.error("Error deleting tree:", error)
        return NextResponse.json({ message: "Bad Request" }, { status: 400 })
    }
})