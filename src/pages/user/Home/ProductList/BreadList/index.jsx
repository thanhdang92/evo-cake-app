import { Button, Col, Row, notification } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import * as S from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { addToCartRequest } from 'redux/slicers/cart.slice'

const BreadList = () => {
  const dispatch = useDispatch()
  const { productList } = useSelector((state) => state.product)
  const breadList = productList.data.filter((item) => item.categoryId === 1)
  const handleAddToCart = (item) => {
    dispatch(
      addToCartRequest({
        data: {
          productId: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: 1,
        },
      })
    )
    notification.success({ duration: 1, message: 'Them vao gio thanh cong' })
  }
  const renderBreadList = useMemo(() => {
    return breadList.map((item) => {
      return (
        <Col lg={4} md={8} xs={24} key={item.id}>
          <S.ProductItem>
            <Row>
              <S.ProductImage>
                <img src={item.image} alt="Product" />
              </S.ProductImage>
            </Row>
            <S.ProductWrapper>
              <S.ProductInfo>
                <Row justify="center">
                  <Col lg={24}>
                    <S.ProductName>{item.name}</S.ProductName>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col lg={24}>
                    <S.ProductPrice>
                      {item.price.toLocaleString()} VNĐ
                    </S.ProductPrice>
                  </Col>
                </Row>
              </S.ProductInfo>
              <S.AddToCartButton>
                <Row justify="space-between" align="middle">
                  <Col lg={18}>
                    <S.ShowProductButton>
                      <Button>Xem thêm</Button>
                    </S.ShowProductButton>
                  </Col>
                  <Col lg={6}>
                    <S.IconCart onClick={() => handleAddToCart(item)}>
                      <Button type="text">
                        <ShoppingCartOutlined />
                      </Button>
                    </S.IconCart>
                  </Col>
                </Row>
              </S.AddToCartButton>
            </S.ProductWrapper>
          </S.ProductItem>
        </Col>
      )
    })
  }, [breadList])

  return (
    <S.BreadListWrapper>
      <S.Container>
        <Row>
          <Col lg={24}>
            <Row justify="center">
              <Col lg={24} md={24} xs={24}>
                <S.Title>Bánh Mì</S.Title>
              </Col>
            </Row>
            <Row wrap={true} gutter={[30, 16]} justify="center">
              {renderBreadList}
            </Row>
          </Col>
        </Row>
      </S.Container>
    </S.BreadListWrapper>
  )
}

export default BreadList
