import type {LDClient} from "launchdarkly-node-server-sdk"
import type {UserContext} from "~/features/common"

import {init} from "launchdarkly-node-server-sdk"

declare global {
    // eslint-disable-next-line no-var
    var __ld_server_client: LDClient | undefined
}

const client: LDClient = global.__ld_server_client || init("<your-server-sdk-key-here>")

if (process.env.NODE_ENV !== "production") {
    // When running in development mode, we do not want to reconnect to LD with every change.
    // So we store the connected client in a global far and reuse it.
    global.__ld_server_client = client
}

type GetVariation = <T>(key: string, userContext: UserContext, defaultValue: T) => Promise<T>
const getVariation: GetVariation = async <T>(key: string, userContext: UserContext, defaultValue: T) => {
    const user = {
        key: userContext.key,
        custom: {
            ...userContext
        }
    }
    await client.waitForInitialization()
    return client.variation(key, user, defaultValue)
}

export {getVariation}