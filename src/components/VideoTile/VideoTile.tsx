import { formatResourceDate } from "../../util"
import styles from "./VideoTile.module.css"

function formatViewCount(views: number): string {
    if (views < 1000) {
        return views.toString();
    } else {
        return (Math.round(views / 1000)).toString() + "k";
    }
}

type VideoTileProps = {
    title: string,
    uploader: string,
    views: number,
    uploadedAt: string,
    uuid: string
}

export default function VideoTile(props: VideoTileProps) {
    return(
        <div class={styles.videoTile}>
            <a href={`/watch?v=${props.uuid}`}>
                <div class={styles.innerContainer}>
                    <div class={styles.videoPreview}></div>
                    <div>
                        <div class={styles.videoInfo}>
                            <span class={styles.videoTitle}>{props.title}</span>
                            <span>{props.uploader}</span>
                            <span>
                                {formatViewCount(props.views)} views • {formatResourceDate(new Date(props.uploadedAt))}
                            </span>
                        </div>
                    </div>
                </div>
            </a>
        </div>            
    )
}
