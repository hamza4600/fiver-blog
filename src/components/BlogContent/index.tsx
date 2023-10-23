"use client";

import { PortableText} from "@portabletext/react"
import Image from "next/image";
import {FC,  useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { generateId } from "~/hooks/generateId";
import { urlForImage } from '~/lib/sanity.image'

import AsideBar from "./Asidebar";

const Root = styled.div`
    display: flex;
    min-height: 100vh;
`;

const BlogContainer = styled.div`
    flex: 1; 
    overflow-y: auto; 
    padding: 20px;
    max-width: 860px;
    position: relative;
    padding: 32px 80px 40px;

    color: ${({ theme }) => theme.blogSection.textColor} !important;; 
    p {
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 10px;
    }

    h2 {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 10px;
    }

    ul {
        list-style: disc;
        margin-left: 30px;
        li {
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 10px;
        }
    }

    a {
        color : #0C66E4;
        cursor: pointer;
        font-size: 14px;
        line-height: 1.5;


        &:hover {
            text-decoration: underline !important;
        }
    }
`;

const ImgWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 224px;

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
`;

const myPortableTextComponents = {
    block: {
        h2: ({ children}) => {
            return (
                <h2
                    id={`${generateId(children.toString())}`}
                >{children}</h2>
            )
        }
    },
    types: {
        image: ({ value }) => {
            return (
                <ImgWrapper>
                    <Image
                        src={urlForImage(value).url() || ""}
                        alt=""
                        width={769}
                        height={224}
                    />
                </ImgWrapper>
            );
        },
    }
};

type BlogContentProps = {
    content: any
}

const BlogContentSection: FC<BlogContentProps> = ({ content }) => {

    const [h2Tags, setH2Tags] = useState([])
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            const h2Tags = ref.current.querySelectorAll("h2")
            const h2TextArray = Array.from(h2Tags).map(h2 => (h2 as HTMLElement)?.textContent).filter(Boolean);

            let arr = []
            h2TextArray.forEach((title) => {
                const obj = {
                    id: generateId(title),
                    title: title
                }
                arr.push(obj)
            })
            setH2Tags(arr)
        }
    }, [])

    return (
        <Root>
            <BlogContainer
                ref={ref}
                className="blog-content"
            >
                <PortableText
                    value={content}
                    components={myPortableTextComponents}
                />
            </BlogContainer>
            <AsideBar
                title="Table of Contents"
                contentArray={h2Tags}
            />
        </Root>
    )
}

export default BlogContentSection