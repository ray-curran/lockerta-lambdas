var mysql = require('mysql');

exports.handler = (event, context, callback) => {

    var connection;
    var reviews;
    var query;

    
    var getDBConnection = function () {
       connection = mysql.createConnection({
        host: 'lockerta.cle4a6k2xicv.us-east-1.rds.amazonaws.com',
        user: 'teambo',
        password: 'lockertarox',
        database: 'lockerta_be',
        timeout: 100000
    });
       connection.connect(function(error) {
        if(error) {
            console.log('error connecting to database', error.stack)
        }
       });
       query = "select reviews.*, schools.name, teams.sport from reviews join schools on reviews.school_id = schools.id join teams on reviews.team_id = teams.id where team_id = " + event.id + ";";
       connection.query(query, function(error, results, fields) {
        if (!error) {
            console.log('RESULTS')
            console.log(results);
            reviews = results;
            connection.end();
            callback(null, reviews)
        }
        else {
            console.log('Error while performing Query.', error);
        }
    })

   }


    // TODO implement
    getDBConnection();

};

