export type Note = {
    id: number
    title: string
    content: string
}

export type NoteMutation = Omit<Note, "id">