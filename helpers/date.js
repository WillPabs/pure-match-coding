const moment = require('moment');

const getTimeSinceCreated = (createdAt) => {
    const now = moment(Date.now());
    const timeSinceCreated = moment.duration(now.diff(createdAt));
    const timeSinceCreatedInMins = timeSinceCreated.as('minutes');
    
    let timeString;
    if (timeSinceCreatedInMins < 1) {
        timeString = `${Math.floor(timeSinceCreated.as('seconds'))} seconds`;
    } else if (timeSinceCreatedInMins >= 1 && timeSinceCreatedInMins < 60) { 
        timeString = `${Math.floor(timeSinceCreatedInMins)} minutes`;
    } else if (timeSinceCreatedInMins >= 60 && timeSinceCreatedInMins < 1440) {
        timeString = `${Math.floor(timeSinceCreated.as('hours'))} hours`;
    } else if (timeSinceCreatedInMins >= 1440 && timeSinceCreatedInMins < 43800) {
        timeString = `${Math.floor(timeSinceCreated.as('days'))} days`;
    } else if (timeSinceCreatedInMins >= 43800 && timeSinceCreatedInMins < 525600) {
        timeString = `${Math.floor(timeSinceCreated.as('months'))} months`;
    } else if (timeSinceCreatedInMins >= 525600) {
        timeString = `${Math.floor(timeSinceCreated.as('years'))} years`;
    }
    return timeString;
}

module.exports = {
    getTimeSinceCreated,
};