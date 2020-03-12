import { gql } from 'apollo-boost';
import { GraphProductsForStyling } from '@/typings/styling_products';
import { LeID, GraphPagination } from '@/typings/commonType';

export interface QueryStylingProductsResult {
  data?: {
    products_for_styling: GraphProductsForStyling.Result;
  };
}

export const QueryStylingProducts = gql`
  query QueryStylingProducts(
    $filter: ProductsForStylingFilter
    $page: Int
    $per_page: Int
    $recommend_service_id: ID!
    $scope: ProductsForStylingScope
  ) {
    products_for_styling(
      filter: $filter
      page: $page
      per_page: $per_page
      scope: $scope
      recommend_service_id: $recommend_service_id
    ) {
      pagination {
        page
        per_page
        total_count
      }
      nodes {
        product {
          id
          title
          base_color
          background_color
          hanging_photo {
            full_url
          }
          vendor_style_number
          visual_keep_units {
            id
            code
            cover_photo_url
            recommended_reason
            customer_tags {
              text
              color
            }
            assoc_products {
              id
              title
              base_color
              background_color
              hanging_photo {
                full_url
              }
              vendor_style_number
            }
            product {
              id
              title
              base_color
              background_color
              hanging_photo {
                full_url
              }
              vendor_style_number
            }
          }
        }
      }
    }
  }
`;

export namespace GraphQueryVkusForStyling {
  export interface Input {
    page?: number;
    per_page?: number;
    recommend_service_id: LeID;
    scope?: GraphProductsForStyling.Scope;
    filter?: Partial<GraphProductsForStyling.Filters>;
  }
  export interface Product {
    id: LeID;
    title: string;
    vendor_style_number: string;
    hanging_photo: {
      full_url: string;
    };
  }
  export interface VKU {
    id: string;
    code: string;
    assoc_vkus?: VKU[];
    product: Product;
    cover_photo_url: string;
    assoc_products: Product[];
    recommended_reason: string;
    customer_tags: {
      color: string;
      text: string;
    }[];
  }
  export interface Result {
    vkus_for_styling: {
      pagination: GraphPagination;
      nodes: {
        visual_keep_unit: VKU;
      }[];
    };
  }
}

export const QueryVkusForStyling = gql`
  query QueryVkusForStyling(
    $filter: ProductsForStylingFilter
    $page: Int
    $per_page: Int
    $recommend_service_id: ID!
    $scope: ProductsForStylingScope
  ) {
    vkus_for_styling(
      page: $page
      scope: $scope
      filter: $filter
      per_page: $per_page
      recommend_service_id: $recommend_service_id
    ) {
      pagination {
        page
        per_page
        total_count
      }
      nodes {
        visual_keep_unit {
          ...VisualKeepUnitFields
          assoc_vkus {
            ...VisualKeepUnitFields
          }
        }
      }
    }
  }
  fragment VisualKeepUnitFields on VisualKeepUnit {
    id
    code
    cover_photo_url
    recommended_reason
    product {
      id
      title
      vendor_style_number
      hanging_photo {
        full_url
      }
    }
    assoc_products {
      id
      title
      vendor_style_number
      hanging_photo {
        full_url
      }
    }
    customer_tags {
      color
      text
    }
  }
`;

export interface PickProductForRecommendServiceInput {
  product_id: LeID;
  recommend_service_id: LeID;
  visual_keep_unit_ids: LeID[];
}

export interface PickProductForRecommendServicePayload {
  data?: null | {
    PickProductForRecommendService: {
      recommend_service: {
        id: LeID;
      };
    };
  };
}

export const MutatePickProductForRecommendService = gql`
  mutation MutatePickProductForRecommendService($input: PickProductForRecommendServiceInput!) {
    PickProductForRecommendService(input: $input) {
      recommend_service {
        id
      }
    }
  }
`;
// 筛选项
export const QueryProductsStylingFilterContext = gql`
  query queryProductsStylingFilterContext($recommend_service_id: ID) {
    products_styling_filter_context(recommend_service_id: $recommend_service_id) {
      filter_group {
        group_name
        group_value
        multiple_selection
        options {
          highlight_color
          label
          value
        }
      }
    }
  }
`;
