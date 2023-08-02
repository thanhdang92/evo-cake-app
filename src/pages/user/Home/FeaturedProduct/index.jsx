import { Row, Col } from 'antd'
import * as S from './styles'
import { Link } from 'react-router-dom'
import { ROUTES } from 'constants/routes'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

const FeaturedProducts = () => {
  const { categoryList } = useSelector((state) => state.category)

  const renderCategoryList = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Col lg={8} md={8} xs={24} key={item.id}>
          <Link to={ROUTES.USER.PRODUCT_LIST}>
            <S.Img>
              <img src={item.image} alt="" />
            </S.Img>
            <S.Title>
              <span>{item.name}</span>
            </S.Title>
          </Link>
        </Col>
      )
    })
  }, [categoryList.data])
  return (
    <S.FeaturedProductsWrapper>
      <S.Container>
        <Row>{renderCategoryList}</Row>
      </S.Container>
    </S.FeaturedProductsWrapper>
  )
}

export default FeaturedProducts
