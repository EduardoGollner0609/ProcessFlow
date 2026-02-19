import { AuthResponseDTO, LoginRequestDTO } from "../models/auth";
import * as tokenRepository from '../localstorage/token-repository';
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/request";
import { TOKEN_KEY } from "../utils/system";

export async function login(credentials: LoginRequestDTO): Promise<AuthResponseDTO> {
    const config: AxiosRequestConfig = {
        url: "/auth/login",
        method: "POST",
        data: credentials,
    }

    return (await requestBackend(config)).data;
}

export function isTokenValid(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) return false;

    try {
        const payload = JSON.parse(
            atob(token.split(".")[1])
        );

        const now = Math.floor(Date.now() / 1000);

        return payload.exp > now;
    } catch {
        return false;
    }
}

export function getToken() {
    return tokenRepository.get()
}


export function saveToken(token: string) {
    tokenRepository.save(token);
}

export function removeToken() {
    tokenRepository.remove();
}