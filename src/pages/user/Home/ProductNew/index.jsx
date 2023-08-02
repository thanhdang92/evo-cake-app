import { Col, Row } from 'antd'
import * as S from './styles'
const ProductNew = () => {
  return (
    <S.ProductNewWrapper>
      <S.Container>
        <Row justify="center">
          <S.Title>Sản phẩm mới</S.Title>
        </Row>
        <Row gutter={[30, 16]}>
          <Col lg={6}>
            <S.ProductNewImage src="https://hinhanh.webvua.com/images/adv/4807/resize/8280308580032.jpg" />
          </Col>
          <Col lg={6}>
            <S.ProductNewImage src="https://hinhanh.webvua.com/images/adv/4807/resize/2102646031155.jpg" />
          </Col>
          <Col lg={6}>
            <S.ProductNewImage src="https://hinhanh.webvua.com/images/adv/4807/resize/5255218286255.jpg" />
          </Col>
          <Col lg={6}>
            <S.ProductNewImage src="https://hinhanh.webvua.com/images/adv/4807/resize/0002070006202.jpg" />
          </Col>
        </Row>
      </S.Container>
    </S.ProductNewWrapper>
  )
}

export default ProductNew
