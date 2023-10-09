"use client";
import {
    AppBar as MuiAppBar,
    Badge,
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    Link,
    Menu,
    MenuList,
    styled,
    Toolbar as MuiToolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    FunctionComponent,
    ReactElement,
    useCallback,
    useState,
    MouseEvent,
} from "react";

import { BsPerson } from "react-icons/bs";
import { useAuth } from "@/hooks/useAuth";
import { MenuItemLink } from "@/components/helpers";

const AppBar = styled(MuiAppBar)`
    background-color: grey;
    box-shadow:
        3.3px 3.3px 5.3px rgba(0, 0, 0, 0.028),
        11.2px 11.2px 17.9px rgba(0, 0, 0, 0.042),
        50px 50px 80px rgba(0, 0, 0, 0.07);
    position: sticky;
`;

const Toolbar = styled(MuiToolbar)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 76px;

    ${({ theme }) => theme.breakpoints.down("sm")} {
        height: fit-content;
    }
`;

const Greeting = styled(Typography)`
    color: gray;
    white-space: nowrap;

    ${({ theme }) => theme.breakpoints.down("sm")} {
        font-size: 10px;

        margin-left: ${({ theme }) => theme.spacing(1)};
    }
`;

const LeftSection = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 24px;
`;

const ActionItems = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    column-gap: 16px;
    width: auto;

    ${({ theme }) => theme.breakpoints.down("md")} {
        column-gap: 16px;
    }

    ${({ theme }) => theme.breakpoints.down("sm")} {
        column-gap: 0px;
    }
`;

const Category = styled(Box)`
    color: black;
    font-family: Pragati Narrow;
    font-size: 18px;

    ${({ theme }) => theme.breakpoints.down("md")} {
        font-size: 16px;
    }
`;

const MenuItemTitle = styled(Category)`
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;

    ${({ theme }) => theme.breakpoints.down("md")} {
        font-size: 16px;
    }
`;

const ActionProfile = styled(BsPerson)`
    width: 24px;
    font-size: 24px;
    ${({ theme }) => theme.breakpoints.down("md")} {
        width: 20px;
    }
    ${({ theme }) => theme.breakpoints.down("sm")} {
        width: 16px;
    }
`;

const UserMenuPaperProp = {
    style: {
        background: "white",
        boxShadow: `
            12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
            100px 100px 80px rgba(0, 0, 0, 0.07)
        `,
    },
};

const ProfileMenu = styled(Menu)`
    margin-top: ${({ theme }) => theme.spacing(6)};
`;

export const Navbar: FunctionComponent = (): ReactElement => {
    const { user } = useAuth();
    const authenticated = user !== null;

    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
        null,
    );

    const handleOpenUserMenu = useCallback((event: MouseEvent<HTMLElement>) => {
        console.log("clicked user menu");
        setUserMenuAnchor(event.currentTarget);
    }, []);

    const handleUserMenuClose = useCallback(() => {
        setUserMenuAnchor(null);
    }, []);

    const renderActions = () => (
        <ActionItems>
            <Button variant="outlined" onClick={handleOpenUserMenu}>
                Login
            </Button>
            <ProfileMenu
                anchorEl={userMenuAnchor}
                disableScrollLock={true}
                keepMounted={true}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(userMenuAnchor)}
                onClose={handleUserMenuClose}
                PaperProps={UserMenuPaperProp}
                elevation={0}>
                {authenticated && (
                    <MenuList>
                        <MenuItemLink
                            id="navbar--button--view-orders"
                            href="/orders"
                            onClick={handleUserMenuClose}>
                            <MenuItemTitle>View Orders</MenuItemTitle>
                        </MenuItemLink>
                        <Divider />
                        <MenuItemLink id="navbar--button--logout" href="/">
                            <MenuItemTitle>Logout</MenuItemTitle>
                        </MenuItemLink>
                    </MenuList>
                )}
                {!authenticated && (
                    <MenuList>
                        <MenuItemLink
                            id="navbar--button--continue-with-otp"
                            onClick={handleUserMenuClose}
                            href="/request-otp">
                            <MenuItemTitle>Continue with OTP</MenuItemTitle>
                        </MenuItemLink>
                    </MenuList>
                )}
            </ProfileMenu>
            {user?.username && <Greeting>Hello, {user?.username}</Greeting>}
        </ActionItems>
    );

    return (
        <AppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters={true}>
                    <LeftSection>
                        <Typography sx={{ color: "white" }}>
                            Left Items
                        </Typography>
                    </LeftSection>
                    {renderActions()}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
