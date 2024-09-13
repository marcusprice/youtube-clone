import { User, Sub } from "../types"

function getUserFromLS(): User {
    const user = window.localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    } else {
        return {
            uid: "1cd55c37-9768-4613-96ac-d664c835ec87",
            avatar: "/src/assets/avatars/me.png",
            first_name: "Marcus",
            last_name: "Price",
            username: "endlesshappiness",
            settings: {
                displayMode: "dark",
                history: true
            },
        };
    }
}

export function fetchUser(): Promise<User> {
    return new Promise((res) => {
        res(getUserFromLS());
    })
}

export function fetchSubs(): Promise<Sub[]> {
    return new Promise((res, _) => {
        setTimeout(() => {
            res([
                {name: "Pod Save America", avatar: "/src/assets/avatars/1.jpg"},
                {name:"Need to Know", avatar: "/src/assets/avatars/2.jpg"},
                {name:"Conner O'Malley", avatar: "/src/assets/avatars/3.jpg"},
                {name:"Robert Reich", avatar: "/src/assets/avatars/4.jpg"},
                {name:"The Ben and Emil Show", avatar: "/src/assets/avatars/5.jpg"},
                {name:"Top Billin'", avatar: "/src/assets/avatars/6.jpg"},
                {name:"The Richard Sherman Podcast", avatar: "/src/assets/avatars/7.jpg"},
            ])
        }, 1)
    })
}

