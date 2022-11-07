import React, { useState } from 'react'
import BulkPopover from './BulkPopover'
import ExportModal from './ExportModal'
import ImportMOdal from './ImportModal'

const BulkUpdate = () => {
    const [importModal,setImportMOdal] = useState(false)
    const [exportMOdal,setExportMOdal] = useState(false)
    const importactivator =()=>{
        setImportMOdal(!importModal)
    }
    const exportactivator =()=>{
        setExportMOdal(!exportMOdal)
    }
    const actionHandler =(val)=>{
        if(val==='Import Products')
        importactivator()
        if(val==='Export Products')
        exportactivator()
    }
  return (
    <>
    <BulkPopover data={{name:'Bulk Update',content:['Import Products','Export Products']}} onClick={actionHandler}/>
    <ImportMOdal open={importModal} activatorHandler={importactivator}/>
    <ExportModal open={exportMOdal} activatorHandler={exportactivator} disable={[true,true]}/>
    </>
  )
}

export default BulkUpdate