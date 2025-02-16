export interface IProductComment {
  uuid: string;
  content: string;
  created_at: string;
  user: {
    username: string;
    first_name: string;
    last_name: string;
  };
}

export interface IProductCommentsResponse {
  data: IProductComment[];
  links: {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    path: string;
    per_page: number;
    to: number;
  };
} 