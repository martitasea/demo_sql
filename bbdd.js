const mariadb = require("mariadb");

//------------------------------------------------------------------------------
// CONECTAR
//------------------------------------------------------------------------------
//Datos para la conexión
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "",
  connectionLimit: 5,
  database: "bbdd",
});
//------------------------------------------------------------------------------
// CREAR USUARIO
//------------------------------------------------------------------------------
exports.createUser = async (nombre, edad) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      "INSERT INTO usuarios (Nombre, Edad) VALUES (?,?)",
      [nombre, edad]
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return;
  } finally {
    if (conn) conn.release(); //release to pool
  }
};
//------------------------------------------------------------------------------
// LEER USUARIO
//------------------------------------------------------------------------------
exports.getUser = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("SELECT * FROM usuarios WHERE ID=(?);", [id]);
    console.log(res[0]);
    return res[0];
  } catch (err) {
    console.log(err);
    return;
  } finally {
    if (conn) conn.release(); //release to pool
  }
};
//------------------------------------------------------------------------------
// MODIFICAR USUARIO
//------------------------------------------------------------------------------
exports.setUser = async (nombre, id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      // "UPDATE usuarios SET Nombre='Antoñito' WHERE ID=1"
      "UPDATE usuarios SET Nombre=(?) WHERE ID=(?)",
      [nombre, id]
    );
    console.log(res);
    return res[0];
  } catch (err) {
    console.log(err);
    return;
  } finally {
    if (conn) conn.release(); //release to pool
  }
};
//------------------------------------------------------------------------------
// BORRAR USUARIO
//------------------------------------------------------------------------------
const deleteUser = async (nombre) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      "DELETE FROM usuarios WHERE Nombre=(?)",[nombre]
    );
    console.log(res);
    return res[0];
  } catch (err) {
    console.log(err);
    return;
  } finally {
    if (conn) conn.release(); //release to pool
  }
};

//Probar función CREAR
// const res=createUser("Marta", 40)
// .then(res=>console.log("Usuarios creados: "+res.affectedRows))
// .catch(e=>console.log(e))

//Probar función LEER
// const res=getUser(1)
// .then(res=>console.log(res))
// .catch(e=>console.log(e))

//Probar función UPDATE
// const res=setUser("Laura",1)
// .then(res=>console.log(res))
// .catch(e=>console.log(e))

//Probar función DELETE
const res = deleteUser("Marta")
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
