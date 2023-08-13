import { Row, Col } from 'antd'
import * as S from './styles'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from 'constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { setFilterParams } from 'redux/slicers/common.slice'
import qs from 'qs'
const FeaturedProducts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { categoryList } = useSelector((state) => state.category)
  const { filterParams } = useSelector((state) => state.common)
  const renderCategoryList = useMemo(() => {
    return categoryList.data.map((item) => {
      const newFilterParams = {
        ...filterParams,
        categoryId: [item.id],
      }
      return (
        <Col
          lg={8}
          md={8}
          xs={24}
          key={item.id}
          onClick={() => {
            dispatch(setFilterParams(newFilterParams))
            navigate({
              pathname: ROUTES.USER.PRODUCT_LIST,
              search: qs.stringify(newFilterParams),
            })
          }}
        >
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
