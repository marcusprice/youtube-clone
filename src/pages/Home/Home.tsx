import { Video } from '../../types';
import { createResource, createSignal, createEffect, For, createMemo, JSXElement } from 'solid-js';
import { useSearchParams } from "@solidjs/router"
import { filterValue, setFilterValue, setInputValue } from '../../components/SearchBar/SearchBar';
import { fetchTags } from "../../dao/videoDao";
import { videoResource } from '../../store/video';
import Tag from '../../components/Tag/Tag';
import VideoTile from '../../components/VideoTile/VideoTile';
import styles from './Home.module.css';

export const [selectedTag, setSelectedTag] = createSignal<number>(0);

type HomeProps = {
    navExpanded: boolean;
}

function Home(props: HomeProps): JSXElement {
    const [params] = useSearchParams();
    const [tags] = createResource(fetchTags, {initialValue: ["Freeskate broskie"]});
    const [videos, setVideos] = createSignal<Video[]>([]);

    if (params.s) {
        setSelectedTag(0);
        setFilterValue(params.s);
        setInputValue(params.s);
    }    // sets videos after initial fetch

    createEffect(() => {
        setVideos(videoResource());
        setSelectedTag(0);
    });

    // filters videos based on search + tag
    createEffect(() => {
        let updatedVideos: Video[] = [];
        const tag = tags()[selectedTag()];
        
        if (tag === "All") {
            updatedVideos = videoResource();
        } else {
            updatedVideos = videoResource().filter(({category}) => category === tag);
        }

        if (filterValue() === "") {
            setVideos(updatedVideos);
        } else {
            setVideos(
                updatedVideos.filter(
                    ({title}) => 
                        title.toLowerCase().includes(filterValue().toLowerCase()
                    )
                )
            );
        }
    })

    return (
        <div class={styles.Content}>
            <div class={styles.tags}>
                <For each={tags()}>
                    {(tag, index) => {
                        const toggled = createMemo(
                            () => (index() === selectedTag())
                        );

                        return (
                            <Tag
                                index={index()}
                                toggled={toggled()}
                            >
                                {tag}
                            </Tag>
                        );
                    }}
                </For>

            </div>

            <div
                class={`
                    ${styles.Videos}
                    ${props.navExpanded ? styles.ThreeColumn : styles.FourColumn}`}
            >
                <For each={videos()}>
                    {({title, uploader, views, uploaded_at, uuid}) => {
                        return (
                            <VideoTile 
                                title={title}
                                uploader={uploader}
                                views={views}
                                uploadedAt={uploaded_at}
                                uuid={uuid}
                            />)
                    }}
                </For>
            </div>
        </div>
    );
};

export default Home;
