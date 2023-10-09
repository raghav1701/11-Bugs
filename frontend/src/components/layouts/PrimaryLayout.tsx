"use client";

import { AuthProvider } from "@/providers";
import { theme } from "@/utils/theme";
import { FunctionComponent, ReactElement, ReactNode } from "react";
import { CssBaseline, styled, ThemeProvider } from "@mui/material";
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
