import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hoursSelector, hourState, minState, toDoState } from "./atmos";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./components/DragabbleCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;

const Board = styled.div`
padding: 20px 10px ;
padding-top: 30px ;
min-height: 200px ;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 10px;
`;
const Card = styled.div`
 border-radius: 5px;
 margin-bottom: 5px ;
 padding: 5px 10px ;
  background-color: ${(props) => props.theme.cardColor};
`;
const Board1 = styled.div``;


function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  //useRecoilState -> atom 값과 atom을 수정 할 수 있는 함수를 전달
  const [minutes, setMinutes] = useRecoilState(minState);
  //const hours = useRecoilValue(hoursSelector);
  const [hours, setHours] = useRecoilState(hoursSelector);

  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
    //sethours((+event.currentTarget.value) / 60);
  };

  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };


  const onDragEnd = ({draggableId, destination, source}:DropResult) => {
    //console.log("finished", destination)
    //console.log("finished", source)
    
    //splice 사용 (지움 -> 지운것 저장 -> splice 추가) array 재정렬
    if(!destination) return;

    setToDos(oldTodos => {
      const toDosCopy = [...oldTodos];
      //1) delete item source index
      console.log("DELETE ITEM : ", source.index);
      toDosCopy.splice(source.index, 1);

      //2) put back the item on the destination index.
      toDosCopy.splice(destination?.index, 0, draggableId);
      console.log("SETTING ITEM : ", toDosCopy);

      return toDosCopy;
    })

  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
            <Droppable droppableId="a">
              {(magic) => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((todo, index) => (
                    <DragabbleCard key={todo} index={index} toDo={todo} />
                  ))}
                  {magic.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
