import { Sub } from "../../types";
import { createResource, createMemo, For, createEffect, Show, JSXElement } from "solid-js"
import { useLocation } from "@solidjs/router";
import { fetchSubs } from "../../dao/userDao";
import Avatar from "../Avatar/Avatar";
import styles from "./NavPanel.module.css";

type NavPanelProps = {
    expanded: boolean,
    embedded: boolean,
}

export default function NavPanel(props: NavPanelProps) {
    const location = useLocation();
    const route = createMemo(() => location.pathname);
    const [subs] = createResource<Sub[]>(fetchSubs, {initialValue: []});

    return(
        <nav
            classList={{
                [styles.SideBar]: true,
                [styles.OffScreen]: !props.embedded,
                [styles.Condensed]: props.embedded && !props.expanded
            }}>
                <Show 
                    when={props.embedded && !props.expanded}
                    fallback={(
                        <ExpandedNav
                            subs={subs()}
                            route={route()}
                        />
                    )}
                >
                    <CondensedNav />
                </Show>
        </nav>
    );
}

function CondensedNav(): JSXElement {
    return(
        <ul>
            <li class={styles.CondensedItem}>
                <a href="/">
                    <i class="bx bxs-home"></i>
                    <span>Home</span>
                </a>
            </li>
            <li class={styles.CondensedItem}>
                <a href="">
                    <i class="bx bx-mobile"></i> 
                    <span>Shorts</span>
                </a>
            </li>
            <li class={styles.CondensedItem}>
                <a href="">
                    <i class="bx bxs-cabinet"></i>
                    <span>Subcsriptions</span>
                </a>
            </li>
            <li class={styles.CondensedItem}>
                <a href="/history">
                    <i class="bx bx-history"></i>
                    <span>History</span>
                </a>
            </li>
            <li class={styles.CondensedItem}>
                <a href="">
                    <i class="bx bxs-user-account"></i>
                    <span>You</span>
                </a>
            </li>
            <li class={styles.CondensedItem}>
                <a href="">
                    <i class="bx bxs-download"></i>
                    <span>Downloads</span>
                </a>
            </li>
        </ul>
    )
}

type ExpandedNavProps = {
    route: string,
    subs: Sub[]
}

function ExpandedNav(props: ExpandedNavProps): JSXElement {
    return(
        <>
            <ul>
                <li class={styles.ExpandedItem}>
                    <a href="/">
                        <button class={props.route === "/" ? styles.Selected : ""}><i class="bx bxs-home"></i><span>Home</span></button>
                    </a>
                </li> 

                <li class={styles.ExpandedItem}>
                    <a>
                        <button><i class="bx bx-mobile"></i> <span>Shorts</span></button>
                    </a>
                </li>

                <li class={styles.ExpandedItem}>
                    <a>
                        <button><i class="bx bxs-cabinet"></i><span>Subscriptions</span></button>
                    </a>
                </li>

                <li class={styles.ExpandedItem}>
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
                <li class={styles.ExpandedItem}>
                    <a>
                        <button><i class="bx bxs-user-account"></i>Your channel</button>
                    </a>
                </li>
                <li class={styles.ExpandedItem}>
                    <a href="/history">
                        <button class={props.route === "/history" ? styles.Selected : ""}><i class="bx bx-history"></i>History</button>
                    </a>
                </li>
                <li class={styles.ExpandedItem}>
                    <a>
                        <button><i class="bx bx-list-check"></i> <span>Playlists</span></button>
                    </a>
                </li>
                <li class={styles.ExpandedItem}>
                    <a>
                        <button><i class="bx bx-play-circle"></i> <span>Your videos</span></button>
                    </a>
                </li>
                <li class={styles.ExpandedItem}>
                    <a>
                        <button><i class="bx bx-time-five"></i> <span>Watch later</span></button>
                    </a>
                </li>
                <li class={styles.ExpandedItem}>
                    <a>
                        <button><i class="bx bx-like"></i> <span>Liked videos</span></button>
                    </a>
                </li>
                <li class={styles.ExpandedItem}>
                    <a>
                        <button><i class="bx bxs-download"></i> <span>Downloads</span></button>
                    </a>
                </li>
            </ul> 

            <hr />
            <h2>Subscriptions</h2>
            <ul>
                <For each={props.subs}>
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
        </>
    )
}

