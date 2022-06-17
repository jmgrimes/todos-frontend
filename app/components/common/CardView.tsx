import type {FunctionComponent, PropsWithChildren} from "react"

import {Card, CardHeader, Typography} from "@mui/material"

type CardViewProps = PropsWithChildren<{
    title: string,
    subtitle?: string,
}>

const CardView: FunctionComponent<CardViewProps> = ({title, subtitle, children}) => {
    const titleElement = <Typography variant={"h5"}>{title}</Typography>
    const subtitleElement = <Typography variant={"body2"}>{subtitle}</Typography>
    return <Card variant={"outlined"}>
        <CardHeader title={titleElement} subheader={subtitleElement}/>
        {children}
    </Card>
}

export default CardView