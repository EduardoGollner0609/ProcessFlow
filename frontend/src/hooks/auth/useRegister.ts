import { useMutation } from "@tanstack/react-query";
import * as authService from '../../services/auth-service';
import { RegisterRequestDTO } from "../../models/auth";
import { useNavigate } from "react-router-dom";
import { UseFormSetError } from "react-hook-form";
import { ValidationError } from "../../models/exceptions";
import { backendErrorInForm } from "../../utils/request";
import toast from "react-hot-toast";

type useRegisterProps = {
    registerData: RegisterRequestDTO;
    setError: UseFormSetError<any>;
};

export default function UseRegister() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ registerData }: useRegisterProps) => authService.register(registerData),
        onSuccess: (data) => {
            authService.saveToken(data.token);
            navigate("/dashboard")
        },
        onError: (error: any, variables) => {
            if (error?.response?.status === 422) {
                const validationErrors: ValidationError[] = error?.response?.data?.errors

                backendErrorInForm(validationErrors, variables?.setError)
                toast.error("Erro de validação no cadastro")
            }
        }
    })
}