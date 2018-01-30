module.exports.podcastExistValidator = async (user, podcastIdToAdd) => {
  let isExist = false;
  user.subscriptions.forEach((podcast) => {
    if (podcast.podcastId === podcastIdToAdd) {
      isExist = true;
    }
  });

  return isExist;
};
