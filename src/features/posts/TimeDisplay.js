import { formatDistanceToNow } from "date-fns";
import parseISO from "date-fns/parseISO";

const TimeDisplay = ({ date }) => {
  let time = "";
  if (date) {
    const jsDate = parseISO(date);
    const timeperiod = formatDistanceToNow(jsDate);
    time = `${timeperiod} ago`;
  }
  return (
    <span title={date}>
      &nbsp; <i>{time}</i>
    </span>
  );
};

export default TimeDisplay;
