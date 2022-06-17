import type {HandleDocumentRequestFunction} from "@remix-run/node"

import {renderToString} from "react-dom/server"
import {RemixServer} from "@remix-run/react"
import {withContext} from "~/utils/context.server"

const handleRequest: HandleDocumentRequestFunction = async (request, status, headers, context) => {
    return withContext(request, headers, () => {
        headers.set("Content-Type", "text/html")
        const application = <RemixServer context={context} url={request.url}/>
        const body = "<!DOCTYPE html>" + renderToString(application)
        return new Response(body, {status, headers})
    })
}

export default handleRequest