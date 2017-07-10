const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    name: String,
    snowflake: { 
        type: String,
        unique: true  
    },
    battlenet: { 
        type: String,
        default: 'N/A'
    },
    twitch: { 
        type: String,
        default: 'N/A'
    },
    steam: { 
        type: String,
        default: 'N/A'
    },
    youtube: { 
        type: String,
        default: 'N/A'
    },
    twitter: { 
        type: String,
        default: 'N/A'
    },
    reddit: { 
        type: String,
        default: 'N/A'
    }
});

module.exports = mongoose.model('User', userSchema);