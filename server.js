const express = require("express")          
const app = express()                             

/* Import Router */
const admin = require("./controller/data_admin")
app.use("/admin", admin)


const pelanggan = require("./controller/data_pelanggan")
app.use("/pelanggan", pelanggan)

const barang = require("./controller/data_barang")
app.use("/barang", barang)

app.listen(8000, () => {
    console.log("server run on port 8000")
})