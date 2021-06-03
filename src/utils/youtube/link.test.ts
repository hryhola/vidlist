import { isYoutubeLink, getVideoId, getEmbedLink } from "./link";
import { getVideoInfo } from "../../features/videolist/slice.test";

describe("Parsing video links", () => {
  test("Detecting non-youtube links", () => {
    expect(isYoutubeLink("https://github.com/iktakahiro/youtube-url-parser")).toBe(false);
    expect(isYoutubeLink("https://vk.com/")).toBe(false);
    expect(isYoutubeLink("https://wiki.trezor.io/")).toBe(false);
    expect(isYoutubeLink("https://www.facebook.com/")).toBe(false);
    expect(isYoutubeLink("https://www.instagram.com/crystal.endless.rain")).toBe(false);
    expect(isYoutubeLink("ssh://crystal.endless.rain")).toBe(false);
  });

  test("Detecting youtube links", () => {
    expect(isYoutubeLink("https://www.youtube.com/watch?v=OYRy9Lv9jPs")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/watch?v=-wtIMTCHWuI")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/v/-wtIMTCHWuI?version=3&autohide=1")).toBe(true);
    expect(isYoutubeLink("http://youtu.be/-wtIMTCHWuI")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/attribution_link?a=JdfC0C9V6ZI&u=%2Fwatch%3Fv%3DEhxJLojIE_o%26feature%3Dshare")).toBe(true);
    expect(isYoutubeLink("https://www.youtube.com/attribution_link?a=8g8kPrPIi-ecwIsS&u=/watch%3Fv%3DyZv2daTWRZU%26feature%3Dem-uploademail")).toBe(
      true
    );
    expect(isYoutubeLink("https://www.youtube.com/watch?v=yZv2daTWRZU&feature=em-uploademail")).toBe(true);
    expect(isYoutubeLink("https://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index")).toBe(true);
    expect(isYoutubeLink("https://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o")).toBe(true);
    expect(isYoutubeLink("https://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0")).toBe(true);
    expect(isYoutubeLink("https://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s")).toBe(true);
    expect(isYoutubeLink("https://www.youtube.com/embed/0zM3nApSvMg?rel=0")).toBe(true);
    expect(isYoutubeLink("https://www.youtube-nocookie.com/embed/up_lNV-yoK4?rel=0")).toBe(true);
    expect(isYoutubeLink("https://www.youtube-nocookie.com/embed/up_lNV-yoK4?rel=0")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/watch?v=cKZDdG9FTKY&feature=channel")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/watch?v=R2OuMDymkbc&playnext_from=TL&videos=osPknwzXEas&feature=sub")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/watch?v=6dwqZw0j_jY&feature=youtu.be")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/embed/nas1rJpm7wY?rel=0")).toBe(true);
    expect(isYoutubeLink("https://www.youtube.com/watch?v=M4lNahmf58E")).toBe(true);
    expect(isYoutubeLink("http://youtube.com/v/dQw4w9WgXcQ?feature=youtube_gdata_player")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player")).toBe(true);
    expect(isYoutubeLink("http://youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player")).toBe(true);
    expect(isYoutubeLink("http://youtu.be/dQw4w9WgXcQ?feature=youtube_gdata_player")).toBe(true);
    expect(isYoutubeLink("https://www.youtube.com/watch?v=ishbTyLs6ps&list=PLGup6kBfcU7Le5laEaCLgTKtlDcxMqGxZ&index=106&shuffle=2655")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/v/0zM3nApSvMg?fs=1&hl=en_US&rel=0")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/embed/dQw4w9WgXcQ")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/v/dQw4w9WgXcQ")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/e/dQw4w9WgXcQ")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ")).toBe(true);
    expect(isYoutubeLink("https://youtu.be/oTJRivZTMLs?list=PLToa5JuFMsXTNkrLJbRlB--76IAOjRM9b")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/watch?v=oTJRivZTMLs&feature=youtu.be")).toBe(true);
    expect(isYoutubeLink("http://youtu.be/oTJRivZTMLs&feature=channel")).toBe(true);
    expect(isYoutubeLink("http://www.youtube.com/embed/oTJRivZTMLs?rel=0")).toBe(true);
    expect(isYoutubeLink("http://youtube.com/watch?v=oTJRivZTMLs&feature=channel")).toBe(true);
    expect(isYoutubeLink("http://youtube.com/watch?v=oTJRivZTMLs&feature=channel")).toBe(true);
    expect(isYoutubeLink("https://m.youtube.com/watch?v=o4_CHqsc4sw")).toBe(true);
    expect(isYoutubeLink("https://m.youtube.com/watch?v=2wMYpKRHUns&feature=em-uploademail")).toBe(true);
  });

  test("Getting video id from link", () => {
    expect(getVideoId("https://www.youtube.com/watch?v=OYRy9Lv9jPs")).toBe("OYRy9Lv9jPs");
    expect(getVideoId("http://www.youtube.com/watch?v=-wtIMTCHWuI")).toBe("-wtIMTCHWuI");
    expect(getVideoId("http://www.youtube.com/v/-wtIMTCHWuI?version=3&autohide=1")).toBe("-wtIMTCHWuI");
    expect(getVideoId("http://youtu.be/-wtIMTCHWuI")).toBe("-wtIMTCHWuI");
    expect(getVideoId("http://www.youtube.com/attribution_link?a=JdfC0C9V6ZI&u=%2Fwatch%3Fv%3DEhxJLojIE_o%26feature%3Dshare")).toBe("EhxJLojIE_o");
    expect(getVideoId("https://www.youtube.com/attribution_link?a=8g8kPrPIi-ecwIsS&u=/watch%3Fv%3DyZv2daTWRZU%26feature%3Dem-uploademail")).toBe(
      "yZv2daTWRZU"
    );
    expect(getVideoId("https://www.youtube.com/watch?v=yZv2daTWRZU&feature=em-uploademail")).toBe("yZv2daTWRZU");
    expect(getVideoId("https://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index")).toBe("0zM3nApSvMg");
    expect(getVideoId("https://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0")).toBe("0zM3nApSvMg");
    expect(getVideoId("https://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s")).toBe("0zM3nApSvMg");
    expect(getVideoId("https://www.youtube.com/embed/0zM3nApSvMg?rel=0")).toBe("0zM3nApSvMg");
    expect(getVideoId("https://www.youtube-nocookie.com/embed/pVHKp6ffURY?rel=0")).toBe("pVHKp6ffURY");
    expect(getVideoId("http://www.youtube.com/watch?v=cKZDdG9FTKY&feature=channel")).toBe("cKZDdG9FTKY");
    expect(getVideoId("http://www.youtube.com/watch?v=R2OuMDymkbc&playnext_from=TL&videos=osPknwzXEas&feature=sub")).toBe("R2OuMDymkbc");
    expect(getVideoId("http://www.youtube.com/watch?v=6dwqZw0j_jY&feature=youtu.be")).toBe("6dwqZw0j_jY");
    expect(getVideoId("http://www.youtube.com/embed/nas1rJpm7wY?rel=0")).toBe("nas1rJpm7wY");
    expect(getVideoId("https://www.youtube.com/watch?v=M4lNahmf58E")).toBe("M4lNahmf58E");
    expect(getVideoId("http://youtube.com/v/dQw4w9WgXcQ?feature=youtube_gdata_player")).toBe("dQw4w9WgXcQ");
    expect(getVideoId("http://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player")).toBe("dQw4w9WgXcQ");
    expect(getVideoId("http://youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player")).toBe("dQw4w9WgXcQ");
    expect(getVideoId("http://youtu.be/dQw4w9WgXcQ?feature=youtube_gdata_player")).toBe("dQw4w9WgXcQ");
    expect(getVideoId("https://www.youtube.com/watch?v=ishbTyLs6ps&list=PLGup6kBfcU7Le5laEaCLgTKtlDcxMqGxZ&index=106&shuffle=2655")).toBe(
      "ishbTyLs6ps"
    );
    expect(getVideoId("http://www.youtube.com/v/0zM3nApSvMg?fs=1&hl=en_US&rel=0")).toBe("0zM3nApSvMg");
    expect(getVideoId("http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index")).toBe("0zM3nApSvMg");
    expect(getVideoId("http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s")).toBe("0zM3nApSvMg");
    expect(getVideoId("http://www.youtube.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(getVideoId("http://www.youtube.com/v/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(getVideoId("http://www.youtube.com/e/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(getVideoId("http://www.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(getVideoId("https://youtu.be/oTJRivZTMLs?list=PLToa5JuFMsXTNkrLJbRlB--76IAOjRM9b")).toBe("oTJRivZTMLs");
    expect(getVideoId("http://www.youtube.com/watch?v=oTJRivZTMLs&feature=youtu.be")).toBe("oTJRivZTMLs");
    expect(getVideoId("http://youtu.be/oTJRivZTMLs&feature=channel")).toBe("oTJRivZTMLs");
    expect(getVideoId("http://www.youtube.com/embed/oTJRivZTMLs?rel=0")).toBe("oTJRivZTMLs");
    expect(getVideoId("http://youtube.com/watch?v=oTJRivZTMLs&feature=channel")).toBe("oTJRivZTMLs");
    expect(getVideoId("http://youtube.com/watch?v=oTJRivZTMLs&feature=channel")).toBe("oTJRivZTMLs");
    expect(getVideoId("https://m.youtube.com/watch?v=o4_CHqsc4sw")).toBe("o4_CHqsc4sw");
    expect(getVideoId("https://m.youtube.com/watch?v=2wMYpKRHUns&feature=em-uploademail")).toBe("2wMYpKRHUns");
  });

  test("Getting error if not a youtube link", () => {
    expect(() => getVideoId("1243")).toThrow(Error);
    expect(() => getVideoId("https://vk.com/")).toThrow(Error);
    expect(() => getVideoId("")).toThrow(Error);
  });

  test("Getting embed links", () => {
    const defaultParams = { queue: 1, youtubeId: "9smIVyrAnS4", info: getVideoInfo() };
    expect(getEmbedLink({ ...defaultParams, watchTime: 999999, start: 0 })).toBe("https://www.youtube.com/embed/9smIVyrAnS4");
    expect(getEmbedLink({ ...defaultParams, watchTime: 999999, start: 54 })).toBe("https://www.youtube.com/embed/9smIVyrAnS4?start=54");
    expect(getEmbedLink({ ...defaultParams, watchTime: 10, start: 11 })).toBe("https://www.youtube.com/embed/9smIVyrAnS4?start=11&end=21");
    expect(getEmbedLink({ ...defaultParams, watchTime: 10, start: 0 })).toBe("https://www.youtube.com/embed/9smIVyrAnS4?end=10");
  });
});
