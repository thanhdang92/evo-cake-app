import { Row, Col, Button, InputNumber, Empty, Popconfirm } from 'antd'
import * as S from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { removeCartRequest, updateCartRequest } from 'redux/slicers/cart.slice'
import { Link } from 'react-router-dom'
import { ROUTES } from 'constants/routes'
import { updateBreadcrumb } from 'redux/slicers/breadcrumb.slice'
import BreadcrumbComponent from '../Breadcrumb'

const CartPage = () => {
  const dispatch = useDispatch()
  const { cartList } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)
  const total = cartList.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  )
  useEffect(() => {
    dispatch(updateBreadcrumb('Cart')) // Thêm "Cart" vào breadcrumb khi vào trang Cart
  }, [dispatch])
  const handleOnchangeQuantity = (value, productId) => {
    dispatch(
      updateCartRequest({
        value: value,
        productId: productId,
        userId: userInfo.data.id,
      })
    )
  }
  const handleRemoveProduct = (productId) => {
    dispatch(
      removeCartRequest({
        productId: productId,
      })
    )
  }
  const renderCartList = useMemo(() => {
    return cartList.map((item) => {
      return (
        <Col lg={24} md={24} xs={24} key={item.productId}>
          <Row
            style={{ borderBottom: '1px solid #333', padding: '30px 0' }}
            align="middle"
            gutter={[16, 16]}
          >
            <Col lg={4} md={4} xs={4}>
              <img src={item.image} alt="" />
            </Col>
            <Col lg={10} md={10} xs={10}>
              <Row>{item.name}</Row>
              <Row style={{ marginTop: 20, color: '#909090' }}>
                {item.price.toLocaleString()} VNĐ
              </Row>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <Row style={{ fontSize: 20, marginBottom: 10 }}>
                {(item.price * item.quantity).toLocaleString()} VNĐ
              </Row>
              <Row align="middle" justify="space-around">
                <Col lg={16} md={16} xs={16}>
                  <Row style={{ marginRight: 5 }}>
                    <InputNumber
                      min={1}
                      defaultValue={item.quantity}
                      onChange={(value) =>
                        handleOnchangeQuantity(value, item.productId)
                      }
                    />
                  </Row>
                </Col>
                <Col lg={8} md={8} xs={8}>
                  <Row>Cái</Row>
                </Col>
              </Row>
            </Col>
            <Col lg={4} md={4} xs={4}>
              <Button danger type="link">
                <Popconfirm
                  title="Xoá sản phẩm"
                  description="Bạn chắc chắn muốn xoá?"
                  onConfirm={() => handleRemoveProduct(item.productId)}
                  icon={
                    <QuestionCircleOutlined
                      style={{
                        color: 'red',
                      }}
                    />
                  }
                >
                  <DeleteOutlined style={{ fontSize: 25 }} />
                </Popconfirm>
              </Button>
            </Col>
          </Row>
        </Col>
      )
    })
  }, [cartList])
  return (
    <S.CartPagaWrapper>
      <S.CartPagaContainer>
        <Row>
          <BreadcrumbComponent></BreadcrumbComponent>
        </Row>
        <Row gutter={[16, 16]}>
          <Col lg={16} md={24} xs={24}>
            <Row
              style={{ borderBottom: '1px solid #333', paddingBottom: 30 }}
              align="middle"
            >
              <Col lg={12}>
                <p style={{ fontSize: 30, fontWeight: 600 }}>
                  Giỏ hàng của bạn
                </p>
              </Col>
              <Col lg={12}>
                <p style={{ fontSize: 20 }}>
                  Bạn đang có <b>{cartList.length}</b> sản phẩm trong giỏ hàng
                </p>
              </Col>
            </Row>
            <Row
              gutter={[16, 16]}
              style={{
                marginTop: 30,
                border: '3px solid #ecc347',
                padding: 30,
                borderRadius: 10,
              }}
              justify="center"
            >
              {cartList.length > 0 ? renderCartList : <Empty />}
            </Row>
          </Col>
          <Col lg={8} md={24} xs={24}>
            <S.OderSummaryWrapper>
              <Row justify="space-around" align="middle">
                <div style={{ fontSize: 20 }}>Tổng tiền:</div>
                <div style={{ fontSize: 30, color: 'red', fontWeight: 600 }}>
                  {' '}
                  {total.toLocaleString()} VNĐ
                </div>
              </Row>
              <Row>
                <Link to={ROUTES.USER.CHECKOUT}>
                  <Button
                    style={{
                      width: '100%',
                      margin: '20px',
                      backgroundColor: 'red',
                      color: '#fff',
                      height: 50,
                    }}
                  >
                    Thanh Toán
                  </Button>
                </Link>
              </Row>
            </S.OderSummaryWrapper>
          </Col>
        </Row>
      </S.CartPagaContainer>
    </S.CartPagaWrapper>
  )
}
export default CartPage
