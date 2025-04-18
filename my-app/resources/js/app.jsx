import "../css/app.css";
import "./bootstrap";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ChakraProvider value={defaultSystem}>
                <App {...props} />
            </ChakraProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
