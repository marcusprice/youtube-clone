import { Comment } from "../types/"
import commentJson from "../data/comments.json"

export function fetchComments(): Promise<Comment[]> {
    return new Promise(res => {
        setTimeout(() => {
            res(commentJson.map(comment => (
                {
                    username: comment.username,
                    commentText: comment.comment_text,
                    likes: comment.likes,
                    publishedAt: new Date(comment.published_time),
                    edited: comment.edited,
                    userAvatar: comment.user_avatar
                }
            )))
        }, 150)
    });
}
