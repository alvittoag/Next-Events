import EventItem from "@/components/events/EventItem";
import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import React from "react";

const FilteredEventsPage = () => {
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

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

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
