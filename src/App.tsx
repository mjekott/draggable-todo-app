import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState as State } from "./atom";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: Center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [todoState, setTodos] = useRecoilState(State);
  const onDragEnd = ({ destination, draggableId, source }: DropResult) => {
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      // same board
      setTodos((allboard) => {
        const boardCopy = [...allboard[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, draggableId);
        return { ...allboard, [source.droppableId]: boardCopy };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // different boards
      setTodos((allboard) => {
        const sourceBoard = [...allboard[source.droppableId]];
        const destinationBoard = [...allboard[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, draggableId);
        return { ...allboard, [source.droppableId]: sourceBoard, [destination.droppableId]: destinationBoard };
      });
    }
  };
  return (
    <Wrapper>
      <Boards>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(todoState).map((todos) => (
            <Board boardId={todos} todos={todoState[todos]} />
          ))}
        </DragDropContext>
      </Boards>
    </Wrapper>
  );
}
export default App;
