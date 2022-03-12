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

export const toDoState = atom({
    key:"toDo",
    default : ["a", "b", "c", "d", "E"]
})