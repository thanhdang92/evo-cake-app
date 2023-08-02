import styled from 'styled-components'

export const ProductNewsWrapper = styled.div``
export const Container = styled.div`
  width: 85%;
  margin: 30px auto;
`
export const ProductNewsTitle = styled.div`
  font-size: 30px;
  margin: 30px 0;
`
export const Img = styled.div`
  img {
    transition: filter 0.2s ease;
    border-radius: 15px;
    cursor: pointer;
  }
  &:hover {
    img {
      filter: grayscale(50%);
    }
  }
`
export const Description = styled.div``

export const Title = styled.div`
  font-size: 20px;
  text-transform: uppercase;
  color: #333;
  padding: 20px 10px;
  text-align: left;
`
export const Content = styled.div`
  text-align: justify;
  color: #333;
  line-height: 1.6;
`
