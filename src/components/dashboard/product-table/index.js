import { Table } from "antd";
import { useEffect, useState } from "react";
import { getRefineProducts, productOptions } from "../../../api/apiConstants";
import columns from "./columns";
import { tableOnRow } from "./tableOnRow";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import OnSelectFeature from "../../../utils/onselect";

const ProTable = ({ currentTab }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(getRefineProducts[currentTab], productOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
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
          setLoading(false);
          setData(t);
        } else alert(res.message);
      });
  }, [currentTab]);

  const [showSelect , setShowSelect] = useState(false)

  const rowSele = {
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
      selected ? setShowSelect(selectedRows.length) : setShowSelect(selected)
    },
  }
  const [rowSelection , setRowSelection] = useState(rowSele)

  const closeOnSelect = ()=>{setShowSelect(false)}
  useEffect(()=>{
    if(!showSelect){
      setRowSelection(undefined)
      setTimeout(()=>{setRowSelection(rowSele)} , 1)
    }
  },[showSelect])

  return (
    <>
    {showSelect && <OnSelectFeature count={showSelect} close={closeOnSelect}/>}
      <Table
        dataSource={data}
        columns={[...columns]}
        rowSelection={rowSelection }
        loading={loading}
        size={'small'}
        showHeader={!showSelect}
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
