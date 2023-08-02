import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  background-image: url('http://4807.webvua.com/bizweb.dktcdn.net/100/366/378/themes/736342/assets/br-bg8293.png?1569937621356');
  padding: 10px 0;
  margin: 0;
  text-align: center;
  padding-bottom: 80px;
  background-position: 50% 100%;
  background-size: cover;
  text-align: center;
`
export const Container = styled.div`
  background-color: transparent;
  width: 85%;
  margin: 0 auto;
  margin-top: 30px;
`
export const IconMenu = styled.div`
  background-color: #ddac52;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 25px;
  cursor: pointer;
`
export const PhoneNumber = styled.div`
  display: flex;
  cursor: pointer;
  & span {
    margin-right: 10px;
  }
  &:hover {
    color: #ddac52;
  }
`

export const HeaderLogin = styled.div`
  width: 150px;
  border: 1px solid #ddac52;
  border-radius: 10px;
  & button {
    width: 100%;
  }
`
export const DropDownUser = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  &:hover {
    color: #ddac52;
  }
`

export const HeaderCart = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  & button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & span {
    font-size: 15px;
  }
`

export const LogoMenu = styled.div`
  text-align: center;
  border-bottom: 2px solid #ddac52;
`
export const MenuList = styled.div`
  text-align: center;
  font-size: 16px;
`
export const MenuItem = styled.div`
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  padding: 20px;
  & a {
    color: #333;
  }
  &:hover a {
    color: #ddac52;
  }
`
