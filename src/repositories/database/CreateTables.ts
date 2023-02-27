import { openDatabase } from "./DatabaseConnection";

const createTables = async () => {
  const database = await openDatabase();
  
  const createRequests = `
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name STRING NOT NULL,
      url STRING NOT NULL,
      method STRING NOT NULL,
      body TEXT
    );
  `;

  const createSnapshots = `
    CREATE TABLE IF NOT EXISTS snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      request_id INTEGER NOT NULL,
      status INTEGER NOT NULL,
      result TEXT NOT NULL,
      execution_time STRING NOT NULL,
      created_at DATE NOT NULL,
      FOREIGN KEY (request_id) REFERENCES requests(id)
    );
  `;

  database.exec(createRequests);
  database.exec(createSnapshots);
};

export default createTables;
