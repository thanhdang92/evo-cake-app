import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, message, notification } from 'antd'

import { changePasswordRequest, logoutRequest } from 'redux/slicers/auth.slice'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from 'constants/routes'

function ChangePassword() {
  const navigate = useNavigate()
  const [changePasswordForm] = Form.useForm()

  const { userInfo, changePasswordData } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (changePasswordData.error) {
      changePasswordForm.setFields([
        {
          name: 'password',
          errors: ['Password is incorrect!'],
        },
      ])
    }
  }, [changePasswordData.error])

  const handleChangePassword = (values) => {
    dispatch(
      changePasswordRequest({
        id: userInfo.data.id,
        data: {
          email: userInfo.data.email,
          password: values.password,
          newPassword: values.newPassword,
        },
        callback: () => {
          changePasswordForm.resetFields()
          notification.success({ message: 'Thay đổi mật khẩu thành công!' })
          dispatch(logoutRequest())
          // navigate(ROUTES.USER.HOME)
        },
      })
    )
  }

  return (
    <Form
      form={changePasswordForm}
      name="changePasswordForm"
      layout="vertical"
      onFinish={(values) => handleChangePassword(values)}
      autoComplete="off"
    >
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="New password"
        name="newPassword"
        rules={[
          {
            required: true,
            message: 'Please input your new password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm new password"
        name="confirmNewPassword"
        rules={[
          {
            required: true,
            message: 'Please input your confirm new password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                'The two passwords that you entered do not match!'
              )
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        block
        loading={changePasswordData.load}
      >
        Submit
      </Button>
    </Form>
  )
}

export default ChangePassword
