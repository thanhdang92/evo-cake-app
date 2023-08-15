import { Badge, Button, Col, Drawer, Dropdown, Menu, Row, Space } from 'antd'
import * as S from './styles'
import {
  AlignLeftOutlined,
  AppstoreOutlined,
  BookOutlined,
  DownOutlined,
  FacebookOutlined,
  HomeOutlined,
  InstagramOutlined,
  LikeOutlined,
  MailOutlined,
  PhoneOutlined,
  SettingOutlined,
  ShoppingOutlined,
  TwitterOutlined,
  UserOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ROUTES } from 'constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequest } from 'redux/slicers/auth.slice'
import { useMemo, useState } from 'react'
const Header = () => {
  const dispatch = useDispatch()
  const { cartList } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)
  const handleLogout = () => {
    dispatch(logoutRequest())
  }

  const items = useMemo(
    () => [
      {
        key: '1',
        label: userInfo.data.id ? (
          <Link to={ROUTES.USER.PROFILE}>Thông tin cá nhân</Link>
        ) : (
          <Link to={ROUTES.REGISTER}>Đăng ký</Link>
        ),
      },
      {
        key: '2',
        label: userInfo.data.id ? (
          <Link onClick={() => handleLogout()}>Đăng xuất</Link>
        ) : (
          <Link to={ROUTES.LOGIN}>Đăng nhập</Link>
        ),
      },
    ],
    [userInfo.data.id]
  )

  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState('left')
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const onChange = (e) => {
    setPlacement(e.target.value)
  }
  return (
    <S.HeaderWrapper>
      <S.Container>
        <S.Menu>
          <S.MenuContainer>
            <Row align="middle">
              <Col lg={8} md={24} xs={24}>
                <Link to={ROUTES.USER.HOME}>
                  <S.Logo>
                    <img
                      src="https://preview.milingona.co/themes/bakery/catalog/wp-content/uploads/2017/12/bakery-catalog-logo-dark-2.png"
                      alt=""
                    />
                  </S.Logo>
                </Link>
              </Col>
              <Col lg={10} style={{ textAlign: 'center' }}>
                <S.NavBar>
                  <S.NavBarList>
                    <Row justify="space-between">
                      <Col lg={6}>
                        <S.NavBarItem>
                          <Link to={ROUTES.USER.HOME}>Trang chủ</Link>
                        </S.NavBarItem>
                      </Col>
                      <Col lg={6}>
                        <S.NavBarItem>
                          <Link to={ROUTES.USER.PRODUCT_LIST}>Sản phẩm</Link>
                        </S.NavBarItem>
                      </Col>
                      <Col lg={6}>
                        <S.NavBarItem>
                          <Link to={ROUTES.USER.HOME}>Tin Tức</Link>
                        </S.NavBarItem>
                      </Col>
                      <Col lg={6}>
                        <S.NavBarItem>
                          <Link to={ROUTES.CONTACT}>Liên hệ</Link>
                        </S.NavBarItem>
                      </Col>
                    </Row>
                  </S.NavBarList>
                </S.NavBar>
              </Col>
              <Col lg={6}>
                <Row align="middle">
                  <Col lg={12}>
                    {userInfo.data.id ? (
                      <Dropdown menu={{ items }} placement="bottomLeft">
                        <S.User>
                          <UserOutlined />
                          {userInfo.data.fullName}
                        </S.User>
                      </Dropdown>
                    ) : (
                      <Dropdown menu={{ items }} placement="bottomLeft">
                        <S.User>
                          <UserOutlined />
                          Tài khoản
                        </S.User>
                      </Dropdown>
                    )}
                  </Col>
                  <Col lg={12}>
                    <Link to={ROUTES.USER.CART}>
                      <Badge
                        count={cartList.length}
                        size="default"
                        className="cartContainer"
                      >
                        <S.Cart>
                          <ShoppingOutlined style={{ fontSize: 25 }} />
                        </S.Cart>
                      </Badge>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="NavBarMb">
              <Col span={24} style={{ textAlign: 'center', marginTop: 30 }}>
                <Button
                  type="primary"
                  onClick={showDrawer}
                  icon={<AlignLeftOutlined />}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                  }}
                ></Button>
                <Drawer
                  title="Menu"
                  placement={placement}
                  closable={false}
                  onClose={onClose}
                  open={open}
                  key={placement}
                >
                  <Link to={ROUTES.USER.HOME}>
                    <S.NavBarItemMb onClick={() => onClose()}>
                      <HomeOutlined />
                      Trang chủ
                    </S.NavBarItemMb>
                  </Link>
                  <Link to={ROUTES.USER.PRODUCT_LIST}>
                    <S.NavBarItemMb onClick={() => onClose()}>
                      <LikeOutlined />
                      Sản phẩm
                    </S.NavBarItemMb>
                  </Link>
                  <Link to={ROUTES.CONTACT}>
                    <S.NavBarItemMb onClick={() => onClose()}>
                      <PhoneOutlined /> Liên Hệ
                    </S.NavBarItemMb>
                  </Link>
                  <Link to={ROUTES.USER.HOME}>
                    <S.NavBarItemMb onClick={() => onClose()}>
                      <BookOutlined />
                      Tin tức
                    </S.NavBarItemMb>
                  </Link>
                  <Link to={ROUTES.USER.CART}>
                    <S.NavBarItemMb onClick={() => onClose()}>
                      <ShoppingOutlined />
                      Giỏ Hàng
                    </S.NavBarItemMb>
                  </Link>
                  <Link to={ROUTES.PROFILE}>
                    <S.NavBarItemMb onClick={() => onClose()}>
                      <UserOutlined /> Tài khoản
                    </S.NavBarItemMb>
                  </Link>
                </Drawer>
              </Col>
            </Row>
          </S.MenuContainer>
        </S.Menu>
      </S.Container>
    </S.HeaderWrapper>
  )
}
export default Header
