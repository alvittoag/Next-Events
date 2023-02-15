import Head from "next/head";
import React from "react";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Find a lot of great events that allow you to evolve"
      />
    </Head>
  );
};

export default Header;
