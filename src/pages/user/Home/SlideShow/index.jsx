import { Col, Row } from 'antd'
import * as S from './styles'
import Slider from 'react-slick'

const SlideShow = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    fade: true,
  }
  return (
    <S.SlideShowWrapper>
      <Row>
        <Col lg={24} md={24} xs={24}>
          <Slider {...settings}>
            <S.SlideShowItem>
              <img
                src="https://png.pngtree.com/thumb_back/fh260/background/20230518/pngtree-bakery-with-many-wooden-shelves-with-lots-of-bread-image_2524518.png"
                alt=""
              />
            </S.SlideShowItem>
            <S.SlideShowItem>
              <img
                src="https://png.pngtree.com/thumb_back/fh260/background/20230425/pngtree-many-pastries-are-on-display-in-a-bakery-image_2537499.png"
                alt=""
              />
            </S.SlideShowItem>
            <S.SlideShowItem>
              <img
                src="https://png.pngtree.com/thumb_back/fh260/background/20230425/pngtree-image-of-a-bakery-with-a-window-and-loaves-of-bread-image_2537501.png"
                alt=""
              />
            </S.SlideShowItem>
            <S.SlideShowItem>
              <img
                src="https://png.pngtree.com/thumb_back/fh260/background/20230425/pngtree-bakery-with-many-loaves-of-bread-image_2511775.png"
                alt=""
              />
            </S.SlideShowItem>
            <S.SlideShowItem>
              <img
                src="https://png.pngtree.com/thumb_back/fh260/background/20230425/pngtree-many-breads-on-display-in-a-bakery-case-image_2514069.png"
                alt=""
              />
            </S.SlideShowItem>
          </Slider>
        </Col>
      </Row>
    </S.SlideShowWrapper>
  )
}

export default SlideShow
