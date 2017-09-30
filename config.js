exports.DATABASE_URL = process.env.DATABASE_URL ||
global.DATABASE_URL ||
'mongodb://localhost:27017/crowdadventure';
// 'mongodb://localhost/iloveyoumore';

exports.TEST_DATABASE_URL = (
process.env.TEST_DATABASE_URL ||
'mongodb://localhost:27017/test-crowdadventure');

exports.PORT = process.env.PORT || 8080;