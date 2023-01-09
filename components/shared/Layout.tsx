import styled from 'styled-components';
import { device } from './DevicesBreakpoints';
import Footer from './Footer';
import { ILayout } from './Interfaces';
import Navigation from './Navigation';

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};
export default Layout;

export const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1300px;

  @media ${device.smallLaptop}, ${device.tablet} {
    width: 90vw;
  }
  @media ${device.mobile} {
    width: 85vw;
  }
`;
