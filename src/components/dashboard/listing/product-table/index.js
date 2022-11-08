import { Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import { FetchTableData } from "../../../../api/apiConstants";
import { tableOnRow } from "./tableOnRow";
import columns from "./columns";
import OnSelectFeature from "./onselect";
import { Stack } from "@shopify/polaris";
import TablePagination from "./TablePagination";

const ProTable = ({ allFilter }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [paginationData , setPaginationData] = useState({})
  const [isPageChange , setIsPageChange] = useState(false)
  const [allKeys , setAllKeys] = useState([])

 

  const setttData = async () => {
    setLoading(true)
    let res = await FetchTableData(allFilter , JSON.parse(sessionStorage.getItem('pagination')));
    setLoading(false)
    if(res.success){
      setPaginationData({
        current_count : res.data.current_count,
        next : res.data.next,
        prev : res.data.prev
      })
      let t = [];
      setAllKeys(res.data.rows.map(item => item['container_id']))
      res.data.rows.map((item) => {
      let modifiedData = tableOnRow("main")(item);
      let modifiedItems = [];
      item.items.map((i) => {
        modifiedItems = [...modifiedItems, tableOnRow("inner")(i)];
      });
      modifiedData.items = modifiedItems;
      t = [...t, modifiedData];
    });
    setData([...t]);
    }else alert(res.message)
  };
  var timer = useRef()
  const handleDebounce = () =>{
    clearTimeout(timer.current)
    timer.current = setTimeout(setttData,1000)
  }
  useEffect(() => {
    handleDebounce()
  }, [allFilter])
  
  useEffect(()=>{
    if(isPageChange){
      setttData()
      setIsPageChange(false)
    }
  },[isPageChange])

  const [selectedRowKeys , setSelectedRowKeys] = useState([])

  const showHeader =  selectedRowKeys.length > 0

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Stack distribution="center">
      <Stack.Item>
      {showHeader && <OnSelectFeature allKeys={allKeys} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys}/>}
      <Table
        dataSource={data}
        columns={columns}
        rowSelection={{ ...rowSelection }}
        loading={loading}
        size={"small"}
        showHeader={!showHeader}
        pagination={false}
        scroll={{x:true}}
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
      </Stack.Item>
      <Stack.Item>
        <TablePagination allFilter={allFilter}  data = {paginationData} setIsPageChange={setIsPageChange} loading={loading} />
      </Stack.Item>
    </Stack>
  );
};

export default ProTable;
