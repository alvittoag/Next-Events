import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/ui/error-alert";
import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs/promises";
import path from "path";
import { Event } from "..";

type Params = {
  params: { eventId: string };
};

type Props = {
  event: Event;
};

const DetailEventPage = ({ event }: Props) => {
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

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "db.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  return data;
};

export const getStaticProps: GetStaticProps = async (contex) => {
  const { params } = contex as Params;
  const data = await getData();

  const event = data.events.find((event: Event) => event.id === params.eventId);

  if (!event) return { notFound: true };

  return {
    props: { event },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();

  const eventId = data.events.map((event: Event) => {
    return {
      params: { eventId: event.id },
    };
  });

  return {
    paths: eventId,
    fallback: false,
  };
};
