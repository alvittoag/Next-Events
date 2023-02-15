import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import { useRouter } from "next/router";
import fs from "fs/promises";
import path from "path";
import { GetServerSideProps } from "next";
import { Event } from "..";

type Props = {
  events: Event[];
};

const AllEventsPage = ({ events }: Props) => {
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

export const getServerSideProps: GetServerSideProps = async () => {
  const filePath = path.join(process.cwd(), "data", "db.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return {
    props: { events: data.events },
  };
};
