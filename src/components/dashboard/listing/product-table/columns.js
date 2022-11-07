import {  Image } from "antd";
import { Badge, Button} from "@shopify/polaris";
import ErrorModal from "./ErrorModal";
import Pooper from "../../../../utils/Pooper";

const badges = {
  Inactive: "info",
  Error: "critical",
  Active: "success",
  "Not Listed": "new",
  'Incomplete': "warning",
};

const columns = [
  {
    title: "Image",
    dataIndex: "main_image",
    render: (src) => <Image src={src} alt="#" height={100}  />,
    key: "image",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Product Details",
    key: "Product Details",
    dataIndex : 'description',
    render: (record) => {
        return (
            <>
            {
               Object.entries(record).map( item =>( <p><b>{item[0]} : </b>{item[1]}</p>))
            }
            </>
        )
    }
  },
  {
    title: "Template",
    dataIndex: "template",
    key: "template",
  },
  {
    title: "Inventory",
    dataIndex: "quantity",
    key: "Inventory",
  },
  {
    title: "Amazon Status",
    key: "Amazon Status",
    dataIndex : 'status',
    render: (record) => {
      // console.log(record)
      if(record[0]!=='Error') return <Badge status={badges[record[0]]}>{record[0]}</Badge>
      else return <>
        <Badge status={badges[record[0]]}>{record[0]}</Badge>
        <ErrorModal data={record[1]} />
      </>
    }
  },
  {
    title: "Activity",
    key: "Activity",
    render: (record) =>{
      if(record.activity === "--") return <p>--</p>
      else return <ErrorModal data={record.activity[1]} name={record.activity[0]} />
    } 
  },
  {
    title: "Actions",
    key: "Actions",
    render: (record) => <Pooper status={record.status}/>,
  },
];

export default columns
