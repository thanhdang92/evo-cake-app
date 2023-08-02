import styled from 'styled-components'

export const FeaturedProductsWrapper = styled.div``

export const Container = styled.div`
  width: 85%;
  margin: 30px auto;
  a {
    color: #333;
  }
`

export const Title = styled.div`
  text-align: center;
  padding: 20px 0;
  cursor: pointer;
  & span {
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
  }
  &:hover {
    color: #ddac52;
  }
`

export const Img = styled.div`
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  & img {
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease;
  }
  &:hover img {
    transform: scale(1.1);
  }
  &:hover ~ ${Title} {
    color: #ddac52;
  }
`
