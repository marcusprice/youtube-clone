import { A } from "@solidjs/router"
import styles from "./VideoSideTile.module.css"
import { Video } from "../../types"

type VideoSideTileProps = {
    containerId: string,
    video: Video
}

export default function VideoSideTile(props: VideoSideTileProps) {
    const linkHandler = () => {
        const container = document.getElementById(props.containerId);
        container?.scrollTo({top: 0, left: 0, behavior: "smooth"});
    }

    return(
        <div class={styles.VideoSideTile}>
            <A 
                class={styles.Preview}
                href={`/watch?v=${props.video.uuid}`}
                onClick={linkHandler}
            >
                <div
                    style={`background-image: url('/src/assets/images/${props.video.thumbnail}')`}
                ></div>
            </A>
                <div class={styles.Info}>
                <A href={`/watch?v=${props.video.uuid}`} style="text-decoration: none; color: #fff;" onClick={linkHandler}>
                    <span style="display: block;">{props.video.title}</span>
                    <span style="display: block; margin-top: 4px; display: flex; align-items: center;">
                        {props.video.uploader.username}
                        <i style="margin-left: 4px; font-size: 16px;" class="lni lni-checkmark-circle"></i>
                    </span>
                    <div>
                        {props.video.views} * {props.video.uploaded_at}
                    </div>
                </A>
                </div>
                <div class={styles.Menu}>
                    <i class="bx bx-dots-vertical-rounded" style="font-size: 20px;"></i>
                </div>
        </div>
    );
}
