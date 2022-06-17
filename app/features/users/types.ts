export type User = {
    id: number
    firstName: string
    lastName: string
    title: string
    department: string
    phone: string
    email: string
}

export type UserContext = {
    key: string,
    browserName: string,
    browserVersion: string,
    deviceType: string,
    deviceModel: string,
    deviceVendor: string,
    osName: string,
    osVersion: string,
}

export type UserMutation = Omit<User, "id">