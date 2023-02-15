import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import fs from "fs/promises";
import path from "path";
import { Event } from "..";

type Slug = {
  slug: string;
};

type Props = {
  filteredEvents: Event[];
};

const FilteredEventsPage = ({ filteredEvents }: Props) => {
  console.log(filteredEvents);
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) return <h1 className="center">Loading...</h1>;

  const filteredYear = parseInt(filteredData[0]);
  const filteredMonth = parseInt(filteredData[1]);

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  )
    return (
      <>
        <ErrorAlert>
          <p className="center">Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show ALl Events</Button>
        </div>
      </>
    );

  if (filteredEvents.length === 0)
    return (
      <>
        <ErrorAlert>
          <p>No Events for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );

  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "db.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  return data;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query as Slug;

  const data = await getData();

  let filteredEvents = data.events.filter((event: Event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === parseInt(slug[0]!) &&
      eventDate.getMonth() === parseInt(slug[1]!) - 1
    );
  });

  return {
    props: { filteredEvents },
  };
};
