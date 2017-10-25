#! /usr/bin/env node

console.log(
  "This script populates a some users to your database. ",
  "Specified database as argument - ",
  "e.g.: populatedb mongodb://your_username:your_password@your_dabase_url"
);

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith("mongodb://")) {
  console.log(
    "ERROR: You need to specify a valid mongodb URL as the first argument"
  );
  return;
}

//import async to run the as methods
var async = require("async");

//var MsaUser = require("./models/msaUser");
var MsaTeam = require("./models/msaTeam");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

// var that the new msaTeam objs are pushed to for the update to the db
var msaTeams = [];

//this function is the main funtion that creates the new objects
function msaTeamCreate(
  teamName,
  teamLeagueOID,
  teamOwnerUserNameOID,
  teamMemberUserNameOID,
  cb
) {
  teamdetail = {
    team_name: teamName,
    team_league_OID: teamLeagueOID
  };
  if (teamOwnerUserNameOID != false)
    teamdetail.team_owner_user_name_OID = teamOwnerUserNameOID;
  if (teamMemberUserNameOID != false)
    teamdetail.team_member_user_name_OID = teamMemberUserNameOID;
  // the var for a new msaTeam obj
  var msaTeam = new MsaTeam(teamdetail);
  //save the new objs to the database
  msaTeam.save(function(err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New MSA Team: " + msaTeam);
    msaTeams.push(msaTeam);
    cb(null, msaTeam);
  });
}

function createTeams(cb) {
  async.parallel([
    function(callback) {
      msaTeamCreate(
        "Got Heem",
        "Unassigned",
        "59f0f5188b526607bbb77151",
        ["59f0f5188b526607bbb77151"],
        callback
      );
    },
    function(callback) {
      msaTeamCreate(
        "the ligning rats that eat rubber bollons",
        "Mens",
        "59f0f5188b526607bbb77152",
        ["59f0f5188b526607bbb77152"],
        callback
      );
    },
    function(callback) {
      msaTeamCreate(
        "AssHats",
        "CoRec",
        "59f0f5188b526607bbb77153",
        ["59f0f5188b526607bbb77154", "59f0f5188b526607bbb77153"],
        callback
      );
    }
  ]);
}

/// start async process to update the db

async.series(
  [createTeams],
  // optional callback
  function(err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("msaTeams: " + msaTeams);
    }
    //All done, disconnect from database
    mongoose.connection.close();
  }
);
