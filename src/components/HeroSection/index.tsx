import { FC } from 'react'
import styled from 'styled-components'

type HeroProps = {
  title: string
  subtitle: string
  image: string
}

const Root = styled.section`
  min-height: 20vh;
  background-color: ${(props) => props.theme.heroModule.background};
  padding: 0 80px;
  position: relative;

  @media (max-width: 1024px) {
    padding: 0 24px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`
type ContainerProps = {
  isImage: boolean
}

const Container = styled.div<ContainerProps>`
  max-width: 48rem;
  padding: 80px 24px 80px 0px;
  ${(props) =>
    props.isImage
      ? `
            display: flex; 
            justify-content: space-between; 
            align-items: center;
        `
      : null}
  position: relative;
  height: 100%;

  .text-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: ${(props) => (props.isImage ? '75%' : '100%')};

    h1 {
      font-size: 36px;
      font-weight: 500;
      color: ${(props) => props.theme.heroModule.titleColor};
      text-transform: capitalize;
    }

    p {
      font-size: 16px;
      font-weight: 300;
      color: ${(props) => props.theme.heroModule.textColor};
      line-height: 1.5;
    }
  }

  @media (max-width: 1024px) {
    padding: 48px 0px;

    .text-container {
      h1 {
        font-size: 29px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 40px 24px 40px 0px;
    max-width: 100%;

    .text-container {
      max-width: 100%;
      p {
        font-size: 14px;
      }
    }
  }
`

const ImagWrapper = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const SectionHeroModule: FC<HeroProps> = ({ title, subtitle, image }) => {
  return (
    <Root>
      <Container isImage={image ? true : false}>
        <div className="text-container">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {image ? (
          <ImagWrapper>
            <img src={image} alt="" />
          </ImagWrapper>
        ) : null}
      </Container>
    </Root>
  )
}
{
  /* <p className="post__date">{formatDate(collection._createdAt)}</p> */
}

export default SectionHeroModule
