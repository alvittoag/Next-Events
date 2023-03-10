import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import fs from "fs/promises";
import path from "path";
import { Event } from "..";
import Header from "@/components/layout/Header";

type Slug = {
  slug: string;
};

type Props = {
  filteredEvents: Event[];
  hasError: boolean;
  date: { year: number; month: number };
};

const FilteredEventsPage = ({ filteredEvents, hasError, date }: Props) => {
  console.log(hasError);
  // const router = useRouter();
  // const filteredData = router.query.slug;

  // if (!filteredEvents) return <h1 className="center">Loading...</h1>;

  // const filteredYear = parseInt(filteredData[0]);
  // const filteredMonth = parseInt(filteredData[1]);

  if (hasError)
    return (
      <>
        <Header title="Invalid Filter | Events" />
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
        <Header title="No Events | Events" />
        <ErrorAlert>
          <p>No Events for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );

  const dates = new Date(date.year, date.month - 1);

  return (
    <>
      <Header title="Result | Events" />
      <ResultsTitle date={dates} />
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

  const filteredYear = parseInt(slug[0]);
  const filteredMonth = parseInt(slug[1]);

  const year = +filteredYear;
  const month = +filteredMonth;

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  )
    return {
      props: { hasError: true },
      // notFound: true
    };

  let filteredEvents = data.events.filter((event: Event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  return {
    props: {
      filteredEvents,
      date: {
        year,
        month,
      },
    },
  };
};
