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
