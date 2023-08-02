import { Row, Col, Checkbox, Button, Input, Select, notification } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

import * as S from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { getProductListRequest } from 'redux/slicers/product.slice'
import { getCategoryListRequest } from 'redux/slicers/category.slice'
import { Link, generatePath } from 'react-router-dom'
import { ROUTES } from 'constants/routes'
import { PRODUCT_LIMIT } from 'constants/paging'
import { addToCartRequest } from 'redux/slicers/cart.slice'

const ProductListPage = () => {
  const dispatch = useDispatch()
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    keyword: '',
    order: '',
  })
  const { productList } = useSelector((state) => state.product)
  const { categoryList } = useSelector((state) => state.category)

  useEffect(() => {
    dispatch(
      getProductListRequest({
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    )
    dispatch(getCategoryListRequest())
  }, [])
  const handleFilter = (key, values) => {
    setFilterParams({
      ...filterParams,
      [key]: values,
    })
    dispatch(
      getProductListRequest({
        ...filterParams,
        [key]: values,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    )
  }
  const handleShowMore = () => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    )
  }
  const handleAddToCart = (item) => {
    dispatch(
      addToCartRequest({
        data: {
          productId: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: 1,
        },
      })
    )
    notification.success({ duration: 1, message: 'Them vao gio thanh cong' })
  }
  const renderCategoryList = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Col lg={24} md={24} xs={24} key={item.id}>
          <Checkbox value={item.id}>{item.name}</Checkbox>
        </Col>
      )
    })
  }, [categoryList.data])
  const renderProductList = useMemo(() => {
    return productList.data.map((item) => {
      return (
        <Col lg={8} md={8} xs={24} key={item.id}>
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: item.id,
              name: item.name,
            })}
          >
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
                    <Col lg={18} md={18} xs={18}>
                      <S.ShowProductButton>
                        <Button>Xem thêm</Button>
                      </S.ShowProductButton>
                    </Col>
                    <Col lg={6} md={6} xs={6}>
                      <S.IconCart onClick={() => handleAddToCart(item)}>
                        <Button type="text">
                          <ShoppingCartOutlined />
                        </Button>
                      </S.IconCart>
                    </Col>
                  </Row>
                </S.AddToCartButton>
              </S.ProductWrapper>
            </S.ProductItem>
          </Link>
        </Col>
      )
    })
  }, [productList.data])
  return (
    <S.ProductListPageWrapper>
      <S.Container>
        <Row gutter={[16, 16]}>
          <Col lg={6} md={24} xs={24}>
            <S.CategoryWrapper>
              <S.CategoryTitle>Danh Mục</S.CategoryTitle>
              <S.CategoryList>
                <Checkbox.Group
                  onChange={(values) => handleFilter('categoryId', values)}
                >
                  <Row>{renderCategoryList}</Row>
                </Checkbox.Group>
              </S.CategoryList>
            </S.CategoryWrapper>
          </Col>
          <Col lg={18} md={24} xs={24}>
            <Row gutter={[16, 16]}>
              <Col lg={16} md={14} xs={24}>
                <Input
                  placeholder="Tìm kiếm sản phẩm"
                  style={{ width: '100%' }}
                  onChange={(e) => handleFilter('keyword', e.target.value)}
                />
              </Col>
              <Col lg={8} md={10} xs={24}>
                <Select
                  showSearch
                  style={{
                    width: '100%',
                  }}
                  placeholder="Sắp Xếp"
                  onChange={(value) => handleFilter('sort', value)}
                >
                  <Select.Option value="name.asc">A-Z</Select.Option>
                  <Select.Option value="name.desc">Z-A</Select.Option>
                  <Select.Option value="price.asc">Giá Tăng Dần</Select.Option>
                  <Select.Option value="price.desc">Giá Giảm Dần</Select.Option>
                </Select>
              </Col>
            </Row>
            <Row gutter={[20, 16]}>{renderProductList}</Row>
            {productList.data.length !== productList.meta.total && (
              <Row justify="center" style={{ margin: '30px 0' }}>
                <Button onClick={() => handleShowMore()}>Xem Thêm</Button>
              </Row>
            )}
          </Col>
        </Row>
      </S.Container>
    </S.ProductListPageWrapper>
  )
}

export default ProductListPage
