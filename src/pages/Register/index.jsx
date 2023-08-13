import { Col, Row, Form, Input, Button } from 'antd'
import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import * as S from './styles'
import { ROUTES } from 'constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { registerRequest } from 'redux/slicers/auth.slice'
import { useEffect } from 'react'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [registerForm] = Form.useForm()
  const { registerData } = useSelector((state) => state.auth)
  console.log(
    '🚀 ~ file: index.jsx:15 ~ RegisterPage ~ registerData:',
    registerData
  )

  useEffect(() => {
    if (registerData.error) {
      registerForm.setFields([
        {
          name: 'email',
          errors: [registerData.error],
        },
      ])
    }
  }, [registerData.error])

  const handleSubmit = (values) => {
    dispatch(
      registerRequest({
        data: {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          phoneNumber: values.phoneNumber,
        },
        callback: () => navigate(ROUTES.LOGIN),
      })
    )
  }
  return (
    <S.RegisterPageWrapper>
      <S.Container>
        <Row justify="center" align="middle">
          <Col span={24}>
            <S.Title>Đăng Ký</S.Title>
            <Form
              form={registerForm}
              name="normal_register"
              onFinish={(values) => handleSubmit(values)}
              layout="vertical"
            >
              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập họ và tên!',
                  },
                ]}
              >
                <Input placeholder="Họ và tên" />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'Định dạng email không đúng!',
                  },
                  {
                    required: true,
                    message: 'Vui lòng nhập email!',
                  },
                ]}
              >
                <Input placeholder="E-mail" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
                hasFeedback
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Xác nhận mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng xác nhận mật khẩu!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error('Xác nhận mật khẩu không trùng khớp!')
                      )
                    },
                  }),
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại!',
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item>
                <Row justify="center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: 200, height: 40, borderRadius: 10 }}
                  >
                    Đăng ký
                  </Button>
                </Row>

                <Row justify="center" style={{ marginTop: 20 }}>
                  <span>Bạn không có tài khoản?</span>
                  <Link to={ROUTES.LOGIN}>Đăng Nhập</Link>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </S.Container>
    </S.RegisterPageWrapper>
  )
}
export default RegisterPage
