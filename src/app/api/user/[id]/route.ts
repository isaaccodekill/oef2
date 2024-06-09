// GET /api/users/:id
import { userService } from '@/services/service.user';
import applyMiddleware from '@/lib/middleware/appylyMiddleware';
import withAuth from '@/lib/middleware/withAuth';
import { NextRequest, NextResponse } from 'next/server';


const schema = {

}

export const GET = applyMiddleware([
    withAuth
], async function (req: NextRequest, { params }) {
    try {
        // extract id from params
        let id = params.id;
        let selectedUser;
        if (id) {
            const user = await userService.getUserById(id);
            if (!user) {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }
        } else {
            selectedUser = await userService.getAllUsers();
        }

        return NextResponse.json(selectedUser, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
})