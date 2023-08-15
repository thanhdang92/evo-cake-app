import { Row, Col, Form, Button, Input, Select, Radio, Card, Table } from 'antd'
import * as S from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import {
  getCityListRequest,
  getDistrictListRequest,
  getWardListRequest,
} from 'redux/slicers/location.slice'
import { orderProductRequest } from 'redux/slicers/order.slice'
import { ROUTES } from 'constants/routes'

import { addToCartRequest, clearCartRequest } from 'redux/slicers/cart.slice'
const CheckoutPage = () => {
  const [checkoutForm] = Form.useForm()
  const [totalPrice, setTotalPrice] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  )
  const { cartList } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)
  const initialValues = {
    fullName: userInfo.data.fullName,
    email: userInfo.data.email,
    phoneNumber: userInfo.data.phoneNumber,
    prefix: '84',
  }

  const tableColumn = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: '60%',
      render: (_, item) => (
        <S.CheckoutPageCart>
          <Row gutter={10} align="middle">
            <Col lg={6} md={8} xs={24}>
              <img src={item.image} />
            </Col>
            <Col lg={18} md={16} xs={24}>
              <S.TableName>{item.name}</S.TableName>
            </Col>
          </Row>
        </S.CheckoutPageCart>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '5%',
      render: (_, item) => (
        <Row style={{ fontWeight: 500 }} justify="center">
          {item.quantity}
        </Row>
      ),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      render: (_, item) => (
        <Row style={{ color: 'red', fontWeight: 500 }}>
          {(item.price * item.quantity).toLocaleString()} VND
        </Row>
      ),
    },
  ]
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Select.Option value="84">+84</Select.Option>
      </Select>
    </Form.Item>
  )
  useEffect(() => {
    dispatch(getCityListRequest())
    setTotalPrice(
      cartList.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    )
  }, [])

  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.resetFields()
    }
  }, [userInfo.data])

  const handleSubmitCheckoutForm = (values) => {
    const { cityCode, districtCode, wardCode } = values
    const cityData = cityList.data.find((item) => item.code === cityCode)
    const districtData = districtList.data.find(
      (item) => item.code === districtCode
    )
    const wardData = wardList.data.find((item) => item.code === wardCode)
    dispatch(
      orderProductRequest({
        data: {
          ...values,
          cityName: cityData?.name,
          districtName: districtData?.name,
          wardName: wardData?.name,
          userId: userInfo.data.id,
          totalPrice: totalPrice,
          status: 'pending',
        },
        products: cartList,
        callback: () => navigate(ROUTES.USER.HOME),
      })
    )
    dispatch(clearCartRequest())
  }

  const renderCityOptions = useMemo(() => {
    return cityList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      )
    })
  }, [cityList.data])

  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      )
    })
  }, [districtList.data])

  const renderWardListOptions = useMemo(() => {
    return wardList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      )
    })
  }, [wardList.data])
  return (
    <S.CheckoutPageWrapper>
      <S.Container>
        <S.CheckoutPageTitle>Thông tin thanh toán</S.CheckoutPageTitle>
        <Row style={{ padding: 30 }} gutter={[20, 16]}>
          <Col lg={10} md={24} xs={24}>
            <Card size="small" title="Giỏ hàng" style={{ marginBottom: 24 }}>
              <Table
                size="small"
                columns={tableColumn}
                dataSource={cartList}
                rowKey="id"
                pagination={false}
              />
            </Card>
            <Row>
              <Col lg={12} style={{ fontSize: 25 }}>
                Tổng tiền:{' '}
              </Col>
              <Col lg={12}>
                <S.TotalPrice>{totalPrice?.toLocaleString()} VNĐ</S.TotalPrice>
              </Col>
            </Row>
          </Col>
          <Col lg={14} md={24} xs={24}>
            <Form
              layout="vertical"
              name="checkoutForm"
              form={checkoutForm}
              initialValues={initialValues}
              onFinish={(values) => handleSubmitCheckoutForm(values)}
            >
              <Row gutter={[20, 20]}>
                <Col lg={12} md={24} xs={24}>
                  <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập họ và tên',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập Email',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại',
                      },
                    ]}
                  >
                    <Input
                      addonBefore={prefixSelector}
                      style={{
                        width: '100%',
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Hình thức thanh toán"
                    name="pay"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn hình thức thanh toán',
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value="pay">Pay</Radio>
                      <Radio value="cod">COD</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col lg={12} md={24} xs={24}>
                  <Form.Item
                    label="Tỉnh/Thành"
                    name="cityCode"
                    rules={[
                      { required: true, message: 'Vui lòng chọn Tỉnh/Thành!' },
                    ]}
                  >
                    <Select
                      onChange={(value) => {
                        dispatch(getDistrictListRequest({ cityCode: value }))
                        checkoutForm.setFieldsValue({
                          districtCode: undefined,
                          wardCode: undefined,
                        })
                      }}
                    >
                      {renderCityOptions}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Quận/Huyện"
                    name="districtCode"
                    rules={[
                      { required: true, message: 'Vui lòng chọn Quận/Huyện!' },
                    ]}
                  >
                    <Select
                      onChange={(value) => {
                        dispatch(getWardListRequest({ districtCode: value }))
                        checkoutForm.setFieldsValue({
                          wardCode: undefined,
                        })
                      }}
                      disabled={!checkoutForm.getFieldValue('cityCode')}
                    >
                      {renderDistrictOptions}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Phường/Xã"
                    name="wardCode"
                    rules={[
                      { required: true, message: 'Vui lòng chọn Phường/Xã!' },
                    ]}
                  >
                    <Select
                      disabled={!checkoutForm.getFieldValue('districtCode')}
                    >
                      {renderWardListOptions}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: 'Required!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={12} md={24} xs={24}>
                  <Link to={ROUTES.USER.CART}>
                    <Row justify="center" style={{ marginTop: 20 }}>
                      <Button
                        style={{ width: '80%', backgroundColor: '#ddac52' }}
                      >
                        Trở lại
                      </Button>
                    </Row>
                  </Link>
                </Col>
                <Col lg={12} md={24} xs={24}>
                  <Row justify="center" style={{ marginTop: 20 }}>
                    <Button
                      style={{ width: '80%', backgroundColor: '#ddac52' }}
                      htmlType="submit"
                    >
                      Thanh Toán
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </S.Container>
    </S.CheckoutPageWrapper>
  )
}

export default CheckoutPage
