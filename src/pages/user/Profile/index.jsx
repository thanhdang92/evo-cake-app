import ChangePassword from './components/ChangePassword'
import Information from './components/Information'
import OrderHistories from './components/OrderHistories'
import * as S from './styles'
import { Card, Tabs } from 'antd'
const ProfilePage = () => {
  return (
    <S.ProfilePageWrapper>
      <S.Container>
        <Card bordered={false} size="small">
          <Tabs
            tabPosition="left"
            items={[
              {
                label: 'Thông tin cá nhân',
                key: 1,
                children: <Information />,
              },
              {
                label: 'Lịch sử mua hàng',
                key: 2,
                children: <OrderHistories />,
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
