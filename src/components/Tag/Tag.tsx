import styles from "./Tag.module.css"
import { JSXElement } from "solid-js";
import { setSelectedTag } from "../../pages/Home/Home";

type Tag = {
    index: number,
    toggled: boolean,
    children: JSXElement | string
}

export default function Tag(props: Tag) {
    return(
        <button 
            class={`${styles.Tag} ${props.toggled ? styles.Toggled : ""}`}
            onClick={() => {setSelectedTag(props.index)}}
        >
            {props.children}
        </button>
    );
}
