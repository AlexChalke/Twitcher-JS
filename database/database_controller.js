import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("twitcher.db");

/**
 *  Used to add a row to an existing table in the database.
 * @param {*} query Text string that contains a custom SQL query that adds a row to a database table
 */
async function addItem(query) {
  console.log("adding items with query " + query);
  db.transaction((tx) => {
    tx.executeSql(
      query,
      [],
      (txObj, data) => {
        console.log("Record added");
      },
      (err) => {
        console.log("Adding New Item Error:");
        console.log(err.message);
        console.log("error: " + err);
        console.error(err);
      }
    );
  });
}

/**
 * Deletes a row(or rows) from a table based on value of a primary or foreign key
 * @param {*} id The id value of the row to be deleted
 * @param {*} table The name of the table that is being accessed (birds or sessions)
 * @param {*} tableid The name of the id field in the relevant table
 */
async function deleteItem(id, table, tableid) {
  console.log("DELETE FROM " + table + " WHERE " + tableid + " = " + id + ";");
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM " + table + " WHERE " + tableid + " = " + id + ";",
      [],
      (txObj, data) => {
        console.log("record deleted");
      },
      (error) => {
        console.log("Delete Item Error:");
        console.log(error);
      }
    );
  });
}

/**
 * Used to create the database if it doesn't currently exist
 */
async function createDatabase() {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS sessions (SessionId INTEGER PRIMARY KEY AUTOINCREMENT, SessionLocation TEXT, SessionDate TEXT);",
      null,
      (error) => {
        console.log("Create Session Table Error:");
        console.log(error);
        return true;
      },
      () => {
        console.log("Created Sessions Table");
      }
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS birds (BirdId INTEGER PRIMARY KEY AUTOINCREMENT, BirdName TEXT, BirdQuantity, SessionId INTEGER, FOREIGN KEY(SessionId) REFERENCES sessions(SessionId));",
      null,
      (error) => {
        console.log("Create Birds Table Error:");
        console.log(error);
        return true;
      },
      () => {
        console.log("Created Birds Table");
      }
    );
  });
}

/**
 * Gathers all data from the table that has been passed in.
 * @param {*} setItemData A function to hold all relevant data gathered with the select all query
 * @param {*} table The name of the table being queried
 * @param {*} tableid the primary key of the table being queried
 */
async function selectAllItems(setItemData, table, tableid) {
  console.log("table: " + table);
  console.log("tableid: " + tableid);
  console.log(
    "sql is " + "SELECT * FROM " + table + " ORDER BY " + tableid + " ASC"
  );

  db.transaction(
    (tx) => {
      tx.executeSql(
        "SELECT * FROM " + table + " ORDER BY " + tableid + " ASC",
        [],
        (txObj, { rows: { _array } }) => {
          console.log("Selected all items!");
          console.log(_array);
          setItemData(_array);
        },
        null,
        null
      );
    },
    (_t, error) => {
      console.log("Loading Items Error:");
      console.log(_t);
      console.log(error);
    },
    (_t, _success) => {
      console.log("Loaded Database Items");
    }
  );
}

/**
 *  Selects a single row from a table using an id thats passed in.
 * @param {*} setItemData Function used to pass all the gathered data back
 * @param {*} table The name of the table being queried
 * @param {*} tableid  The name of the primary key in the relevant table
 * @param {*} itemid The Id that is being queried for currently.
 */
async function selectItem(setItemData, table, tableid, itemid) {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "SELECT * FROM " + table + " WHERE " + tableid + " = " + itemid,
        null,
        (txObj, { rows: { _array } }) => {
          console.log("Selected all items!");
          setItemData(_array);
        },
        null,
        null
      );
    },
    (_t, error) => {
      console.log("Loading Items Error:");
      console.log(error);
    },
    (_t, _success) => {
      console.log("Loaded Database Items");
    }
  );
}

export const sql_database = {
  selectAllItems,
  addItem,
  deleteItem,
  createDatabase,
  selectItem,
};
