import styled from "styled-components";

export const SlideShowWrapper = styled.div`
  width: 100%;

  & .slick-next {
    right: 24px;
    z-index: 1;
  }

  & .slick-prev {
    left: 24px;
    z-index: 1;
  }
`;
export const SlideShowItem = styled.div`
  width: 100%;
  & img {
    width: 100%;
    height: 500px;
  }
`;
