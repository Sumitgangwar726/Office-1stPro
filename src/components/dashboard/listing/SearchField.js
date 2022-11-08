import { Autocomplete, Button, Columns, Icon } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { Image } from "antd";
import { useState, useEffect } from "react";
import { productOptions, proSearch } from "../../../api/apiConstants";

function SearchField({ setAllFilter, allFilter }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState(allFilter.query[0]);
  const [options, setOptions] = useState([]);

  const updateText = (value) => {
    setInputValue(value);
  };

  const updateSelection = (data) => {
    setSelectedOptions(data);
    console.log(data);
    console.log(highlighted);
    setAllFilter({ ...allFilter, query: [inputValue, [data, highlighted]] });
  };

  //   const makeData = (pro, key) => {
  //     let result = {};
  //     pro.items.map((data) => {
  //       result.image = pro.main_image;
  //       result.brand = pro.brand;
  //       result.title = pro.title;
  //       result.product_type = pro.product_type;
  //       result.container_id = pro.container_id;
  //       result.sku = data.sku;
  //       result.match = key;
  //     });
  //     return result;
  //   };

  const [highlighted, setHighlighted] = useState("");
  const [searchData, setSearchData] = useState([]);

  const changeOptions = () => {
    if(inputValue!=='' || undefined){
      setLoading(true);
    fetch(proSearch(inputValue), productOptions)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (!res.success) alert(res.message);
        else {
          setSearchData(res);
          res.data.map((item) => {
            if (item.title.toLowerCase().startsWith(inputValue.toLowerCase())) {
              setHighlighted("title");
            } else if (
              item.brand.toLowerCase().startsWith(inputValue.toLowerCase())
            ) {
              setHighlighted("brand");
            } else if (
              item.product_type
                .toLowerCase()
                .startsWith(inputValue.toLowerCase())
            ) {
              setHighlighted("product_type");
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    if (highlighted === "") return;
    let garbage = 0;
    var temp = [];
    searchData.data.map((item) => {
      var result = {};
      item.brand.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.title.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.product_type.toLowerCase().includes(inputValue.toLowerCase())
        ? item.items.map((data) => {
            result.image = item.main_image;
            result.brand = item.brand;
            result.title = item.title;
            result.product_type = item.product_type;
            result.container_id = item.container_id;
            result.sku = data.sku;
            temp.push(result);
          })
        : (garbage = "");
      if (temp.length === 0) {
        setOptions([
          {
            key: "unique",
            value: null,
            label: (
              <div>
                <Icon source={SearchMinor} color="base" />
                <b>No Data Found</b>
              </div>
            ),
          },
        ]);
      } else {
        setOptions(
          temp.map((item, i) => {
            return {
              key: i,
              value: item.container_id,
              label: (
                <Columns
                  spacing={{ xs: 2 }}
                  columns={{ xs: "1fr 3fr", sm: "0.5fr 2fr", md: "0.5fr 2fr" }}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fallback="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
                  />
                  <div>
                    {highlighted !== "" && highlighted === "title" ? (
                      <>
                        <b>{inputValue}</b>
                        {item.title.substring(
                          inputValue.length,
                          item.title.length
                        )}
                        <br />
                        Brand : {item.brand}
                        <br />
                        Type : {item.product_type}
                      </>
                    ) : highlighted !== "" && highlighted === "brand" ? (
                      <>
                        {item.title}
                        <br />
                        Brand : <b>{inputValue}</b>
                        {item.brand.substring(
                          inputValue.length,
                          item.brand.length
                        )}
                        <br />
                      </>
                    ) : highlighted !== "" && highlighted === "product_type" ? (
                      <>
                        {item.title}
                        <br />
                        Type : <b>{inputValue}</b>
                        {item.product_type.substring(
                          inputValue.length,
                          item.product_type.length
                        )}
                      </>
                    ) : (
                      <>
                        {item.title}
                        <br />
                        Brand: {item.brand}
                        <br />
                        Type: {item.product_type}
                      </>
                    )}
                  </div>
                </Columns>
              ),
            };
          })
        );
      }
    });
  }, [highlighted]);

  // const searchData = [];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let t = "";
    if (inputValue !== "") t = setTimeout(changeOptions, 500);

    return () => {
      clearTimeout(t);
    };
  }, [inputValue]);

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search"
    />
  );

  return (
    <Autocomplete
      options={options}
      selected={selectedOptions}
      onSelect={updateSelection}
      textField={textField}
      loading={loading}
    />
  );
}

export default SearchField;
