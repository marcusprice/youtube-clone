import { createResource, createMemo, For } from "solid-js"
import { useLocation } from "@solidjs/router";
import { fetchSubs } from "../../dao/userDao";
import Avatar from "../Avatar/Avatar";
import styles from "./NavPanel.module.css";

export default function NavPanel() {
    const location = useLocation();
    const route = createMemo(() => location.pathname);
    const [subs] = createResource(fetchSubs, {initialValue: []});

    return(
        <nav class={styles.SideBar}>
            <ul>
                <li>
                    <a href="/">
                        <button class={route() === "/" ? styles.Selected : ""}><i class="bx bxs-home"></i><span>Home</span></button>
                    </a>
                </li> 

                <li>
                    <a>
                        <button><i class="bx bx-mobile"></i> <span>Shorts</span></button>
                    </a>
                </li>

                <li>
                    <a>
                        <button><i class="bx bxs-cabinet"></i><span>Subscriptions</span></button>
                    </a>
                </li>

                <li>
                    <a>
                        <button><i class="bx bxl-deezer"></i> <span>YouTube Music</span></button>
                    </a>
                </li>
            </ul> 
            <hr />

            <h2 style="display: flex; align-items: center;">
                You 
                &nbsp;
                <i class="bx bxs-chevron-right" style="font-size: 28px;"></i>
            </h2>
            <ul>
                <li>
                    <a>
                        <button><i class="bx bxs-user-account"></i>Your channel</button>
                    </a>
                </li>
                <li>
                    <a href="/history">
                        <button class={route() === "/history" ? styles.Selected : ""}><i class="bx bx-history"></i>History</button>
                    </a>
                </li>
                <li>
                    <a>
                        <button><i class="bx bx-list-check"></i> <span>Playlists</span></button>
                    </a>
                </li>
                <li>
                    <a>
                        <button><i class="bx bx-play-circle"></i> <span>Your videos</span></button>
                    </a>
                </li>
                <li>
                    <a>
                        <button><i class="bx bx-time-five"></i> <span>Watch later</span></button>
                    </a>
                </li>
                <li>
                    <a>
                        <button><i class="bx bx-like"></i> <span>Liked videos</span></button>
                    </a>
                </li>
                <li>
                    <a>
                        <button><i class="bx bxs-download"></i> <span>Downloads</span></button>
                    </a>
                </li>
            </ul> 

            <hr />
            <h2>Subscriptions</h2>
            <ul>
                <For each={subs()}>
                    {(item) => (
                        <li style="width: 100%; display: flex; align-items: center; overflow: hidden; text-overflow: ellipsis; margin-bottom: 16px;">
                            <Avatar size='sm' uri={item.avatar} />
                            &nbsp;
                            &nbsp;
                            <span class={styles.SubName} style="">
                                {item.name}
                            </span>
                        </li>
                    )}
                </For>
            </ul> 
        </nav>
    );
}
