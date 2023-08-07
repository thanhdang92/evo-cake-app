import React from 'react'
import { useSelector } from 'react-redux' // Import tương ứng cho React Context nếu bạn sử dụng Context
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { ROUTES } from 'constants/routes'

const BreadcrumbComponent = () => {
  const breadcrumb = useSelector((state) => state.breadcrumb) // Lấy thông tin breadcrumb từ Redux Store hoặc React Context
  console.log(
    '🚀 ~ file: index.jsx:7 ~ BreadcrumbComponent ~ breadcrumb:',
    breadcrumb.breadcrumb
  )

  return (
    <Breadcrumb>
      {/* {breadcrumb.map((item, index) => (
        <Breadcrumb.Item key={index}>
          <a href="#">{item}</a>
        </Breadcrumb.Item>
      ))} */}
      <Breadcrumb.Item>
        <Link to={ROUTES.USER.HOME}>Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to={ROUTES.USER.PRODUCT_LIST}>{breadcrumb.breadcrumb}</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default BreadcrumbComponent
