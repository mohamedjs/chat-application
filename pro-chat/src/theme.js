import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    components: {
        MuiSelect: {
            defaultProps: {
                displayEmpty: true,
                variant: "outlined",
            },
            styleOverrides: {
                selectMenu: {
                    height: "auto",
                    minHeight: "32px",
                },
            },
        },
    },
});
