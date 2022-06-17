import type {UserContext} from "~/features/common"

import Cookie from "js-cookie"

type Optional<T> = T | undefined
type GetUserContext = () => Optional<UserContext>

const getUserContext: GetUserContext = () => {
    const userContextCookie = Cookie.get("userContext")
    if (userContextCookie) {
        const userContext: UserContext = JSON.parse(atob(userContextCookie))
        return userContext
    }
    return undefined
}

export {getUserContext}