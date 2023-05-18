import { formatDistanceToNowStrict, format } from "date-fns";

function getDate(date) {
  const newDate = new Date(date);

  const formattedDate = format(newDate, "h:mm");

  const distance = formatDistanceToNowStrict(newDate, {
    addSuffix: true,
    roundingMethod: "floor",
  });

  return `${distance}, ${formattedDate}`;
}

export default getDate;
