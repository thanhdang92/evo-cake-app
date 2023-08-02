import styled from 'styled-components'

export const ProductNewWrapper = styled.div`
  background-image: url('https://hinhanh.webvua.com/images/adv/4807/8004280303032.jpg');
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  padding: 30px 0;
  margin-top: 30px;
  position: relative;
`

export const Container = styled.div`
  width: 85%;
  margin: 0 auto;
`

export const Title = styled.div`
  text-align: center;
  font-size: 30px;
  text-transform: uppercase;
  padding: 30px 0;
`

export const ProductNewImage = styled.img`
  width: 80%;
  border-radius: 50%;
  opacity: 1;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }
`
