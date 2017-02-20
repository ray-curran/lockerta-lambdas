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
       if (event.id) {
       query = 'update teams set sport="' + event.body.sport +
       '", division ="' + event.body.division + '", conference="' + event.body.conference + '", gear="' + event.body.gear + 
       '", last_season_record="' + event.body.last_season_record + '", coach_fname="' + event.body.coach_fname +
       '", coach_lname="' + event.body.coach_lname + '", coach_last_record="' + event.body.coach_last_record +
       '", coach_school_record="' + event.body.coach_school_record + '", coach_alma_mater="' + event.body.coach_alma_mater +
       '", national_titles=' + event.body.national_titles + ", conference_titles=" + event.body.conference_titles +
       ", projected_openings=" + event.body.projected_openings + ", coach_year_started=" + event.body.coach_year_started +
       ", coach_win_percent=" + event.body.coach_win_percent + ", coach_seasons_w_team=" + event.body.coach_seasons_w_team +
       ", coach_ncaa_appearances=" + event.body.coach_ncaa_appearances + ", coach_conf_championships=" + event.body.coach_conf_championships +
       ', facilities_arena_name="' + event.body.facilities_arena_name + '", facilities_arena_built=' + event.body.facilities_arena_built +
       ", facilities_capacity=" + event.body.facilities_capacity + ", facilities_home_attendance=" + event.body.facilities_home_attendance +
       ", education_cost=" + event.body.education_cost + ", education_enrollment=" + event.body.education_enrollment +
       ", education_graduation_rate=" + event.body.education_graduation_rate + ", is_hidden=" + event.body.is_hidden +
       " where id = " + event.id + ";";
     } else {
      query = "insert into teams (sport, division, conference, gear, last_season_record, coach_fname, coach_lname, coach_last_record, coach_school_record, coach_alma_mater, national_titles, conference_titles, projected_openings, coach_year_started, coach_win_percent, coach_seasons_w_team, coach_ncaa_appearances, coach_conf_championships, facilities_arena_name, facilities_arena_built, facilities_capacity, facilities_home_attendance, education_cost, education_enrollment, education_graduation_rate, school_id, is_hidden) " +
        'values ("' + event.body.sport + '", "' + event.body.division + '", "' + event.body.conference + '", "' + event.body.gear + '", "' +
        event.body.last_season_record + '", "' + event.body.coach_fname + '", "' + event.body.coach_lname + '", "' +
        event.body.coach_last_record + '", "' + event.body.coach_school_record + '", "' + event.body.coach_alma_mater + '", ' + event.body.national_titles + ", " +
        event.body.conference_titles + ", " + event.body.projected_openings + ", " + event.body.coach_year_started + ", " + event.body.coach_win_percent + ", " +
        event.body.coach_seasons_w_team + ", " + event.body.coach_ncaa_appearances + ", " + event.body.coach_conf_championships + ", '" + event.body.facilities_arena_name + "', " +
        event.body.facilities_arena_built + ", " + event.body.facilities_capacity + ", " + event.body.facilities_home_attendance + ", " + event.body.education_cost + ", " +
        event.body.education_enrollment + ", " + event.body.education_graduation_rate + ", " + event.body.school_id + ", " + event.body.is_hidden + ");"
     }
       console.log(query);
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

