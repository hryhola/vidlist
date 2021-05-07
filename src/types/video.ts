export interface Video {
    // youtubeId + queue = composite primary key (unique id)
    youtubeId: string;
    queue: number;
    info: YoutubeInfo,
    watchTime: number
    start: number
}

export interface YoutubeInfo {
    title: string,
    channelTitle: string,
    publishedAt: Date,
    thumbnail: string,
    isAgeRestricted: boolean
    duration: number 
}

export type VideoKey = Pick<Video, "queue" | "youtubeId">;
