import React, { useState } from 'react'

const Loader = (OriginalComponent) => {
  const NewComponent = () =>{
    const [loading , setLoading] = useState(false)
    return <OriginalComponent loading={loading} setLoading={setLoading} />
  }
  return NewComponent
}

export default Loader