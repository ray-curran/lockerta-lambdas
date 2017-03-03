var mysql = require('mysql');

exports.handler = (event, context, callback) => {

    var connection;
    var teams;
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
       query = 'select teams.*, schools.name from teams join schools on teams.school_id = schools.id where upper(sport) like upper("%' + event.query + '%") or upper(division) like upper("%' + event.query + '%") or upper(conference) like upper("%' + event.query + '%") or upper(coach_fname) like upper("%' + event.query + '%") or upper(coach_lname) like upper("%' + event.query + '%")';
       connection.query(query, function(error, results, fields) {
        if (!error) {
            console.log('RESULTS')
            console.log(results);
            teams = results;
            connection.end();
            callback(null, teams)
        }
        else {
            console.log('Error while performing Query.', error);
        }
    })

   }


    // TODO implement
    getDBConnection();

};

