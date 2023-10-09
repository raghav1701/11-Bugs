"use client";

import { AuthProvider } from "@/providers";
import { theme } from "@/utils/theme";
import { ThemeProvider } from "@emotion/react";
import { FunctionComponent, ReactElement, ReactNode } from "react";
import { CssBaseline, Typography } from "@mui/material";
import { styled } from "styled-components";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Main = styled("main")`
    min-height: 100vh;
`;

export interface IPrimaryLayoutProps {
    children: ReactNode;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export const PrimaryLayout: FunctionComponent<IPrimaryLayoutProps> = (
    props: IPrimaryLayoutProps,
): ReactElement => {
    const { children } = props;

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarProvider maxSnack={3}>
                    <AuthProvider>
                        <Main>{children}</Main>
                    </AuthProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};
