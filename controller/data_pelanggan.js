// inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config")
// implementation
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req,res) => {
    let sql = "select * from data_pelanggan"

    db.query(sql, (error, result) =>{
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                data_pelanggan: result, // isi data
                alamat: result
            }            
        }
        res.json(response) // send response
    })
})

app.get("/:id", (req, res) => {
    let data = {
        id_pelanggan: req.params.id
    }
    let sql = "select * from data_pelanggan where ?"

    db.query(sql, data, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                data_pelanggan: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

app.post("/", (req, res) => {
    let data = {
        nama_pelanggan: req.body.nama_pelanggan,
        alamat: req.body.alamat,
    }

    let sql = "insert into data_pelanggan set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/", (req,res) => {
    let data = [
        {
            nama_pelanggan: req.body.nama_pelanggan,
            alamat: req.body.alamat
        },

        {
            id_pelanggan: req.body.id_pelanggan
        }
    ]

    let sql = "update data_pelanggan set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

app.delete("/:id", (req, res) => {
    let data = {
        id_pelanggan: req.params.id
    }

    let sql = "delete from data_pelanggan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})

module.exports = app
