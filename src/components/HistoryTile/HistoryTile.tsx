import { removeVideoFromHistory } from "../../store/video";
import { Video } from "../../types";
import styles from "./HistoryTile.module.css";

type HistoryTileProps = {
    video: Video
}

export default function HistoryTile(props: HistoryTileProps) {
    return(
        <div class={styles.HistoryTile}>
            <div
                class={styles.PreviewWindow} 
                style={`background-image: url('/src/assets/images/${props.video.thumbnail}')`}
            />

            <div class={styles.VideoInfo}>
                <div class={styles.VideoTitleBar}>
                    <div class={styles.Left}>
                        <div class={styles.Title}>
                            <strong>{props.video.title}</strong>
                        </div>
                        <div class={styles.AddInfo}>
                            {props.video.uploader.username} • {props.video.views} views
                        </div>

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
                    <span>
                        {props.video.description}
                    </span>
                </div>
            </div>
        </div>
    );
}
