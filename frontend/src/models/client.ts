export type ClientMinDTO = {
    id: string,
    name: string,
    document: string,
    email: string,
    phone: string
}

export type ClientsPaged = {
    content: ClientMinDTO[],
    last: boolean
}