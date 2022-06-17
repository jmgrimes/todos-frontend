import type {FunctionComponent} from "react"
import type {LoaderFunction} from "@remix-run/node"
import type {Note} from "~/features/notes"
import type {UserContext} from "~/features/users"

import {Add} from "@mui/icons-material"
import {Button, CardActions, CardContent} from "@mui/material"
import {useLoaderData} from "@remix-run/react"
import {CardView, ErrorView, useVariation} from "~/components/common"
import {NoteList} from "~/components/notes"
import {getUserContext} from "~/utils/cookies.server"
import {getVariation} from "~/utils/launchdarkly.server"

const disabledTitle = "Notes Features are Disabled"
const disabledSubtitle = 
    "The Notes Features of the application are currently disabled.  Please return to the homepage " + 
    "or select another section to continue using this application."

const title = "Notes Features are Ready"
const subtitle = "Notes Features have been successfully loaded into the application and are enabled."

type GetNotes = (userContext: UserContext) => Promise<Note[]>
const getNotes: GetNotes = async (userContext) => {
    const defaultNotesApi = "http://localhost:3001/notes"
    return await getVariation<string>("notes-api", userContext, defaultNotesApi)
        .then(usersApi => fetch(usersApi))
        .then(response => {
            if (!response.ok) {
                throw new Error("There was a problem fetching data from the notes resources endpoint.")
            }
            return response.json()
        })
}

type LoaderData = {
    features: {
        notesEnabled: boolean,
        notesCreateEnabled: boolean,
        notesEditEnabled: boolean,
        notesDeleteEnabled: boolean,
    },
    data: {
        notes: Note[],
    },
}

const loader: LoaderFunction = async ({request}) => {
    const userContext = await getUserContext(request)
    const notesEnabled = await getVariation("notes", userContext, false)
    const notesCreateEnabled = await getVariation("notes-create", userContext, false)
    const notesEditEnabled = await getVariation("notes-edit", userContext, false)
    const notesDeleteEnabled = await getVariation("notes-delete", userContext, false)
    const loaderData: LoaderData = {
        features: {
            notesEnabled,
            notesCreateEnabled,
            notesEditEnabled,
            notesDeleteEnabled,
        },
        data: {
            notes: notesEnabled ? await getNotes(userContext) : []
        },
    }
    return loaderData
}

type PageContentProps = {loaderData: LoaderData}
const PageContent: FunctionComponent<PageContentProps> = ({loaderData}) => {
    const notesEnabled = useVariation("notes", loaderData.features.notesEnabled)
    const notesCreateEnabled = useVariation("notes-create", loaderData.features.notesCreateEnabled)
    const notesEditEnabled = useVariation("notes-edit", loaderData.features.notesEditEnabled)
    const notesDeleteEnabled = useVariation("notes-delete", loaderData.features.notesDeleteEnabled)
    if (!notesEnabled) {
        return <CardView title={disabledTitle} subtitle={disabledSubtitle}/>
    }
    return <CardView title={title} subtitle={subtitle}>
        <CardContent>
            <NoteList notes={loaderData.data.notes} editEnabled={notesEditEnabled} deleteEnabled={notesDeleteEnabled}/>
        </CardContent>
        <CardActions>
            {notesCreateEnabled && <Button startIcon={<Add/>}>New Note</Button>}
        </CardActions>
    </CardView>
}

const Page: FunctionComponent = () => {
    const loaderData = useLoaderData<LoaderData>()
    return <PageContent loaderData={loaderData}/>
}

export {Page, ErrorView as ErrorBoundary, loader}
export default Page