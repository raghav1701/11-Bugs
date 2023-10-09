import { FunctionComponent, ReactElement, ReactNode } from "react";

import { MenuItem, MenuItemProps, styled } from "@mui/material";

import Link from "next/link";

const StyledLink = styled(Link)`
    width: 100%;
    text-decoration: none;
    color: inherit;
    font-family: Montserrat;
    font-size: 12px;
`;

export interface IMenuItemLinkProps extends MenuItemProps {
    href: string;
    children?: ReactNode;
    id: string;
    onClick?: () => void;
    custom?: string;
}

export const MenuItemLink: FunctionComponent<IMenuItemLinkProps> = (
    props: IMenuItemLinkProps,
): ReactElement => {
    const { href, children, id, custom } = props;

    return (
        <MenuItem disabled={props.disabled}>
            <StyledLink
                href={href}
                onClick={props.onClick}
                id={id}
                data-custom={custom}>
                {children}
            </StyledLink>
        </MenuItem>
    );
};
