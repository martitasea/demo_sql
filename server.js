const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "",
  connectionLimit: 5,
  database: "bbdd",
});

async function asyncFunction() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT 1 as val");
    // rows: [ {val: 1}, meta: ... ]
    
    // conn.query("DROP TABLE myTable")//Borra la BBDD
    //const nuevaTabla = await conn.query(`
    // CREATE TABLE usuarios (
    //     ID int NOT NULL AUTO_INCREMENT, 
    //     Nombre varchar(255) NOT NULL,
    //     Edad int DEFAULT 18,
    //     PRIMARY KEY (ID)
    // );`)

    // const res = await conn.query("INSERT INTO usuarios (Nombre, Edad) VALUES (?,?)",["Ryan", 27]);
    var res = await conn.query("INSERT INTO usuarios (Nombre) VALUES (?)",["Tafa"]);
    // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}
asyncFunction();
