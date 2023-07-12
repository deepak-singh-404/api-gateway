const ENDPOINTS = {
  SEARCH_SERVICE: {
    GET_LIST_OF_BRANDS: "/listing/brands",
    GET_SUGGESTIONS_BY_BRANDS: "/suggestions/isBrand",
    SEARCH_PRODUCTS_BY_BRAND: "/listing/product/search",
    GET_BRAND_BY_ID: "/brand/byId/",
    GET_BRAND_BY_NAME: "/brand/byName/",
    SUGGESTION: "/suggestions/ml",
    GET_BREADCRUMB: "/breadcrumb/get",
    GET_SIMILAR_PRODUCTS: "/listing/products/similarProducts"
  },
  PLATFORM_SERVICE: {
    GET_DIGIMRO_PRODUCT_BY_MSN: "/cassandraApi/product/get-digimro-product",
  },
  CMS_SERVICE: {
    GET_LAYOUT_BY_PARENT_CATEGORY: "/Cms/apiLayout/getParentCategoryJsonBody"
  },
  ADDRESS_SERVICE: {
    CHECK_SERVICE_AVAILABILITY: "/digimro/checkServiceability"
  },
  RFQ_SERVICE: {
    CREATE_RFQ: "/rfq/digimro/createRfq"
  },
  RFQ_API_SERVICE: {
    GET_RFQS_BY_USER_ID: "/rfqapi/digimro/getRfqs"
  }
};

export default ENDPOINTS;
