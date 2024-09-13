import styles from "./Avatar.module.css";

type Avatar = {
    size: "sm" | "md" | "lg",
    uri: string
}

export default function Avatar(props: Avatar) {
    let cls = styles.SM;

    if (props.size === "md") {
        cls = styles.MD;
    } else if(props.size === "lg") {
        cls = styles.LG
    }

    return(
        <div 
            class={cls}
            style={`background-image: url("${props.uri}")`}
        >

        </div>
    );
}
