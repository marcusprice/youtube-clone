import { useNavigate } from "@solidjs/router";
import { createSignal, createEffect, Show } from "solid-js";
import { setFilterValue, setInputValue } from "../SearchBar/SearchBar";
import styles from "./Microphone.module.css"

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function Mircophone() {
    const navigate = useNavigate();
    const [micEngaged, setMicEngaged] = createSignal(false);
    const [recording, setRecording] = createSignal(false);
    const [speech, setSpeech] = createSignal("Listening...");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const sr = new SpeechRecognition()
    sr.interimResults = true;

    function executeSearch(text: string) {
        setRecording(false);
        setFilterValue(text);
        setInputValue(text);
        setMicEngaged(false);
        navigate(`/?s=${text}`);
        setSpeech("Listening...");
    }

    createEffect(() => {
        if (!recording()) {
            sr.stop();
            if (speech() !== "Listening..." && speech().length > 0) {
                executeSearch(speech());
            }
        }
    });

    sr.addEventListener("result", (e: any) => {
        const result = e.results[0];
        const speechResult = result[0].transcript as string;

        if (!result.isFinal && speechResult !== "") {
            setSpeech(speechResult);
        } else {
            executeSearch(speechResult);
        }
    });

    return(
        <>
            <button
                class={styles.Mic}
                onClick={() => {
                    setMicEngaged(true);
                    setRecording(true);
                    sr.start();
                }}
            >
                <i class="bx bxs-microphone"></i>
            </button>

            <Show when={micEngaged()}>
                <div class={styles.MicMask} onClick={() => setMicEngaged(false)}>
                    <div class={styles.MicBox} onClick={(e) => e.stopPropagation()}>
                        <div class={styles.Header}>
                            <button onClick={() => {setMicEngaged(false); setRecording(false)}}>
                                <i class="bx bx-x" style="font-size: 44px"></i>
                            </button>
                        </div>
                        
                        <div class={styles.Body}>
                            <span>{speech()}</span>
                        </div>
                        
                        <div class={styles.Button}>
                            <button
                                onClick={() => {
                                    if (!recording()) {
                                        sr.start();
                                    }
                                    setRecording(!recording())
                                }}
                                style={recording() ? "background: red;" : ""}
                            >
                                <Show
                                    when={recording()}
                                    fallback={<i class="bx bxs-microphone" style="font-size: 48px"></i>}
                                >
                                    <i class="bx bxs-microphone bx-flashing" style="font-size: 48px"></i>
                                </Show>
                            </button>
                            Tap microphone to record
                        </div>
                    </div>
                </div>
            </Show>
        </>
    );
}
