import { Button, Col, Row } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import * as S from './styles'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

const Breakfast = () => {
  const { productList } = useSelector((state) => state.product)
  const breakfastList = productList.data.filter((item) => item.categoryId === 3)

  const renderBreakfastList = useMemo(() => {
    return breakfastList.map((item) => {
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
                    <S.IconCart>
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
  }, [breakfastList])

  return (
    <S.BreakfastListWrapper>
      <S.Container>
        <Row>
          <Col lg={24}>
            <Row justify="center">
              <Col lg={24} md={24} xs={24}>
                <S.Title>Bữa sáng</S.Title>
              </Col>
            </Row>
            <Row wrap={true} gutter={[30, 16]} justify="center">
              {renderBreakfastList}
            </Row>
          </Col>
        </Row>
      </S.Container>
    </S.BreakfastListWrapper>
  )
}

export default Breakfast
