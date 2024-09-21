import { Video } from "../../types";
import { formatResourceDate } from "../../util"
import Avatar from "../Avatar/Avatar";
import styles from "./VideoTile.module.css"

function formatViewCount(views: number): string {
    if (views < 1000) {
        return views.toString();
    } else {
        return (Math.round(views / 1000)).toString() + "k";
    }
}

type VideoTileProps = {
    video: Video,
}

export default function VideoTile(props: VideoTileProps) {
    return(
        <div class={styles.VideoTile}>
            <div class={styles.InnerContainer}>
                <a href={`/watch?v=${props.video.uuid}`}>
                    <div
                        class={styles.VideoPreview}
                        style={`background-image: url('/src/assets/images/${props.video.thumbnail}')`}
                    ></div>
                </a>

                <div class={styles.VideoInfo}>
                    <div class={styles.VideoInfoLeft}>
                        <div class={styles.AvatarContainer}>
                            <Avatar uri={props.video.uploader.avatar} size="sm" />
                        </div>

                        <a href={`/watch?v=${props.video.uuid}`}>
                            <div class={styles.VideoText}>  
                                <span class={styles.VideoTitle}>{props.video.title}</span>
                                <span class={styles.Uploader}>
                                    {props.video.uploader.username}
                                    {props.video.uploader.verified ? <i class="bx bxs-check-circle" style="margin-left: 4px;"></i> : ""}
                                </span>
                                <span class={styles.AddInfo}>
                                    {formatViewCount(props.video.views)} views • {formatResourceDate(new Date(props.video.uploaded_at))}
                                </span>
                            </div>
                        </a>
                    </div>

                    <div class={styles.MenuButton}>
                        <button>
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>            
    )
}
