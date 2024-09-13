import { createSignal } from "solid-js"
import styles from "./SearchBar.module.css"
import Mircophone from "../Microphone/Microphone";

export const [filterValue, setFilterValue] = createSignal("");
export const [inputValue, setInputValue] = createSignal<string>("");

function handleRouteUrl(inputValue: string): string {
    if(inputValue !== "") {
        return `/?s=${inputValue}`;
    } else {
        return "/";
    }
}

export function SearchBar() {
    const params = new URLSearchParams(document.location.search);
    const search = params.get("s");
    if (search !== "") {
        setInputValue(search!);
    }

    return(
        <div class={styles.SearchBar}>
            <form id="search-bar">
                <input
                    class={styles.SearchInput}
                    type="text"
                    placeholder="Search"
                    value={inputValue()}
                    onInput={(e) => setInputValue(e.currentTarget.value)}
                >
                </input>
            </form>
            <a href={handleRouteUrl(inputValue())} style="text-decoration: none;">
                <button
                    class={styles.Submit}
                    type="submit"
                    form="search-bar"
                    onClick={() => {
                        setFilterValue(inputValue());
                    }}
                >
                    <i class="bx bx-search"></i>
                </button>
            </a>
            <Mircophone />
        </div>
    );
}
