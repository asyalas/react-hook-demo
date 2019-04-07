import React from "react";
import { createGlobalContext, useContext } from "./utils";
import { Button } from "antd";

const Result = () => {
  const { age, name } = useContext("person");
  return (
    <div>
      <div>姓名:{name}</div>
      <div>年龄:{age}</div>
    </div>
  );
};

const AddButton = () => {
  const { dispatch } = useContext("person");
  const addAgeHandle = () => {
    dispatch(data => ({
      ...data,
      age: data.age + 1
    }));
  };
  return (
    <Button type="primary" onClick={addAgeHandle}>
      increase age
    </Button>
  );
};
const Person = () => {
  const PersonStore = createGlobalContext("person", {
    age: 18,
    name: "harry"
  });
  return (
    <PersonStore.Provider>
      <Result />
      <AddButton />
    </PersonStore.Provider>
  );
};

export default Person;
