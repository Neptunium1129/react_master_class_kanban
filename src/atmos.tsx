import {atom, selector} from "recoil";

export const minState = atom({
    key:"minutes",
    default : 0
})

export const hourState = atom({
    key:"hours",
    default : 0
})

export const hoursSelector = selector<number>({
   key:"hours",
   get: ({get}) => {
       const val = get(minState);

       return val / 60;
   },
   set : ({set},newVal) => {
    console.log(newVal);
    const val = Number(newVal) * 60;
    set(minState, val)
   }
});

export interface ITodo{
    id:number;
    text:string;
}

export interface IBoard{
    boardName:string;
    obj:[];
}



export interface IToDoState {
    [key :string] : ITodo[];
}

export interface IBoardState {
    [key :string] : IBoard[];
}

const localTodo = localStorage.getItem("toDo");
const todoJSON = JSON.parse(localTodo as any);


export const toDoState = atom<IToDoState>({
    key:"toDo",
    default :  todoJSON ||  { 
       TO_DO : [],
       DOING : [],
       DONE : [],
    }
})

export const boardState = atom<IBoardState>({
    key:"board",
    default : {
        BOARD : []
    }
})

