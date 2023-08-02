import { Col, Row } from 'antd'
import * as S from './styles'

const ProductNews = () => {
  return (
    <S.ProductNewsWrapper>
      <S.Container>
        <Row justify="center">
          <S.ProductNewsTitle>Tin Tức</S.ProductNewsTitle>
        </Row>
        <Row gutter={[30, 16]}>
          <Col lg={8} md={8} xs={24}>
            <S.Img>
              <img
                src="https://hinhanh.webvua.com/images/news/4807/resize/5543442203052.jpg"
                alt=""
              />
            </S.Img>
            <S.Description>
              <S.Title>
                Phá cách với phiên bản bánh táo hình chiếc kẹo mút ai nhìn cũng
                mê
              </S.Title>
              <S.Content>
                Nếu bạn muốn tìm một công thức bánh vừa mới lạ lại vừa ngon thì
                đây sẽ là một gợi ý không tệ chút nào. Bằng cách kết hợp các
                nguyên liệu, bạn sẽ có được chiếc bánh với nhân bên trong mềm và
                ngọt dịu. Hơn nữa, bánh còn được tạo hình giống như chiếc kẹo
                mút xinh xắn, đảm bảo nhìn thôi đã muốn thử ngay rồi đấy!
              </S.Content>
            </S.Description>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <S.Img>
              <img
                src="https://hinhanh.webvua.com/images/news/4807/resize/2700003005030.jpg"
                alt=""
              />
            </S.Img>
            <S.Description>
              <S.Title>
                Phá cách với phiên bản bánh táo hình chiếc kẹo mút ai nhìn cũng
                mê
              </S.Title>
              <S.Content>
                Nếu bạn muốn tìm một công thức bánh vừa mới lạ lại vừa ngon thì
                đây sẽ là một gợi ý không tệ chút nào. Bằng cách kết hợp các
                nguyên liệu, bạn sẽ có được chiếc bánh với nhân bên trong mềm và
                ngọt dịu. Hơn nữa, bánh còn được tạo hình giống như chiếc kẹo
                mút xinh xắn, đảm bảo nhìn thôi đã muốn thử ngay rồi đấy!
              </S.Content>
            </S.Description>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <S.Img>
              <img
                src="https://hinhanh.webvua.com/images/news/4807/resize/0062277540052.jpg"
                alt=""
              />
            </S.Img>
            <S.Description>
              <S.Title>
                Phá cách với phiên bản bánh táo hình chiếc kẹo mút ai nhìn cũng
                mê
              </S.Title>
              <S.Content>
                Nếu bạn muốn tìm một công thức bánh vừa mới lạ lại vừa ngon thì
                đây sẽ là một gợi ý không tệ chút nào. Bằng cách kết hợp các
                nguyên liệu, bạn sẽ có được chiếc bánh với nhân bên trong mềm và
                ngọt dịu. Hơn nữa, bánh còn được tạo hình giống như chiếc kẹo
                mút xinh xắn, đảm bảo nhìn thôi đã muốn thử ngay rồi đấy!
              </S.Content>
            </S.Description>
          </Col>
        </Row>
      </S.Container>
    </S.ProductNewsWrapper>
  )
}
export default ProductNews
