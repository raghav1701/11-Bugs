import { NextPage } from "next";
import { ReactElement } from "react";

export type TGetLayoutFunction = (page: ReactElement) => ReactElement;

export type TNextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
    getLayout?: TGetLayoutFunction;
};
