import {hydrateRoot} from "react-dom/client"
import {RemixBrowser} from "@remix-run/react"
import {getUserContext} from "~/utils/cookies.client"
import {withLDProvider} from "~/utils/launchdarkly.client"

const userContext = getUserContext() || { anonymous: true }
const Application = withLDProvider(userContext)(RemixBrowser)
hydrateRoot(document, <Application/>)