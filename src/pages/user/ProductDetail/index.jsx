import {
  Row,
  Col,
  Input,
  InputNumber,
  Button,
  Rate,
  Modal,
  Form,
  notification,
  Breadcrumb,
  Space,
} from 'antd'
import * as S from './styles'
import { useEffect, useMemo, useRef, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { useForm } from 'antd/es/form/Form'
import { Link, generatePath, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import {
  HeartFilled,
  HeartOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import qs from 'qs'

import { ROUTES } from 'constants/routes'
import { addToCartRequest } from 'redux/slicers/cart.slice'
import {
  getProductDetailRequest,
  getProductListRequest,
} from 'redux/slicers/product.slice'
import {
  createReviewRequest,
  getReviewListRequest,
} from 'redux/slicers/review.slice'
import { updateBreadcrumb } from 'redux/slicers/breadcrumb.slice'
import { setFilterParams } from 'redux/slicers/common.slice'
import {
  favoriteProductRequest,
  unFavoriteProductRequest,
} from 'redux/slicers/favorite.slice'
const ProductDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const productDetailRef = useRef()
  const [formReview] = useForm()
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { productDetail } = useSelector((state) => state.product)
  console.log(
    '🚀 ~ file: index.jsx:44 ~ ProductDetailPage ~ productDetail:',
    productDetail
  )
  const { productList } = useSelector((state) => state.product)
  const { reviewList } = useSelector((state) => state.review)
  const { userInfo } = useSelector((state) => state.auth)
  const { filterParams } = useSelector((state) => state.common)
  useEffect(() => {
    dispatch(
      getProductDetailRequest({
        id: parseInt(id),
      })
    )
    dispatch(getReviewListRequest({ productId: parseInt(id) }))
    productDetailRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [id])
  useEffect(() => {
    if (productDetail.data.categoryId) {
      dispatch(
        getProductListRequest({
          categoryId: [productDetail.data.categoryId],
        })
      )
    }
  }, [productDetail.data])

  const isFavorite = useMemo(
    () =>
      productDetail.data.favorites?.some(
        (item) => item.userId === userInfo.data.id
      ),
    [productDetail.data.favorites, userInfo.data.id]
  )

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleToggleFavorite = () => {
    if (userInfo.data.id) {
      if (isFavorite) {
        const favoriteData = productDetail.data.favorites?.find(
          (item) => item.userId === userInfo.data.id
        )
        dispatch(
          unFavoriteProductRequest({
            id: favoriteData.id,
          })
        )
      } else {
        dispatch(
          favoriteProductRequest({
            productId: productDetail.data.id,
            userId: userInfo.data.id,
          })
        )
      }
    } else {
      notification.error({
        message: 'Vui lòng đăng nhập để thực hiện chức năng này!',
      })
    }
  }
  const handleOnchangeQuantity = (value) => {
    setQuantity(value)
    console.log(value)
  }
  const handleReviewProduct = () => {
    setIsModalOpen(false)
    dispatch(
      createReviewRequest({
        data: {
          ...formReview.getFieldsValue(),
          userId: userInfo.data.id,
          productId: parseInt(id),
        },
        callback: () => {
          formReview.resetFields()
        },
      })
    )
  }

  useEffect(() => {
    if (productDetail.data) dispatch(updateBreadcrumb(productDetail.data.name)) // Thêm "Cart" vào breadcrumb khi vào trang Cart
  }, [productDetail.data])
  const handleAddToCart = () => {
    dispatch(
      addToCartRequest({
        data: {
          productId: productDetail.data.id,
          name: productDetail.data.name,
          image: productDetail.data.image,
          price: productDetail.data.price,
          quantity: quantity,
          userId: 2,
        },
      })
    )
    notification.success({ duration: 1, message: 'Them vao gio thanh cong' })
  }

  const productRate =
    reviewList.data.reduce((total, item) => {
      return total + item.rate
    }, 0) / reviewList.data.length
  const checkUserReview = reviewList.data.some(
    (item) => item.userId === userInfo.data.id
  )
  const renderReviewList = useMemo(() => {
    return reviewList.data.map((item) => {
      return (
        <S.CommentItem key={item.id}>
          <S.CommentItemName>{item.user.fullName}</S.CommentItemName>
          <S.CommentItemRate>
            <Rate value={item.rate}></Rate>
          </S.CommentItemRate>
          <S.CommentItemContent>{item.comment}</S.CommentItemContent>
          <S.CommentItemTime>
            {moment(item.createdAt).fromNow()}
          </S.CommentItemTime>
        </S.CommentItem>
      )
    })
  }, [reviewList.data])

  const renderProductList = useMemo(() => {
    return productList.data.map((item) => {
      return (
        <Col lg={6} md={8} xs={24} key={item.id}>
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
                <S.AddToCartButton2>
                  <Row justify="space-between" align="middle">
                    <Col lg={18} md={18} xs={18}>
                      <S.ShowProductButton>
                        <Button>Xem thêm</Button>
                      </S.ShowProductButton>
                    </Col>
                    <Col lg={6} md={6} xs={6}>
                      <S.IconCart>
                        <Button type="text">
                          <ShoppingCartOutlined />
                        </Button>
                      </S.IconCart>
                    </Col>
                  </Row>
                </S.AddToCartButton2>
              </S.ProductWrapper>
            </S.ProductItem>
          </Link>
        </Col>
      )
    })
  }, [productList.data])

  return (
    <S.ProductDetailPageWrapper>
      <S.Container>
        <S.BreadcrumbContainer ref={productDetailRef}>
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
                title: (
                  <Link to={ROUTES.USER.PRODUCT_LIST}>Danh sách sản phẩm</Link>
                ),
              },
              {
                title: (
                  <Link
                    to={{
                      pathname: ROUTES.USER.PRODUCT_LIST,
                      search: qs.stringify({
                        ...filterParams,
                        categoryId: [productDetail.data.categoryId],
                      }),
                    }}
                  >
                    {productDetail.data.category?.name}
                  </Link>
                ),
                onClick: () =>
                  dispatch(
                    setFilterParams({
                      ...filterParams,
                      categoryId: [productDetail.data.categoryId],
                    })
                  ),
              },
              {
                title: productDetail.data.name,
              },
            ]}
            style={{ marginBottom: 8 }}
          />
        </S.BreadcrumbContainer>
        <S.ProductDetailWrapper>
          <Row gutter={[30, 16]}>
            <Col lg={10} md={6} xs={24}>
              <S.ProductDetailImg>
                <img src={productDetail.data.image} alt="" />
              </S.ProductDetailImg>
            </Col>
            <Col lg={14} md={18} xs={24}>
              <S.ProductContent>
                <S.ProductDetailTitle>
                  {productDetail.data.name}
                </S.ProductDetailTitle>
                <S.ProductDetailPrice>
                  {productDetail.data.price?.toLocaleString()} VNĐ
                </S.ProductDetailPrice>
                <S.ProductDetailDes>
                  {productDetail.data.describe}
                </S.ProductDetailDes>
                <S.ProductDetailQuantity>
                  <span style={{ marginRight: 20, fontSize: 20 }}>
                    Số Lượng:
                  </span>
                  <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) => handleOnchangeQuantity(value)}
                  />
                </S.ProductDetailQuantity>
                <S.AddToCartButton>
                  <Button onClick={() => handleAddToCart()}>
                    Thêm vào giỏ
                  </Button>
                </S.AddToCartButton>
                <S.FavoriteButton>
                  <Button
                    size="large"
                    type="text"
                    danger={isFavorite}
                    icon={
                      isFavorite ? (
                        <HeartFilled style={{ fontSize: 24 }} />
                      ) : (
                        <HeartOutlined
                          style={{ fontSize: 24, color: '#414141' }}
                        />
                      )
                    }
                    onClick={() => handleToggleFavorite()}
                  ></Button>
                  <span>
                    {productDetail.data?.favorites?.length || 0} Lượt thích
                  </span>
                </S.FavoriteButton>
              </S.ProductContent>
            </Col>
          </Row>
        </S.ProductDetailWrapper>

        <Row>
          <Col span={24}>
            <S.Description>
              <S.DescriptionTitle>Mô tả sản phẩm</S.DescriptionTitle>
              <S.DescriptionContent>
                <p>{productDetail.data.describe}</p>
              </S.DescriptionContent>
            </S.Description>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <S.EvaluateProduct>
              <Row>
                <Col span={24}>
                  <S.EvaluateTitle>Đánh giá sản phẩm</S.EvaluateTitle>
                </Col>
              </Row>
              <Row justify="center" align="middle">
                <Col lg={12} md={12} xs={24}>
                  <S.AverageRating>
                    <li style={{ fontSize: 25, fontWeight: 500 }}>
                      Đánh giá trung bình
                    </li>
                    <li style={{ fontSize: 50, color: 'red' }}>
                      {productRate ? `${productRate}/5` : '0/5'}
                    </li>
                    <li>
                      <Rate value={productRate} allowHalf></Rate>
                    </li>
                    <li
                      style={{
                        fontSize: 18,
                        color: '#969696',
                      }}
                    >
                      {reviewList.data.length} lượt đánh giá
                    </li>
                  </S.AverageRating>
                </Col>
                <Col lg={12} md={12} xs={24}>
                  <Row justify="center" align="middle">
                    {userInfo.data.id ? (
                      <S.SendRatingButton>
                        {checkUserReview ? (
                          <p>Bạn đã đánh giá sản phẩm này!</p>
                        ) : (
                          <Button onClick={showModal}>Gửi đánh giá</Button>
                        )}
                      </S.SendRatingButton>
                    ) : (
                      <Link
                        to={ROUTES.LOGIN}
                        style={{
                          color: 'red',
                          fontSize: 20,
                          border: '1px solid #ddac52',
                          padding: 20,
                          borderRadius: 10,
                        }}
                      >
                        Đánh giá sản phẩm tại đây!
                      </Link>
                    )}

                    <Modal
                      title="Đánh giá sản phẩm"
                      open={isModalOpen}
                      onOk={() => setIsModalOpen(false)}
                      onCancel={() => setIsModalOpen(false)}
                      width="700px"
                      footer={[
                        <Button
                          onClick={() => handleReviewProduct()}
                          key="back"
                        >
                          Gửi đánh giá
                        </Button>,
                      ]}
                    >
                      <Form
                        form={formReview}
                        initialValues={{
                          rate: '',
                          comment: '',
                        }}
                      >
                        <Form.Item>
                          <Row
                            align="middle"
                            style={{ border: '1px solid #ddac52' }}
                          >
                            <Col span={8}>
                              <img src={productDetail.data.image} alt="" />
                            </Col>
                            <Col
                              span={16}
                              style={{ fontWeight: 500, paddingLeft: 30 }}
                            >
                              <Row>{productDetail.data.name}</Row>
                              <Row style={{ fontSize: 20, color: 'red' }}>
                                {productDetail.data.price?.toLocaleString()} VNĐ
                              </Row>
                            </Col>
                          </Row>
                        </Form.Item>
                        <Form.Item
                          name="rate"
                          label="Chọn số sao đánh giá cho sản phẩm"
                          align="middle"
                          rules={[
                            {
                              required: true,
                              message: 'Đánh giá sao là bắt buộc',
                            },
                          ]}
                        >
                          <Rate value={1} style={{ fontSize: 30 }}></Rate>
                        </Form.Item>
                        <Form.Item
                          name="comment"
                          label="Bình luận sản phẩm"
                          align="middle"
                          rules={[
                            {
                              required: true,
                              message: 'Nhận xét sản phẩm là bắt buộc',
                            },
                          ]}
                        >
                          <TextArea
                            placeholder="Bình luận sản phẩm"
                            style={{ padding: '20px 10px' }}
                          ></TextArea>
                        </Form.Item>
                      </Form>
                    </Modal>
                  </Row>
                </Col>
              </Row>
            </S.EvaluateProduct>
          </Col>
        </Row>
        <Row>
          {reviewList.data.length !== 0 && (
            <S.CommentContainer>
              <S.CommentList>{renderReviewList}</S.CommentList>
            </S.CommentContainer>
          )}
        </Row>
        <Row>
          <S.RelatedProduct>
            <S.RelatedProductTitle>Sản phẩm liên quan</S.RelatedProductTitle>
            <Row>{renderProductList}</Row>
          </S.RelatedProduct>
        </Row>
      </S.Container>
    </S.ProductDetailPageWrapper>
  )
}

export default ProductDetailPage
