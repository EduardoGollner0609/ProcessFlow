import { Navigate } from "react-router-dom";
import * as authService from "../../services/auth-service"

interface PrivateRouteProps {
    children: JSX.Element
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const isAuthenticated = authService.isTokenValid();

    console.log(isAuthenticated)

    return isAuthenticated ? children : <Navigate to="/login" replace />
}