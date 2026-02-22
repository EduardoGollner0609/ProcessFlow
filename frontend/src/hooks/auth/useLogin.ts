import { useMutation } from "@tanstack/react-query";
import * as authService from '../../services/auth-service'
import { LoginRequestDTO } from "../../models/auth";
import { useNavigate } from "react-router-dom";
import { UseFormSetError } from "react-hook-form";
import { backendErrorInForm } from "../../utils/request";
import { ValidationError } from "../../models/exceptions";
import toast from "react-hot-toast";

type useLoginProps = {
    credentials: LoginRequestDTO
    setError: UseFormSetError<any>;
}

export default function UseLogin() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ credentials }: useLoginProps) => authService.login(credentials),
        onSuccess: (data) => {
            authService.saveToken(data.token);
            navigate("/dashboard");
        },
        onError: (error: any, variables) => {
            if (error?.response?.status === 422) {
                const validationErrors: ValidationError[] = error?.response?.data?.errors

                backendErrorInForm(validationErrors, variables.setError)
                toast.error("Erro de validação no login")
            }
        }
    })
}