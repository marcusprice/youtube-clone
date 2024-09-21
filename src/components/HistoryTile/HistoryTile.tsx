import { A } from "@solidjs/router";
import { removeVideoFromHistory } from "../../store/video";
import { Video } from "../../types";
import styles from "./HistoryTile.module.css";

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
                        <button style="margin-left: 8px;"><i class="bx bx-dots-vertical-rounded" style="font-size: 20px;"></i></button>
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
