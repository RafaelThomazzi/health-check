import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function openDatabase () {
  try {
    return await open({
      filename: './database.db',
      driver: sqlite3.Database
    })
  } catch (error) {
    console.log('error while open database', error);
  }
}