import { ReactNode, useState } from "react";
import { AuthContext } from "../contexts";
import { ICustomer } from "../types";

export interface IAuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = (props: IAuthProviderProps) => {
    const { children } = props;
    const [user, setUser] = useState<ICustomer | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
