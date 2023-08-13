import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Input, DatePicker } from 'antd'

import {
  getUserInfoRequest,
  updateUserInfoRequest,
} from 'redux/slicers/auth.slice'

function UserInfo() {
  const dispatch = useDispatch()
  const [updateUserInfoForm] = Form.useForm()
  const { userInfo } = useSelector((state) => state.auth)
  const initialValues = {
    fullName: userInfo.data.fullName,
    email: userInfo.data.email,
    phoneNumber: userInfo.data.phoneNumber,
  }

  const handleUpdateUserInfo = (values) => {
    dispatch(
      updateUserInfoRequest({
        id: userInfo.data.id,
        data: {
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
        },
        callback: () => dispatch(getUserInfoRequest({ id: userInfo.data.id })),
      })
    )
  }

  return (
    <Form
      form={updateUserInfoForm}
      name="updateUserInfoForm"
      layout="vertical"
      onFinish={(values) => handleUpdateUserInfo(values)}
      autoComplete="off"
      initialValues={initialValues}
    >
      <Form.Item
        label="Họ và tên"
        name="fullName"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name="phoneNumber"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Ngày sinh"
        name="birthday"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        Submit
      </Button>
    </Form>
  )
}

export default UserInfo
