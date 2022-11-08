export const tableOnRow = (tableType) => {
    if (tableType === "main") {
      return (record, index) => {
        record.key = record.container_id;
        record.template = record.profile ? record.profile.profile_name : "N/A";
  
        let t = 0;
        record.items.map((i) => (t += i.quantity ? Number(i.quantity) : 0));
        record.quantity = t;
  
        let itemIndex = 1;
        if (record.type === "simple") {
          itemIndex = 0;
          record.description = {
            price: record.items[0].price ? record.items[0].price : "N/A",
            barcode: record.items[0].barcode ? record.items[0].barcode : "N/A",
            sku: record.items[0].sku ? record.items[0].sku : "N/A",
            asin: record.items[0].asin ? record.items[0].asin : "N/A",
          };
        } else {
          record.description = {
            sku: record.items[0].sku ? record.items[0].sku : "N/A",
            asin: record.items[0].asin ? record.items[0].asin : "N/A",
          };
        }
  
        record.items.map((item) => {
          if (item.error) {
            record.status = ["Error" , item.error];
          }
        });
        if (!record.status) {
          if (record.items[itemIndex].status)
            record.status = [record.items[itemIndex].status];
          else record.status = ["Not Listed"];
        }
        // console.log(record.items[0].process_tags)
        if(record.items[0].process_tags)  record.activity = ['In Progress' , record.items[0].process_tags]
        else record.activity = ['--']
  
        // console.log(record);
        return record
      };
    } else {
      return (record, index) => {
        record.description = {
          price: record.price ? record.price : "N/A",
          barcode: record.barcode ? record.barcode : "N/A",
          sku: record.sku ? record.sku : "N/A",
          asin: record.asin ? record.asin : "N/A",
        };
  
        if (record.error) record.status = ["Error" , record.error];
        if (!record.status) record.status = ["Not Listed"];
  
        if(record.process_tags)  record.activity = ['In Progress' , record.process_tags]
        else record.activity = ['--']
  
        record.key = record.sku;
        return record
      };
    }
  };
  