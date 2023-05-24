"use client";
// import { useSelector, useDispatch } from "react-redux";
// import { selectAllEvents, getAllEvents } from "../_utils/store/events";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import styles from "../_styles/calendar.module.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BigCalendar = (props) => {
  // const dispatch = useDispatch();
  const saveChosenEvent = (event) => {
    props.deleteModal(event._id);
  };

  console.log(props.events);

  return (
    <div className="d-flex justify-content-center">
      <Calendar
        className={styles.calendar}
        localizer={localizer}
        events={props.events}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 600,
          backgroundColor: "white",
          marginBottom: "2rem",
        }}
        selectable
        onSelectEvent={(event) => {
          saveChosenEvent(event);
        }}
      />
    </div>
  );
};

export default BigCalendar;
