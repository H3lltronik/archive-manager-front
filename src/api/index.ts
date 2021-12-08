import axios from "axios";
import { API_URL } from "../constants";

export const resolve = async (promise: Promise<any>) => {
  const resolved: any = {
    data: null,
    error: null,
  };

  try {
    resolved.data = await promise;
  } catch (e) {
    resolved.error = e;
  }

  return resolved;
};

export async function doLogin(
  username: string,
  password: string
): Promise<string> {
  return await resolve(
    axios
      .post(`${API_URL}/auth/login`, { username, password })
      .then((res) => res.data)
  );
}

export async function doLogout(): Promise<string> {
  return await resolve(
    axios.post(`${API_URL}/auth/logout`).then((res) => res.data)
  );
}

export async function doRegister(payload: ToCreateUser): Promise<User> {
  return await resolve(
    axios.post(`${API_URL}/user`, { payload }).then((res) => res.data)
  );
}

export async function doSearch(search: string): Promise<FileResult[]> {
  return await resolve(
    axios
      .get(`${API_URL}/files/search?search=${search}`)
      .then((res) => res.data)
  );
}

export async function checkUser(): Promise<User> {
  return await resolve(
    axios.get(`${API_URL}/auth/check-user`).then((res) => res.data)
  );
}

export async function doFileUpload(file: any) {
  return await resolve(
    axios.post(`${API_URL}/files/file-upload`, { file }).then((res) => res.data)
  );
}

export async function doCreateFile(
  payload: ToCreateFile
): Promise<FileCreationRes> {
  return await resolve(
    axios.post(`${API_URL}/files`, { ...payload }).then((res) => res.data)
  );
}

export async function getFiles(): Promise<FileCreationRes[]> {
  return await resolve(axios.get(`${API_URL}/files`).then((res) => res.data));
}

export async function getFile(id: string): Promise<FileCreationRes> {
  return await resolve(
    axios.get(`${API_URL}/files/${id}`).then((res) => res.data)
  );
}
