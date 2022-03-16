import React from "react";
import { useRecoilState } from "recoil";
import { hoursSelector, ITodo, IToDoState, minState, toDoState } from "./atmos";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import Board from "./components/Board";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);
`;
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

const Form = styled.form`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  console.log("toDos>>", toDos);

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

  const onDragEnd = (info: DropResult) => {
    console.log("finished", info)
    
    const { destination, draggableId, source, type } = info;
    console.log("info", info);
    console.log("info", type);

    if(type=="bod"){
      if (!destination) return;
      setToDos((prev) => {
        const update = Object.entries(prev);
        console.log("bod", update)
        const [temp] = update.splice(source.index, 1);
        console.log("bod", [temp])

        update.splice(destination?.index, 0, temp);

        console.log("update@@", update)
        
        const updateList = update.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        localStorage.setItem("todo", JSON.stringify(updateList));
        return updateList;
      });
    }else{

    if (!destination) return;
     if (destination?.droppableId === source.droppableId) {
      // same board move
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];

        //const toDosCopy  = [...allBoards];
        //1) delete item source index
        console.log("DELETE ITEM : ", source.index);
        boardCopy.splice(source.index, 1);

        //2) put back the item on the destination index.
        boardCopy.splice(destination?.index, 0, taskObj);
        console.log("SETTING ITEM : ", boardCopy);

        const todoList = {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };

        localStorage.setItem("toDo", JSON.stringify(todoList));

        return todoList
      });
    }
    //splice 사용 (지움 -> 지운것 저장 -> splice 추가) array 재정렬
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];

        const targetBoard = [...allBoards[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, taskObj);

        console.log("sourceBoard", sourceBoard);
        console.log("targetBoard", targetBoard);

        const todoList = {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        };

        localStorage.setItem("toDo", JSON.stringify(todoList));

        return todoList;
      });
    } 
  }
  };

  console.log(toDos);

  interface IFormAddCategory {
    addCategory: string;
  };

  const { register, setValue, handleSubmit } = useForm<IFormAddCategory>();
  const onVaild = ({ addCategory }: IFormAddCategory) => {
    console.log("IFormAddBoard", addCategory);
    setToDos((allBoard: IToDoState) => {
      console.log("IFormAddBoard", allBoard);
      //const { title } = getValues();
      const result: IToDoState = { [addCategory + ""]: [], ...allBoard };

      localStorage.setItem("toDo", JSON.stringify(result));

      return result ;
    })
    setValue("addCategory", "");
  };



  return (

    

<DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
      <Form onSubmit={handleSubmit(onVaild)}>
        <input
          {...register("addCategory", { required: true })}
          type="text"
          placeholder={`Add Board`}
        ></input>
    </Form>

      <Droppable droppableId="BOD" type={"bod"} direction={"horizontal"}> 
      {(magic1, snapshot) => (
        <Boards 
        ref={magic1.innerRef} {...magic1.droppableProps} 
        >
        {Object.keys(toDos).map((boardId, idx) => (
          <Board boardId={boardId} key={boardId} idx={idx} toDos={toDos[boardId]} />
        ))}
        {magic1.placeholder}
        </Boards>
      )}
      </Droppable>
      </Wrapper>
    </DragDropContext>

  );
}

export default App;
