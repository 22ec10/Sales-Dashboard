import sqlite3 from 'sqlite3' 
import bcrypt from "bcrypt";
import { open } from 'sqlite'
import path from 'node:path'
import {data} from './data.js'
import {data2} from './data.js'
import {data3} from './data.js'
import {data4} from './data.js'
import {data5} from './data.js'
import {data6} from './data.js'
async function seedTable() {
  const db = await open({
    filename: path.join("./database.db"),
    driver: sqlite3.Database,
  });
  try {
    await db.exec("BEGIN TRANSACTION");
    await db.exec("DELETE FROM data");
    await db.exec("DELETE FROM sqlite_sequence WHERE name='data'");
    for (const {name, value} of data) {
      await db.run(
        `INSERT INTO data (name, value)
         VALUES (?, ?)`,
        [name, value]
      );
    }
    await db.exec("DELETE FROM data2");
    await db.exec("DELETE FROM sqlite_sequence WHERE name='data2'");
    for (const {month, units} of data2) {
      await db.run(
        `INSERT INTO data2 (month, units)
         VALUES (?, ?)`,
        [month, units]
      );
    }
    await db.exec("DELETE FROM data3");
    await db.exec("DELETE FROM sqlite_sequence WHERE name='data3'");
    for (const {month, units} of data3) {
      await db.run(
        `INSERT INTO data3 (month, units)
         VALUES (?, ?)`,
        [month, units]
      );
    }
    await db.exec("DELETE FROM data4");
    await db.exec("DELETE FROM sqlite_sequence WHERE name='data4'");
    for (const {month, units} of data4) {
      await db.run(
        `INSERT INTO data4 (month, units)
         VALUES (?, ?)`,
        [month, units]
      );
    }
    await db.exec("DELETE FROM data5");
    await db.exec("DELETE FROM sqlite_sequence WHERE name='data5'");
    for (const {month, revenue} of data5) {
      await db.run(
        `INSERT INTO data5 (month, revenue)
         VALUES (?, ?)`,
        [month, revenue]
      );
    }
    await db.exec("DELETE FROM data6");
    await db.exec("DELETE FROM sqlite_sequence WHERE name='data6'");
    for (const {region , x , y , revenue} of data6) {
      await db.run(
        `INSERT INTO data6 (region , x , y , revenue)
         VALUES (?, ?, ?, ?)`,
        [region , x , y , revenue]
      );
    }
    await db.exec("DELETE FROM users");
    await db.exec("DELETE FROM sqlite_sequence WHERE name='users'");
    const hashed = await bcrypt.hash("password123", 10);
    await db.run(
        `INSERT INTO users (email, name , password)
         VALUES (?, ? , ?)`,
         ["abc@gmail.com" , "sandeep" , hashed]
      );
    await db.exec("COMMIT");
    console.log("Seeding done ✅");
    const rows = await db.all("SELECT * FROM data");
    const rows2 = await db.all("SELECT * FROM data2");
    const rows3 = await db.all("SELECT * FROM data3");
    const rows4 = await db.all("SELECT * FROM data4");
    const rows5 = await db.all("SELECT * FROM data5");
    const rows6 = await db.all("SELECT * FROM data6");
    const rows7 = await db.all("SELECT * FROM users");
    console.log(rows);
    console.log(rows2);
    console.log(rows3);
    console.log(rows4);
    console.log(rows5);
    console.log(rows6);
    console.log(rows7);
  } catch (err) {
    await db.exec("ROLLBACK");
    console.error("Error seeding:", err);
  } finally {
    await db.close();
  }
}
seedTable()
 

