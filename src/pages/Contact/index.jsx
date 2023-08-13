import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import * as S from './styles'
import 'leaflet/dist/leaflet.css'
import { Card } from 'antd'
const ContactPage = () => {
  const daNangCoords = [16.066193, 108.239439]

  return (
    <S.ContactPageWrapper>
      <MapContainer
        center={daNangCoords}
        zoom={18}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={daNangCoords}>
          <Popup>231/17 Nguyễn Công Trứ</Popup>
        </Marker>
      </MapContainer>
      <S.Info>
        <Card title="Thông tin liên hệ" style={{ textAlign: 'center' }}>
          <S.InfoList>
            <S.InfoItem>
              Tên cửa hàng: <span>Evo Cake</span>
            </S.InfoItem>
            <S.InfoItem>
              Địa chỉ: <span> 231/17 Nguyễn Công Trứ</span>
            </S.InfoItem>
            <S.InfoItem>
              Số điện thoại: <span>0935161910</span>
            </S.InfoItem>
            <S.InfoItem>
              Email: <span>dangthanh.610@gmail.com</span>
            </S.InfoItem>
          </S.InfoList>
        </Card>
      </S.Info>
    </S.ContactPageWrapper>
  )
}

export default ContactPage
