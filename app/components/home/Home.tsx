import type {FunctionComponent} from "react"

import {Typography} from "@mui/material"
import {Fragment} from "react"

type HomeProps = {
    todosEnabled: boolean,
    notesEnabled: boolean,
    usersEnabled: boolean,
}

const Home: FunctionComponent<HomeProps> = ({todosEnabled, notesEnabled, usersEnabled}) => {
    return <Fragment>
        <Typography variant={"h4"} style={{marginBottom: 5}}>Welcome to the Home Page</Typography>
        <Typography variant={"body1"} style={{marginTop: 5, marginBottom: 5}}>
            Welcome to the Home Page of the Todos application, a simple demo application highlighting the progressive
            delivery development methodology enabled by the LaunchDarkly platform. The application contains a total of
            two sections with progressively delivered capabilities.
        </Typography>

        <Typography variant={"h5"} style={{marginTop: 5, marginBottom: 5}}>Todos Features</Typography>
        <Typography variant={"body1"} style={{marginTop: 5, marginBottom: 5}}>
            The Todos section and tab is the main functionality of an application such as this, and allows you to
            switch on and off the entire feature set, the ability to create new todos, the ability to edit todos,
            the ability to delete todos, and the ability to complete todos. Additionally, the todos feature set
            exposes a todos-api configuration flag, allowing for a different endpoint to be used for pulling the
            todos data.
        </Typography>
        <Typography variant={"body2"} style={{marginTop: 5, marginBottom: 5}}>
            The Todos Features are currently <b>{todosEnabled ? "enabled" : "disabled"}</b>.
        </Typography>

        <Typography variant={"h5"} style={{marginTop: 5, marginBottom: 5}}>Notes Features</Typography>
        <Typography variant={"body1"} style={{marginTop: 5, marginBottom: 5}}>
            The Notes section and tab is part of the main functionality of an application such as this, and allows you
            to switch on and off the entire feature set, the ability to create new notes, the ability to edit notes,
            and the ability to delete notes. Additionally, the notes feature set exposes a notes-api configuration
            flag, allowing for a different endpoint to be used for pulling the notes data.
        </Typography>
        <Typography variant={"body2"} style={{marginTop: 5, marginBottom: 5}}>
            The Notes Features are currently <b>{notesEnabled ? "enabled" : "disabled"}</b>.
        </Typography>

        <Typography variant={"h5"} style={{marginTop: 5, marginBottom: 5}}>Users Features</Typography>
        <Typography variant={"body1"} style={{marginTop: 5, marginBottom: 5}}>
            The Users section and tab is a user management section pf the application, and allows you to switch on
            and off the entire feature set, the ability to create new users, the ability to edit users, and the
            ability to delete users. Additionally, the users feature set exposes a users-api configuration flag,
            allowing for a different endpoint to be used for pulling the users data.
        </Typography>
        <Typography variant={"body2"} style={{marginTop: 5}}>
            The Users Features are currently <b>{usersEnabled ? "enabled" : "disabled"}</b>.
        </Typography>
    </Fragment>
}

export default Home