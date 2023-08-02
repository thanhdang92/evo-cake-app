import { Row, Col, Form, Button, Input, Select, Radio, Card, Table } from 'antd'
import * as S from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import {
  getCityListRequest,
  getDistrictListRequest,
  getWardListRequest,
} from 'redux/slicers/location.slice'
import { orderProductRequest } from 'redux/slicers/order.slice'
import { ROUTES } from 'constants/routes'

const CheckoutPage = () => {
  const [checkoutForm] = Form.useForm()
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
  }
  const tableColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (_, item) =>
        `${(item.price * item.quantity).toLocaleString()} VND`,
    },
  ]
  useEffect(() => {
    dispatch(getCityListRequest())
  }, [])

  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.resetFields()
    }
  }, [userInfo.data])

  const handleSubmitCheckoutForm = (values) => {
    const totalPrice = cartList.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
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

        <Row style={{ padding: 30 }}>
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
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại',
                      },
                    ]}
                  >
                    <Input />
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
                      <Radio value={1}>Pay</Radio>
                      <Radio value={2}>COD</Radio>
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
                <Col span={24}>
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
          </Col>
        </Row>
      </S.Container>
    </S.CheckoutPageWrapper>
  )
}

export default CheckoutPage
