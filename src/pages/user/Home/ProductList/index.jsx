import * as S from './styles'
import BreadList from './BreadList'
import CakeList from './CakeList'
import Breakfast from './Breakfast'
const ProductList = () => {
  return (
    <S.ProductListWrapper>
      <S.Container>
        <BreadList></BreadList>
        <CakeList></CakeList>
        <Breakfast></Breakfast>
      </S.Container>
    </S.ProductListWrapper>
  )
}
export default ProductList
