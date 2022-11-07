import { TextField } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveFilter } from "../redux/FilterSlice";

const InputField = ({ data }) => {
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
  return <TextField value={value} onChange={handelChange} />;
};

export default InputField;
