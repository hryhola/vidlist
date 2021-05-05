import { Video } from "../../types";

const youtubeRegex = /(\/|%3D|v=)([0-9A-z-_]{11})([%#?&]|$)/;

export const isYoutubeLink = (link: string) => youtubeRegex.test(link);

export const getVideoId = (link: string) => {
  if (!isYoutubeLink(link)) throw new Error("Not a youtube link!");
  return youtubeRegex.exec(link)![2];
};

export const getStartAndEndParams = (video: Video) => {
  let params = "";

  if (video.start) {
    params += `start=${video.start}`;
  }

  if (video.duration) {
    params !== "" && (params += "&");
    params += `end=${video.duration + (video.start ? video.start : 0)}`;
  }

  return params;
};

export const getEmbedLink = (video: Video) => {
  let link = `https://www.youtube.com/embed/${video.youtubeId}`;

  if (video.start || video.duration) link += "?" + getStartAndEndParams(video);

  return link;
};
