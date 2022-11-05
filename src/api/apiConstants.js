const loginBaseUrl = "https://fbapi.sellernext.com/user/login?";

const url = (data) => {
  return loginBaseUrl + data;
};
const loginToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA";

const loginOption = {
  headers: { Authorization: loginToken },
};

export const loginFetch = async (data) => {
  return await fetch(url(data), loginOption).then((res) => res.json());
};

//product api data

export const productHeaders = {
  "Ced-Source-Id": 476,
  "Ced-Source-Name": "shopify",
  "Ced-Target-Id": 479,
  "Ced-Target-Name": "amazon",
  appCode:
    "eyJzaG9waWZ5IjoiYW1hem9uX3NhbGVzX2NoYW5uZWwiLCJhbWF6b24iOiJhbWF6b24ifQ==",
  appTag: "amazon_sales_channel",
  Authorization:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjk2ZDYwZDVlMzE3NjI3NThiMmY5Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjk4OTA3Mzc0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNjIxMTZlNTdiNGE3NjNlYzM5YWY5MiJ9.FXwul26U6GG2d9Wrfh5lNu-ikW_vwZ0tbBdjmoVTWhF3tOibyff7buM3tuIcgOkti9UvBpKtTo-SRU8A5UNEah37q1K1k-GQOSdwYxO1Q4Z9oF5AkIk8whl_-gZymjUqlMO0fjKJie6a_A4vxYk-PF8DEUHHOsc0MHeQA7TuaHR95fbV281SVXcmEP17_snN-eNsdOoP70vqiER3BkLV7Nr78JoSNZ38iqqznHEDKkLAgr2p3qI4OKZ7S6SiQglh1YfZgt4oZho868e8RAuV9QSomVpuuXAmyBHDGbUPrLTqvhj_CnzvQzEiNDnu__oh9UbWkTdZdAZhY_S5uzBMYg",
};

const productPayload = {
  source: {
    marketplace: "shopify",
    shopId: "507",
  },
  target: {
    marketplace: "amazon",
    shopId: "509",
  },
}

export const productOptions = {
  headers : productHeaders,
  // payload : productPayload
}

const productBaseUrl = 'https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts'

export const getRefineProducts = {
  all : `${productBaseUrl}`,
  notListed : `${productBaseUrl}?filter[cif_amazon_multi_inactive][1]=Not Listed`,
  inActive : `${productBaseUrl}?filter[items.status][1]=Inactive`,
  inComplete : `${productBaseUrl}?count=50&filter[items.status][1]=Incomplete`,
  active : `${productBaseUrl}?count=50&filter[items.status][1]=Active`,
  error : `${productBaseUrl}?&filter[cif_amazon_multi_active][1]=error`,
}

export const proSearch = (data) => {
  return 'https://multi-account.sellernext.com/home/public/connector/product/getSearchSuggestions?query='+data
} 


const filterHeader = {
 
    ...productHeaders , 
    'content-type': 'application/json'
  
}

console.log(filterHeader)

export const filterHeaders = {
  method : 'POST',
  headers : {...filterHeader},
  body : JSON.stringify({  
    "target_marketplace": "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
    "source": {
        "shopId": "476",
        "marketplace": "shopify"
    }
})
}

export const filterUrl = 'https://multi-account.sellernext.com/home/public/connector/source/getFilterAttributes'

