/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

/**
 * If in last hour: x mins e.g. 10 min
 * If in last 24 hrs: x hrs e.g. 4 hrs
 * Else: Month Day at Time AM/PM: e.g. November 15th at 10:35 AM
 *
 * Note: date must be a date object (new Date(x)).
 */
export function prettyDate(date: Date, showTime = true) {
  const secondsSince = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const secPerDay = 86400;
  const secPerHour = 3600;
  const secPerMin = 60;

  const monthOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const hourOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  const prettyDateString = date.toLocaleString('en-US', monthOptions);
  const hrMin = date.toLocaleString('en-US', hourOptions);
  // time is over a two days old
  if (secondsSince >= 2 * secPerDay) {
    return `${prettyDateString} ${showTime ? `at ${hrMin}` : ''}`;
  }

  // time is over a day old
  if (secondsSince >= secPerDay) {
    return `Yesterday ${showTime ? `at ${hrMin}` : ''}`;
  }

  // time is over an hour old
  if (secondsSince >= secPerHour) {
    const hoursSince = Math.floor(secondsSince / secPerHour);
    return `${hoursSince} hour${hoursSince > 1 ? 's' : ''} ago`;
  }

  // time is over a minute old
  if (secondsSince >= secPerMin) {
    const minutesSince = Math.floor(secondsSince / secPerMin);
    return `${minutesSince} minute${minutesSince > 1 ? 's' : ''} ago`;
  }

  // TODO: bring this back when our timezones are fixed, right now it sort of hides the issue by saying "just now" which is better than showing negative seconds
  // if it was posted in the last minute
  //   return `${secondsSince} seconds ago`;

  return 'Just now';
}
