import constants from '../constants';

const TRUNC_LEN = 4;

/// truncates a hex string
export function truncateHex(str: string): string {
  if (str.slice(0, 2) == '0x' && str.length > TRUNC_LEN * 2 + 2) {
    return str.slice(0, 2 + TRUNC_LEN) + '...' + str.slice(-TRUNC_LEN);
  } else {
    return str;
  }
}

/**
 * Returns a string such as (`x seconds ago` | `y minutes ago` | `h hours ago` | `d days ago`)
 * @see https://stackoverflow.com/a/3177838
 * @param since date to compare
 */
export function timeElapsedAsString(since: Date): string {
  const seconds = (new Date().getTime() - since.getTime()) / 1000;
  if (seconds <= 0) return 'invalid time';

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
}

export function addressToKnownAddress(addr: string, withTruncation: boolean = false): string {
  if (addr in constants.knownAddresses) {
    // @ts-ignore
    return constants.knownAddresses[addr];
  } else {
    return withTruncation ? truncateHex(addr) : addr;
  }
}
