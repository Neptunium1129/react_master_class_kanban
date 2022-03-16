import { useForm } from "react-hook-form";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { DragabbleCard } from "./DragabbleCard";
import { ITodo, IToDoState, toDoState } from "../atmos";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  padding-top: 10px;
  min-height: 200px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThisWith
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

const DelBtn = styled.button`
    //position: absolute;
    right: 0px;
    display: inline-block;
    cursor: pointer;
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  idx : number;
}

interface IForm {
  toDo: string;
}

function Borad({ toDos, boardId, idx }: IBoardProps) {
  const setTodos = useSetRecoilState(toDoState);

  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onVaild = ({ toDo }: IForm) => {
    console.log(toDo);
    const newTodo = {
      id: Date.now(),
      text: toDo,
    };
    setTodos((allBoards) => {
      console.log(allBoards);
      console.log(newTodo);

      const rs = {
        ...allBoards,
        [boardId]: 
        [
        ...allBoards[boardId],
         newTodo
        ]
      };
      console.log("toDo", rs);

      localStorage.setItem("toDo", JSON.stringify(rs));

      return rs;
    });
    setValue("toDo", "");
  };

  const deleteBoard = () => {
    alert("deleteBoard");
    console.log("boardId", boardId);
     setTodos((allBoards: IToDoState) => {

        console.log(".entries(allBoards)", Object.entries(allBoards))
        const update = Object.entries(allBoards).filter(target => target[0] !== boardId);
        const updateList = update.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
        console.log("update", update);
        console.log("updateList", updateList);

        
        localStorage.setItem("toDo", JSON.stringify(updateList));

         return updateList ;
     });
   
  }

  return (
    <Draggable  draggableId={boardId} index={idx}>
        {(magic,snapshot) => (
    <Wrapper
    ref={magic.innerRef}
    {...magic.draggableProps}
    {...magic.dragHandleProps}
    //isDragging={snapshot.isDragging}
    >
      <Title>{boardId}</Title>
      <DelBtn onClick={deleteBoard}>❌</DelBtn>
      <Form onSubmit={handleSubmit(onVaild)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task ${boardId}`}
        ></input>
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((todo, index) => (
              <DragabbleCard
                key={todo.id}
                index={index}
                toDoId={todo.id}
                toDoText={todo.text}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
    )}
    </Draggable>
  );
}

export default Borad;
