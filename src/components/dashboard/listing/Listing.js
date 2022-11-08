import React, { useEffect, useState } from "react";
import { Card, Frame, Stack, Page } from "@shopify/polaris";
import StatusTabs from "./StatusTabs";
import FilterFeature from "./FilterFeature";
import { FilterData } from "./FilterData";
import TagView from "./TagsView";
import SearchField from "./SearchField";
import ProTable from "./product-table";
import BulkUpdate from "./bulkupdate/BulkUpdate";
import TopBanner from "./TopBanner";

const Listing = () => {
  const [allFilter, setAllFilter] = useState(() => {
    if (sessionStorage.getItem("filter"))
      return JSON.parse(sessionStorage.getItem("filter"));
    else return FilterData;
  });

  const [flag , setFlag] = useState()

  useEffect(()=>{
    setFlag(false)
    return ()=>{setFlag(false)}
  },[])

  useEffect(() => {
    if(flag)  sessionStorage.removeItem('pagination')
    else setFlag(true)
    sessionStorage.setItem("filter", JSON.stringify(allFilter));
  }, [allFilter]);

  

  const [showBanner, setShowBanner] = useState(() => {
    let t = sessionStorage.getItem("banner");
    if (t) {
      return false;
    } else return true;
  });

  return (
    <Page
      fullWidth
      title="Listing"
      titleMetadata="The section will enable you to manage all your listings of your active Amazon account. The feature helps you view the status of your listings along with performing actions like Bulk upload, running Sync Status, Amazon Lookup, or linking your unlinked Products by getting directed to the Product Linking section."
    >
      <Frame>
        {showBanner && (
          <>
            <TopBanner setShowBanner={setShowBanner} />
            <br />
          </>
        )}
        <Card>
          <Card.Section>
            <StatusTabs setAllFilter={setAllFilter} allFilter={allFilter} />
          </Card.Section>
          <Card.Section>
            <Stack>
              <SearchField setAllFilter={setAllFilter} allFilter={allFilter} />
              <FilterFeature
                setAllFilter={setAllFilter}
                allFilter={allFilter}
              />
              <BulkUpdate />
            </Stack>
            <div style={{ marginTop: "1vw" }}>
              <TagView setAllFilter={setAllFilter} allFilter={allFilter} />
            </div>
          </Card.Section>
          <Card.Section>
            <ProTable allFilter={allFilter} />
          </Card.Section>
        </Card>
      </Frame>
    </Page>
  );
};

export default Listing;
