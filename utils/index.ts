import { nanoid } from 'nanoid';
import { axiosConfigJSON } from '../services/AxiosConfig';
import { TUserRole } from '../types/next-auth';

/**
 * Cancel the calls that are happening before the time is done
 * @param fn Function
 * @param ms Number
 * @return Function
 */
export const debounce = (fn: Function, ms = 1000) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

/**
 * Get role name by roleId
 * @param roleId TUserRole
 * @returns roleName String
 */
export const getRoleNameByRoleId = (roleId: TUserRole) => {
  switch (roleId) {
    case 1: {
      return 'Administrator';
    }
    case 2: {
      return 'Creator de continut';
    }
  }
};

/**
 * Converts an url, such as base64 to file
 * @param base64Url string
 * @param fileName string
 * @param type string
 * @return boolean
 */
export const convertBase64URLToFile = async (base64Url: string, fileName: string, type: string) => {
  const res = await fetch(base64Url);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type });
};

/**
 *
 * @param file File
 */
export const convertFileToBase64URL = (file: File, callback: (result: string) => void) => {
  const reader = new FileReader();

  reader.onloadend = () => {
    if (reader.result) {
      const b64Link: string = reader.result as string;
      callback(b64Link);
    }
  };
  reader.readAsDataURL(file);
};

export const fetcher = (url: string) => axiosConfigJSON.get(url).then((res) => res.data);

/**
 *  Get common nationalities
 * @returns object[]
 */
export const getNationalities = () => {
  return [
    { title: 'American', key: nanoid() },
    { title: 'Chinez', key: nanoid() },
    { title: 'Indian', key: nanoid() },
    { title: 'Indonezian', key: nanoid() },
    { title: 'Rus', key: nanoid() },
    { title: 'Mexican', key: nanoid() },
    { title: 'Filipinez', key: nanoid() },
    { title: 'Britanic', key: nanoid() },
    { title: 'Vietnamez', key: nanoid() },
    { title: 'Turc', key: nanoid() },
    { title: 'Italian', key: nanoid() },
    { title: 'Egiptean', key: nanoid() },
    { title: 'German', key: nanoid() },
    { title: 'Iranian', key: nanoid() },
    { title: 'Thailandez', key: nanoid() },
    { title: 'Japonez', key: nanoid() },
    { title: 'Coreeană de Sud', key: nanoid() },
    { title: 'Francez', key: nanoid() },
    { title: 'Argentinian', key: nanoid() },
    { title: 'Ucrainean', key: nanoid() },
    { title: 'Brazilian', key: nanoid() },
    { title: 'Pakistanez Pakistanez', key: nanoid() },
    { title: 'Bangladeș', key: nanoid() },
    { title: 'Nigerian', key: nanoid() },
    { title: 'Birmanez', key: nanoid() },
    { title: 'Iordanian', key: nanoid() },
    { title: 'Marocan', key: nanoid() },
    { title: 'Arabă Saudită', key: nanoid() },
    { title: 'Malaezian', key: nanoid() },
    { title: 'Coreeană de Nord', key: nanoid() },
    { title: 'Columbian', key: nanoid() },
    { title: 'Uzbec Pakistanez', key: nanoid() },
    { title: 'Sirian', key: nanoid() },
    { title: 'Algerian', key: nanoid() },
    { title: 'Canadian', key: nanoid() },
    { title: 'Iracian', key: nanoid() },
    { title: 'Yemenit', key: nanoid() },
    { title: 'Român', key: nanoid() },
  ] as { title: string; key: string }[];
};

/**
 * Get number of days based on time
 *
 * @param {number} time
 * @return {number}  days
 */
export const getNumberOfDays = (time: number) => Math.floor(time / (24 * 60 * 60 * 1000));

/**
 * Get number of minutes based on time
 *
 * @param {number} time
 * @return number minutes
 */
export const getNumberOfMinutes = (time: number) => Math.floor((time % (1000 * 3600)) / (1000 * 60));

/**
 * Get number of hours based on time
 *
 * @param {number} time
 * @return number hours
 */
export const getNumberOfHours = (time: number) => Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/**
 * Get number of seconds based on time
 *
 * @param {number} time
 * @return number seconds
 */
export const getNumberOfSeconds = (time: number) => Math.floor((time % (1000 * 60)) / 1000);

/**
 * Convert a date to readable human date
 * @param {string} date
 * @returns human a readable date string
 */
export const getHumanDate = (date: Date) => {
  const currentDate: number = new Date().getTime() - date.getTime();
  const numberOfDays: number = getNumberOfDays(currentDate);
  const numberOfMinutes: number = getNumberOfMinutes(currentDate);
  const numberOfHours: number = getNumberOfHours(currentDate);

  const days: string = `${numberOfDays} ${numberOfDays > 1 ? 'Zile' : 'Zi'} In Urmă`;
  const hours: string = `${numberOfHours} ${numberOfHours > 1 ? 'Ore' : 'Oră'} In Urmă`;
  const minutes: string = `${numberOfMinutes} ${numberOfMinutes > 1 ? 'Minute' : 'Minut'} In Urmă`;
  const seconds: string = `Cateva secunde in urma`;

  if (numberOfDays >= 1) {
    return days;
  } else if (numberOfDays <= 0 && numberOfHours > 1 && numberOfHours <= 24) {
    return hours;
  } else if (numberOfDays <= 0 && numberOfHours <= 0 && numberOfMinutes > 0) {
    return minutes;
  } else if (numberOfDays <= 0 && numberOfHours <= 0 && numberOfMinutes <= 0) {
    return seconds;
  }
  return 'Chiar Acum';
};

export const getCurrentDateTimeLocal = (currentDate: string) => {
  const t: Date = new Date(currentDate);
  return `${t.getFullYear()}-${(t.getMonth() + 1).toString().padStart(2, '0')}-${t.getDate().toString().padStart(2, '0')}T${t.getHours().toString().padStart(2, '0')}:${t
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
};

/**
 * Copy text to clipboard
 * @param {String} text
 */
export const copyTextToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text).catch(() => console.log("[LOGGER] Can't copy text to clipboard!"));
};
