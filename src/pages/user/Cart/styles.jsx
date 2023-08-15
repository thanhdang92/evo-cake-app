import styled from 'styled-components'

export const CartPagaWrapper = styled.div``
export const CartPagaContainer = styled.div`
  width: 85%;
  margin: 50px auto;
`
export const TableCartList = styled.div`
  table th {
    text-align: center !important;
  }
`
export const CheckOutBtn = styled.button`
  width: 200px;
  height: 50px;
  border: none;
  font-size: 20px;
  text-transform: uppercase;
  border-radius: 10px;
  background-color: #ddac52;
  cursor: pointer;
  &:hover {
    background-color: #6b4500;
    color: #fff;
  }
`
export const CartEmpty = styled.div`
  border: 1px solid #ddd;
  padding: 30px;
`
