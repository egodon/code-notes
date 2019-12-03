import styled from 'styled-components';
import { animated as a } from 'react-spring';

const Box = styled(a.div)`
  box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.12);
  background-color: var(--grey-900);
  border-radius: var(--border-radius);
  padding: 2.4rem;
  width: 100%;
`;

export default Box;
