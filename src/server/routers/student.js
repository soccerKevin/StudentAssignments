import express from 'express'
import { connect } from 'sa/db/index.js'
import { acceptParams } from './params.js'
const { pool } = connect
const router = express.Router()

const accepted = ['id', 'name', 'creditCapacity']

router.use('*', acceptParams(accepted))

router.get('/:id', async ({ params: { id } }, res) => {
  if (isNaN(id)) return res.send({ status: 400 })
  const { rows } = await pool.query("SELECT * FROM student WHERE id=$1;", [id])
  res.send(rows[0])
})

router.post('', async ({ accepted: { params, keys, vars, values } }, res) => {
  const { rows } = await pool.query(`
    INSERT INTO student (${keys})
    VALUES (${vars})
    RETURNING *;
  `, values)

  res.send(rows[0])
})

const path = '/student'
export default { path, router }
