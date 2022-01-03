import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Todo } from "../atom";

interface Props {
  todo: Todo;
  index: number;
}

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => (props.isDragging ? "#e4f2ff" : props.theme.cardColor)};
  box-shadow: ${(props) => (props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none")};
`;

const DraggableCard: React.FC<Props> = ({ todo, index }) => {
  return (
    <Draggable draggableId={todo.id + ""} key={todo.id} index={index}>
      {(provided, snapshot) => (
        <Card ref={provided.innerRef} isDragging={snapshot.isDragging} {...provided.draggableProps} {...provided.dragHandleProps}>
          {todo.text}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
