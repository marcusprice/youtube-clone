import { formatResourceDate } from "../../util"
import styles from "./VideoTile.module.css"

function formatViewCount(views: number): string {
    if (views < 1000) {
        return views.toString();
    } else {
        return (Math.round(views / 1000)).toString() + "k";
    }
}

type VideoTile = {
    title: string,
    uploader: string,
    views: number,
    uploadedAt: string,
    uuid: string
}

export default function VideoTile({title, uploader, views, uploadedAt, uuid}: VideoTile) {
    return(
        <div class={styles.videoTile}>
            <a href={`/watch?v=${uuid}`}>
                <div class={styles.innerContainer}>
                    <div class={styles.videoPreview}></div>
                    <div>
                        <div class={styles.uploaderAvatar}></div>
                        <div class={styles.videoInfo}>
                            <span class={styles.videoTitle}>{title}</span>
                            <span>{uploader}</span>
                            <span>
                                {formatViewCount(views)} views • {formatResourceDate(new Date(uploadedAt))}
                            </span>
                        </div>
                        <div class={styles.moreActions}></div>
                    </div>
                </div>
            </a>
        </div>            
    )
}
