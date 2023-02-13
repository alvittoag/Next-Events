import classes from "./event-content.module.css";

type Props = {
  children: React.ReactNode;
};

function EventContent(props: Props) {
  return <section className={classes.content}>{props.children}</section>;
}

export default EventContent;
