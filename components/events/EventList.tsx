import EventItem from "./EventItem";
import classes from "./event-list.module.css";

type Props = {
  items: Dummy[];
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
