import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
async function createTable() {
      const db = await open({
            filename: path.join('./database.db'),
            driver: sqlite3.Database
      })
      await db.exec(`
            CREATE TABLE IF NOT EXISTS data (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  name TEXT NOT NULL UNIQUE,
                  value INTEGER
            );
      `)   
      await db.exec(`
            CREATE TABLE IF NOT EXISTS data2 (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  month TEXT NOT NULL UNIQUE,
                  units INTEGER
            );
      `)
      await db.exec(`
             CREATE TABLE IF NOT EXISTS data3 (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  month TEXT NOT NULL UNIQUE,
                  units INTEGER
            );
      `)
      await db.exec(`
             CREATE TABLE IF NOT EXISTS data4 (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  month TEXT NOT NULL UNIQUE,
                  units INTEGER
            );
      `)
      await db.exec(`
             CREATE TABLE IF NOT EXISTS data5 (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  month TEXT NOT NULL UNIQUE,
                  revenue INTEGER
            );
      `)
      await db.exec(`
             CREATE TABLE IF NOT EXISTS data6 (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  region TEXT NOT NULL UNIQUE,
                  x INTEGER ,
                  y INTEGER ,
                  revenue INTEGER
            )  
      `)
      await db.exec(`
             DROP TABLE IF EXISTS users;
      `);
      await db.exec(
            `CREATE TABLE IF NOT EXISTS users (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT NOT NULL UNIQUE,
                  email TEXT NOT NULL UNIQUE,
                  password TEXT NOT NULL
            )
      `);
      await db.close()
      console.log('table created')
}
createTable()



                 
  
           
           
           
             