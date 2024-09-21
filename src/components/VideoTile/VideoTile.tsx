import { Video } from "../../types";
import { formatResourceDate } from "../../util"
import Avatar from "../Avatar/Avatar";
import PopupMenu from "../PopupMenu/PopupMenu";
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
                        <PopupMenu direction="right" size="sm">
                            <li><i class="bx bx-list-check"></i> Add the queue</li>
                            <li><i class="bx bx-time-five"></i> Save to watch later</li>
                            <li><i class="bx bx-bookmark"></i> Save to playlist</li>
                            <li><i class="bx bxs-download"></i> Download</li>
                            <li><i class="bx bx-share"></i> Share</li>
                            <hr style="margin: 8px; 0;"/>
                            <li><i class="bx bx-dislike"></i> Not interested</li>
                            <li><i class="bx bx-minus-circle"></i> Don't recommend channel</li>
                            <li><i class="bx bx-flag"></i> Report</li>
                        </PopupMenu>
                    </div>
                </div>
            </div>
        </div>            
    )
}
