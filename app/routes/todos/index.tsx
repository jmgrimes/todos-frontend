import type {FunctionComponent} from "react"
import type {LoaderFunction} from "@remix-run/node"
import type {Todo} from "~/features/todos"
import type {UserContext} from "~/features/users"

import {Add, Visibility, VisibilityOff} from "@mui/icons-material"
import {Button, CardActions, CardContent} from "@mui/material"
import {useLoaderData} from "@remix-run/react"
import {useState} from "react"
import {CardView, ErrorView, useVariation} from "~/components/common"
import {TodoList} from "~/components/todos"
import {getUserContext} from "~/utils/cookies.server"
import {getVariation} from "~/utils/launchdarkly.server"

const disabledTitle = "Todos Features are Disabled"
const disabledSubtitle = 
    "The Todos Features of the application are currently disabled.  Please return to the homepage " + 
    "or select another section to continue using this application."

const title = "Todos List"
const subtitle = "Your todo list is a space for keeping track of all of the random tasks that you need to complete."

type GetTodos = (userContext: UserContext) => Promise<Todo[]>
const getTodos: GetTodos = async (userContext) => {
    const defaultTodosApi = "http://localhost:3001/todos"
    return await getVariation<string>("todos-api", userContext, defaultTodosApi)
        .then(todosApi => fetch(todosApi))
        .then(response => {
            if (!response.ok) {
                throw new Error("There was a problem fetching data from the todo resources endpoint.")
            }
            return response.json()
        })
}

type LoaderData = {
    features: {
        todosEnabled: boolean,
        todosCreateEnabled: boolean,
        todosEditEnabled: boolean,
        todosDeleteEnabled: boolean,
    },
    data: {
        todos: Todo[],
    },
}

const loader: LoaderFunction = async ({request}) => {
    const userContext = await getUserContext(request)
    const todosEnabled = await getVariation("todos", userContext, false)
    const todosCreateEnabled = await getVariation("todos-create", userContext, false)
    const todosEditEnabled = await getVariation("todos-edit", userContext, false)
    const todosDeleteEnabled = await getVariation("todos-delete", userContext, false)
    const loaderData: LoaderData = {
        features: {
            todosEnabled,
            todosCreateEnabled,
            todosEditEnabled,
            todosDeleteEnabled,
        },
        data: {
            todos: todosEnabled ? await getTodos(userContext) : [],
        }
    }
    return loaderData
}

type PageContentProps = {loaderData: LoaderData}
const PageContent: FunctionComponent<PageContentProps> = ({loaderData}) => {
    const [showCompleted, setShowCompleted] = useState<boolean>(false)
    const showCompletedIcon = showCompleted ? <VisibilityOff/> : <Visibility/>
    const showCompletedText = showCompleted ? "Hide Completed" : "Show Completed"
    const todosEnabled = useVariation("todos", loaderData.features.todosEnabled)
    const todosCreateEnabled = useVariation("todos-create", loaderData.features.todosCreateEnabled)
    const todosEditEnabled = useVariation("todos-edit", loaderData.features.todosEditEnabled)
    const todosDeleteEnabled = useVariation("todos-delete", loaderData.features.todosDeleteEnabled)
    if (!todosEnabled) {
        return <CardView title={disabledTitle} subtitle={disabledSubtitle}/>
    }
    return <CardView title={title} subtitle={subtitle}>
        <CardContent>
            <TodoList todos={loaderData.data.todos}
                       editEnabled={todosEditEnabled}
                       deleteEnabled={todosDeleteEnabled}
                       showCompleted={showCompleted}/>
        </CardContent>
        <CardActions>
            {todosCreateEnabled && <Button startIcon={<Add/>}>New Todo</Button>}
            <Button startIcon={showCompletedIcon}
                    onClick={() => setShowCompleted(showCompleted => !showCompleted)}>
                {showCompletedText}
            </Button>
        </CardActions>
    </CardView>
}

const Page: FunctionComponent = () => {
    const loaderData = useLoaderData<LoaderData>()
    return <PageContent loaderData={loaderData}/>
}

export {Page, ErrorView as ErrorBoundary, loader}
export default Page