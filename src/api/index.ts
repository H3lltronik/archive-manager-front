import axios from "axios";
import { API_URL } from "../constants";
import { showNotification } from "../notifications";

export const resolve = async <T>(todo: () => any) => {
  type Resolved = {
    data: T | null;
    error: T | null;
  };
  let resolved: Resolved = {
    data: null,
    error: null,
  };

  const promise = new Promise<T>(async (resolve, reject) => {
    try {
      const res = await todo();
      resolve(res);
    } catch (e: any) {
      if (e?.response?.status == "403") {
        showNotification("Sesion expirada", "La sesion ha expirado", "error");
      }
      if (e?.response?.data) reject(e.response.data);
      reject(e);
    }
  });

  try {
    resolved.data = await promise;
  } catch (e: any) {
    resolved.error = e;
  }

  return resolved;
};

export async function checkUser() {
  return await resolve<User>(async () =>
    axios
      .post(`${API_URL}/auth/check-user`, {}, { withCredentials: true })
      .then((res) => res.data)
  );
}

export async function doLogin(username: string, password: string) {
  return await resolve<string>(async () =>
    axios
      .post(
        `${API_URL}/auth/login`,
        { username, password },
        { withCredentials: true }
      )
      .then((res) => res.data)
  );
}

export async function doLogout() {
  return await resolve<string>(async () =>
    axios
      .post(`${API_URL}/auth/logout`, {}, { withCredentials: true })
      .then((res) => res.data)
  );
}

export async function doRegister(payload: ToCreateUser) {
  return await resolve<User>(async () =>
    axios
      .post(`${API_URL}/user`, { ...payload }, { withCredentials: true })
      .then((res) => res.data)
  );
}

export async function doSearch(search: string) {
  return await resolve<FileResult[]>(async () =>
    axios
      .get(`${API_URL}/files/search?search=${search}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
  );
}

export async function doSearchByName(search: string) {
  return await resolve<FileResult[]>(async () =>
    axios
      .get(`${API_URL}/files/byName?search=${search}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
  );
}

export async function doFileUpload(file: any) {
  const params = new FormData();
  params.append("file", file);

  return await resolve<FileUploadRes>(async () =>
    axios
      .post(`${API_URL}/files/file-upload`, params, {
        withCredentials: true,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => res.data)
  );
}

export async function doCreateFile(payload: ToCreateFile) {
  return await resolve<FileCreationRes>(async () =>
    axios
      .post(`${API_URL}/files`, { ...payload }, { withCredentials: true })
      .then((res) => res.data)
  );
}

export async function getFiles() {
  return await resolve<FileResult[]>(async () =>
    axios
      .get(`${API_URL}/files/getAll`, {
        withCredentials: true,
      })
      .then((res) => res.data)
  );
}

export async function getFile(id: string) {
  return await resolve<FileCreationRes>(async () =>
    axios.get(`${API_URL}/files/${id}`).then((res) => res.data)
  );
}

export async function deleteFile(id: number) {
  return await resolve<FileCreationRes>(async () =>
    axios
      .delete(`${API_URL}/files/${id}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
  );
}

export async function requestReset(username: string) {
  return await resolve<string>(async () =>
    axios.post(`${API_URL}/recover`, { username }).then((res) => res.data)
  );
}

export async function getResetRequest(token: string) {
  return await resolve<string>(async () =>
    axios.get(`${API_URL}/recover/${token}`).then((res) => res.data)
  );
}

export async function doReset(token: string, password: string) {
  return await resolve<string>(async () =>
    axios
      .post(`${API_URL}/recover/do-recover`, { token, password })
      .then((res) => res.data)
  );
}
