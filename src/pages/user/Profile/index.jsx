import {
  CalendarOutlined,
  HeartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import ChangePassword from './components/ChangePassword'
import Information from './components/UserInfo'
import OrderHistories from './components/OrderHistories'
import * as S from './styles'
import { Card, Tabs } from 'antd'
import ProductFavoriteList from './components/ProductFavoriteList'
import UserInfo from './components/UserInfo'
const ProfilePage = () => {
  return (
    <S.ProfilePageWrapper>
      <S.Container>
        <Card bordered={false} size="small">
          <Tabs
            tabPosition="left"
            items={[
              {
                label: (
                  <div>
                    <UserOutlined />
                    Thông tin cá nhân
                  </div>
                ),

                key: 1,
                children: <UserInfo />,
              },
              {
                label: (
                  <div>
                    <CalendarOutlined />
                    Lịch sử mua hàng
                  </div>
                ),
                key: 2,
                children: <OrderHistories />,
              },
              {
                label: (
                  <div>
                    <HeartOutlined />
                    Sản phẩm yêu thích
                  </div>
                ),
                key: 3,
                children: <ProductFavoriteList />,
              },
              {
                label: 'Đổi mật khẩu',
                key: 4,
                children: <ChangePassword />,
              },
            ]}
          />
        </Card>
      </S.Container>
    </S.ProfilePageWrapper>
  )
}

export default ProfilePage
