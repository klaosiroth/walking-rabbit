import { useCountdown } from 'src/hooks/useCountdown';

const CountdownTimer = ({ seconds }) => {
  const [counter] = useCountdown(seconds);

  // if (days + hours + minutes + seconds <= 0) {
  //   return <ExpiredNotice />;
  // } else {
  //   return <ShowCounter seconds={seconds} />;
  // }

  return <div>{counter}</div>;
};

export default CountdownTimer;
