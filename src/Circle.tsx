import React from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
`;

interface Props {
  bgColor: string;
}

const Circle: React.FC<Props> = ({ bgColor }) => {
  return <Container bgColor={bgColor}></Container>;
};

export default Circle;
