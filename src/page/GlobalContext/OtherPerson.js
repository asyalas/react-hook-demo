import React from "react";
import { createGlobalContext, useContext } from "./utils";
const OtherPerson = () => {
  const OtherPersonStore = createGlobalContext("otherPerson", {
    age: 19,
    name: "nick"
  });
  return (
    <OtherPersonStore.Provider>
      <OtherPersonPage />
    </OtherPersonStore.Provider>
  );
};
const OtherPersonPage = () => {
  const { age, name } = useContext("otherPerson");
  return (
    <div>
      <div>姓名:{name}</div>
      <div>年龄:{age}</div>
    </div>
  );
};

export default OtherPerson;
