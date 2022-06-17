import type {FunctionComponent} from "react"
import type {LoaderFunction} from "@remix-run/node"

import {CardContent} from "@mui/material"
import {useLoaderData} from "@remix-run/react"
import {CardView, useVariation} from "~/components/common"
import {Home} from "~/components/home"
import {getUserContext} from "~/utils/cookies.server"
import {getVariation} from "~/utils/launchdarkly.server"

const title = "Welcome to the Todos Application"
const subtitle = "A progressive delivery demonstration using the LaunchDarkly client and server SDKs with Remix."

type LoaderData = {
    features: {
        todosEnabled: boolean,
        notesEnabled: boolean,
        usersEnabled: boolean,
    },
}

const loader: LoaderFunction = async ({request}) => {
    const userContext = await getUserContext(request)
    const loaderData: LoaderData = {
        features: {
            todosEnabled: await getVariation("todos", userContext, false),
            notesEnabled: await getVariation("notes", userContext, false),
            usersEnabled: await getVariation("users", userContext, false),
        },
    }
    return loaderData
}

type PageContentProps = {loaderData: LoaderData}
const PageContent: FunctionComponent<PageContentProps> = ({loaderData}) => {
    const todosEnabled = useVariation("todos", loaderData.features.todosEnabled)
    const notesEnabled = useVariation("notes", loaderData.features.notesEnabled)
    const usersEnabled = useVariation("users", loaderData.features.usersEnabled)
    return <CardView title={title} subtitle={subtitle}>
        <CardContent>
            <Home todosEnabled={todosEnabled} notesEnabled={notesEnabled} usersEnabled={usersEnabled}/>
        </CardContent>
    </CardView>
}

const Page: FunctionComponent = () => {
    const loaderData = useLoaderData<LoaderData>()
    return <PageContent loaderData={loaderData}/>
}

export {Page, loader}
export default Page