import { Row, Col, Button, InputNumber, Table } from 'antd'
import * as S from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartRequest, updateCartRequest } from 'redux/slicers/cart.slice'
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, item) => (
        <Row gutter={16} align="middle">
          <Col lg={4}>
            <img src={item.image} alt="" />
          </Col>
          <Col lg={20}>{item.name}</Col>
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
      render: (_, item) => `${(item.price * item.quantity).toLocaleString()}đ`,
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: () => <Button onClick={() => handleRemoveProduct()}>Xoá</Button>,
    },
  ]

  return (
    <S.CartPagaWrapper>
      <S.CartPagaContainer>
        <Row>
          <Col lg={18}>
            <Row>
              <Col lg={12}>Giỏ hàng của bạn</Col>
              <Col lg={12}>Bạn đang có {cartList.length} sản phẩm</Col>
            </Row>
            <Row>
              <Col lg={24}>
                <Table
                  dataSource={cartList}
                  columns={columns}
                  pagination={false}
                  rowKey="id"
                />
              </Col>
            </Row>
          </Col>
          <Col lg={6} style={{ border: '1px solid #ddd' }}>
            Tổng tiền : {total.toLocaleString()}đ
          </Col>
        </Row>
      </S.CartPagaContainer>
    </S.CartPagaWrapper>
  )
}
export default CartPage
