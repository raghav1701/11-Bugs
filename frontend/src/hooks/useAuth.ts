import { useContext } from "react";
import { AuthContext } from "../contexts";
import { IAuthContext } from "../types";

export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Cannot find auth context!");
    }

    return context;
};
