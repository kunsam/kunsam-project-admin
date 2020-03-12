import { gql } from 'apollo-boost';
import { GraphRecommendService, StylistTaskRecommendStylingProduct } from '@/typings/stylist_task';
import { GraphPagination, LeID } from '@/typings/commonType';

// 列表页数据
export interface QueryStylistTaskListResult {
  data?: {
    recommend_services: {
      nodes: Partial<GraphRecommendService>[];
      pagination: GraphPagination;
    };
  };
}

export const QueryStylistTaskList = gql`
  query QueryRecommendServices(
    $page: Int
    $per_page: Int
    $filter: RecommendServiceFilterInput
    $order_by: RecommendServiceOrder
  ) {
    recommend_services(page: $page, per_page: $per_page, filter: $filter, order_by: $order_by) {
      nodes {
        id
        opened_at
        completed_at
        styling_state
        schedule_lock_at
        closed_styling_at
        started_styling_at
        admin_user {
          id
          name
        }
        customer {
          id
          nickname
          avatar_url
        }
      }
      pagination {
        page
        per_page
        total_count
      }
    }
  }
`;

// 搭配单进度
export interface QueryStylistTaskProgressResult {
  recommend_service: Partial<GraphRecommendService>;
}

export const QueryStylistTaskProgress = gql`
  query QueryStylistTaskProgress($id: ID!) {
    recommend_service(id: $id) {
      id
      opened_at
      started_styling_at
      schedule_lock_at
      completed_at
      closed_styling_at
      styling_state
      admin_user {
        id
        name
        email
      }
    }
  }
`;

// 搭配单SKUList
export interface QueryCurrentStylistTaskSKUListResult {
  recommend_service: {
    recommend_styling_products: StylistTaskRecommendStylingProduct[];
  };
}

export const QueryCurrentStylistTaskSKUList = gql`
  query QueryRecommendServiceStylingProducts($id: ID!) {
    recommend_service(id: $id) {
      recommend_styling_products {
        id
        close_up_photo_url
        product {
          id
          title
          base_color
          background_color
          vendor_style_number
          hanging_photo {
            full_url
          }
          detail_url_for_admin_system
        }
        recommend_styling_product_units {
          id
          recommended_reason
          visual_keep_unit {
            id
            code
            cover_photo_url
            customer_tags {
              color
              text
            }
            assoc_products {
              id
              title
              hanging_photo {
                full_url
              }
              vendor_style_number
              detail_url_for_admin_system
            }
          }
        }
      }
    }
  }
`;

export const MutateCompleteRecommendService = gql`
  mutation CompleteRecommendService($input: CompleteRecommendServiceInput!) {
    CompleteRecommendService(input: $input) {
      recommend_service {
        id
      }
    }
  }
`;

// 修改搭配单信件
export interface UpdateRecommendServicePayload {
  data?: null | {
    recommend_service: Partial<GraphRecommendService>;
  };
}
export interface UpdateRecommendServiceInput {
  recommend_service_id: LeID;
  description: string;
}

export const MutateUpdateRecommendService = gql`
  mutation UpdateRecommendService($input: UpdateRecommendServiceInput!) {
    UpdateRecommendService(input: $input) {
      recommend_service {
        id
      }
    }
  }
`;

// 更新搭配单 SKU列表 item 的顺序
export interface SortRecommendStylingProductInput {
  recommend_styling_product_id: LeID;
  display_order_position: number;
}
export interface SortRecommendStylingProductPayload {
  data?: null | {
    recommend_service: {
      id: LeID;
    };
  };
}
export const MutateSortRecommendStylingProduct = gql`
  mutation MutateSortRecommendStylingProduct($input: SortRecommendStylingProductInput!) {
    SortRecommendStylingProduct(input: $input) {
      recommend_service {
        id
      }
    }
  }
`;

// 更新搭配单 SKU 中 Vku列表 item 的顺序
export interface SortRecommendStylingProductUnitInput {
  display_order_position: number;
  recommend_styling_product_unit_id: LeID;
}
export interface SortRecommendStylingProductUnitPayload {
  data?: null | {
    SortRecommendStylingProductUnit: {
      recommend_service: {
        id: LeID;
      };
    };
  };
}
export const MutateSortRecommendStylingProductUnit = gql`
  mutation SortRecommendStylingProductUnit($input: SortRecommendStylingProductUnitInput!) {
    SortRecommendStylingProductUnit(input: $input) {
      recommend_service {
        id
        recommend_styling_products {
          id
        }
      }
    }
  }
`;

// 认领任务
export const MutateTakeRecommendService = gql`
  mutation TakeRecommendService($input: TakeRecommendServiceInput!) {
    TakeRecommendService(input: $input) {
      recommend_service {
        id
      }
    }
  }
`;

// 修改商品主色、副色
export const MutateUpdateProductColor = gql`
  mutation MutateUpdateProductColor($input: UpdateProductColorInput!) {
    UpdateProductColor(input: $input) {
      product {
        id
        base_color
        background_color
      }
    }
  }
`;

export const MutateUpdateRecommendStylingProductUnit = gql`
  mutation MutateUpdateRecommendStylingProductUnit(
    $input: UpdateRecommendStylingProductUnitInput!
  ) {
    UpdateRecommendStylingProductUnit(input: $input) {
      recommend_styling_product_unit {
        id
        recommended_reason
      }
    }
  }
`;

export interface RemoveRecommendStylingProductInput {
  recommend_styling_product_id: LeID;
}

export interface RemoveRecommendStylingProductPayload {
  RemoveRecommendStylingProduct: {
    recommend_service: {
      id: LeID;
    };
  };
}

export const MutateRemoveRecommendStylingProduct = gql`
  mutation MutateRemoveRecommendStylingProduct($input: RemoveRecommendStylingProductInput!) {
    RemoveRecommendStylingProduct(input: $input) {
      recommend_service {
        id
      }
    }
  }
`;
