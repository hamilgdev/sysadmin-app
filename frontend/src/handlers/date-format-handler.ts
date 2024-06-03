import { DateFormats } from '@/constant';
import { format, toZonedTime } from 'date-fns-tz';

/**
 * Formats a date string using the specified format type.
 *
 * @param dateString - The date string to be formatted. Example: '2023-09-30T15:45:20.900Z'
 * @param formatType - The format type to be used. Defaults to DateFormats.extended.
 * @returns The formatted date string or null if the input is invalid.
 *
 * @example
 * ```extended (default)
 * const dateString = '2023-09-30T15:45:20.900Z';
 * const formattedDate = dateFormatHandler(dateString);
 * console.log(formattedDate); // 'September 30th, 10:45'
 * ```
 * @example
 * ```extendedWithYear
 * const dateString = '2023-09-30T15:45:20.900Z';
 * const formattedDate = dateFormatHandler(dateString, DateFormats.extendedWithYear);
 * console.log(formattedDate); // 'September 30th, 2023'
 * @example
 * ```simplified
 * const dateString = '2023-09-30T15:45:20.900Z';
 * const formattedDate = dateFormatHandler(dateString, DateFormats.simplified);
 * console.log(formattedDate); // 'Sep 30th'
 * ```
 * @example
 * ```simplifiedWithYear
 * const dateString = '2023-09-30T15:45:20.900Z';
 * const formattedDate = dateFormatHandler(dateString, DateFormats.simplifiedWithYear);
 * console.log(formattedDate); // 'Sep 30th, 2023'
 * ```
 * @example
 * ```shortNumeric
 * const dateString = '2023-09-30T15:45:20.900Z';
 * const formattedDate = dateFormatHandler(dateString, DateFormats.shortNumeric);
 * console.log(formattedDate); // '09/30/23'
 */

export const dateFormatHandler = (
  dateString: string,
  formatType: DateFormats = DateFormats.extended,
): string | null => {
  if (!dateString) return null;

  const date = new Date(dateString);

  /**
   * @description This implementation is necessary to prevent the job from crashing
   *  when running the github action for different time zones
   */
  if (process.env.NODE_ENV === 'test') {
    const zonedDate = toZonedTime(date, 'UTC');
    return format(zonedDate, formatType);
  }

  return format(date, formatType, { timeZone: 'auto' });
};
