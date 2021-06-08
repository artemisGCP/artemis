/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */
let db;
// Connect to MongoDB
db = new Mongo();

// Create a database instance
db = db.getDB("artemis");

db.userInfo.remove({});

const annotation = [
  {
    frame: 1,
    behavior: 'walk',
    userid: 'a4',
    videoPath: '/desktop/',
    videoName: 'mouse1',
    
  },
  {
    frame: 1,
    behavior: 'walk',
    userid: 'a4',
    videoPath: '/desktop/',
    videoName: 'mouse1',
  },
];

db.userInfo.insertMany(annotation);


db.userInfo.createIndex({ videoName: 1 });
db.userInfo.createIndex({ userid: 1 });
db.userInfo.createIndex({ behavior: 1 });