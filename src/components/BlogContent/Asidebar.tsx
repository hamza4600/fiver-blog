import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { generateId } from "~/hooks/generateId";
import useSticky from "~/hooks/useSticky";

type RootProps = {
    isSticky?: boolean;
};

const AsideWrapper = styled.aside<RootProps>`

    position: relative;
    min-width: 11.5rem;


    nav {
        padding-inline : 0.75rem;
        margin-block-start : 2rem;
        padding-block : 0.25rem;
        
        position: ${(props) => (props.isSticky ? "fixed" : "relative")};
        top: ${(props) => (props.isSticky ? "60px" : "0")};
        right: 0;
        z-index: 1000;
        background-color: transparent;
        border-inline-start: 1px solid ${(props) => props.theme.AsideBar.border};
    }
`;

const InssideWrapper = styled.nav`

    h3 {
        font-size: 13px;
        font-weight: 500;
        color: ${(props) => props.theme.AsideBar.textColor};
        line-height: 1.5;
    }
    ul {
        margin-top: 8px;
    }
`;
type AsideBarProps = {
    title: string;
    contentArray: { title: string, id: string }[];
}

type LiProps = {
    isActive?: string;
}

const Li = styled.li<LiProps>`
    position: relative;

    a {
        line-height: 1.5;
        font-size: 12px;
        font-weight: 400;
        color: ${(props) => props.isActive === "true" ?
        props.theme.AsideBar.activeColor :
        props.theme.AsideBar.textColor} !important;
    }

    &::before {
        content: "";
        width: 1px;
        height: calc(100% + 8px);
        position: absolute;
        left: -13px;
        top: -5px;
        background-color: ${(props) => props.isActive === "true" ?
        props.theme.AsideBar.activeColor :
        "transparent"};
    }

`;
const AsideBar: FC<AsideBarProps> = ({ title, contentArray }) => {
    const { sticky, stickyRef } = useSticky();

    const [active, setActive] = useState("");
    // active first item 
    console.log(active, "ACTIVE")

    useEffect(() => {
        if (contentArray.length > 0) {
            setActive(contentArray[0].id)
        }
    }, [contentArray])

    // update active link when scroll to other section
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const sections = document.querySelectorAll("h2");

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (
                    currentScrollPos >= sectionTop - sectionHeight * 0.25 &&
                    currentScrollPos < sectionTop + sectionHeight * 0.75
                ) {
                    setActive(`${section.id}`);
                }
            });
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <AsideWrapper
            ref={stickyRef}
            isSticky={sticky}
            style={{
                transition: "all 200ms ease-in-out"
            }}
        >
            <InssideWrapper>
                <h3 className="aside-title">Contents</h3>
                <ul>
                    {
                        contentArray.map((item, index) => (
                            <Li
                                key={index}
                                isActive={active === item.id ? "true" : "false"}
                                onClick={() => setActive(item.id)}
                                aeria-current={active === item.id ? "true" : "false"}
                            >
                                <a
                                    href={`#${item.id}`}
                                    title={item.title}
                                >
                                    {item.title}
                                </a>
                            </Li>
                        ))
                    }
                </ul>
            </InssideWrapper>
        </AsideWrapper >
    )
}

export default AsideBar;