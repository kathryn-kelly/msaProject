var mongoose = require("mongoose");
//var msaUserSchema = require("./msaUser.js").userSchema;
var Schema = mongoose.Schema;

var MsaTeamSchema = mongoose.Schema({
  team_name: {
    type: String,
    required: true
  },

  ///////// NEED TO CHANGE TO DIVISION AND LEAGUE WILL BE ASSOCIATED
  // TODO League will be changed to league Schema
  team_division_OID: {
    type: Schema.Types.ObjectId,
    ref: "MsaDivision"
  },
  team_created_date: {
    type: Date,
    default: Date.now
  },
  // TODO type set to default in order to populate
  team_owner_user_name_OID: {
    type: Schema.Types.ObjectId,
    ref: "MsaUser"
  },
  team_member_user_name_OID: [
    {
      type: Schema.Types.ObjectId,
      ref: "MsaUser"
    }
  ]
});

//Export the Model
module.exports = mongoose.model("MsaTeam", MsaTeamSchema);
