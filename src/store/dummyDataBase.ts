import { TABLA, TypeData, TypeDataBase } from "./dummy.schema";

const db: TypeDataBase = {
  user: [
    {
      id: "1",
      name: "prueba userData",
      userName: "prueba",
      passwords: "12345",
    },
  ],
  auth: [
    {
      id: "1",
      name: "prueba authData",
      passwords: "12345",
      userName: "prueba",
    },
  ],
};
async function list(table: TABLA) {
  return db[table] || [];
}
async function get(table: TABLA, name: string) {
  const col = await list(table);
  let response;
  if (col != undefined) {
    response = col.find((element) => element?.name == name);
  }
  return response;
}
async function upset(table: TABLA, data: any) {
  if (!db[table]) {
    db[table] = [];
  }
  if (db[table] != undefined) {
    db[table]!.push(data);
  }
  return data;
}
function remove(table: TABLA, name: string) {
  // const newData = db[table]!.filter((datos) => datos.id != name);
  // db[table]; = newData
}
async function query(table: TABLA, q: any) {
  const key = Object.keys(q)[0];
  const col: any = await list(table);

  let response = col.find((element: any) => element[key] == q[key]);

  return response;
}
export const store = {
  db,
  list,
  get,
  upset,
  remove,
  query,
};
