import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  Tabs,
  Badge,
  Frame,
  TextField,
  Button,
  Stack,
} from "@shopify/polaris";
import StatusTabs from "./StatusTabs";
import FilterFeature from "./FilterFeature";
import { FilterData } from "./FilterData";
import TagView from "./TagsView";
import SearchField from "./SearchField";
import ProTable from "./product-table";
import { FetchTableData } from "../../../api/apiConstants";


const Listing = () => {

    const [allFilter , setAllFilter] = useState(()=>{
        if(sessionStorage.getItem('filter'))    return JSON.parse(sessionStorage.getItem('filter'))
        else return FilterData
    })

    useEffect(()=>{
        sessionStorage.setItem('filter' , JSON.stringify(allFilter))
        FetchTableData(allFilter)
    },[allFilter])  

    

  

  return (
    <Frame>
      <Card>
        <Card.Section>
          <StatusTabs setAllFilter={setAllFilter} allFilter={allFilter}/>
        </Card.Section>
        <Card.Section>
            <Stack>
                <SearchField setAllFilter={setAllFilter} allFilter={allFilter}/>
                <FilterFeature setAllFilter={setAllFilter} allFilter={allFilter}/>
            </Stack>
            <TagView setAllFilter={setAllFilter} allFilter={allFilter}/>
        </Card.Section>
        <Card.Section>
          <ProTable allFilter={allFilter}/>
        </Card.Section>
      </Card>
    </Frame>
  );
};

export default Listing;
