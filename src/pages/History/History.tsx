import { createSignal, createMemo, For, Show } from "solid-js"
import { User } from "../../types";
import { user, setUser } from "../../store/user";
import { history, deleteHistory } from "../../store/video"
import HistoryTile from "../../components/HistoryTile/HistoryTile";
import styles from "./History.module.css"

function toggleHistory() {
    const updatedUser: User = {
        ...user()!,
        settings: {
            ...user()?.settings!,
            history: !user()?.settings.history
        }
    }

    setUser(updatedUser);
}

export default function History() {
    const [inputValue, setInputValue] = createSignal("");
    const [historyFilterVal, setHistoryFilterVal] = createSignal("");

    const historySetting = createMemo(() => user()?.settings.history);
    const filteredHistory = createMemo(
        () => (
            history().filter((vid) => {
                if (historyFilterVal()) {
                    return vid.title.toLowerCase().includes(historyFilterVal().toLowerCase());
                } else {
                    return vid;
                }
            })
        )
    );

    return(
        <div class={styles.HistoryPage}>
            <div class={styles.History}>
                <div>
                    <h2 class={styles.PageTitle}>Watch history</h2>
                </div>

                <div class={styles.HistoryContent}>
                    <div class={styles.HistoryVideos}>
                        <Show
                            when={filteredHistory().length > 0}
                            fallback={<h3>No videos</h3>}
                        >
                            <div>
                                <h3 class={styles.Timeframe}>Today</h3>
                                <For each={filteredHistory()}>
                                    {
                                        (video) => <HistoryTile video={video} />
                                    }
                                </For>
                            </div>
                        </Show>
                    </div>

                    <div class={styles.HistoryControls}>
                        <form id="historySearch">
                            <div class={styles.SearchBar}>
                                <div>
                                    <button
                                        form="historySearch"
                                        type="submit"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setHistoryFilterVal(inputValue());
                                        }}
                                    >
                                        <i class="bx bx-search"></i>
                                    </button>
                                    <input
                                        type="text"
                                        value={inputValue()}
                                        placeholder="Search watch history"
                                        onInput={(e) => setInputValue(e.currentTarget.value)}
                                    />
                                </div>

                                <Show when={inputValue() !== ""}>
                                    <button
                                        onClick={() => {
                                            setHistoryFilterVal("");
                                            setInputValue("")
                                        }}
                                    >
                                        <i class="bx bx-x" style="color: #fff;"></i>
                                    </button>
                                </Show>
                            </div>
                        </form>

                        <button class={styles.HistoryButton} onClick={deleteHistory}>
                            <i class="bx bx-trash" style="margin-right: 8px;"></i>
                            Clear all watch history
                        </button>

                        <button class={styles.HistoryButton} onClick={toggleHistory}>
                            <Show 
                                when={historySetting()}
                                fallback={(
                                    <>
                                        <i class="bx bx-play-circle" style="margin-right: 8px;"></i>
                                        <span>Play watch history</span>
                                    </>
                                )}>
                                <i class="bx bx-pause-circle" style="margin-right: 8px;"></i>
                                Pause watch history
                            </Show>
                        </button>

                        <button class={styles.HistoryButton} onClick={deleteHistory}>
                            <i class="bx bx-cog" style="margin-right: 8px;"></i>
                            Manage all history
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
