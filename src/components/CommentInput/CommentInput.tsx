import { Accessor, createSignal, Setter } from "solid-js"
import { user } from "../../store/user"
import Avatar from "../Avatar/Avatar.tsx"
import styles from "./CommentInput.module.css"
import { Comment } from "../../types/"

function postComment(
    commentText: string,
    comments: Accessor<Comment[]>,
    setComments: Setter<Comment[]>
) {
    const newComment: Comment = {
        username: user()?.username || "",
        commentText: commentText,
        likes: 0,
        publishedAt: new Date(),
        edited: false,
        userAvatar: user()?.avatar!
    }
    setComments([newComment, ...comments()]) ;
}

type CommentInputProps = {
    setComments: Setter<Comment[]>,
    comments: Accessor<Comment[]>
}

export default function CommentInput(props: CommentInputProps) {
    const [userEngaged, setUserEngaged] = createSignal<boolean>(false);
    const [commentText, setCommentText] = createSignal<string>("");

    return(
        <div class={styles.PostComment}>
            <div class={styles.CommentInputContainer}>
                <Avatar
                    size="md"
                    uri={user()?.avatar || ""}
                />

                <form class={styles.CommentForm} id="comment-form">
                    <input
                        value={commentText()}
                        onInput={(e) => {setCommentText(e.currentTarget.value); setUserEngaged(true)}}
                        onClick={() => setUserEngaged(true)}
                        class={styles.CommentInput}
                        type="text"
                        placeholder="Add a comment..."
                    />
                </form>
            </div>

            {userEngaged() &&
                <div class={styles.CommentButtons}>
                    <button 
                        class={styles.Cancel}
                        onClick={() => {
                            setCommentText("");
                            setUserEngaged(false);
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        form="comment-form"
                        disabled={commentText().length < 1}
                        class={styles.Post}
                        onClick={() => {
                            postComment(
                                commentText(),
                                props.comments,
                                props.setComments
                            );
                            setUserEngaged(false);
                            setCommentText("");
                        }}
                    >
                        Comment
                    </button>
                </div>
            }
        </div>
    );
}
