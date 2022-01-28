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
/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
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
export function prettyDate(date: Date) {
  const secondsSince = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const secPerDay = 86400;
  const secPerHour = 3600;
  const secPerMin = 60;

  // time is over a two days old
  if (secondsSince >= 2 * secPerDay) {
    const monthOptions: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
    };

    const hourOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const monthDay = date.toLocaleString('en-US', monthOptions);
    const hrMin = date.toLocaleString('en-US', hourOptions);
    return `${monthDay} at ${hrMin}`;
  }

  // time is over a day old
  if (secondsSince >= secPerDay) {
    return 'Yesterday';
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

  // if it was posted in the last minute
  else {
    return 'Just now';
  }
}

// export const prettyDate = (d: string) => {
//   console.log('got date string', d);
//   const dateFormat = format as (d: Date) => string;
//   const prettyDate = dateFormat(new Date(d));
//   return prettyDate.charAt(0).toUpperCase() + prettyDate.slice(1);
// };
