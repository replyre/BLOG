import React from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const Time = () => {
  //date
  const date = new Date();
  var ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes
  const offset = ISToffSet * 60 * 1000;
  const [ISTTime, setNewIST] = React.useState(
    new Date(date.getTime() + offset)
  );
  // console.log(ISTTime.totoLocaleTimeString());
  React.useEffect(() => {
    var timer = setInterval(() => setNewIST(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return (
    <div className="time">
      <span className="date">
        <FaCalendarAlt />
        {ISTTime.toLocaleDateString()}
      </span>
      <span className="clock">
        <FaClock />
        {ISTTime.toLocaleTimeString()}
      </span>
    </div>
  );
};

export default Time;
