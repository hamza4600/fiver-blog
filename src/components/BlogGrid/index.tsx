import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components"

import { urlForImage } from "~/lib/sanity.image";

type HeroProps = {
    articles: any[];
    parentSlug: string;
}

const Root = styled.section`
    display: flex;
    box-sizing: border-box;
    gap: 24px;
    flex-direction: column;
    justify-content: stretch;

    .grid {
        display: grid;
        box-sizing: border-box;
        width: 100%;
        grid-template-columns: repeat(12, 1fr);
        margin-inline: auto;
    }
`;

type GridCardProps = {
    img: string;
    title: string;
    description: string;
    slug: string;
    collectionSlug: string;
}

const GridCrad: FC<GridCardProps> = ({ img, title, description, slug, collectionSlug }) => {
    return (
        <Link href={`/collection/${collectionSlug}/${slug}`}>
            <div className="grid-card">
                <div className="grid-card__img">
                    <Image src={img} alt={title}
                        width={367}
                        height={231}
                    />
                </div>
                <div className="grid-card__content">
                    <h3 className="grid-card__title">{title}</h3>
                    <p className="grid-card__description">{description}</p>
                </div>
            </div>
        </Link>
    )
}

const ArticleGrid: FC<HeroProps> = ({ articles, parentSlug }) => {
    console.log(articles, "articles");
    return (
        <Root>
            <div className="grid">
                {
                    articles.map((article, index) => (
                        <GridCrad
                            key={index}
                            img={urlForImage(article.mainImage).url() || ""}
                            title={article.title}
                            description={article.description}
                            slug={article.slug?.current || ""}
                            collectionSlug={parentSlug}
                        />
                    )
                    )
                }
            </div>
        </Root>
    )
}

export default ArticleGrid;
