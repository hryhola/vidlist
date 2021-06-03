import humanizeDuration from "humanize-duration";
import { VideoSortBy, VideoWithPosition } from "../types";

const MAX_DATE_MILISECONDS_VALUE = 8640000000000000;
const MAX_DATE_SECONDS_VALUE = MAX_DATE_MILISECONDS_VALUE / 1000;

export const getReadableDuration = (seconds: number, format: "short" | "middle" | "long" = "short") => {
  if (format === "long")
    return humanizeDuration(seconds * 1000, {
      language: "ru",
      round: true,
    });

  if (seconds > 212400) return "более 59 часов";

  const HMS = new Date(seconds > MAX_DATE_SECONDS_VALUE ? MAX_DATE_MILISECONDS_VALUE : seconds * 1000).toISOString().substr(11, 8);

  switch (format) {
    case "short":
      return HMS;
    case "middle": {
      const [h, m, s] = HMS.split(":");

      const hours = Number(h) ? h + "ч" : "";
      const min = Number(m) ? m + "м" : "";
      const sec = s + "с";

      return hours + min + sec;
    }
  }
};

export const getQueueColor = (queue: number) => {
  switch (queue) {
    case 1:
      return "#E74C3C";
    case 2:
      return "#8E44AD";
    case 3:
      return "#3498DB";
    case 4:
      return "#16A085";
    case 5:
      return "#2ECC71";
    case 6:
      return "#F39C12";
    case 7:
      return "#D35400";
    case 8:
      return "#D35400";
    case 9:
      return "#CD6155";
    case 10:
      return "#AF7AC5";
    case 11:
      return "#7FB3D5";
    case 12:
      return "#76D7C4";
    case 13:
      return "#82E0AA";
    case 14:
      return "#F7DC6F";
    case 15:
      return "#F0B27A";
    case 16:
      return "#5D6D7E";
    case 17:
      return "#922B21";
    case 18:
      return "#76448A";
    case 19:
      return "#2874A6";
    case 20:
      return "#0E6655";
    case 21:
      return "#1D8348";
    case 22:
      return "#B9770E";
    case 23:
      return "#A04000";
    case 24:
      return "#283747";
    default:
      return "#839192";
  }
};

const videoCompareFn = (a: VideoWithPosition, b: VideoWithPosition, selector: (v: VideoWithPosition) => string | number, reverse?: "reverse") => {
  if (selector(a) > selector(b)) {
    return reverse ? -1 : 1;
  }
  if (selector(a) < selector(b)) {
    return reverse ? 1 : -1;
  }
  return 0;
};

export const sortVideosBy = (by: VideoSortBy, videos: VideoWithPosition[]): VideoWithPosition[] => {
  switch (by) {
    case "channel":
      return [...videos].sort((a, b) => videoCompareFn(a, b, (v) => v.info.channelTitle));
    case "channelReverse":
      return [...videos].sort((a, b) => videoCompareFn(a, b, (v) => v.info.channelTitle, "reverse"));
    case "duration":
      return [...videos].sort((a, b) => videoCompareFn(a, b, (v) => v.info.duration));
    case "durationReverse":
      return [...videos].sort((a, b) => videoCompareFn(a, b, (v) => v.info.duration, "reverse"));
    case "order":
      return [...videos].sort((a, b) => videoCompareFn(a, b, (v) => v.absolutePosition));
    case "orderReverse":
      return [...videos].sort((a, b) => videoCompareFn(a, b, (v) => v.absolutePosition, "reverse"));
    case "watchTime":
      return [...videos].sort((a, b) => videoCompareFn(a, b, (v) => v.watchTime));
    case "watchTimeReverse":
      return [...videos].sort((a, b) => videoCompareFn(a, b, (v) => v.watchTime, "reverse"));
  }
};

export const validPositiveNumber = (value: string): number | false => {
  if (!value.includes("e") && !isNaN(parseFloat(value)) && +value > 0) {
    return +value;
  } else if (value === "") {
    return false;
  }
  return false;
};

export const validNumerString = (value: string): boolean => {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(value)
}

export const validNumerField = (value: string) => {
  return validNumerString(value) || value === "";
}

export const validHMS = (value: string) => {
  return /^([0-9]\d:[0-5]\d:[0-5]\d$)/.test(value);
}