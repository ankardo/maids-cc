export interface BaseEntity {
  id: number | null;
}

export interface User extends BaseEntity {
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Pagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface UsersResponse extends Pagination {
  data: User[];
}

export interface UserResponse {
  data: User;
}
