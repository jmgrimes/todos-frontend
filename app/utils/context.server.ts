import {UAParser} from "ua-parser-js"
import {v4 as uuidv4} from "uuid"
import {getUserContext, setUserContext} from "~/utils/cookies.server"

type WithContextHandler = () => Response | Promise<Response>
type WithContext = (request: Request, headers: Headers, handler: WithContextHandler) => Promise<Response>
const withContext: WithContext = async (request, headers, handler) => {
    let userContext = await getUserContext(request)
    if (!(userContext && userContext.key)) {
        const userAgent = new UAParser(request.headers.get("user-agent")?.toString())
        userContext = {
            key: uuidv4(),
            browserName: userAgent.getBrowser().name || "",
            browserVersion: userAgent.getBrowser().version || "",
            deviceType: userAgent.getDevice().type || "",
            deviceModel: userAgent.getDevice().model || "",
            deviceVendor: userAgent.getDevice().vendor || "",
            osName: userAgent.getOS().name || "",
            osVersion: userAgent.getOS().version || "",
        }
        headers.set("Location", request.url)
        await setUserContext(userContext, headers)
        return new Response(null,{ status: 302, headers })
    }
    return handler()
}

export {withContext}