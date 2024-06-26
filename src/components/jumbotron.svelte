<script lang="ts">
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";

    export let frontmatter: {
        title?: string;
        subtitle?: string;
        showButtons?: boolean;
    };
    export let links: {
        getStarted: string;
        learnMore: string;
    };

    let TwitterImagePositionClass = "";
    let EthereumImagePositionClass = "";

    $: {
        if (frontmatter.showButtons) {
            TwitterImagePositionClass = "bottom-auto sm:bottom-10 lg:bottom-20 top-28 sm:top-auto left-8 sm:left-14 lg:left-24";
            EthereumImagePositionClass = "top-4 sm:top-10 lg:top-14 right-10 sm:right-24 lg:right-40";
        } else {
            TwitterImagePositionClass = "bottom-auto sm:bottom-8 lg:bottom-12 top-36 sm:top-auto left-4 sm:left-14 lg:left-24";
            EthereumImagePositionClass = "top-4 sm:top-6 lg:top-14 right-2 sm:right-24 lg:right-40";
        }
    }

    const imageScales = [1, 1.4];
    const twitterImageScale = tweened(imageScales[0], {
        duration: 300,
        easing: cubicOut,
    });
    const ethereumImageScale = tweened(imageScales[0], {
        duration: 300,
        easing: cubicOut,
    });
</script>

<!-- Jumbotron -->
<section class="relative">
    <div class="jbt-bg" />
    <div class="jbt-bg jbt-bg2" />
    <div class="jbt-bg jbt-bg3" />

    <img
        src="/images/twitter.png"
        alt="Ethereum logo"
        class="absolute w-12 -skew-y-3 {TwitterImagePositionClass}"
        style="transform: rotate(350deg) scale({$twitterImageScale})"
        on:focus={() => {
            twitterImageScale.set(imageScales[1]);
        }}
        on:mouseover={() => {
            twitterImageScale.set(imageScales[1]);
        }}
        on:mouseleave={() => {
            twitterImageScale.set(imageScales[0]);
        }}
    />
    <img
        src="/images/ethereum.png"
        alt="Ethereum logo"
        class="absolute w-10 skew-y-6 {EthereumImagePositionClass}"
        style="transform: rotate(5deg) scale({$ethereumImageScale})"
        on:focus={() => {
            ethereumImageScale.set(imageScales[1]);
        }}
        on:mouseover={() => {
            ethereumImageScale.set(imageScales[1]);
        }}
        on:mouseleave={() => {
            ethereumImageScale.set(imageScales[0]);
        }}
    />

    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1
            class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
        >
            {frontmatter?.title || "EX-Graph"}
        </h1>
        <p
            class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400"
        >
            {frontmatter?.subtitle || "Ethereum and Twitter data combined"}
        </p>
        {#if frontmatter?.showButtons}
            <div
                class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
            >
                <a
                    href={links.getStarted}
                    target="_blank"
                    class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                    Get started
                    <svg
                        class="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </a>
                <a
                    href={links.learnMore}
                    target="_blank"
                    class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                    Learn more
                </a>
            </div>
        {/if}
    </div>
</section>

<style>
    .jbt-bg {
        animation: slide 3s ease-in-out infinite alternate;
        background-image: linear-gradient(-60deg, #d4a46f 50%, #937472 50%);
        bottom: 0;
        left: -50%;
        opacity: 0.5;
        position: fixed;
        right: -50%;
        top: 0;
        z-index: -1;
    }
    .jbt-bg2 {
        animation-direction: alternate-reverse;
        animation-duration: 4s;
    }

    .jbt-bg3 {
        animation-duration: 5s;
    }

    @keyframes slide {
        0% {
            transform: translateX(-25%);
        }
        100% {
            transform: translateX(25%);
        }
    }
</style>
