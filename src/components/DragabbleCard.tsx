import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface IDragCard {
  toDo: string;
  index: number;
}

export function DragabbleCard({ toDo, index }: IDragCard) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DragabbleCard);
