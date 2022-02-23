import styled from "styled-component";

export const LinkButton = styled.button`
  text-transform: capitalize;
  font-size: 1.38rem;
  background: transparent;
  color: blue;
  border: 1px solid blue
  border-radius: 0.4rem;
  cursor: pointer;
  margin: 1rem 0.3rem 0.2rem 0;
  transition: all 0.4s ease-in-out;
  outline: none;
  &:hover {
    background: green;
  }
`;
