import { gql } from "@apollo/client";

export const GET_DASHBOARDS = gql`
  query {
    allDashbords {
      id
      title
      Items {
        id
        title
        imgUser
        priorityIcon
        point
        date
      }
    }
  }
`;

export const UPDATE_DASHBOARD = gql`
  mutation ADF($id: ID!, $newId: ID) {
    updateItem(id: $id, dashbord_id: $newId) {
      id
      dashbord_id
    }
  }
`;
export const GET_CARD = gql`
  query GetCard($id: ID!) {
    Item(id: $id) {
      id
      title
      imgUser
      priorityIcon
      point
      Dashbord {
        id
      }
    }
  }
`;
export const UPDATE_CARD = gql`
  mutation Update(
    $id: ID!
    $title: String
    $point: Int
    $dashboardId: ID
    $date: Date!
  ) {
    updateItem(
      id: $id
      title: $title
      point: $point
      dashbord_id: $dashboardId
      date: $date
    ) {
      dashbord_id
    }
  }
`;
export const CREATE_CARD = gql`
  mutation addNewCard(
    $title: String!
    $imgUser: String!
    $ImgPriority: String!
    $point: Int!
    $dashboardId: ID!
    $date: Date!
  ) {
    createItem(
      title: $title
      imgUser: $imgUser
      priorityIcon: $ImgPriority
      point: $point
      dashbord_id: $dashboardId
      date: $date
    ) {
      id
      title
      imgUser
      priorityIcon
      point
      dashbord_id
      date
    }
  }
`;

export const DELETE_CARD = gql`
  mutation deleteCard($id: ID!) {
    removeItem(id: $id) {
      id
      title
      imgUser
      priorityIcon
      point
    }
  }
`;

export const SORT_BY_DATE = gql`
  query GetSortedItems {
    allItems(sortField: "date", sortOrder: "DESC") {
      id
      title
      imgUser
      priorityIcon
      point
      dashbord_id
      date
    }
  }
`;
// ASC
