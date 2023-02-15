import EventList from "@/components/events/EventList";
import { GetStaticProps } from "next";
import fs from "fs/promises";
import path from "path";

export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
  address?: string | undefined;
};

type Props = {
  events: Event[];
};

const HomePage = ({ events }: Props) => {
  return (
    <>
      <EventList items={events} />
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "db.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  const featuredEvents = data.events.filter((event: Event) => event.isFeatured);

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 10,
  };
};
