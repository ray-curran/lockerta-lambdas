var mysql = require('mysql');

exports.handler = (event, context, callback) => {

    var connection;
    var schools;
    var query;

    event.query = event.query.replace(/%20/g, ' ')
    
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
       query = 'select * from schools where upper(name) like upper("%' + event.query + '%") or upper(nickname) like upper("%' + event.query + '%") or upper(state) like upper("%' + event.query + '%") or upper(city) like upper("%' + event.query + '%")';
       connection.query(query, function(error, results, fields) {
        if (!error) {
            console.log('RESULTS')
            console.log(results);
            schools = results;
            connection.end();
            callback(null, schools)
        }
        else {
            console.log('Error while performing Query.', error);
        }
    })

   }


    // TODO implement
    getDBConnection();

};

