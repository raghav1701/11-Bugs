import { Request } from "express";
export interface IPrivateRequest extends Request {
    user: any;
}
