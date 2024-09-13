import { createResource } from "solid-js"
import { fetchUser } from "../dao/userDao";
import { User } from "../types/index.ts";

export const [user, { mutate: mutateUser }] = createResource<User>(fetchUser);

export function setUser(user: User) {
    window.localStorage.setItem("user", JSON.stringify(user));
    mutateUser(user);
}


