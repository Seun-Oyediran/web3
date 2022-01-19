import { routes } from './routes';

export const sideBarItemArray = [
  // { name: 'Dashboard', icon: 'fab fa-windows', link: routes.dashboard.path },
  { name: 'Wave', icon: 'fas fa-hand-paper', link: routes.wave.path },
  { name: 'NFT', icon: 'fas fa-images', link: routes.nft.path },
  { name: 'Vote', icon: 'fas fa-person-booth', link: routes.vote.path },
];

export function formatDate(date: Date) {
  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date);

  return `${day} ${month}, ${year}`;
}

export function formatFromNow(time: any) {
  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  const time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  let seconds = (+new Date() - time) / 1000;
  let token = 'ago';
  let list_choice = 1;

  if (seconds === 0) {
    return 'Just now';
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  let i = 0;
  let format;
  // eslint-disable-next-line
  while ((format = time_formats[i++])) {
    if (seconds < format[0]) {
      if (typeof format[2] === 'string') return format[list_choice];
      return `${Math.floor(seconds / format[2])} ${format[1]} ${token}`;
    }
  }
  return time;
}

export function reverseArr(input: Array<any>) {
  const ret = [];
  // eslint-disable-next-line
  for (let i = input.length - 1; i >= 0; i--) {
    ret.push(input[i]);
  }
  return ret;
}
