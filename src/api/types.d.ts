type ToCreateUser = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  level: number;
};

type ToLogin = {
  username: string;
  password: string;
};

type FileUploadRes = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

type ToCreateFile = {
  filename: string;
  path: string;
  level: number;
  mimetype: string;
  size: number;
};

type User = {
  id: number;
  name: string;
  username: string;
  level: number;
};

type FileResult = {
  id: number;
  filename: string;
  path: string;
  level: number;
  size: number;
  mimetype: string;
  ocurrences: number;
};

type FileResultContents = {
  id: number;
  filename: string;
  path: string;
  level: number;
  size: number;
  mimetype: string;
  ocurrences: number;
  words: number;
  characters: number;
};

type FileCreationRes = {
    filename: string;
    path: string;
    level: number;
    size: string;
    mimetype: string;
    user: User;
    id: number;
}