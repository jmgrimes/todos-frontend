import type {FunctionComponent} from "react"
import type {LoaderFunction} from "@remix-run/node"
import type {User, UserContext} from "~/features/users"

import {CardContent} from "@mui/material"
import {useLoaderData} from "@remix-run/react"
import {CardView, ErrorView, useVariation} from "~/components/common"
import {UserList} from "~/components/users"
import {getUserContext} from "~/utils/cookies.server"
import {getVariation} from "~/utils/launchdarkly.server"

const disabledTitle = "Users Features are Disabled"
const disabledSubtitle = 
    "The Users Features of the application are currently disabled.  Please return to the homepage " + 
    "or select another section to continue using this application."

const title = "Users Features are Ready"
const subtitle = "Users Features have been successfully loaded into the application and are enabled."

type GetUsers = (userContext: UserContext) => Promise<User[]>
const getUsers: GetUsers = async (userContext) => {
    const defaultUsersApi = "http://localhost:3001/users"
    return await getVariation<string>("users-api", userContext, defaultUsersApi)
        .then(usersApi => fetch(usersApi))
        .then(response => {
            if (!response.ok) {
                throw new Error("There was a problem fetching data from the users resources endpoint.")
            }
            return response.json()
        })
}

type LoaderData = {
    features: {
        usersEnabled: boolean,
    },
    data: {
        users: User[],
    },
}

const loader: LoaderFunction = async ({request}) => {
    const userContext = await getUserContext(request)
    const usersEnabled = await getVariation("users", userContext, false)
    const loaderData: LoaderData = {
        features: {
            usersEnabled,
        },
        data: {
            users: usersEnabled ? await getUsers(userContext) : []
        },
    }
    return loaderData
}

type PageContentProps = {loaderData: LoaderData}
const PageContent: FunctionComponent<PageContentProps> = ({loaderData}) => {
    const usersEnabled = useVariation("users", loaderData.features.usersEnabled)
    if (!usersEnabled) {
        return <CardView title={disabledTitle} subtitle={disabledSubtitle}/>
    }
    return <CardView title={title} subtitle={subtitle}>
        <CardContent>
            <UserList users={loaderData.data.users}/>
        </CardContent>
    </CardView>
}

const Page: FunctionComponent = () => {
    const loaderData = useLoaderData<LoaderData>()
    return <PageContent loaderData={loaderData}/>
}

export {Page, ErrorView as ErrorBoundary, loader}
export default Page