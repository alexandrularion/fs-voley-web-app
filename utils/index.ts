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
