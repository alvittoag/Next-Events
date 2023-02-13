import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById } from "@/dummy-data";
import { useRouter } from "next/router";

const DetailEventPage = () => {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event)
    return (
      <ErrorAlert>
        <p>No Event Found!</p>
      </ErrorAlert>
    );

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default DetailEventPage;
