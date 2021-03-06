const DBSOURCE = "db.sqlite"
var sqlite3 = require('sqlite3');
var md5 = require('md5')

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text,
            session text,
            img_name text,
            img text,
            CONSTRAINT email_unique UNIQUE (email),
            CONSTRAINT session_unique UNIQUE (session)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                    db.run(insert, ["admin", "admin@gmail.com", md5('123456')])
                    db.run(insert, ["user", "user@gmail.com", md5("123456")])
                    db.run(insert, ["test", "test@gmail", md5("pass")])
                    
                }
            });
            db.run(`CREATE TABLE messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text,
                message text, 
                email text, 
                userID INT
                )`,
                (err) => {
                    if (err) {
                        // Table already created
                    } else {
                        // Table just created, creating some rows
                        var insert = 'INSERT INTO messages (name, message, email) VALUES (?,?,?)'
                        db.run(insert, ["steve","test", "test@gmail.com",3])
                        
                    }
                });
    }
});



module.exports = db