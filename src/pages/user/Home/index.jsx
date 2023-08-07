import { useEffect } from 'react'
import About from './About'
import FeaturedProducts from './FeaturedProduct'
import ProductList from './ProductList'
import ProductNew from './ProductNew'
import ProductNews from './ProductNews'
import SlideShow from './SlideShow'
import * as S from './styles'
import { useDispatch } from 'react-redux'
import { getProductListRequest } from 'redux/slicers/product.slice'
import { getCategoryListRequest } from 'redux/slicers/category.slice'
import { Breadcrumb, FloatButton } from 'antd'
import { Link } from 'react-router-dom'
import {
  resetBreadcrumb,
  updateBreadcrumb,
} from 'redux/slicers/breadcrumb.slice'

function HomePage() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductListRequest({}))
    dispatch(getCategoryListRequest())
  }, [])
  useEffect(() => {
    dispatch(resetBreadcrumb()) // Reset breadcrumb khi vào trang chủ
    dispatch(updateBreadcrumb('Home')) // Thêm "Home" vào breadcrumb
  }, [dispatch])
  return (
    <S.HomeWrapper>
      <S.Container>
        <SlideShow></SlideShow>
        <FeaturedProducts></FeaturedProducts>
        <About></About>
        <ProductList></ProductList>
        <ProductNew></ProductNew>
        <ProductNews></ProductNews>
        <FloatButton.BackTop
          visibilityHeight={0}
          style={{ width: 50, height: 50, backgroundColor: '#ddac52' }}
        />
      </S.Container>
    </S.HomeWrapper>
  )
}

export default HomePage
