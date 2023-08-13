import { Badge, Col, Dropdown, Row, Space } from 'antd'
import * as S from './styles'
import {
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  ShoppingOutlined,
  TwitterOutlined,
  UserOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ROUTES } from 'constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequest } from 'redux/slicers/auth.slice'
import { useMemo } from 'react'
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

  return (
    <S.HeaderWrapper>
      <S.Container>
        <S.TopBar>
          <Row align="middle">
            <Col lg={10} className="tb-left" md={10} xs={10}>
              <span style={{ marginRight: 20 }}>Follow us</span>
              <Space>
                <S.TopBarIcon>
                  <FacebookOutlined />
                </S.TopBarIcon>
                <S.TopBarIcon>
                  <TwitterOutlined />
                </S.TopBarIcon>
                <S.TopBarIcon>
                  <YoutubeOutlined />
                </S.TopBarIcon>
                <S.TopBarIcon>
                  <InstagramOutlined />
                </S.TopBarIcon>
              </Space>
            </Col>
            <Col lg={14} className="tb-right" md={10} xs={10}>
              <span style={{ marginRight: 30 }}>
                <PhoneOutlined style={{ marginRight: 10 }} />
                0935161910
              </span>
              <span>
                <MailOutlined style={{ marginRight: 10 }} />
                dangthanh.610@gmail.com
              </span>
            </Col>
          </Row>
        </S.TopBar>
        <S.Menu>
          <S.MenuContainer>
            <Row align="middle">
              <Col span={8}>
                <Link to={ROUTES.USER.HOME}>
                  <S.Logo>
                    <img
                      src="https://preview.milingona.co/themes/bakery/catalog/wp-content/uploads/2017/12/bakery-catalog-logo-dark-2.png"
                      alt=""
                    />
                  </S.Logo>
                </Link>
              </Col>
              <Col span={10}>
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
              <Col span={6}>
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
                      <Badge count={cartList.length}>
                        <S.Cart>
                          <ShoppingOutlined />
                        </S.Cart>
                      </Badge>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </S.MenuContainer>
        </S.Menu>
      </S.Container>
    </S.HeaderWrapper>
  )
}
export default Header
