import { useEffect, useState } from 'react';

export const useCountdown = (seconds) => {
  const [counter, setCounter] = useState(seconds);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return [counter];
};

// export const useCountdown = ({ timeInMilliSeconds, coutDownStarted, countDownTime }) => {
//   const [countDown, setCountDown] = useState(countDownTime - new Date().getTime());

//   useEffect(() => {
//     let interval;
//     if (timeInMilliSeconds > 0) {
//       interval = setInterval(() => {
//         setCountDown(countDownTime - new Date().getTime());
//       }, 1000);
//     } else if (!coutDownStarted) {
//       clearInterval(interval);
//       setCountDown(0);
//     }
//     return () => clearInterval(interval);
//   }, [timeInMilliSeconds, coutDownStarted, countDownTime]);

//   return getReturnValues(countDown);
// };

// const getReturnValues = (countDown) => {
//   // calculate the time left
//   var minutes = Math.floor(countDown / (60 * 1000));
//   var seconds = parseInt(((countDown % (60 * 1000)) / 1000).toFixed(0));
//   return [minutes, seconds];
// };
