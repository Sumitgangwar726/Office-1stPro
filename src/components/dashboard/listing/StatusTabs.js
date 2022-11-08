import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Badge } from "@shopify/polaris";
import { productOptions } from "../../../api/apiConstants";

const StatusTabs = ({setAllFilter , allFilter}) => {
  const [selected, setSelected] = useState(allFilter.tabSelected[1])
  const [count , setCount] = useState({'Not Listed' : 0});

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelected(selectedTabIndex);
    setAllFilter({...JSON.parse(sessionStorage.getItem('filter')) , tabSelected : [tabsName[selectedTabIndex] , selectedTabIndex]})
  }, []);

  useEffect(()=>{
    setSelected(allFilter.tabSelected[1])
  },[allFilter])



  const tabsName = [
    'All',
    'Not Listed',
    'Inactive',
    'Incomplete',
    'Active',
    'Error'
  ]

  const tabs = [
    {
      id: "All",
      content: <span>All</span>,
      accessibilityLabel: "All customers",
      panelID: "all",
    },
    {
      id: "Not Listed",
      content: (
        <span>
          Not Listed <Badge status="new">{count['Not Listed']}</Badge>
        </span>
      ),
      panelID: "not-listed",
    },
    {
      id: "Inactive",
      content: (
        <span>
          Inactive <Badge status="info">{count.Inactive}</Badge>
        </span>
      ),
      panelID: "inactive",
    },
    {
      id: "Incomplete",
      content: (
        <span>
          Incomplete <Badge status="warning">{count.Incomplete}</Badge>
        </span>
      ),
      panelID: "incomplete",
    },
    {
      id: "Active",
      content: (
        <span>
          Active <Badge status="success">{count.Active}</Badge>
        </span>
      ),
      panelID: "active",
    },
    {
      id: "Error",
      content: <span>Error</span>,
      panelID: "error",
    },
  ];

  useEffect(() => {
    fetch(
      "https://multi-account.sellernext.com/home/public/connector/product/getStatusWiseCount",
      productOptions
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          let t = {'Not Listed' : 0};
          res.data.map((item) => { 
            if(item._id===null || item._id==='Not Listed'){
              t['Not Listed']+= item.total
            }
            else t[item._id] = item.total
          });
          setCount({...t});
        //   console.log(count)
        } else alert(res.message);
      });
  }, []);


  return (
    <Tabs fitted tabs={tabs} selected={selected} onSelect={handleTabChange} />
  );
};

export default StatusTabs;
