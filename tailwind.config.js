import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Prompt", ...defaultTheme.fontFamily.sans],
            },
            screens: {
                // กำหนด Breakpoint ของคุณเอง
                "c-1500": "1500px",
                "c-1344": "1344px",
                "c-1100": "1100px",
                "c-914": "914px",
            },
        },
    },

    plugins: [forms],
};
