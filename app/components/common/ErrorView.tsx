import type {FunctionComponent, PropsWithChildren} from "react"

import {ErrorRounded} from "@mui/icons-material"
import {Card, CardContent, CardHeader, Typography} from "@mui/material"

type ErrorViewProps = PropsWithChildren<{
    error?: Error
}>

const ErrorView: FunctionComponent<ErrorViewProps> = ({error}) => {
    const titleElement = <Typography variant={"h5"}>An Error Occurred While Processing Your Request</Typography>
    return <Card variant={"outlined"}>
        <CardHeader avatar={<ErrorRounded/>} title={titleElement}/>
        <CardContent>
            <Typography variant={"h6"}>The following error occurred while processing your request:</Typography>
            <Typography variant={"body1"}>{error?.message}</Typography>
            <Typography variant={"body2"}>{error?.stack}</Typography>
        </CardContent>
    </Card>
}

export default ErrorView