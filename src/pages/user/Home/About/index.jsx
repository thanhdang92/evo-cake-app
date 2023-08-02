import { Col, Row } from 'antd'
import * as S from './styles'

const About = () => {
  return (
    <S.AboutWrapper>
      <S.Container>
        <Row gutter={[16, 16]}>
          <Col lg={12} md={12} xs={24}>
            <img
              src="https://png.pngtree.com/thumb_back/fh260/background/20230426/pngtree-many-breads-are-sitting-on-a-rack-in-a-dark-bakery-image_2523098.png"
              alt=""
            />
          </Col>
          <Col lg={12} md={12} xs={24}>
            <img
              src="https://png.pngtree.com/thumb_back/fh260/background/20230518/pngtree-many-cinnamon-rolls-are-lined-up-on-trays-in-the-bakery-image_2531750.png"
              alt=""
            />
          </Col>
        </Row>
      </S.Container>
    </S.AboutWrapper>
  )
}

export default About
