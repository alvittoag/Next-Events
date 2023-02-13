import Link from "next/link";
import { MouseEventHandler } from "react";
import classes from "./button.module.css";

type Props = {
  children: React.ReactNode;
  link?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button = (props: Props) => {
  return (
    <>
      {props.link ? (
        <Link className={classes.btn} href={props.link}>
          {props.children}
        </Link>
      ) : (
        <button onClick={props?.onClick} className={classes.btn}>
          {props.children}
        </button>
      )}
    </>
  );
};

export default Button;
