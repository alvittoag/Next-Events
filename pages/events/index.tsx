import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";

const AllEventsPage = () => {
  const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (
    year: string | undefined,
    month: string | undefined
  ) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />

      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;
