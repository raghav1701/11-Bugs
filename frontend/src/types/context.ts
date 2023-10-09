import { ICustomer } from ".";

export interface IAuthContext {
    user: ICustomer | null;
    setUser: (user: ICustomer) => void;
    logout: () => void;
}
