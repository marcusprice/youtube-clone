import { createEffect, createResource, createSignal, For, onMount, Show } from "solid-js"
import { useSearchParams } from "@solidjs/router";
import { fetchVideo, fetchVideos } from "../../dao/videoDao"
import { Video } from "../../types/"
import VideoSideTile  from "../../components/VideoSideTile/VideoSideTile";
import CommentSection from "../../components/CommentSection/CommentSection.tsx";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer.tsx";
import styles from "./Watch.module.css"
import NavPanel from "../../components/NavPanel/NavPanel.tsx";
import { watchNavExpanded, setWatchNavExpanded } from "../../index.tsx";

export default function Watch() {
    const [params] = useSearchParams()
    const containerId = "watch";
    const [video] = createResource(() => params.v, fetchVideo);
    const [videoSuggestions] = createResource(fetchVideos, {initialValue: []});
    const [theaterMode, setTheaterMode] = createSignal(false);

    onMount(() => {
        setWatchNavExpanded(false);
    })

    createEffect(() => {
        document.title = video()?.title ? video()?.title! + " - YouTube" : "Youtube";
    })

    createEffect(() => {
        theaterMode()
        const container = document.getElementById(containerId);
        container?.scrollTo({top: 0, left: 0});
    });

    return(
        <>
            <div
                class={styles.Watch}
                id={containerId} 
                style={theaterMode() ? "flex-direction: column; padding-top: 0;" : ""}
            >
                <div class={styles.Left}>
                    <VideoPlayer
                        theaterMode={theaterMode}
                        setTheaterMode={setTheaterMode}
                        src="./src/assets/gimbal.mp4" 
                    />
                    <h2>{video()?.title}</h2>


                    <Show when={!theaterMode()}>
                        <Show when={video()}>
                            <VideoInfo video={video()!}/>
                        </Show>

                        <div class={styles.Description}>
                            <strong>21,367 views  Mar 17, 2023</strong> <br />
                            Original song by Sean Booth and Rob Brown (of Autechre).
                            Inspired from artwork by Alex Rutterford.
                            <br />
                            <br />
                            I do not own the rights to the song used in this video, The respective rights holders may request removal.
                        </div>
                        <CommentSection />
                    </Show>
                </div>

                <Show when={!theaterMode()}>
                    <div class={styles.Right}>
                        <For each={videoSuggestions()}>
                            {(video) => 
                                <VideoSideTile
                                    title={video.title} 
                                    uploader={video.uploader}
                                    views ={video.views}
                                    uploadedAt={video.uploaded_at}
                                    uuid={video.uuid}
                                    containerId={containerId}
                                />
                            }
                        </For>
                    </div>
                </Show>

                <Show when={theaterMode()}>
                    <div style="display: flex;">
                        <div class={styles.Left}>
                            <Show when={video()}>
                                <VideoInfo video={video()!}/>
                            </Show>
                            <div class={styles.Description}>
                                <strong>21,367 views  Mar 17, 2023</strong> <br />
                                Original song by Sean Booth and Rob Brown (of Autechre).
                                Inspired from artwork by Alex Rutterford.
                                <br />
                                <br />
                                I do not own the rights to the song used in this video, The respective rights holders may request removal.
                            </div>
                            <CommentSection />
                        </div>

                        <div class={styles.Right}>
                            <For each={videoSuggestions()}>
                                {(video) => 
                                    <VideoSideTile
                                        title={video.title} 
                                        uploader={video.uploader}
                                        views ={video.views}
                                        uploadedAt={video.uploaded_at}
                                        uuid={video.uuid}
                                        containerId={containerId}
                                    />
                                }
                            </For>
                        </div>
                    </div>
                </Show>
            </div>


            <Show when={watchNavExpanded()}>
                <div class={styles.SideMenuMask} onClick={() => setWatchNavExpanded(false)}>
                    <div class={styles.SideMenu} onClick={(e) => e.stopPropagation()}>
                        <button
                            class={styles.MenuButton}
                            onClick={() => setWatchNavExpanded(false)}
                        >
                            <i class="bx bx-menu"></i>
                        </button>
                        <NavPanel embedded={false} expanded={false} />
                    </div>
                </div>
            </Show>
        </>
    ) 
}

type VideoInfoProps = {
    video: Video
}

function VideoInfo(props: VideoInfoProps) {
    return(
        <div class={styles.VideoInfo}>
            <div class={styles.VideoInfoLeft}>
                <button
                    class={styles.UploaderAvatar}
                    style={`background-image: url("/src/assets/avatars/7.jpg")`}
                ></button>

                <div class={styles.UploaderInfo}>
                    <span style="font-size: 18px; font-wight: 700;">{props.video.uploader}</span>
                    <span style="font-size: 12px; color: #999;">276 subscribers</span>
                </div>

                <button class={styles.Subscribe}>
                    Subscribe
                </button>
            </div>

            <div class={styles.VideoInfoRight}>
                <div class={styles.LikeDislike}>
                    <button class={styles.Like}>
                        <i class="bx bx-like" style="font-size: 18px"></i>
                        &nbsp;
                        &nbsp;
                        {props.video.likes}
                        &nbsp;
                    </button>
                    <button class={styles.Dislike} style="font-size: 18px">
                        <i class="bx bx-dislike"></i>
                    </button>
                </div>

                <button class={styles.Share}>
                    <i class="bx bxs-share-alt" style="font-size: 18px;"></i>
                    &nbsp;
                    Share
                </button>

                <button class={styles.Download}>
                    <i class="bx bx-download" style="font-size: 18px;"></i>
                    &nbsp;
                    Download
                </button>

                <button class={styles.Cut}>
                    <i class="bx bx-cut"></i>
                    &nbsp;
                    Clip
                </button>

                <button class={styles.More}>
                    ...
                </button>
            </div>
        </div>
    );
}
