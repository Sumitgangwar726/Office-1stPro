import { Frame, Navigation } from "@shopify/polaris";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const pageSelected = {
    overview: false,
    listing: false,
    productLinking: false,
    setting: false,
    faq: false,
  };
  const [selectedRoute, setSelectedRoute] = useState({
    ...pageSelected,
    listing: true,
  });
  const nav = useNavigate();

  const changePage = (page) => {
    setSelectedRoute({ ...pageSelected, [page]: true });
    nav(`/dashboard/${page}`);
  };

  return (
    <Frame>
      <Navigation location="/dashboard">
        <Navigation.Section
          items={[
            {
              label: "Overview",
              selected: selectedRoute.overview,
              onClick: () => changePage("overview"),
            },
            {
              label: "Listing",
              selected: selectedRoute.listing,
              onClick: () => changePage("listing"),
            },
            {
              label: "Product Linking",
              selected: selectedRoute.productLinking,
              onClick: () => changePage("productLinking"),
            },
            {
              label: "Settings",
              selected: selectedRoute.setting,
              onClick: () => changePage("setting"),
            },
            {
              label: "FAQ",
              selected: selectedRoute.faq,
              onClick: () => changePage("faq"),
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
};

export default SideBar;
