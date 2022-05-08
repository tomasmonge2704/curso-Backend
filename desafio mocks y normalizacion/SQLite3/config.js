const options = {
    client:'sqlite3',
    connection:{
        filename:"./Db/mydb.sqlite"
    },
    useNullAsDefault:true
}
module.exports = {
    options
}