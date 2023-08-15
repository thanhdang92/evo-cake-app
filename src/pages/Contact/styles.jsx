import styled from 'styled-components'

export const ContactPageWrapper = styled.div`
  background-color: #ddd;
`
export const Container = styled.div`
  width: 85%;
  margin: 0 auto;
  background-color: #fff;
`
export const Info = styled.div`
  width: 85%;
  margin: 0 auto;
  padding: 50px 0;
`

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const InfoItem = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: left;

  span {
    color: #ddac52;
    cursor: pointer;
  }
`
