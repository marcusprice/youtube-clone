import { Video } from "../types/";
import { user } from "../store/user";
import jsonData from "../data/videos.json";
import { addToHistory } from "../store/video";

export function fetchVideo(uuid: string): Promise<Video> {
    return new Promise((res, rej) => {
        const videos = jsonData as Video[]; 
        const result = videos.find((video) => video.uuid === uuid) as Video;
        setTimeout(() => {
            if (result) {
                if (user()?.settings.history) {
                    addToHistory(result.uuid);
                }
                res(result);
            } else {
                rej("Video not found")
            }
        }, 200);
    });
}

export function fetchVideos(): Promise<Video[]> {
    return new Promise((res) => {
        const videos = jsonData as Video[];
        setTimeout(() => res(videos), 200);
    });
}

export function fetchTags(): Promise<string[]> {
    return new Promise((res, _) => {
        setTimeout(() => {
            res([
                "All",
                "News",
                "Podcasts",
                "Music",
                "Gaming",
                "Computer Programming",
                "Synthesizers"
            ]);
        }, 1)
    });
}
