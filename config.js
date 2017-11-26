exports.DATABASE_URL = process.env.DATABASE_URL ||
global.DATABASE_URL ||
'mongodb://localhost/crowdadventure';
// 'mongodb://localhost:27017/crowdadventure';

exports.PORT = process.env.PORT || 8080;