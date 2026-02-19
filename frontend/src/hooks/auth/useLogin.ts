import { useMutation } from "@tanstack/react-query";
import * as authService from '../../services/auth-service'
import { LoginRequestDTO } from "../../models/auth";
import { useNavigate } from "react-router-dom";


export default function UseLogin() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (credentials: LoginRequestDTO) => authService.login(credentials),
        onSuccess: (data) => {
            authService.saveToken(data.token);
            navigate("/dashboard");
        }
    })
}