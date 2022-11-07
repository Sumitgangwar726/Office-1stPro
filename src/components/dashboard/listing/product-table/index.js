import { Table } from "antd";
import { useEffect, useState } from "react";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import { FetchTableData } from "../../../../api/apiConstants";
import { tableOnRow } from "./tableOnRow";
import columns from "./columns";

const ProTable = ({ allFilter }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const setttData = async () => {
    // alert()
    let res = await FetchTableData(allFilter);
    console.log(res);
    let t = [];
    res.data.rows.map((item) => {
      let modifiedData = tableOnRow("main")(item);
      let modifiedItems = [];
      item.items.map((i) => {
        modifiedItems = [...modifiedItems, tableOnRow("inner")(i)];
      });
      modifiedData.items = modifiedItems;
      t = [...t, modifiedData];
    });
    console.log('first' , t)
    setData([...t]);
  };

  useEffect(() => {
    setttData();
  }, [allFilter]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        rowSelection={{ ...rowSelection }}
        loading={loading}
        size={"small"}
        expandable={{
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              record.type === "variation" ? (
                <MinusCircleTwoTone onClick={(e) => onExpand(record, e)} />
              ) : null
            ) : record.type === "variation" ? (
              <PlusCircleTwoTone onClick={(e) => onExpand(record, e)} />
            ) : null,
          rowExpandable: (record) => record.type === "variation",
          expandedRowRender: (record) => {
            let dataSource = record.items.filter(
              (item) => item.sku !== record.container_id
            );
            return (
              <Table
                dataSource={dataSource}
                columns={columns.filter((item) => item.key !== "template")}
                rowSelection={{ ...rowSelection }}
                pagination={false}
                size={"small"}
                scroll={{ x: true }}
              />
            );
          },
        }}
      />
    </>
  );
};

export default ProTable;
