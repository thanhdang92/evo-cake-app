import { Row, Col } from 'antd'
import Slider from 'react-slick'
import * as S from './styles'

function UserFooter() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  }
  return (
    <S.FooterWrapper>
      <S.Container>
        <Row align="middle">
          <Col lg={8} md={8} xs={24}>
            <S.Introduce>
              <S.IntroduceTitle>EVO CAKE - BÁNH TƯƠI MỖI NGÀY</S.IntroduceTitle>
              <S.IntroduceContent>
                Evo Cake bánh và cà phê khởi nguồn từ năm 2011 là thương hiệu
                sản xuất và bán bánh với slogan Bánh tươi mỗi ngày. Những năm
                đầu, sản phẩm chủ lực của Evo Cake là bánh kem và bánh mỳ tươi.
                Trong mỗi dịp lễ hay sinh nhật, bánh kem của Evo Cake luôn là
                một trong những lựa chọn hàng đầu, bởi độ ngọt vừa phải, mẫu
                bánh đẹp, giá thành hợp lý.
              </S.IntroduceContent>
            </S.Introduce>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <S.Info>
              <S.InfoLogo>
                <img
                  src="https://hinhanh.webvua.com/images/logo/4807/resize/0173075530402.png"
                  alt=""
                />
              </S.InfoLogo>
              <S.InfoContent>
                <p>Địa chỉ: 231/17 Nguyễn Công Trứ</p>
                <p>Số điện thoại: 0935.16.19.10</p>
                <p>Email: dangthanh.610@gmail.com</p>
              </S.InfoContent>
            </S.Info>
          </Col>
          <Col lg={8} md={8} xs={24}>
            <Slider {...settings}>
              <S.SliderItem>
                <img
                  src="https://png.pngtree.com/thumb_back/fh260/background/20230425/pngtree-many-breads-on-display-in-a-bakery-case-image_2514069.png"
                  alt=""
                />
              </S.SliderItem>
              <S.SliderItem>
                <img
                  src="https://png.pngtree.com/thumb_back/fh260/background/20230518/pngtree-many-loaves-in-a-bakery-image_2538545.png"
                  alt=""
                />
              </S.SliderItem>
              <S.SliderItem>
                <img
                  src="https://png.pngtree.com/thumb_back/fh260/background/20230425/pngtree-bakery-display-displays-a-variety-of-bagels-in-front-of-a-image_2511776.png"
                  alt=""
                />
              </S.SliderItem>
              <S.SliderItem>
                <img
                  src="https://png.pngtree.com/thumb_back/fh260/background/20230614/pngtree-many-different-kinds-of-bread-stand-on-a-table-image_2920418.png"
                  alt=""
                />
              </S.SliderItem>
            </Slider>
          </Col>
        </Row>
      </S.Container>
    </S.FooterWrapper>
  )
}

export default UserFooter
