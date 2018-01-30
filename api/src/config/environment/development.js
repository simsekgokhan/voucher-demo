module.exports = {
  mongo: {
    connection: 'mongodb://mongo:27017/pa-api-development',
  },
  jwtSecret: 'the_secret',
  authCookieName: 'auth',
  pathToUploads: `${__dirname}/../../uploads`,
  urlToUploads: 'http://localhost:3001/uploads',
  fcmToken: 'AAAATJIizKs:APA91bEHLfuegcMJqvJNbuMuPcIphD3F9lbh4JXA1jRC_2LVO4bXBJczTwRvQ9uqcG8yPlOzLWpPa7aoENZpS8BAofF1n9y7sDcfAI_P3Qw17ya45L9HgvHtb2WMYjlMENEObQyn9Uro',
};
