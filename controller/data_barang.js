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
    let sql = "select * from data_barang"

    db.query(sql, (error, result) =>{
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                data_barang: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

app.get("/:id", (req, res) => {
    let data = {
        id_barang: req.params.id
    }
    let sql = "select * from data_barang where ?"

    db.query(sql, data, (error,result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                data_barang: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

app.post("/", (req, res) => {
    let data = {
        nama_barang: req.body.nama_barang,
        kondisi_barang: req.body.kondisi_barang,
        stok: req.body.stok
    }

    let sql = "insert into data_barang set ?"

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
            kondisi_barang: req.body.kondisi_barang,
            nama_barang: req.body.nama_barang,
            stok: req.body.stok
        },

        {
            id_barang: req.body.id_barang
        }
    ]

    let sql = "update data_barang set ? where ?"

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
        id_barang: req.params.id
    }

    let sql = "delete from data_barang where ?"

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



