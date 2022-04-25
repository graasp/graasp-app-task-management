// Functions in this file manipulate data retrieved from the api to make it usable by the app's charts/components
const {
  LATE_NIGHT,
  EARLY_MORNING,
  MORNING,
  AFTERNOON,
  EVENING,
  NIGHT,
} = require('../config/constants');

// Takes array of action objects and returns an object with {key: value} pairs of {date: #-of-actions}
export const getActionsByDay = (actions) => {
  const dateKey = 'createdAt';
  const actionsByDay = {};
  actions.forEach((action) => {
    const actionDate = new Date(action[dateKey].slice(0, 10));
    if (!actionsByDay[actionDate]) {
      actionsByDay[actionDate] = 1;
    } else {
      actionsByDay[actionDate] += 1;
    }
  });
  return actionsByDay;
};
// Takes object with {key: value} pairs of {date: #-of-actions} and returns a date-sorted array in Recharts.js format
export const formatActionsByDay = (actionsByDayObject) => {
  const actionsByDayArray = Object.entries(actionsByDayObject);
  const sortedActionsByDay = actionsByDayArray.sort(
    (entryA, entryB) => Date.parse(entryA[0]) - Date.parse(entryB[0]),
  );
  return sortedActionsByDay.map((entry) => {
    const entryDate = new Date(entry[0]);
    return {
      date: `${entryDate.getDate()}-${
        entryDate.getMonth() + 1
      }-${entryDate.getFullYear()}`,
      count: entry[1],
    };
  });
};
// helper function used in getActionsByTimeOfDay below
// todo: update this function to retrieve hour of day using JS Date objects/moment
const getActionHourOfDay = (action) => {
  const dateKey = 'createdAt';
  // createdAt should have the format "2020-12-31T23:59:59.999Z"
  return action[dateKey].slice(11, 13);
};
// Takes array of action objects and returns an object with {key: value} pairs of {hourOfDay: #-of-actions}
export const getActionsByTimeOfDay = (actions) => {
  const actionsByTimeOfDay = {
    [LATE_NIGHT]: 0,
    [EARLY_MORNING]: 0,
    [MORNING]: 0,
    [AFTERNOON]: 0,
    [EVENING]: 0,
    [NIGHT]: 0,
  };
  actions.forEach((action) => {
    const actionHourOfDay = getActionHourOfDay(action);
    if (actionHourOfDay >= 0 && actionHourOfDay < 4) {
      actionsByTimeOfDay[LATE_NIGHT] += 1;
    } else if (actionHourOfDay >= 4 && actionHourOfDay < 8) {
      actionsByTimeOfDay[EARLY_MORNING] += 1;
    } else if (actionHourOfDay >= 8 && actionHourOfDay < 12) {
      actionsByTimeOfDay[MORNING] += 1;
    } else if (actionHourOfDay >= 12 && actionHourOfDay < 16) {
      actionsByTimeOfDay[AFTERNOON] += 1;
    } else if (actionHourOfDay >= 16 && actionHourOfDay < 20) {
      actionsByTimeOfDay[EVENING] += 1;
    } else if (actionHourOfDay >= 20 && actionHourOfDay < 24) {
      actionsByTimeOfDay[NIGHT] += 1;
    } else {
      // eslint-disable-next-line no-console
      console.log(`actionHourOfDay ${actionHourOfDay} is undefined`);
    }
  });
  return actionsByTimeOfDay;
};

// Takes object with {key: value} pairs of {timeOfDay: #-of-actions}
// returns a date-sorted array in Recharts.js format
export const formatActionsByTimeOfDay = (actionsByTimeOfDayObject) => {
  const actionsByTimeOfDayArray = Object.entries(actionsByTimeOfDayObject);
  // eslint-disable-next-line arrow-body-style
  return actionsByTimeOfDayArray.map((entry) => {
    return {
      timeOfDay: entry[0],
      count: entry[1],
    };
  });
};
