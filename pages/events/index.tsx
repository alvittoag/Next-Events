import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventsSearch";
import { useRouter } from "next/router";
import fs from "fs/promises";
import path from "path";
import { GetStaticProps } from "next";
import { Event } from "..";
import Header from "@/components/layout/Header";

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
      <Header title="All | Events" />
      <EventsSearch onSearch={findEventsHandler} />

      <EventList items={events} />
    </>
  );
};

export default AllEventsPage;

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "db.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  return {
    props: { events: data.events },
    revalidate: 10,
  };
};
