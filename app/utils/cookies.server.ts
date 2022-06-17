import type {UserContext} from "~/features/common"

import {createCookie} from "@remix-run/node"

const userContextCookie = createCookie("userContext", {
    maxAge: 604_800,
})

type GetUserContext = (request: Request) => Promise<UserContext>
const getUserContext: GetUserContext = async (request) => {
    const cookieHeader = request.headers.get("Cookie")
    return await userContextCookie.parse(cookieHeader)
}

type SetUserContext = (userContext: UserContext, headers: Headers) => Promise<void>
const setUserContext: SetUserContext = async (userContext, headers) => {
    headers.set("Set-Cookie", await userContextCookie.serialize(userContext))
}

export {getUserContext, setUserContext}