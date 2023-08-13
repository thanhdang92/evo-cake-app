import {
  Row,
  Col,
  Checkbox,
  Button,
  Input,
  Select,
  notification,
  Card,
  Space,
  Rate,
  Breadcrumb,
  Spin,
} from 'antd'
import {
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'

import * as S from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { getProductListRequest } from 'redux/slicers/product.slice'
import { getCategoryListRequest } from 'redux/slicers/category.slice'
import { Link, generatePath, useNavigate } from 'react-router-dom'
import { ROUTES } from 'constants/routes'
import { PRODUCT_LIMIT } from 'constants/paging'
import { addToCartRequest } from 'redux/slicers/cart.slice'
import { updateBreadcrumb } from 'redux/slicers/breadcrumb.slice'
import { clearFilterParams, setFilterParams } from 'redux/slicers/common.slice'
import qs from 'qs'

const ProductListPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { productList } = useSelector((state) => state.product)
  const { categoryList } = useSelector((state) => state.category)
  const { filterParams } = useSelector((state) => state.common)
  console.log(productList.loading)
  useEffect(() => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    )
    dispatch(getCategoryListRequest())
    return () => dispatch(clearFilterParams())
  }, [])

  useEffect(() => {
    dispatch(updateBreadcrumb('Sản phẩm'))
  }, [dispatch])
  const handleFilter = (key, value) => {
    const newFilterParams = {
      ...filterParams,
      [key]: value,
    }
    dispatch(setFilterParams(newFilterParams))
    dispatch(
      getProductListRequest({
        ...newFilterParams,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    )
    navigate({
      pathname: ROUTES.USER.PRODUCT_LIST,
      search: qs.stringify(newFilterParams),
    })
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
      const averageRate = item.reviews.length
        ? (
            item.reviews.reduce((total, item) => total + item.rate, 0) /
            item.reviews.length
          ).toFixed(1)
        : 0
      return (
        <Col lg={8} md={8} xs={24} key={item.id}>
          <S.ProductWrapper>
            <Card
              hoverable
              size="small"
              bordered={false}
              cover={<img alt="example" src={item.image} />}
              actions={[
                <Row align="middle" justify="center">
                  <Button
                    size="large"
                    type="text"
                    danger={item.favorites.length !== 0}
                    icon={
                      item.favorites.length !== 0 ? (
                        <HeartFilled />
                      ) : (
                        <HeartOutlined style={{ color: '#414141' }} />
                      )
                    }
                  ></Button>

                  <span>{item.favorites.length}</span>
                </Row>,

                <Row align="middle" justify="center">
                  <Button
                    size="large"
                    type="text"
                    icon={<CommentOutlined key="review" />}
                  ></Button>
                  <span>{item.reviews.length}</span>
                </Row>,
              ]}
            >
              <S.ProductItem>
                <S.ProductItemName>{item.name}</S.ProductItemName>
                <S.ProductItemPrice>
                  {item.price.toLocaleString()} VNĐ
                </S.ProductItemPrice>
                <S.ProductRate>
                  <Rate value={averageRate} disabled></Rate>
                  <span style={{ marginLeft: 10 }}>{averageRate}</span>
                </S.ProductRate>
              </S.ProductItem>
            </Card>
            <div className="addtocart-button">
              <S.AddToCartBtn onClick={() => handleAddToCart(item)}>
                <ShoppingCartOutlined />
              </S.AddToCartBtn>
              <Link
                to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                  id: item.id,
                })}
              >
                <S.ShowProduct>Xem thêm</S.ShowProduct>
              </Link>
            </div>
          </S.ProductWrapper>
        </Col>
      )
    })
  }, [productList.data])
  return (
    <S.ProductListPageWrapper>
      <S.Container>
        <S.BreadcrumbContainer>
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to={ROUTES.USER.HOME}>
                    <Space>
                      <HomeOutlined />
                      <span>Trang chủ</span>
                    </Space>
                  </Link>
                ),
              },
              {
                title: 'Danh sách sản phẩm',
              },
            ]}
          />
        </S.BreadcrumbContainer>

        <Row gutter={[16, 16]}>
          <Col lg={6} md={24} xs={24}>
            <S.CategoryWrapper>
              <S.CategoryTitle>Danh Mục</S.CategoryTitle>
              <S.CategoryList>
                <Checkbox.Group
                  onChange={(values) => handleFilter('categoryId', values)}
                  value={filterParams.categoryId}
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
            <Row gutter={[20, 16]} justify="center">
              {productList.loading ? (
                <Col style={{ marginTop: 20 }}>
                  <Spin size="large"></Spin>
                </Col>
              ) : (
                renderProductList
              )}
            </Row>
            {productList.data.length !== productList.meta.total &&
              productList.loading === false && (
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
