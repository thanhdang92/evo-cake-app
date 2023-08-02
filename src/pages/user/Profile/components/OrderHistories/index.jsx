import { useEffect } from 'react'
import { Col, Row, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { getOrderListRequest } from 'redux/slicers/order.slice'

const OrderHistories = () => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)
  const { orderList } = useSelector((state) => state.order)
  console.log(
    '🚀 ~ file: index.jsx:13 ~ OrderHistories ~ orderList:',
    orderList.data
  )
  const productOrder = orderList.data.map((item) => item.orderDetails)
  console.log('productOrder', productOrder)
  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOrderListRequest({ userId: userInfo.data.id }))
    }
  }, [userInfo.data.id])

  const tableColumns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'orderDetails',
      key: 'orderDetails',
      render: (orderDetails) => `${orderDetails.length} products`,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => `${totalPrice.toLocaleString()} VND`,
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => moment(createdAt).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Địa chỉ giao hàng',
      dataIndex: 'address',
      key: 'address',
      render: (_, item) =>
        `${item.address}, ${item.wardName}, ${item.districtName}, ${item.cityName}`,
    },
  ]
  const tableProductColumns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'id',
      key: 'id',
      render: (_, item) => (
        <Row gutter={10} align="middle">
          <Col lg={2} md={8} xs={24}>
            <img src={item.image} />
          </Col>
          <Col lg={22} md={16} xs={24}>
            {item.name}
          </Col>
        </Row>
      ),
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'orderDetails',
      key: 'orderDetails',
      width: '20%',
      render: (_, item) => `${item.quantity}`,
    },
    {
      title: 'Thành tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: '20%',
      render: (_, item) => `${item.price.toLocaleString()} VND`,
    },
  ]
  return (
    <Row>
      <Col lg={24}>
        <Table
          columns={tableColumns}
          dataSource={orderList.data}
          rowKey="id"
          pagination={false}
          expandable={{
            expandedRowRender: (record) => (
              // <Row>
              //   {record.orderDetails.map((item) => (
              //     <Col lg={24} key={item.id}>
              //       <Row>
              //         <Col lg={4}>{item.name}</Col>
              //         <Col lg={8}>{item.price}</Col>
              //         <Col lg={6}>{item.quantity}</Col>
              //         <Col lg={6}>{item.price * item.quantity}</Col>
              //       </Row>
              //     </Col>
              //   ))}
              // </Row>
              <Table
                columns={tableProductColumns}
                dataSource={record.orderDetails}
                rowKey="id"
                pagination={false}
              />
            ),
          }}
        />
      </Col>
      <Col lg={24}></Col>
    </Row>
  )
}

export default OrderHistories
