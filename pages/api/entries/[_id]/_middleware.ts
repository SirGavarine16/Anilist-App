import { NextFetchEvent,NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest, ev: NextFetchEvent) => {
    const _id = req.page.params?._id || '';
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    if (!checkMongoIDRegExp.test(_id as string)) {
        const response = JSON.stringify({
            message: 'Entry ID is not valid.'
        })
        return new Response(response, {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
    return NextResponse.next();
}