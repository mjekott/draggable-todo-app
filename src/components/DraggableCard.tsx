import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface Props {
  todo: string;
  index: number;
}

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

const DraggableCard: React.FC<Props> = ({ todo, index }) => {
  return (
    <Draggable draggableId={todo} key={todo} index={index}>
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {todo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
