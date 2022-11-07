import { Select } from "@shopify/polaris";
import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { saveFilter } from "../redux/FilterSlice";

const SelectField = ({ options, data }) => {
  const [value, setValue] = useState(() => {
    let t = JSON.parse(sessionStorage.getItem("filter")) || {};
    return t[data] || "";
  });

  const dispatch = useDispatch();

  const handelChange = (value) => {
    setValue(value);
    let t = JSON.parse(sessionStorage.getItem("filter")) || {};
    t = { ...t, [data]: value };
    sessionStorage.setItem("filter", JSON.stringify(t));
    dispatch(saveFilter());
  };
  return <Select options={options} value={value} onChange={handelChange} />;
};

export default SelectField;
