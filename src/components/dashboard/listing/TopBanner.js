import { Banner, List } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { bannerUrl, filterHeaders } from "../../../api/apiConstants";

function TopBanner({ setShowBanner }) {
  const [notLinked, setNotLinked] = useState(0);
  useEffect(() => {
    fetch(bannerUrl, filterHeaders)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setNotLinked(res.data.not_linked);
        } else alert(res.message);
      });
  }, []);
  const handelDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem("banner", "false");
  };
  return (
    <Banner
      title={` ${notLinked} Products are yet to be linked!`}
      action={{ content: "Link Products" }}
      status="warning"
      onDismiss={handelDismiss}
    >
      <List>
        Link Amazon Listings with Shopify products to manage inventory and
        Amazon orders.
      </List>
    </Banner>
  );
}
export default TopBanner;
