import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled from "styled-components";

import { useTheme } from '~/theme/themeContext';

import darkSvg from "../../assets/svg/DarkThumb.svg"
import lightSvg from "../../assets/svg/LightThumb.svg"
import ThemeSelector from './themeSelector';

const LeftSideWrapper = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

`;

const DropdownMenuContent = styled(DropdownMenu.Content)`
    min-width: 300px;
    padding: 0.5rem 0;
    border-radius: 4px;
    overflow: hidden;
    outline: none;
    background-color:  ${props => props.theme.navbar.background};
    color: ${props => props.theme.navbar.color};
    margin-right: 1rem;
    box-shadow: 0 0 0 1px ${props => props.theme.navbar.borderColor};
`;

const Title = styled.h2`
    text-transform: capitalize;
    font-size: 14px;
    font-weight: 500;
    color: ${props => props.theme.navbar.color};
    padding: 0.5rem 1rem;
`;
type NavButtonProps = {
    isThemeButton?: boolean
}
const NavButton = styled.button<NavButtonProps>`

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    border: none;
    border-radius: 3px;
    padding: 8px 3px;
    font-family: inherit;
    font-weight: 500;
    font-size: 14px;
    text-transform: capitalize;
    color: ${props => props.theme.navbar.color};
    transition: background-color 0.3s ease-in-out;

    i {
        margin-right: 2px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &:hover {
        cursor: pointer;
        background-color: ${props => props.theme.navbar.hoverBackground};
        border-radius: 4px;
        transition: background-color 0.3s ease-in-out;
    }

    ${props => props.isThemeButton && `
        background-color: rgba(161, 189, 217, 0.10);
    `}
`;

const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><path d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z" fill="currentColor" fill-rule="evenodd"></path></svg>
)


const DialogContent = styled.div`

    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 1rem;
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;

    transition: transform 0.3s ease-in-out;

    .DialogOverlay {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: ${props => props.theme.navbar.modalOverlay};
    }

    .DialogContent {
        position: relative;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        background-color: ${props => props.theme.navbar.modalBackground};
        color: ${props => props.theme.navbar.color};
        border-radius: 4px;
        outline: none;
        max-width: 300px;
        border-radius: 3px;
        box-shadow: var(${props => props.theme.navbar.modalBoxShadow}, 0 0 0 1px rgba(9, 30, 66, 0.08), 0 2px 1px rgba(9, 30, 66, 0.08), 0 0 20px -6px rgba(9, 30, 66, 0.31));
    }
`;

const LeftSide = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <LeftSideWrapper>

            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <NavButton>
                        <i><SearchIcon /></i>
                        <span>Search</span>
                    </NavButton>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <DialogContent>
                        <Dialog.Overlay className="DialogOverlay" />
                        <Dialog.Content className="DialogContent">
                            <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
                            <Dialog.Description className="DialogDescription">
                                Make changes to your profile here. Click save when done.
                            </Dialog.Description>
                            <Dialog.Close>
                                <NavButton>
                                    <span>Close</span>
                                </NavButton>
                            </Dialog.Close>
                        </Dialog.Content>
                    </DialogContent>
                </Dialog.Portal>
            </Dialog.Root>

            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <NavButton isThemeButton>
                        <span>Theme</span>
                    </NavButton>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenuContent className="DropdownMenuContent" sideOffset={5}>
                        <Title>color mode</Title>
                        <div
                            className="DropdownMenuItem"
                            onClick={() => toggleTheme()}
                            aria-label="Light mode"
                        >
                            <ThemeSelector
                                img={lightSvg.src}
                                title="Light"
                                description="Light mode"
                                isActive={theme === "light"}
                            />
                        </div>
                        <div
                            className="DropdownMenuItem"
                            aeria-label="Dark mode"
                            onClick={() => toggleTheme()}
                        >
                            <ThemeSelector
                                img={darkSvg.src}
                                title="Dark"
                                description="Dark mode"
                                isActive={theme === "dark"}
                            />
                        </div>
                    </DropdownMenuContent>

                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </LeftSideWrapper>
    )
}

export default LeftSide;