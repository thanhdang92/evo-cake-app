import { Col, Row, Form, Input, Button } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

import * as S from './styles'
import { ROUTES } from 'constants/routes'
import { useDispatch } from 'react-redux'
import { loginRequest } from 'redux/slicers/auth.slice'
const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmitLogin = (values) => {
    dispatch(
      loginRequest({
        data: values,
        callback: () => navigate(ROUTES.USER.HOME),
      })
    )
  }
  return (
    <S.LoginPageWrapper>
      <S.Container>
        <Row justify="center" align="middle">
          <Col span={24}>
            <S.Title>Đăng nhập</S.Title>
            <Form
              name="normal_login"
              onFinish={(values) => handleSubmitLogin(values)}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập email',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Row justify="center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: 200, height: 40, borderRadius: 10 }}
                  >
                    Log in
                  </Button>
                </Row>

                <Row justify="center" style={{ marginTop: 20 }}>
                  <span>Bạn không có tài khoản?</span>
                  <Link to={ROUTES.REGISTER}>Đăng Ký</Link>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </S.Container>
    </S.LoginPageWrapper>
  )
}
export default LoginPage
