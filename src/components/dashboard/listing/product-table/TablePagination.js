import { Button, ButtonGroup } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { ChevronLeftMinor, ChevronRightMinor } from "@shopify/polaris-icons";
import { FetchTotalCount, productOptions, totalProCountUrl } from "../../../../api/apiConstants";

const TablePagination = ({ isPageChange, data, setIsPageChange, loading }) => {
  const [totalCount, setTotalCount] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  useEffect(() => {
      FetchTotalCount(pageNum)
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
  }, [data]);

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
        disabled={loading}
        icon={ChevronLeftMinor}
        onClick={prevHandler}
      />

      <div style={{ display: "flex", alignItems: "center" }}>
        <Button>{pageNum}</Button>
        <span>
          {" "}
          /{data.current_count ? Math.ceil(totalCount / data.current_count) : 1}
          Page
        </span>
      </div>

      <Button
        disabled={loading}
        icon={ChevronRightMinor}
        onClick={nextHandler}
      />
    </ButtonGroup>
  );
};

export default TablePagination;
