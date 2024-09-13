import { Accessor, Setter, createEffect, createSignal, onMount, Show } from "solid-js"
import styles from "./VideoPlayer.module.css"

let videoContainer: HTMLDivElement;
let video: HTMLVideoElement;

type VideoPlayerProps = {
    theaterMode: Accessor<boolean>,
    setTheaterMode: Setter<boolean>,
    src: string
}

export default function VideoPlayer(props: VideoPlayerProps) {
    const [playing, setPlaying] = createSignal(false);
    const [timelinePos, setTimelinePos] = createSignal(0);

    onMount(() => {
        // autoplay
        video.play();
        setPlaying(true);
        video.addEventListener("timeupdate", () => {
            const p = Math.floor((video.currentTime / video.duration) * 100);
            setTimelinePos(p);
        });
    });

    createEffect(() => {
        if(playing()) {
            video.play();
        } else {
            video.pause();
        }
    });

    return(
        <div ref={videoContainer} class={styles.Container} onClick={() => {setPlaying(!playing())}}>
            <video 
                ref={video}
                class={styles.Player}
                src={props.src}
            />

            <div class={styles.ControlContainer} onClick={e => e.stopPropagation()}>
                <div class={styles.TimelineContainer}>
                    <input
                        class={styles.Timeline}
                        type="range"
                        min={0}
                        max={100}
                        value={timelinePos() || 0}
                    />
                </div>
                <div class={styles.Controls}>
                    <div class={styles.LeftControls}>
                        <button class={styles.PlayPause} onClick={() => setPlaying(!playing())}>
                            <i class={playing() ? "bx bx-pause" : "bx bx-play" }/> 
                        </button>
                        <button>
                            <i class="bx bx-skip-next"></i>
                        </button>
                        <button>
                            <i class="bx bx-volume-full"></i>
                        </button>
                    </div>

                    <div class={styles.RightControls}>
                        <button>
                            <i class="bx bx-tv"></i>
                        </button>
                        <button onClick={() => props.setTheaterMode(!props.theaterMode())}>
                            <Show when={props.theaterMode()} fallback={<i class="bx bx-horizontal-right"></i>}>
                                <i class="bx bx-horizontal-left"></i>
                            </Show>
                        </button>

                        <button
                            onClick={() => {
                                videoContainer.requestFullscreen();
                            }}
                        >
                            <i class="bx bx-fullscreen"></i>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
