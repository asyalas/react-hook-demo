import React from "react";
import All from "./All";
import OtherPerson from "./OtherPerson";
import Person from "./Person";
const Line = () => (
  <div
    style={{
      borderBottom: "1px solid #ccc",
      margin: "30px 0 ",
      overflow: "hidden"
    }}
  />
);
const Home = () => {
  return (
    <div>
      <Person />
      <Line />
      <OtherPerson />

      <Line />
      <All />
    </div>
  );
};

export default Home;
