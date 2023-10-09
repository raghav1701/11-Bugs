import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
        text: {
            primary: "#000000",
        },
    },
    /*
     * The default font family for all variants is Poppins.
     * MediaQueries are written in the `StyledTypography` component.
     */
    typography: {
        fontFamily: "Poppins, sans-serif",
        h1: {
            fontFamily: "Pragati Narrow, sans-serif",
            fontSize: "32px",
            fontWeight: 700,
        },
        h2: {
            fontFamily: "Pragati Narrow, sans-serif",
            fontSize: "24px",
            fontWeight: 700,
        },
        h6: {
            fontFamily: "Montserrat, Poppins, sans-serif",
            fontSize: "21px",
            textAlign: "center",
            fontWeight: 300,
        },
        body1: {
            fontSize: "18px",
            fontWeight: 300,
        },
        body2: {
            fontSize: "16px",
            color: " #808080",
            lineHeight: "24px",
        },
        subtitle1: {
            fontFamily: "Pragati Narrow, sans-serif",
            fontSize: "50px",
            fontWeight: 700,
        },
    },
});
