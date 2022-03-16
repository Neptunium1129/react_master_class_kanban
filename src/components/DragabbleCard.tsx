import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{isDragging:boolean}>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: ${(props) => props.isDragging? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) => props.isDragging? "2px 0px 15px rgba(0,0,0,0.05)"  : ""};
`;

interface IDragCard {
  toDoId: number;
  toDoText:string;
  index: number;
}

export function DragabbleCard({ toDoId, toDoText, index }: IDragCard) {
  return (
    <Draggable key={toDoId} draggableId={toDoId+""} index={index}>
      {(magic, info) => (
        <Card
          isDragging={info.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DragabbleCard);
