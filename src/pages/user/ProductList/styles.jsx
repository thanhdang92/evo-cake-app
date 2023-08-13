import styled from 'styled-components'

export const ProductListPageWrapper = styled.div`
  background-color: #ebebeb;
`

export const Container = styled.div`
  width: 85%;
  margin: 0 auto;
`

export const CategoryWrapper = styled.div`
  border: 1px solid #333;
  padding: 20px;
  margin: 0 30px;
  background-color: #fff;
`
export const CategoryTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  position: relative;
  margin-bottom: 20px;
  &::after {
    content: '';
    border: 1px solid #ddac55;
    width: 40px;
    position: absolute;
    left: 0;
    bottom: -5px;
  }
`
export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
`

export const ProductWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  img {
    position: relative;
    transition: opacity 0.5s ease;
  }
  &:hover img {
    opacity: 0.4;
  }
  .addtocart-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-40%, -50%);
    opacity: 0;
    transition: opacity 1.5s ease;
  }
  &:hover .addtocart-button {
    opacity: 1;
  }
`
export const AddToCartBtn = styled.div`
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 30px;
  text-align: center;
  background-color: #ddac52;
  color: #333;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.8s ease;
  &:hover {
    background-color: #674505;
    color: #fff;
  }
`
export const ShowProduct = styled.div`
  width: 100%;
  background-color: #ccc;
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 500;
  color: #333;
  background-color: #ddac52;
  transition: all 0.8s ease;

  &:hover {
    color: #fff;
    background-color: #674505;
  }
`

export const ProductItem = styled.div``
export const ProductItemName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`

export const ProductItemPrice = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #ddac52;
  margin: 10px 0;
`
export const ProductRate = styled.div`
  text-align: center;
`
export const AddToCardButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ddac52;
  button {
    font-size: 20px;
  }

  &:hover {
    background-color: #7e5200;
    color: #fff;
  }
`

export const BreadcrumbContainer = styled.div`
  border-bottom: 1px solid #333;
  padding: 20px 0 10px 30px;
  margin: 0 0 30px 30px;
`
