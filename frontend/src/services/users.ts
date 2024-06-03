import { CreateUserParams, CreateUserResponse, DeleteUserParams, DeleteUserResponse, GetUserParams, GetUserResponse, GetUsersParams, GetUsersResponse, UpdateUserParams, UpdateUserResponse } from "@/interfaces";
import usersApi from "./api/users-api";
import { AxiosResponse } from "axios";

export async function getUsers({
  params
}: {
  params: GetUsersParams;
}): Promise<AxiosResponse<GetUsersResponse>> {
  const { offset = 1, limit = 10 } = params;

  const query = { offset, limit }
  const endpoint = 'users'
  const url = `${endpoint}${paginationQuery(query)}`

  return await usersApi.get(url);
}

export async function getUser({
  params
}: {
  params: GetUserParams;
}): Promise<AxiosResponse<GetUserResponse>> {
  const { guid } = params;
  const endpoint = 'users';
  const url = `${endpoint}/${guid}`;

  return await usersApi.get(url)
}

export async function createUser({
  params
}: {
  params: CreateUserParams;
}): Promise<AxiosResponse<CreateUserResponse>> {
  const { email, last_name, name } = params;
  const endpoint = 'users';
  const url = `${endpoint}`;
  const data = { email, last_name, name };

  return await usersApi.post(url, data)
}

export async function updateUser({
  params
}: {
  params: UpdateUserParams;
}): Promise<AxiosResponse<UpdateUserResponse>> {
  const { guid, email, last_name, name } = params;
  const endpoint = 'users';
  const url = `${endpoint}/${guid}`;
  const data = { email, last_name, name };

  return await usersApi.put(url, data)
}

export async function deleteUser({
  params
}: {
  params: DeleteUserParams;
}): Promise<AxiosResponse<DeleteUserResponse>> {
  const { guid } = params;
  const endpoint = 'users';
  const url = `${endpoint}/${guid}`;

  return await usersApi.delete(url)
}


const paginationQuery = (query: {
  offset: number;
  limit: number;
}) => {
  const { offset, limit } = query;
  const limitQuery = limit ? `limit=${limit}` : '';
  const offsetQuery = offset ? `offset=${offset}` : '';
  const queries = [limitQuery, offsetQuery].filter(Boolean).join('&');
  return queries ? `?${queries}` : '';
}