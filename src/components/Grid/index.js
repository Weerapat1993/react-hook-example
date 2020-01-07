import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${props => props.flex || 1};
`