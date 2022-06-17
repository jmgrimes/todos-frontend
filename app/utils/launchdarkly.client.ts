import type {ComponentType} from "react"
import type {UserContext} from "~/features/common"

import {basicLogger} from "launchdarkly-js-client-sdk"
import {withLDProvider} from "launchdarkly-react-client-sdk"

type WithLDProviderWrapper = (userContext: UserContext) => ((WrappedComponent: ComponentType) => ComponentType)
const withLDProviderWrapper: WithLDProviderWrapper = (userContext) => withLDProvider({
    clientSideID: "<your-client-sdk-key-here>",
    user: {
        key: userContext.key,
        custom: {
            ...userContext
        }
    },
    options: {
        logger: basicLogger(),
        sendEventsOnlyForVariation: true,
    },
})

export {
    withLDProviderWrapper as withLDProvider,
}