import { useEffect, useMemo } from 'react'
import { Link, generatePath } from 'react-router-dom'
import { Card, Row, Col, Spin, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { ROUTES } from 'constants/routes'
import { getFavoriteListRequest } from 'redux/slicers/favorite.slice'

function FavoriteProducts() {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)
  const { favoriteList } = useSelector((state) => state.favorite)

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(
        getFavoriteListRequest({
          userId: userInfo.data.id,
        })
      )
    }
  }, [userInfo.data.id])

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (_, item) => (
        <Row align="middle">
          <Col lg={6}>
            <img
              src={item.image}
              alt=""
              style={{ width: '50%', textAlign: 'center' }}
            />
          </Col>
          <Col lg={18}>{item.name}</Col>
        </Row>
      ),
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      render: (_, item) => `${item.price}`,
    },
  ]
  const favoriteListProduct = favoriteList.data.map((item) => item.product)

  console.log(favoriteListProduct)

  return (
    <Spin spinning={favoriteList.loading}>
      <Row gutter={[16, 16]} justify="center">
        <Col lg={18}>
          <Table
            dataSource={favoriteListProduct}
            columns={columns}
            pagination={false}
          />
        </Col>
      </Row>
    </Spin>
  )
}

export default FavoriteProducts
