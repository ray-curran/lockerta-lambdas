var mysql = require('mysql');

exports.handler = (event, context, callback) => {

    var connection;
    var schools;
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
       if (event.id) {
       query = "update schools set name='" + event.body.name +
       "', nickname ='" + event.body.nickname + "', logo='" + event.body.logo + 
       "', website='" + event.body.website + "', state='" + event.body.state +
       "', city='" + event.body.city + "', population=" + event.body.population +
       ", male_population=" + event.body.male_population + ", female_population=" + event.body.female_population + ", is_hidden=" + event.body.is_hidden +
       " where id = " + event.id + ";";
     } else {
      query = "insert into schools (name, nickname, logo, website, state, city, population, male_population, female_population, is_hidden) " +
        "values ('" + event.body.name + "', '" + event.body.nickname + "', '" + event.body.logo + "', '" +
        event.body.website + "', '" + event.body.state + "', '" + event.body.city + "', " + event.body.population + ", " +
        event.body.male_population + ", " + event.body.female_population + ", " + event.body.is_hidden + ");"
     }
       console.log(query);
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

