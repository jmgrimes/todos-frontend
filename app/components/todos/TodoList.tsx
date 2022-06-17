import type {FunctionComponent} from "react"
import type {Todo} from "~/features/todos"

import {CheckBoxOutlined, CheckBoxOutlineBlank, Delete, Edit} from "@mui/icons-material"
import {Box, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material"
import {styled} from "@mui/material/styles"

const TodoActionCell = styled(TableCell)`
    border-style: none;
    text-align: center;
    vertical-align: middle;
    width: 80px;
`

const TodoDetailCell = styled(TableCell)`
    border-style: none;
    text-align: left;
    vertical-align: top;
`

const TodoStatusCell = styled(TableCell)`
    border-style: none;
    text-align: center;
    vertical-align: middle;
    width: 40px;
`

type TodoDetailProps = {
    todo: Todo
}

const TodoDetail: FunctionComponent<TodoDetailProps> = ({todo}) =>
    <Box>
        <Typography variant={"body1"} fontWeight={"bold"}>{todo.title}</Typography>
        <Typography variant={"body2"}>{todo.description}</Typography>
    </Box>

type TodoListRowProps = {
    todo: Todo,
    editEnabled: boolean,
    deleteEnabled: boolean,
}

const TodoListRow: FunctionComponent<TodoListRowProps> = ({todo, editEnabled, deleteEnabled}) => {
    const actionsEnabled = editEnabled || deleteEnabled
    return <TableRow key={`todos-row-${todo.id}`}>
        <TodoStatusCell key={`todos-row-${todo.id}-cell-completed`}>
            {todo.completed ? <CheckBoxOutlined/> : <CheckBoxOutlineBlank/>}
        </TodoStatusCell>
        <TodoDetailCell key={`todos-row-${todo.id}-cell-title`}>
            <TodoDetail todo={todo}/>
        </TodoDetailCell>
        {
            actionsEnabled && <TodoActionCell>
                {editEnabled && <Edit/>}
                {deleteEnabled && <Delete/>}
            </TodoActionCell>
        }
    </TableRow>
}

type TodoListProps = {
    todos: Todo[],
    editEnabled: boolean,
    deleteEnabled: boolean,
    showCompleted: boolean,
}

const TodoListView: FunctionComponent<TodoListProps> = (props) => {
    const {todos, editEnabled, deleteEnabled, showCompleted} = props
    const visibleTodos = showCompleted ? todos : todos.filter(todo => !todo.completed)
    return <TableContainer>
        <Table>
            <TableBody>
                {visibleTodos.map(todo =>
                    <TodoListRow key={`todo-${todo.id}`} todo={todo}
                                 editEnabled={editEnabled} deleteEnabled={deleteEnabled}/>
                )}
            </TableBody>
        </Table>
    </TableContainer>
}

export default TodoListView