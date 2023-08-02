import { Row, Col, Button, Badge, Drawer, Dropdown } from 'antd'
import * as S from './styles'
import {
  MenuOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ROUTES } from 'constants/routes'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequest } from 'redux/slicers/auth.slice'

const AdminHeader = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const [open, setOpen] = useState(false)
  const { cartList } = useSelector((state) => state.cart)

  const [placement, setPlacement] = useState('left')
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const items = [
    {
      key: '1',
      label: <S.DropDownUser>Thông tin cá nhân</S.DropDownUser>,
    },
    {
      key: '2',
      label: (
        <S.DropDownUser onClick={() => handleLogOut()}>
          Đăng xuất
        </S.DropDownUser>
      ),
    },
  ]

  const handleLogOut = () => {
    dispatch(logoutRequest())
  }
  return (
    <S.HeaderWrapper>
      <S.Container>
        <Row align="middle">
          <Col lg={10} md={10} xs={10}>
            <Row justify="center" align="middle">
              <Col lg={6}>
                <Row justify="center">
                  <S.IconMenu onClick={showDrawer}>
                    <MenuOutlined />
                  </S.IconMenu>
                </Row>
                <Drawer
                  placement={placement}
                  closable={false}
                  onClose={onClose}
                  open={open}
                  key={placement}
                  width={350}
                >
                  <Row>
                    <Col lg={24}>
                      <S.LogoMenu>
                        <img
                          src="https://hinhanh.webvua.com/images/logo/4807/resize/0173075530402.png"
                          alt=""
                        />
                      </S.LogoMenu>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={24}>
                      <S.MenuList>
                        <S.MenuItem onClick={() => setOpen(false)}>
                          <Link to={ROUTES.USER.HOME}>Trang Chủ</Link>
                        </S.MenuItem>
                        <S.MenuItem onClick={() => setOpen(false)}>
                          <Link to={ROUTES.USER.PRODUCT_LIST}>Sản phẩm</Link>
                        </S.MenuItem>
                        <S.MenuItem onClick={() => setOpen(false)}>
                          <Link to={ROUTES.USER.HOME}>Tin Tức</Link>
                        </S.MenuItem>
                        <S.MenuItem onClick={() => setOpen(false)}>
                          <Link to={ROUTES.USER.HOME}>Liên Hệ</Link>
                        </S.MenuItem>
                      </S.MenuList>
                    </Col>
                  </Row>
                </Drawer>
              </Col>
              <Col lg={18}>
                <S.PhoneNumber>
                  <PhoneOutlined />
                  <p>0935161910</p>
                </S.PhoneNumber>
              </Col>
            </Row>
          </Col>
          <Col lg={4} md={4} xs={4}>
            <Row justify="center">
              <Link to={ROUTES.USER.HOME}>
                <img
                  src="https://hinhanh.webvua.com/images/logo/4807/resize/0173075530402.png"
                  alt=""
                />
              </Link>
            </Row>
          </Col>
          <Col lg={10} md={10} xs={10}>
            <Row justify="end">
              <S.HeaderLogin>
                {userInfo.data.id ? (
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomLeft"
                  >
                    <Button
                      type="text"
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: '#a06c0a',
                      }}
                    >
                      <UserOutlined />
                      {userInfo.data.fullName}
                    </Button>
                  </Dropdown>
                ) : (
                  <Link to={ROUTES.LOGIN}>
                    <Button>Login</Button>
                  </Link>
                )}
              </S.HeaderLogin>
              <S.HeaderCart>
                <Link to={ROUTES.USER.CART}>
                  <Button type="text">
                    <Badge count={cartList.length}>
                      <ShoppingCartOutlined style={{ fontSize: 30 }} />
                    </Badge>
                  </Button>
                </Link>
              </S.HeaderCart>
            </Row>
          </Col>
        </Row>
      </S.Container>
    </S.HeaderWrapper>
  )
}

export default AdminHeader
