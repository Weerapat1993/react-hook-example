import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  padding: 10px;
  background: ${props => props.color};
  color: white;
  border-radius: 0;
  border: 0px;
 

  &:hover {
    opacity: 0.5;
  }

  &:focus {
    outline: 0;
  }
`