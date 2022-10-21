import { memo, useEffect } from 'react';
import { useCountdown } from 'src/hooks/useCountdown';

function Progress({
  timeInMilliSeconds,
  animationDuration,
  stopTimer,
  countDownStarted,
  countDownTime,
}) {
  // const [minutes, seconds] = useCountdown({
  //   timeInMilliSeconds,
  //   countDownStarted,
  //   countDownTime,
  // });

  // const customMinute = minutes < 10 ? `0` + minutes : minutes;
  // const customSeconds = seconds < 10 ? `0` + seconds : seconds;

  // // Clear Intervals and rest time
  // useEffect(() => {
  //   if (minutes + seconds <= 0) {
  //     stopTimer();
  //     return;
  //   }
  // }, [minutes, seconds]);

  return (
    <>
      <div>{/* {customMinute} : {customSeconds} */}</div>
    </>
  );
}
// https://www.youtube.com/watch?v=psQquXiN5O8
export default memo(Progress);
