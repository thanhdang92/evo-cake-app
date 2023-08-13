import styled from 'styled-components'

export const ProductDetailPageWrapper = styled.div`
  background-color: #ebebeb;
`
export const Container = styled.div`
  width: 85%;
  margin: 0 auto;
`
export const ProductDetailWrapper = styled.div`
  background-color: #fff;
  padding: 40px;
`
export const ProductDetailImg = styled.div`
  border: 1px solid #333;
  padding: 20px;
  img {
    width: 100%;
  }
`
export const ProductContent = styled.div`
  margin: 0 20px;
`
export const ProductDetailTitle = styled.div`
  font-size: 25px;
  font-weight: 600;
  line-height: 1.6;
  padding-bottom: 10px;
  border-bottom: 1px dashed #ccc;
`

export const ProductDetailPrice = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: red;
  padding: 20px 0;
`

export const ProductDetailDes = styled.div`
  padding: 20px 0;
  text-align: justify;
  line-height: 1.4;
`

export const ProductDetailQuantity = styled.div`
  padding: 20px 0;
`

export const AddToCartButton = styled.div`
  button {
    width: 200px;
    height: 50px;
    border-radius: 10px;
    background-color: #ddac52;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 500;
    &:hover {
      color: #fff !important;
      background-color: #7f462c;
    }
  }
`
export const FavoriteButton = styled.div``
export const Description = styled.div`
  padding: 30px 0;
`

export const DescriptionTitle = styled.div`
  font-size: 30px;
  color: #ddac52;
  text-transform: uppercase;
  font-weight: 500;
  padding: 20px 0;
`

export const DescriptionContent = styled.div`
  text-align: justify;
`
export const EvaluateProduct = styled.div`
  background-color: #f8f9fa;
  width: 100%;
`
export const EvaluateTitle = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ccc;
  font-size: 20px;
  font-weight: 500;
  text-transform: uppercase;
`

export const AverageRating = styled.ul`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const SendRatingButton = styled.div`
  p {
    color: red;
    font-size: 20px;
    border: 2px solid #ddac52;
    padding: 20px;
  }
  button {
    width: 150px;
    height: 60px;
    border-radius: 10px;
    background-color: #ddac52;
    color: #333;
    font-size: 18px;
    &:hover {
      color: #fff !important;
      background-color: #7f462c;
    }
  }
`
export const CommentContainer = styled.div`
  width: 100%;
  background-color: #b1b1b1;
  padding: 30px;
  margin-top: 30px;
  border-radius: 10px;
`
export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const CommentItem = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const CommentItemName = styled.div`
  font-size: 18px;
  font-weight: 500;
`
export const CommentItemRate = styled.div``
export const CommentItemContent = styled.div`
  font-size: 16px;
`
export const CommentItemTime = styled.div`
  color: #9d9d9d;
`
export const RelatedProduct = styled.div`
  text-align: center;
`
export const RelatedProductTitle = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 30px;
  font-weight: 500;
  text-transform: uppercase;
`
export const ProductItem = styled.div`
  cursor: pointer;
  margin: 30px 0;
  padding-bottom: 100px;
  transition: transform 1s ease;
  overflow: hidden;
  &:hover {
    transform: scale(1.1);
  }
`
export const ProductWrapper = styled.div`
  position: relative;
`

export const ProductImage = styled.div`
  text-align: center;
  & img {
    width: 70%;
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
  font-weight: 500;
`
export const ProductPrice = styled.div`
  color: #ddac52;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
`

export const AddToCartButton2 = styled.div`
  position: absolute;
  top: 20px;
  left: 30px;
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
  width: 100%;
  button {
    display: inline-block;
    height: 50px;
    width: 100%;
    padding: 10px 20px;
    outline: none;
    text-transform: uppercase;
    border-radius: 40px;
    background-color: #7f462c;
    color: #fff;
    font-size: 12px;
    text-align: center;
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

export const BreadcrumbContainer = styled.div`
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
  padding-top: 30px;
  margin-bottom: 20px;
`
