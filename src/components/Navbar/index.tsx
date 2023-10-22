"use client"
import { FC } from "react";
import styled from "styled-components";

import LeftSide from "./navLeft";
import RightSide, { type NavProps } from './navRight';

const NavWrapper = styled.nav`

    background-color:  ${props => props.theme.navbar.background};
    color: ${props => props.theme.navbar.color};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 1rem;
    height: 56px;
    border-bottom: 1px solid ${props => props.theme.navbar.borderColor};

`;

const Navbar: FC<NavProps> = ({ navIcon, navItemList }) => {
    return (
        <NavWrapper>
            <RightSide
                navIcon={navIcon}
                navItemList={navItemList}
            />
            <LeftSide />
        </NavWrapper>
    )
}

export default Navbar;