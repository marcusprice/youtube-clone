/* @refresh reload */
import {  createSignal, createMemo, JSX, Show, createEffect } from "solid-js";
import { Router, Route, RouteSectionProps, useLocation } from "@solidjs/router"
import { render } from 'solid-js/web';
import Header from './components/Header/Header.tsx';
import Home from "./pages/Home/Home.tsx"
import Watch from './pages/Watch/Watch.tsx';
import NavPanel from "./components/NavPanel/NavPanel.tsx";
import History from "./pages/History/History.tsx";
import './index.css';

export const [navExpanded, setNavExpanded] = createSignal(true);
createEffect(() => console.log(navExpanded()))

function Layout(props: RouteSectionProps): JSX.Element {
    const location = useLocation();
    const path = createMemo(() => location.pathname);
    const atWatchPage = createMemo(() => path().includes("/watch"));

    return(
        <>
            <Header />
            <div class="main">
                <Show 
                    when={atWatchPage()}
                    fallback={(
                        <>
                            <NavPanel
                                embedded={true}
                                expanded={navExpanded()}
                            />
                            {props.children}
                        </>
                    )}
                >
                    {props.children}
                </Show>
            </div>
        </>
    );
}

render(() => 
        <div class="App">
            <Router root={Layout}>
                <Route
                    path="/"
                    component={Home}
                    load={() => {document.title = "YouTube"}}
                />
                <Route path="/watch" component={Watch} />
                <Route path="/history" component={History} />
            </Router>
        </div>,
    document.getElementById("root")!
);
