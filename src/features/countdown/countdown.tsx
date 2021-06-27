import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectCountdown, startCountdown } from 'features/countdown/countdownSlice';

const Countdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const { countdown } = useAppSelector(selectCountdown);

  return (
    <div>
      <span>{countdown.days} days </span>
      <span>{countdown.hours} hours </span>
      <span>{countdown.minutes} minutes </span>
      <span>{countdown.seconds} seconds</span>
      <button type="button" onClick={() => dispatch(startCountdown([2021, 5, 30]))}>
        Start
      </button>
    </div>
  );
};

export default Countdown;
