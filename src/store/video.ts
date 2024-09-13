import { Video } from "../types";
import { createSignal, createResource } from "solid-js";
import { fetchVideo, fetchVideos } from "../dao/videoDao";

const [history, setHistory] = createSignal<Video[]>(getLsHistory());

export { history };
export const [videoResource, { refetch }] = createResource(fetchVideos, {initialValue: []});

export function addToHistory(uuid: string): void {
    const video = findByUUID(uuid);

    if(!video) {
        fetchVideo(uuid)
            .then((video) => {
                removeVideoFromHistory(video.uuid);
                setHistory([video, ...history()]);
                setLsHistory();
            })
            .catch(() => {
                throw new Error("Video doesn't exist")
            })
    } else {
        removeVideoFromHistory(video.uuid);
        setHistory([video, ...history()]);
        setLsHistory();
    }
}

export function removeVideoFromHistory(uuid: string) {
    setHistory(
        history().filter(vid => vid.uuid !== uuid)
    )
}

export function deleteHistory(): void {
    setHistory([]);
    window.localStorage.removeItem("history");
}

function getLsHistory(): Video[] {
    const historyJson = window.localStorage.getItem("history");
    if (historyJson) {
        const history = JSON.parse(historyJson) as Video[];
        return history;
    } else {
        return [];
    }
}

function setLsHistory(): void {
    window.localStorage.setItem(
        "history",
        JSON.stringify(history())
    );
}

function findByUUID(uuid: string): Video | undefined {
    return videoResource().find(video => video.uuid === uuid);
}

