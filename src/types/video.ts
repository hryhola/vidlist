export interface Video {
    // youtubeId + queue = composite primary key (unique id)
    youtubeId: string;
    queue: number;
    duration?: number
    start?: number
}
