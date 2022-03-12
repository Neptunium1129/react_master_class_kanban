import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hoursSelector, hourState, minState } from './atmos';



function App() {
  //useRecoilState -> atom 값과 atom을 수정 할 수 있는 함수를 전달
  const [minutes, setMinutes] = useRecoilState(minState);
  //const hours = useRecoilValue(hoursSelector);
  const [hours, setHours] = useRecoilState(hoursSelector);

  const onMinutesChange = (event:React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
    //sethours((+event.currentTarget.value) / 60);
  }; 
  
  const onHoursChange  = (event:React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  }

  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="분"
      ></input>
      <input onChange={onHoursChange} value={hours} type="number" placeholder="시간"></input>
    </div>
  );
}

export default App;
