import { A } from "@solidjs/router"
import styles from "./VideoSideTile.module.css"

type VideoSideTile = {
    title: string,
    uploader: string,
    views: number,
    uploadedAt: string,
    uuid: string
    containerId: string
}

export default function VideoSideTile({title, uploader, views, uploadedAt, uuid, containerId}: VideoSideTile) {
    const linkHandler = () => {
        const container = document.getElementById(containerId);
        container?.scrollTo({top: 0, left: 0, behavior: "smooth"});
    }

    return(
        <div class={styles.VideoSideTile}>
            <A 
                class={styles.Preview}
                href={`/watch?v=${uuid}`}
                onClick={linkHandler}
            >
                <div></div>
            </A>
                <div class={styles.Info}>
                <A href={`/watch?v=${uuid}`} style="text-decoration: none; color: #fff;" onClick={linkHandler}>
                    <span style="display: block;">{title}</span>
                    <span style="display: block; margin-top: 4px; display: flex; align-items: center;">
                        {uploader}
                        <i style="margin-left: 4px; font-size: 16px;" class="lni lni-checkmark-circle"></i>
                    </span>
                    <div>
                        {views} * {uploadedAt}
                    </div>
                </A>
                </div>
                <div class={styles.Menu}>
                    <i class="bx bx-dots-vertical-rounded" style="font-size: 20px;"></i>
                </div>
        </div>
    );
}
