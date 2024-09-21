export type User = {
    uid: string,
    avatar: string,
    first_name: string,
    last_name: string,
    username: string
    settings: Settings
}

type Settings = {
    history: boolean,
    displayMode: "light" | "dark"
}

export type Sub = {
    name: string,
    avatar: string
}


export type Video = {
    uploader: Uploader,

    title: string,
    thumbnail: string,
    uploaded_at: string,
    views: number,
    category: string,
    uuid: string
    likes: number,
    description: string
}

export type Uploader = {
    avatar: string,
    verified: boolean,
    username: string
}

export type Comment = {
    username: string,
    commentText: string,
    likes: number,
    publishedAt: Date,
    edited: boolean,
    userAvatar: string
}

