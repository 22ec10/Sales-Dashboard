import { getDBConnection } from '../db/db.js'

export async function getdata(req, res) {
  try {
    const db = await getDBConnection()

    let query = 'SELECT * FROM data'
    let params = []
    const data1 = await db.all(query, params)
    
    console.log(data1)

   
    let query5 = 'SELECT * FROM data5'
    let params5 = []
    const data5 = await db.all(query5, params5)
   
    console.log(data5)

    let query6 = 'SELECT * FROM data6'
    let params6 = []
    const data6 = await db.all(query6, params6)

    res.json({
      data1 ,
      data5 ,
      data6
    })
    console.log(data6)
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch products', details: err.message})
  }
}


export async function getdata2(req, res) {
  try {
    const db = await getDBConnection()
    let query = 'SELECT * FROM data2'
    let params = []
    const data2 = await db.all(query, params)
    res.json(data2)
    console.log(data2)
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch products', details: err.message})
  }
}
export async function getdata3(req, res) {
  try {
    const db = await getDBConnection()
    let query = 'SELECT * FROM data3'
    let params = []
    const data3 = await db.all(query, params)
    res.json(data3)
    console.log(data3)
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch products', details: err.message})
  }
}
export async function getdata4(req, res) {
  try {
    const db = await getDBConnection()
    let query = 'SELECT * FROM data4'
    let params = []
    const data4 = await db.all(query, params)
    res.json(data4)
    console.log(data4)
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch products', details: err.message})
  }
}
export const createUser = async (email , name , password) => {
  try {
    const db = await getDBConnection()
    await db.run("INSERT INTO users (email , name, password) VALUES (?, ?, ?)", [
      email,
      name,
      password,
    ]);
    return { success: true, message: "User registered" };
    
  } catch (err) {
    return { success: false, message: "Username already exists" };
  }
};

export const findUserByUsername = async (email) => {
  const db = await getDBConnection()
  return db.get("SELECT * FROM users WHERE email = ?", [email]);
};
