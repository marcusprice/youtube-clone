import CommentInput from "../CommentInput/CommentInput";
import Avatar from "../Avatar/Avatar";
import { createSignal, createResource, createMemo, For } from "solid-js";
import { Comment } from "../../types/"
import { fetchComments } from "../../dao/commentDao";
import styles from "./CommentSection.module.css";
import { formatResourceDate } from "../../util"

type CommentPost = {
    comment: Comment
}

function CommentPost({comment}: CommentPost) {
    return (
        <div class={styles.CommentPost}>
            <div class={styles.CommentPostLeft}>
                <Avatar
                    size="md"
                    uri={comment.userAvatar} 
                />

                <div class={styles.CommentContainer}>
                    <span class={styles.Username}>@{comment.username} </span>
                    <span class={styles.PublishedAt}>
                        {formatResourceDate(comment.publishedAt)} {comment.edited ? "(edited)" : ""}</span>

                    <div class={styles.CommentText}>
                        {comment.commentText}
                    </div>
                    <div class={styles.Likes}>
                        <i class="bx bx-like" style="font-size: 18px !important; margin-right: 8px;"></i>{comment.likes || ""}
                        <i class="bx bx-dislike" style="font-size: 18px !important; margin-left: 16px;"></i>
                    </div>
                </div>
            </div>

            <div>
                <i class="bx bx-dots-vertical-rounded" style="font-size: 24px;"></i>
            </div>
        </div>
    );
}


export default function CommentSection() {
    const [commentResource] = createResource<Comment[]>(fetchComments, {initialValue: []});
    const [comments, setComments] = createSignal<Comment[]>([]);

    createMemo(() => {
        setComments(commentResource());
    });

    return(
        <div class={styles.Comments}>
            <div class={styles.SortContainer}>
                <h3>839 Comments</h3>
                <div>
                    <i class="lni lni-sort-amount-dsc" style="margin-right: 8px;"></i>
                    Sort by
                </div>
            </div>

            <CommentInput 
                comments={comments}
                setComments={setComments}
            />

            <div class={styles.CommentSection}>
                <For each={comments()}>
                    {(c) => (
                        <CommentPost comment={c} />
                    )}
                </For> 
            </div>
        </div>
    );
}
