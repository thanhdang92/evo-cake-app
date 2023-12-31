import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  background-color: #ddac52;
`
export const Container = styled.div``
export const TopBar = styled.div`
  color: #fff;
  width: 85%;
  padding: 10px;
  margin: 0 auto;
  line-height: 1;
  font-size: 13px;

  .tb-left {
    text-align: left;
  }
  .tb-right {
    text-align: right;
  }
`
export const TopBarIcon = styled.div`
  display: inline-block;
  font-size: 13px;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  border-radius: 50%;
  transition: all 0.45s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #333;
  }
`
export const Menu = styled.div`
  width: 100%;
  background-color: #fdeabb;
  .user_cart {
    text-align: right;
    button {
      font-size: 16px;
    }
  }
`
export const MenuContainer = styled.div`
  width: 85%;
  margin: 0 auto;
  padding: 30px 0;

  @media (max-width: 1024px) {
    .cartContainer {
      display: none;
    }
  }
  .NavBarMb {
    display: none;
  }
  @media (max-width: 1024px) {
    .NavBarMb {
      display: block;
    }
  }
`
export const Logo = styled.div`
  width: 100%;
  text-align: center;
  img {
    width: 100px;
    height: 40px;
  }
`

export const NavBar = styled.div``

export const NavBarList = styled.div`
  display: block;
  @media (max-width: 1024px) {
    display: none;
  }
`
export const NavBarItem = styled.div`
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  a {
    color: #555;
  }
  &:hover a {
    color: #ddac52;
  }
`
export const User = styled.div`
  color: #555;
  font-size: 16px;
  text-align: right;
  font-weight: 600;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    color: #ddac52;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`
export const Cart = styled.div`
  color: #555;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #ddac52;
  }
`
export const NavBarItemMb = styled.div`
  text-align: left;
  padding: 15px;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  color: #333;
  span {
    margin-right: 10px;
  }
`
