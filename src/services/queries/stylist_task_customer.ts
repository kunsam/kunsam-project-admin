import { gql } from 'apollo-boost';
import { GraphRSCustomer, GraphStylingRequirement } from '@/typings/stylist_task_customer';

export interface QueryRecommendServiceCustomerResult {
  recommend_service: {
    customer: Partial<GraphRSCustomer>;
    styling_requirement: Partial<GraphStylingRequirement>;
  };
}

export const QueryRecommendServiceCustomer = gql`
  query QueryRecommendServiceCustomer($id: ID!) {
    recommend_service(id: $id) {
      styling_requirement {
        bottom
        top
        make_up
        waistband
        main_styles
        cover_parts
        ear_piercing
        hated_colors
        hated_prints
        pants_length
        pants_cutting
        showing_parts
        daily_photo_urls
        secondary_styles
        style_challenage
        desired_categories
      }
      customer {
        id
        city
        nickname
        province
        avatar_url
        tote_count
        style {
          age
          mom
          shape
          inseam
          weight
          top_size
          jean_size
          pant_size
          dress_size
          occupation
          skirt_size
          waist_size
          height_inches
          shoulder_size
          marital_status
          hip_size_inches
          bust_size_number
          friendly_top_size
          friendly_pant_size
          friendly_dress_size
          friendly_skirt_size
        }
        subscription {
          id
          joined_at
          internal_name
        }
      }
    }
  }
`;

export interface QueryRecommendServiceCustomerPhotosCollectionResult {
  recommend_service: {
    customer: {
      closet_products: {
        product: {
          id: string;
          title: string;
          catalogue_photos: {
            full_url: string;
          };
        };
      }[];
      sub_customer_photos: {
        photo_url: string;
      }[];
      tote_products: {
        in_perfect_closet: boolean;
        product: {
          id: string;
          title: string;
          catalogue_photos: {
            full_url: string;
          };
        };
      }[];
    };
  };
}
export const QueryRecommendServiceCustomerPhotosCollection = gql`
  query QueryRecommendServiceCustomerPhotosCollection($id: ID!) {
    recommend_service(id: $id) {
      customer {
        closet_products {
          product {
            id
            title
            catalogue_photos {
              full_url
            }
          }
        }
        sub_customer_photos {
          photo_url
        }
        tote_products {
          in_perfect_closet
          product {
            id
            title
            catalogue_photos {
              full_url
            }
          }
        }
      }
    }
  }
`;

// in_perfect_closet(customer_id: $customer_id)
