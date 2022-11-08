import { Tag, Stack } from "@shopify/polaris";
import { useState, useEffect } from "react";

function TagView({ setAllFilter, allFilter }) {
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    let t = allFilter;
    let sel = [];
    sel = Object.keys(t).map((item) => {
      if (item === "query" && t[item][0] !== "") {
        return [`${t[item][1][1]} contains ${t[item][0]}`, item];
      } else if (item === "tabSelected" && t[item][0] !== "All") {
        return [`Product status equals ${t[item][0]}`, item];
      } else if (t[item].change) {
        return [`${item} ${t[item].selectValue} ${t[item].textValue}`, item];
      }
    });
    setSelectedTags(sel.filter((item) => item !== undefined));
  }, [allFilter]);

  const removeTag = (tag, key) => () => {
    console.log(tag, "-----", key);
    if (key === "tabSelected") {
      allFilter[key] = ["All", 0];
    } else if (key === "query") {
      allFilter[key] = ["", ""];
    } else {
      allFilter[key].change = false;
      allFilter[key].textValue = "";
    }
    setAllFilter({ ...allFilter });
    console.log(selectedTags);
    setSelectedTags((prev) => prev.filter((item) => item[0] !== tag));
  };

  const tagMarkup = selectedTags.map(
    (option) =>
      option && (
        <Tag key={option[0]} onRemove={removeTag(option[0], option[1])}>
          {option[0]}
        </Tag>
      )
  );

  return <Stack spacing="tight">{tagMarkup}</Stack>;
}

export default TagView;
