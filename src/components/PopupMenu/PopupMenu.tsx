import { createSignal, JSXElement, onMount, Show } from "solid-js";
import styles from "./PopupMenu.module.css";
import { createStore } from "solid-js/store";

type PopupMenuProps = {
    size: "sm" | "md",
    children: JSXElement,
    direction: "left" | "right",
    childID: string
}

function getYPos(clientY: number, y: number): "bottom" | "top" {
    const posTop = y > clientY * .9;
    if (posTop) {
        return "top";
    } else {
        return "bottom";
    }
}

export default function PopupMenu(props: PopupMenuProps): JSXElement {
    const [open, setOpen] = createSignal(false);
    let ulElement!: HTMLUListElement;

    onMount(() => {
        document.addEventListener("click", (event) => {
            const target = event.target as Node;

            if (ulElement && !ulElement.contains(target) && open() && target.nodeName !== "I") {
                setOpen(false);
            }
        })
    });

    return (
        <div
            onClick={e => e.stopPropagation()}
            classList={{
                [styles.PopupMenu]: true,
                [styles.Left]: props.direction === "left",
                [styles.Right]: props.direction === "right",
            }}
        >
            <button
                class={styles.Button}
                onClick={() => {
                    setOpen(prev => !prev);
                }}
            >
                <i class="bx bx-dots-vertical-rounded" style="font-size: 20px;"></i>
            </button>

            <Show when={open()}>
                <ul ref={ulElement}>
                    {props.children}
                </ul>
            </Show>
        </div>
    );
}
