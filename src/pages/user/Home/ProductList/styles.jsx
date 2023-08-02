import styled from 'styled-components'

export const ProductListWrapper = styled.div`
  width: 85%;
  margin: 100px auto;
`

export const Container = styled.div``
export const Title = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 30px 0;
`
export const ProductItem = styled.div`
  cursor: pointer;
`
export const ProductWrapper = styled.div`
  position: relative;
`

export const ProductImage = styled.div`
  & img {
    width: 100%;
  }
`

export const ProductInfo = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  color: #fff;
  text-align: center;
  opacity: 1;
  transition: all 0.4s ease;

  ${ProductItem}:hover & {
    opacity: 0;
    transform: translate(0, -50%);
    transition-delay: 0.15s;
  }
`
export const ProductName = styled.div`
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export const ProductPrice = styled.div`
  color: #ddac52;
`

export const AddToCartButton = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  width: 85%;
  color: #333;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  ${ProductItem}:hover & {
    transition-delay: 0.15s;
    visibility: visible;
    opacity: 1;
    transform: translate(0, -50%);
  }
`
export const ShowProductButton = styled.div`
  & button {
    display: inline-block;
    height: 50px;
    width: 85%;
    padding: 10px 20px;
    outline: none;
    text-transform: uppercase;
    border-radius: 40px;
    background-color: #7f462c;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.4s ease;
  }
  &:hover button {
    color: #fff !important;
    background-color: #ddac55;
  }
`
export const IconCart = styled.div`
  & button {
    display: inline-block;
    margin-right: 0px;
    height: 50px;
    width: 50px;
    color: #000;
    border-radius: 50%;
    font-weight: 900;
    vertical-align: top;
    background-color: #f5f5f5;
    text-align: center;
    padding: 0;
    position: relative;
    margin-left: 7px;
    font-size: 20px;
  }
  &:hover button {
    background-color: #ddac55 !important;
    & span {
      color: #333;
    }
  }
`
