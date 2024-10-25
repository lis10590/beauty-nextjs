"use client";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import UpdateEvent from "./updateEvent";

const Calendar = ({ events, treatments, customers }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [chosenEvent, setChosenEvent] = useState({});
  const [mockEvents, setMockEvents] = useState([
    {
      title: "event 1",
      id: "1",
      start: new Date("2024-06-27T10:00:00"),
      end: new Date("2024-06-27T12:00:00"),
    },
    { title: "event 2", id: "2" },
    { title: "event 3", id: "3" },
    { title: "event 4", id: "4" },
    { title: "event 5", id: "5" },
  ]);
  const handleDateClick = (arg) => {
    console.log(arg);
  };

  const handleEventClick = (data) => {
    setChosenEvent(data.event);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        dateClick={handleDateClick}
        selectable={true}
        events={events}
        editable={true}
        eventClick={(data) => handleEventClick(data)}
        selectMirror={true}
        nowIndicator={true}
      />
      <UpdateEvent
        customers={customers}
        treatments={treatments}
        event={chosenEvent}
        isOpen={modalOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default Calendar;
