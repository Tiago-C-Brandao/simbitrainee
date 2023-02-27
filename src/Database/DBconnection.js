const pg = require('pg');

let connString = "postgres://sonsoinr:kHBVin0FXhdqT4j5mz69AZphfG1LHwnK@babar.db.elephantsql.com/sonsoinr";
let client = new pg.Client(connString);

client.connect(function(err) {
    if(err) {
        return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].theTime);
    })
});

module.exports = client;