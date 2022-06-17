import type {FunctionComponent} from "react"
import type {Note} from "~/features/notes"

import {Delete, Edit} from "@mui/icons-material"
import {Box, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material"
import {styled} from "@mui/material/styles"

const NoteActionCell = styled(TableCell)`
    border-style: none;
    text-align: center;
    vertical-align: middle;
    width: 80px;
`

const NoteDetailCell = styled(TableCell)`
    border-style: none;
    text-align: left;
    vertical-align: top;
`

type NoteDetailProps = {
    note: Note,
}

const NoteDetail: FunctionComponent<NoteDetailProps> = ({note}) =>
    <Box>
        <Typography variant={"body1"} fontWeight={"bold"}>{note.title}</Typography>
        <Typography variant={"body2"}>{note.content}</Typography>
    </Box>

type NoteListRowProps = {
    note: Note,
    editEnabled: boolean,
    deleteEnabled: boolean,
}

const NoteListRow: FunctionComponent<NoteListRowProps> = ({note, editEnabled, deleteEnabled}) => {
    const actionsEnabled = editEnabled || deleteEnabled
    return <TableRow key={`notes-row-${note.id}`}>
        <NoteDetailCell key={`notes-row-${note.id}-cell-title`}>
            <NoteDetail note={note}/>
        </NoteDetailCell>
        {
            actionsEnabled && <NoteActionCell>
                {editEnabled && <Edit/>}
                {deleteEnabled && <Delete/>}
            </NoteActionCell>
        }
    </TableRow>
}

type NoteListProps = {
    notes: Note[],
    editEnabled: boolean,
    deleteEnabled: boolean,
}

const NoteListView: FunctionComponent<NoteListProps> = ({notes, editEnabled, deleteEnabled}) => {
    return <TableContainer>
        <Table>
            <TableBody>
                {notes.map(note => 
                        <NoteListRow key={`note-${note.id}`} 
                                     note={note}
                                     editEnabled={editEnabled} 
                                     deleteEnabled={deleteEnabled}/>
                )}
            </TableBody>
        </Table>
    </TableContainer>
}

export default NoteListView