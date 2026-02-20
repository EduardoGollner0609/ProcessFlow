import { useMutation } from "@tanstack/react-query";
import * as authService from '../../services/auth-service';
import { RegisterRequestDTO } from "../../models/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UseRegister() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (registerData: RegisterRequestDTO) => authService.register(registerData),
        onSuccess: (data) => {
            authService.saveToken(data.token);
            navigate("/dashboard")
        },
        onError: () => {
            toast.error("Erro ao realizar cadastro")
        }
    })
}