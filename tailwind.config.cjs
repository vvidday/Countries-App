/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: "480px",
            bp1: "694px",
            md: "768px",
            lg: "976px",
            bp2: "1121px",
            xl: "1440px",

            bp3: "1468px",
        },
        fontFamily: {
            sans: ["Nunito Sans", "sans-serif"],
        },
        extend: {
            colors: {
                dmelements: "hsl(209, 23%, 22%)",
                dmtext: "hsl(0, 0%, 100%)",
                dmbg: "hsl(207, 26%, 17%)",
                lmelements: "hsl(0, 0%, 100%)",
                lmtext: "hsl(200, 15%, 8%)",
                lmbg: "hsl(0, 0%, 98%)",
                lminput: "hsl(0, 0%, 52%)",
            },
        },
    },
    plugins: [],
};
