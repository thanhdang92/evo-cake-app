import styled from 'styled-components'

export const CheckoutPageWrapper = styled.div``

export const Container = styled.div`
  width: 85%;
  margin: 0 auto;
  border: 1px solid #ccc;
  button {
    border-radius: 5px;
    height: 50px;
    font-size: 20px;
    text-transform: uppercase;
    &:hover {
      color: #fff !important;
      background-color: #6b4200 !important;
    }
  }
`
export const CheckoutPageTitle = styled.div``

export const CheckoutPageCart = styled.div`
  width: 100%;
  img {
    border: 1px solid #ccc;
    box-shadow: 1px 2px 2px #ccc;
  }
`
export const TableName = styled.div`
  font-size: 12px;
  font-style: oblique;
  font-weight: 500;
`
export const TotalPrice = styled.div`
  font-size: 25px;
  color: red;
  font-weight: 500;
`
