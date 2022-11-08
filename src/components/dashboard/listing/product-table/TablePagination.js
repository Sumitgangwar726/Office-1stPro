import { Button, ButtonGroup } from "@shopify/polaris";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftMinor, ChevronRightMinor } from "@shopify/polaris-icons";
import { FetchTotalCount, productOptions, totalProCountUrl } from "../../../../api/apiConstants";

const TablePagination = ({ allFilter, data, setIsPageChange, loading }) => {
  const [totalCount, setTotalCount] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  var timer = useRef()
  const handleDebounce = () =>{
    clearTimeout(timer.current)
    timer.current = setTimeout(setttData,1000)
  }

  const setttData = () =>{
    FetchTotalCount(pageNum , allFilter)
        .then((res) => {
          if (res.success) {
            setTotalCount(res.data.count);
          } else alert(res.message);
        });
      setPageNum(() => {
        if (sessionStorage.getItem("pagination")) {
          return JSON.parse(sessionStorage.getItem("pagination"))[1];
        } else return 1;
      });
  }
  useEffect(() => {
      handleDebounce()
  }, [allFilter]);

  const nextHandler = () => {
    setPageNum((prev) => prev + 1);
    sessionStorage.setItem(
      "pagination",
      JSON.stringify([{ next: data.next }, pageNum + 1])
    );
    setIsPageChange(true);
  };
  const prevHandler = () => {
    if (pageNum !== 1) {
      setPageNum((prev) => prev - 1);
      sessionStorage.setItem(
        "pagination",
        JSON.stringify([{ prev: data.prev }, pageNum - 1])
      );
      setIsPageChange(true);
    }
  };
  return (
    <ButtonGroup>
      <Button
        disabled={loading || pageNum < 2}
        icon={ChevronLeftMinor}
        onClick={prevHandler}
      />

      <div style={{ display: "flex", alignItems: "center" }}>
        <Button disabled>{pageNum}</Button>
        <span>
          {" "}
          /{data.current_count ? Math.ceil(totalCount / data.current_count) : 1}
          Page
        </span>
      </div>

      <Button
        disabled={loading || (pageNum*20)>=totalCount}
        icon={ChevronRightMinor}
        onClick={nextHandler}
      />
    </ButtonGroup>
  );
};

export default TablePagination;
