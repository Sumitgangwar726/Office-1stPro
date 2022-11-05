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
import ProTable from "./product-table";
import StatusTabs from "./product-table/StatusTabs";
import SearchField from "../SearchField";
import Pooper from "../../utils/Pooper";
import ResourceListFilters from "../Filter";
import { useSelector } from "react-redux";
import BadgeList from "../../utils/BadgeList";

const Listing = () => {
  const [serText, setSerText] = useState("");
  const [stab, setStab] = useState(Number(sessionStorage.getItem("tab")));
  

  const selectedTab = (data) => setStab(data);

  const filter = useSelector(state=>state.filter) 

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <Frame>
      <Card>
        <Card.Section>
          <StatusTabs selectedTab={selectedTab} />
        </Card.Section>
        <Card.Section>
          <Stack>
            <SearchField  />
            <ResourceListFilters />
            {/* <Button>More Filters</Button> */}
            <Pooper />
            <Button>Sync Status</Button>
            <Button>Amazon Lookup</Button>
            <Button>Bulk Updates</Button>
          </Stack>
          <BadgeList data={Object.entries(filter)}/>
        </Card.Section>
        <Card.Section>
          <ProTable currentTab={stab} />
        </Card.Section>
      </Card>
    </Frame>
  );
};

export default Listing;
