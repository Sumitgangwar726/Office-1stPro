import {  Stack, Tag } from '@shopify/polaris'
import React from 'react'

const BadgeList = ({data}) => {
  return (
    <Stack>
    {
        data.map((item)=>{
            return  <Tag key={item[0]} onRemove={()=>{console.log('jj');}}>{item[0]} contains {item[1]}</Tag>
        })
    }
    </Stack>
  )
}

export default BadgeList