import type {FunctionComponent} from "react"
import type {User} from "~/features/users"

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material"

type UserListProps = {
    users: User[]
}

const UserList: FunctionComponent<UserListProps> = ({users}) => {
    return <TableContainer>
        <Table>
            <TableHead>
                <TableRow key={"users-header-row"}>
                    <TableCell key={"users-header-cell-name"}>Name</TableCell>
                    <TableCell key={"users-header-cell-title"}>Title</TableCell>
                    <TableCell key={"users-header-cell-department"}>Department</TableCell>
                    <TableCell key={"users-header-cell-phone"}>Phone</TableCell>
                    <TableCell key={"users-header-cell-email"}>Email</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    users.map(user =>
                        <TableRow key={`users-row-${user.id}`}>
                            <TableCell key={`users-row-cell-name`}>{user.firstName} {user.lastName}</TableCell>
                            <TableCell key={`users-row-${user.id}-cell-title`}>{user.title}</TableCell>
                            <TableCell key={`users-row-${user.id}-cell-department`}>{user.department}</TableCell>
                            <TableCell key={`users-row-${user.id}-cell-phone`}>{user.phone}</TableCell>
                            <TableCell key={`users-row-${user.id}-cell-email`}>{user.email}</TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    </TableContainer>
}

export default UserList