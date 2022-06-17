import type {FunctionComponent} from "react"
import type {LoaderFunction, MetaFunction} from "@remix-run/node"

import {Fragment} from "react"
import {CheckBox, Home, Notes, People} from "@mui/icons-material"
import {AppBar, Container, CssBaseline, Tab, Tabs, Toolbar} from "@mui/material"
import {
    Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useLocation
} from "@remix-run/react"
import {useVariation} from "~/components/common"
import {getUserContext} from "~/utils/cookies.server"
import {getVariation} from "~/utils/launchdarkly.server"

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

const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Todos Demo",
    viewport: "width=device-width,initial-scale=1"
})

const Head: FunctionComponent = () =>
    <Fragment>
        <Meta />
        <Links />
        <CssBaseline/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
    </Fragment>

type HeaderProps = {loaderData: LoaderData}
const Header: FunctionComponent<HeaderProps> = ({loaderData}) => {
    const location = useLocation()
    const todosEnabled = useVariation("todos", loaderData.features.todosEnabled)
    const notesEnabled = useVariation("notes", loaderData.features.notesEnabled)
    const usersEnabled = useVariation("users", loaderData.features.usersEnabled)

    const homeTab = <Tab icon={<Home/>} component={Link} label={"Home"} value={"home"} to={"/"}/>
    const todosTab = <Tab icon={<CheckBox/>} component={Link} label={"Todos"} value={"todos"} to={"/todos"}/>
    const notesTab = <Tab icon={<Notes/>} component={Link} label={"Notes"} value={"notes"} to={"/notes"}/>
    const usersTab = <Tab icon={<People/>} component={Link} label={"Users"} value={"users"} to={"/users"}/>

    let selectedTab = location.pathname.split("/").filter(path => path)?.[0] || "home"
    selectedTab = selectedTab === "todos" && !todosEnabled ? "home" : selectedTab
    selectedTab = selectedTab === "notes" && !notesEnabled ? "home" : selectedTab
    selectedTab = selectedTab === "users" && !usersEnabled ? "home" : selectedTab

    return <AppBar position="static" color="transparent" style={{marginBottom: 25}}>
        <Toolbar>
            <Container maxWidth="md">
                <Tabs value={selectedTab}>
                    {homeTab}
                    {todosEnabled && todosTab}
                    {notesEnabled && notesTab}
                    {usersEnabled && usersTab}
                </Tabs>
            </Container>
        </Toolbar>
    </AppBar>
}

const Application: FunctionComponent = () => {
    const loaderData = useLoaderData<LoaderData>()
    return <html lang="en">
        <head>
            <Head/>
        </head>
        <body>
            <Header loaderData={loaderData}/>
            <Container maxWidth={"md"}>
                <Outlet/>
            </Container>
            <ScrollRestoration/>
            <Scripts/>
            <LiveReload/>
        </body>
    </html>
}

export {Application, loader, meta}
export default Application