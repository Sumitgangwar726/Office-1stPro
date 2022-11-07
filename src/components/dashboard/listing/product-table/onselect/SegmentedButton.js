import { Button, ButtonGroup, Icon } from '@shopify/polaris'
import { Checkbox } from 'antd'
import React from 'react'
import {
    CancelSmallMinor
  } from '@shopify/polaris-icons';

const SegmentedButton = ({count , close}) => {
  return (
    <ButtonGroup segmented>
        <Button icon={<Checkbox checked={'true'} />} onClick={()=>close()}> {count} selected </Button>
        <Button icon={CancelSmallMinor} onClick={()=>close()}></Button>
    </ButtonGroup>
  )
}

export default SegmentedButton