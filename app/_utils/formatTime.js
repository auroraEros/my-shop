import { toPersianDigits } from "./persianDigitsFormater";

export function formatMilliseconds(time) {
  const totalSeconds = +toPersianDigits(Math.floor(time / 1000));
  const mins = +toPersianDigits(Math.floor(totalSeconds / 60));
  const secs = +toPersianDigits(totalSeconds % 60);

  return { mins, secs };
}
