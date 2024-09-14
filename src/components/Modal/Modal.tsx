import styles from "./Modal.module.css";

type ModalProps = {
    title: string,
    modalText: string,
    primaryActionLabel: string,
    onCancel: (e: MouseEvent) => void,
    onPrimary: (e: MouseEvent) => void
}

export default function Modal(props: ModalProps) {
    return(
        <div
            class={styles.Mask}
            onClick={props.onCancel}
        >
            <div
                class={styles.Modal}
                onClick={e => e.stopPropagation()}
            >
                <div>
                    <h3 class={styles.Title}>{props.title}</h3>
                    <div class={styles.Text} style="white-space: pre-wrap">
                        {props.modalText}
                    </div>
                </div>

                <div class={styles.Actions}>
                    <button class={styles.CancelButton} onClick={props.onCancel}>
                        Cancel
                    </button>

                    <button class={styles.PrimaryButton} onClick={props.onPrimary}>
                        {props.primaryActionLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
