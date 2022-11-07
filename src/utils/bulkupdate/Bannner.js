import {Banner} from '@shopify/polaris';
import React from 'react';

function Bannner({data}) {
  return (
    <Banner  status={data.status} >
      <p>{data.content}</p>
    </Banner>
  );
}
export default Bannner