import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { Todo, todoState } from "../atom";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  padding: 20px 10px;
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<{ isDraggingOver: boolean; isDraggingFromThis: boolean }>`
  background-color: ${(props) => (props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent")};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  padding:10px
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  margin-bottom: 10px;
  padding: 8px;
  color: gray;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  text-align: center;
  background-color: #2980b9;
  color: whitesmoke;
  cursor: pointer;
  border: none;
`;

const Error = styled.span`
  text-align: center;
  color: #c0392b;
  margin-bottom: 10px;
`;
interface Props {
  todos: Todo[];
  boardId: string;
}

interface IForm {
  text: string;
}

const Board: React.FC<Props> = ({ todos, boardId }) => {
  const setTodo = useSetRecoilState(todoState);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onValid = (data: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: data.text,
    };
    setTodo((prev) => {
      return {
        ...prev,
        [boardId]: [...prev[boardId], newTodo],
      };
    });
    setValue("text", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input {...register("text", { required: "Task cannot be empty" })} type="text" />
        <Error>{errors?.text?.message}</Error>
        <Button>Add</Button>
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver} isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)} {...provided.droppableProps}>
            {todos.map((todo, index) => (
              // key and draggable id must be the same
              <DraggableCard todo={todo} index={index} key={todo.id} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
