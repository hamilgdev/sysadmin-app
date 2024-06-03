export interface User {
  guid: string;
  email: string;
  name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface Metadatos {
  total: number;
  page: number;
  last_page: number;
}

/**
 * @params
 */

export interface GetUsersParams {
  offset?: number;
  limit?: number;
}

export interface GetUserParams {
  guid: string;
}

export interface CreateUserParams {
  name: string;
  last_name: string;
  email: string;
}

export interface UpdateUserParams {
  guid: string;
  name: string;
  last_name: string;
  email: string;
}

export interface DeleteUserParams {
  guid: string;
}

/**
 * @responses
 */

export interface GetUsersResponse {
  users: User[];
  metadatos: Metadatos;
}

export interface GetUserResponse {
  user: User;
}

export interface CreateUserResponse {
  user: User;
}

export interface UpdateUserResponse {
  user: User;
}

export interface DeleteUserResponse {
  user: User;
}