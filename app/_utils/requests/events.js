import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//helper function to format date
const transformData = (response) => {
  response.map((event) => ({
    ...event,
    start: new Date(event.start).toLocaleDateString("en-US"),
    end: new Date(event.end).toLocaleDateString("en-US"),
  }));

  return;
};

//new event addition
export const addNewEvent = async (event) => {
  try {
    const res = await axios.post(`${apiUrl}/api/events/newEvent`, event, {
      headers: { "Cache-Control": "no-store" },
    });

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

//display all events on calendar
export const getEvents = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/events/getEvents`, {
      headers: { "Cache-Control": "no-store" },
    });
    transformData(res.data);

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

//delete event
export const deleteEvent = async (eventId) => {
  try {
    const res = await axios.delete(
      `${apiUrl}/api/events/deleteEvent?eventId=${eventId}`,
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
