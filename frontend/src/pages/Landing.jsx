import React from 'react'
import styled from "styled-components"
const StyledBtn=styled.button`
font-size:1.5rem;
background:red;
color:white;
`;
const Landing = () => {
  return (
    <div>
      <StyledBtn>Styled btn</StyledBtn>
      <h1>Landing</h1>
    </div>
  )
}

export default Landing
