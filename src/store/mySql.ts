import mysql from "mysql2/promise";
import { config } from "../config";
import { TABLA, TDeleteID } from "./dummy.schema";




const connectInfo = {
  host: config.mySql.host,
  user:config.mySql.user,
  database: config.mySql.database,
  password: config.mySql.password,
};

async function list(table: TABLA) {
  const connection = await mysql.createConnection(connectInfo);
  let dataBase;
  try {
    const [db, fields] = await connection.query(
      `SELECT u.id , u.name FROM ${table} as u `
    );

    dataBase = db as [];
  } catch (err) {
    console.log(err);
  }
  connection.end();
  return dataBase || ["no hay datos"];
}

// info de user  
async function get(table: TABLA, id: string) {
  const connection = await mysql.createConnection(connectInfo);
  let dataBase: any;
  try {
    const [db, fields] = await connection.query(
      `SELECT * FROM ${table} WHERE id = ${id} `
    );
    // results contains rows returned by server
    const getDAta: any = db;
    const { password, ...userData } = getDAta[0];
    //create a list for followers
    userData.followers = await viewFollowers(table, id);
    userData.youFollow = await viewFollow(table, id);
    userData.viewPostLike = await viewPostLike(TABLA.USER, TABLA.POST, id);
    dataBase = userData;
  } catch (err) {
    console.log(err);
  }
  connection.end();
  return dataBase;
}
//create user
async function insert(table: TABLA, data: any) {
  const connection = await mysql.createConnection(connectInfo);
  let dataBase;

  try {
    const [db, fields] = await connection.query(
      `INSERT INTO ${table} SET ? `,
      data
    );
    // results contains rows returned by server
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  connection.end();
  return dataBase;
}
//update user info
async function upset(table: TABLA, data: any, id: any) {
  return id ? update(table, data, id) : insert(table, data);
}
async function query(table: TABLA, q: any) {
  const key = Object.keys(q)[0];

  const connection = await mysql.createConnection(connectInfo);
  let dataBase;
  try {
    const [db, fields] = await connection.query(
      `SELECT * FROM ${table} WHERE ${key} = '${q[key]}' `
    );
    // results contains rows returned by server
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  connection.end();
  return dataBase;
}

async function update(table: TABLA, data: any, id: number) {
  const connection = await mysql.createConnection(connectInfo);
  let dataBase;
  try {
    // delete data.id
    const [db, fields] = await connection.query(
      `UPDATE ${table} SET ?  WHERE id = ${id}`,
      data
    );
    // results contains rows returned by server
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}
async function follow(table: TABLA, data: any) {
  const connection = await mysql.createConnection(connectInfo);
  let dataBase;
  try {
    // delete data.id
    const [db, fields] = await connection.query(
      `INSERT INTO ${table} SET ? `,
      data
    );
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}
async function viewFollowers(table: TABLA, id: any) {
  const connection = await mysql.createConnection(connectInfo);
  let dataBase: any;

  try {
    const [db, fields] = await connection.query(
      `SELECT u.id , u.name  FROM ${table} AS u INNER JOIN ${table}_follow  as FollowList ON u.id = FollowList.follower_id WHERE  FollowList.follower_id = ${id} `
    );
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}
async function viewFollow(table: TABLA, id: any) {
  const connection = await mysql.createConnection(connectInfo);
  let dataBase;
  try {
    const [db, fields] = await connection.query(
      `SELECT u.id , u.name  FROM ${table} AS u INNER JOIN ${table}_follow  as FollowList ON u.id = FollowList.follower_id WHERE  FollowList.user_id = ${id} `
    );
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}
async function viewPostLike(tablaUser: TABLA, tablaPost: TABLA, id: string) {
  const connection = await mysql.createConnection(connectInfo);
  let dataBase: any;

  try {
    const [db, fields] = await connection.query(
      `SELECT u.id , u.name  FROM ${tablaUser} AS u INNER JOIN ${tablaPost}_like as postList ON u.id = postList.user_id WHERE  postList.post_id = ${id} `
    );
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}
//* Post
async function listPost(table: TABLA) {
  const connection = await mysql.createConnection(connectInfo);
  let dataBase;
  try {
    const [db, fields] = await connection.query(
      `SELECT * FROM ${table} as u `
    );

    dataBase = db as [];
  } catch (err) {
    console.log(err);
  }
  connection.end();
  return dataBase || ["no hay datos"];
}
async function getPost(table: TABLA, id: string) {
  const connection = await mysql.createConnection(connectInfo);
  let dataBase: any;
  try {
    const [db, fields] = await connection.query(
      `SELECT * FROM ${table} WHERE id = ${id} `
    );
    // results contains rows returned by server
    const getDAta: any = db;

    const { password, ...userData } = getDAta[0];
    //create a list for followers
    userData.userThatLike = await viewUserLiked(table, TABLA.USER, id);
    // userData.youFollow = await viewFollow(table,id)
    dataBase = userData;
  } catch (err) {
    console.log(err);
  }
  connection.end();
  return dataBase;
}
async function updatePost(table: TABLA, data: any) {
  const connection = await mysql.createConnection(connectInfo);
  let dataBase;
  try {
    const [db, fields] = await connection.query(
      `UPDATE ${table} SET ?  WHERE id = ${data.idPost} AND owner_id = ${data.user}`,
      data.data
    );
    // results contains rows returned by server
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}
async function viewUserLiked(table: TABLA, userTabla: TABLA, id: any) {
  const connection = await mysql.createConnection(connectInfo);
  let dataBase: any;

  try {
    const [db, fields] = await connection.query(
      `SELECT u.id , u.name  FROM ${userTabla} AS u INNER JOIN ${table}_like as LikeList ON u.id = LikeList.user_id WHERE  LikeList.post_id = ${id} `
    );
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}


async function deletePost(table: TABLA, data:TDeleteID) {

  const connection = await mysql.createConnection(connectInfo);
  let dataBase;
  try {
    const [db, fields] = await connection.query(
      `DELETE FROM ${table} as P WHERE p.id = ${data.postID} AND p.owner_id = ${data.userID};`,
    );
    // results contains rows returned by server
    dataBase = db;
  } catch (err) {
    console.log(err);
  }
  return dataBase;
}


export const store = {
  list,
  get,
  upset,
  follow,
  update,
  query,
  listPost,
  getPost,
  updatePost,
  deletePost
};
