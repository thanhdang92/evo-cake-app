import { Row, Col, Button, InputNumber, Table } from 'antd'
import * as S from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartRequest, updateCartRequest } from 'redux/slicers/cart.slice'
import { Link } from 'react-router-dom'
import { ROUTES } from 'constants/routes'
const CartPage = () => {
  const dispatch = useDispatch()
  const { cartList } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)
  const total = cartList.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  )

  const handleChangeQuantity = (productId, value) => {
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
  const dataTable = cartList.map((item) => {
    return {
      ...item,
      key: item.productId,
    }
  })
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, item) => (
        <Row gutter={16} align="middle">
          <Col lg={4} md={4} xs={4}>
            <img src={item.image} alt="" />
          </Col>
          <Col lg={20} md={20} xs={20}>
            {item.name}
          </Col>
        </Row>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, item) => (
        <InputNumber
          value={item.quantity}
          min={1}
          onChange={(value) => handleChangeQuantity(item.productId, value)}
        />
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (_, item) => `${item.price.toLocaleString()}đ`,
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      width: '20%',
      render: (_, item) => (
        <Row justify="center">
          {(item.price * item.quantity).toLocaleString()}đ
        </Row>
      ),
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <Button onClick={() => handleRemoveProduct(item.productId)}>Xoá</Button>
      ),
    },
  ]

  return (
    <S.CartPagaWrapper>
      <S.CartPagaContainer>
        {cartList.length > 0 ? (
          <Row gutter={[20, 20]}>
            <Col lg={16} md={24} xs={24}>
              <Row style={{ padding: 20 }}>
                <Col span={24} style={{ fontSize: 30 }}>
                  Giỏ hàng của bạn
                </Col>
              </Row>
              <Row>
                <Col lg={24}>
                  <S.TableCartList>
                    <Table
                      dataSource={dataTable}
                      columns={columns}
                      pagination={false}
                      rowKey={cartList.productId}
                    />
                  </S.TableCartList>
                </Col>
              </Row>
            </Col>
            <Col lg={8} md={24} xs={24} style={{ border: '1px solid #ddd' }}>
              <Row gutter={[20, 30]} style={{ padding: 30 }}>
                <Col span={24} style={{ fontSize: 18 }} align="middle">
                  Tổng tiền:
                  <span style={{ fontSize: 22, color: 'red', fontWeight: 500 }}>
                    {total.toLocaleString()}đ
                  </span>
                </Col>
                <Col span={24} style={{ fontSize: 20, textAlign: 'center' }}>
                  Bạn đang có{' '}
                  <span style={{ color: 'red', fontWeight: 600 }}>
                    {cartList.length}
                  </span>{' '}
                  sản phẩm
                </Col>
                <Col span={24} align="middle">
                  <Link to={ROUTES.USER.CHECKOUT}>
                    <S.CheckOutBtn>Thanh Toán</S.CheckOutBtn>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <S.CartEmpty>
            <Row gutter={[20, 20]}>
              <Col
                lg={24}
                style={{ textAlign: 'center', fontSize: 30, fontWeight: 500 }}
              >
                Không có sản phẩm trong giỏ hàng
              </Col>
              <Col lg={24} style={{ textAlign: 'center' }}>
                <Link to={ROUTES.USER.PRODUCT_LIST}>
                  <span style={{ fontSize: 20 }}>Bấm để tiếp tục mua hàng</span>
                </Link>
              </Col>
            </Row>
          </S.CartEmpty>
        )}
      </S.CartPagaContainer>
    </S.CartPagaWrapper>
  )
}
export default CartPage
