import { removeVideoFromHistory } from "../../store/video";
import { Video } from "../../types";
import styles from "./HistoryTile.module.css";
import PopupMenu from "../PopupMenu/PopupMenu";

type HistoryTileProps = {
    video: Video
}

export default function HistoryTile(props: HistoryTileProps) {
    return(
        <div class={styles.HistoryTile}>
            <a 
                class={styles.PreviewWindow} 
                href={`/watch?v=${props.video.uuid}`}>
                <div
                    style={`background-image: url('/src/assets/images/${props.video.thumbnail}')`}
                />
            </a>

            <div class={styles.VideoInfo}>
                <div class={styles.VideoTitleBar}>
                    <div class={styles.Left}>
                        <a class={styles.Link} href={`/watch?v=${props.video.uuid}`}>
                            <div class={styles.Title}>
                                <strong>{props.video.title}</strong>
                            </div>
                            <div class={styles.AddInfo}>
                                {props.video.uploader.username} • {props.video.views} views
                            </div>
                        </a>
                    </div>
                    <div class={styles.Right}>
                        <button
                            class={styles.RemoveVideo}
                            onClick={() => removeVideoFromHistory(props.video.uuid)}
                        >
                            <i class="bx bx-x"></i>
                        </button>
                        <div>
                            <PopupMenu
                                size="md"
                                direction="right"
                                childID={`historyPopup-${props.video.uuid}`}
                            >
                                <li><i class="bx bx-list-check"></i> Add the queue</li>
                                <li><i class="bx bx-time-five"></i> Save to watch later</li>
                                <li><i class="bx bx-bookmark"></i> Save to playlist</li>
                                <li><i class="bx bxs-download"></i> Download</li>
                                <li><i class="bx bx-share"></i> Share</li>
                            </PopupMenu>
                        </div>
                    </div>
                </div> 

                <div class={styles.Desc}>
                    <a class={styles.Link} href={`/watch?v${props.video.uuid}`}>
                    <span>
                        {props.video.description}
                    </span>
                    </a>
                </div>
            </div>
        </div>
    );
}
