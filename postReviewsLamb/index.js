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
       if (event.id) {
       query = 'update reviews set athlete_fname="' + event.body.athlete_fname +
       '", athlete_lname ="' + event.body.athlete_lname + '", athlete_email="' + event.body.athlete_email + '", best_teammate="' + event.body.best_teammate + '", best_conf_player="' + event.body.best_conf_player + 
       '", team_rival="' + event.body.team_rival + '", toughest_arena="' + event.body.toughest_arena + '", comments="' + event.body.comments +
       '", head_coach_name="' + event.body.head_coach_name + '", play_for_coach_again="' + event.body.play_for_coach_again +
       '", graduate="' + event.body.graduate + '", athlete_jersey_no=' + event.body.athlete_jersey_no + ", recruiting_rating=" + event.body.recruiting_rating +
       ", relationships_rating=" + event.body.relationships_rating + ", development_rating=" + event.body.development_rating +
       ", knowledge_sport_rating=" + event.body.knowledge_sport_rating + ", program_tradition_rating=" + event.body.program_tradition_rating +
       ", arena_rating=" + event.body.arena_rating + ", home_crowds_rating=" + event.body.home_crowds_rating +
       ", weight_room_rating=" + event.body.weight_room_rating + ", locker_room_rating=" + event.body.locker_room_rating +
       ", training_room_rating=" + event.body.training_room_rating + ", class_difficulty_rating=" + event.body.class_difficulty_rating +
       ", academic_rep_rating=" + event.body.academic_rep_rating + ", tutors_rating=" + event.body.tutors_rating +
       ", weather_rating=" + event.body.weather_rating + ", nightlife_rating=" + event.body.nightlife_rating +
       ", fan_rating=" + event.body.fan_rating + ", is_hidden=" + event.body.is_hidden +
       " where id = " + event.id + ";";
     } else {
      query = "insert into reviews (athlete_fname, athlete_lname, athlete_email, best_teammate, best_conf_player, team_rival, toughest_arena, head_coach_name, play_for_coach_again, graduate, comments, school_id, team_id, athlete_jersey_no, recruiting_rating, relationships_rating, development_rating, knowledge_sport_rating, program_tradition_rating, arena_rating, home_crowds_rating, weight_room_rating, locker_room_rating, training_room_rating, class_difficulty_rating, academic_rep_rating, tutors_rating, weather_rating, nightlife_rating, fan_rating, is_hidden) " +
        'values ("' + event.body.athlete_fname + '", "' + event.body.athlete_lname + '", "' + event.body.athlete_email + '", "' + event.body.best_teammate + '", "' +
        event.body.best_conf_player + '", "' + event.body.team_rival + '", "' + event.body.toughest_arena + '", "' +
        event.body.head_coach_name + '", "' + event.body.play_for_coach_again + '", "' + event.body.graduate + '", "' + event.body.comments + '", ' + event.body.school_id + ", " +
        event.body.team_id + ", " + event.body.athlete_jersey_no + ", " + event.body.recruiting_rating + ", " + event.body.relationships_rating + ", " +
        event.body.development_rating + ", " + event.body.knowledge_sport_rating + ", " + event.body.program_tradition_rating + ", " + event.body.arena_rating + ", " +
        event.body.home_crowds_rating + ", " + event.body.weight_room_rating + ", " + event.body.locker_room_rating + ", " + event.body.training_room_rating + ", " +
        event.body.class_difficulty_rating + ", " + event.body.academic_rep_rating + ", " + event.body.tutors_rating + ", " + event.body.weather_rating + ", " +
        event.body.nightlife_rating + ", " + event.body.fan_rating + ", " + event.body.is_hidden + ");"
     }
       console.log(query);
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

