const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "calendars",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
	title: {
      type: Sequelize.STRING
    }
	,
    date: {
      type: Sequelize.DATE
    }
	,
    color: {
      type: Sequelize.STRING
    }
	,
    repetitive_events: {
      type: Sequelize.STRING
    }	
    ,
    user_id: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
);
