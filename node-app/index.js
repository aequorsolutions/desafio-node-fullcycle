const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const connection = mysql.createConnection(config);

const createTableSql = `CREATE TABLE IF NOT EXISTS people (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
)`;

connection.query(createTableSql, (error) => {
  if (error) throw error;
});

const sql = `INSERT INTO people(name) values('Wesley')`
connection.query(sql)

app.get('/', (req, res) => {
  const name = req.query.name;

  if (name) {
    const insertDataSql = `INSERT INTO people (name) VALUES (?)`;

    connection.query(insertDataSql, [name], (error) => {
      if (error) throw error;

      printTableContent(res);
    });
  } else {
    printTableContent(res);
  }
});

function printTableContent(res) {
  const selectDataSql = `SELECT * FROM people`;

  connection.query(selectDataSql, (error, results) => {
    if (error) throw error;

    let tableContent = '<h2>Lista de nomes cadastrada no banco de dados:</h2>';
    tableContent += '<ul>';
    results.forEach((row) => {
      tableContent += `<li>${row.name}</li>`;
    });
    tableContent += '</ul>';

    const responseText = '<h1>Full Cycle Rocks!!</h1>';
    const tableAddInstruction = '<h3>Para inserir um novo nome, acesse esta rota com o parametro "name" (/?name=John)</h3>';

    res.send(responseText + tableAddInstruction + tableContent);
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log('Rodando na porta ' + port);
});
