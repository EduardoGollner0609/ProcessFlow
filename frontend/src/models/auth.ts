export type LoginRequestDTO = {
    email: string,
    password: string,
}

export type AuthResponseDTO = {
    token: string
}

export type RegisterRequestDTO = {
    name: string,
    document: string,
    phone: string,
    email: string,
    password: string
}