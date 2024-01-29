import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const POST = async ( req ) => {
    const { name, prompt, photo } = await req.json()
    try {
        await connectToDB()

        const newPost = await Post.create({
            name, prompt, photo
        })
        return new Response (JSON.stringify(newPost), {status: 201})
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}