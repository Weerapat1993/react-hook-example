import React, { useEffect, useState } from "react";
import { usePrevious } from "../../utils/hooks/usePrevious";

const Countdown = ({ endDate, onRandom, onTimeup }) => {
  const calculateTimeLeft = () => {
    const startDate = new Date();
    const difference = +endDate - +startDate;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const timerComponents = [];
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const isTimeup = Object.keys(timeLeft).length === 0;
  const prevProps = usePrevious({ isTimeup });
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    if(prevProps) {
      if(prevProps.isTimeup !== isTimeup) {
        onTimeup()
      }
    }
  });


  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  return timerComponents.length ? (
    <h1>{timerComponents}</h1>
  ) : null
}

Countdown.defaultProps = {
  onTimeup: () => null,
}

export default Countdown;
