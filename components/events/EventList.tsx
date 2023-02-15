import EventItem from "./EventItem";
import classes from "./event-list.module.css";
import { Event } from "@/pages";

type Props = {
  items: Event[];
};

const EventList = ({ items }: Props) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem key={event.id} item={event} />
      ))}
    </ul>
  );
};

export default EventList;
