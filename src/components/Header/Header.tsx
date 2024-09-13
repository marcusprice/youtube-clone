import { SearchBar, setInputValue, setFilterValue } from "../SearchBar/SearchBar"
import { user } from "../../store/user"
import styles from "./Header.module.css"
import Avatar from "../Avatar/Avatar.tsx";

export default function Header() {
    return(
        <header>
            <div class={styles.MenuLogo}>
                <button>
                    <i class="bx bx-menu" style="font-size: 28px;"></i>
                </button>
                <a href="/" style="text-decoration: none; color: #fff;" onClick={() => {setFilterValue(""); setInputValue("")}}>
                    <button style="cursor: pointer; display: flex; align-items: center;">
                        <img src="/src/assets/yt-icon.svg" style="height: 32px"/>
                        Premium
                    </button>
                </a>
            </div>

            <SearchBar />

            <div class={styles.PersonalBar}>
                <button class={styles.Cast}><i class="bx bx-video-plus"></i></button>
                <button class={styles.Notifications}><i class="bx bxs-bell"></i></button>
                <Avatar size="sm" uri={user()?.avatar || ""}/>
            </div>
        </header>
    );
}
