import {
    useEffect,
    useLayoutEffect,
} from 'react'

import {
    useLocation,
} from 'react-router-dom'


function ScrollToHash() {

    const location = useLocation()


    /*
     * =========================================
     * Disable browser automatic scroll restore
     * =========================================
     *
     * React Router controls our page navigation,
     * so we handle scroll position ourselves.
     */

    useEffect(() => {

        const previousScrollRestoration =
            window.history.scrollRestoration

        window.history.scrollRestoration =
            'manual'


        return () => {

            window.history.scrollRestoration =
                previousScrollRestoration

        }

    }, [])


    /*
     * =========================================
     * Handle page scroll
     * =========================================
     */

    useLayoutEffect(() => {

        let animationFrameId = 0

        let resizeAnimationFrameId = 0

        let resizeObserver:
            ResizeObserver | null = null

        let observerTimeout:
            number | undefined


        const prefersReducedMotion =
            window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches


        /*
         * =========================================
         * Normal page navigation
         * =========================================
         *
         * Example:
         *
         * /#contact
         *      ↓
         * /products
         *
         * The new page must always start
         * from the top.
         */

        if (!location.hash) {

            document.documentElement.scrollTop = 0

            document.body.scrollTop = 0

            return

        }


        /*
         * =========================================
         * Hash navigation
         * =========================================
         *
         * Example:
         *
         * /products
         *      ↓
         * /#contact
         */

        const targetId =
            decodeURIComponent(
                location.hash.slice(1)
            )


        /*
         * Scroll accurately to the section.
         *
         * We calculate the real navbar height
         * instead of using a hard-coded offset.
         */

        function scrollToTarget(
            behavior: ScrollBehavior
        ) {

            const target =
                document.getElementById(
                    targetId
                )


            if (!target) {
                return false
            }


            const navbar =
                document.querySelector<HTMLElement>(
                    '.site-navbar'
                )


            const navbarHeight =
                navbar
                    ?.getBoundingClientRect()
                    .height ?? 0


            const targetTop =
                target
                    .getBoundingClientRect()
                    .top +
                window.scrollY -
                navbarHeight


            window.scrollTo({
                top: Math.max(
                    0,
                    targetTop
                ),

                left: 0,

                behavior:
                    prefersReducedMotion
                        ? 'auto'
                        : behavior,
            })


            return true

        }


        /*
         * Wait until React renders
         * the new route.
         */

        animationFrameId =
            window.requestAnimationFrame(
                () => {

                    const targetFound =
                        scrollToTarget(
                            'smooth'
                        )


                    if (!targetFound) {
                        return
                    }


                    /*
                     * =========================================
                     * Fix async content layout changes
                     * =========================================
                     *
                     * Categories and FeaturedProducts
                     * load from the API.
                     *
                     * Their height can change AFTER
                     * Contact was initially positioned.
                     *
                     * ResizeObserver watches the main content
                     * for a short period and corrects Contact
                     * if the page layout changes.
                     */

                    const mainContent =
                        document.querySelector<HTMLElement>(
                            '.site-layout-content'
                        )


                    if (
                        !mainContent ||
                        typeof ResizeObserver ===
                        'undefined'
                    ) {
                        return
                    }


                    let firstResizeNotification =
                        true


                    resizeObserver =
                        new ResizeObserver(() => {

                            /*
                             * ResizeObserver immediately fires
                             * once after it starts.
                             *
                             * We already scrolled above,
                             * so ignore that first notification.
                             */

                            if (
                                firstResizeNotification
                            ) {

                                firstResizeNotification =
                                    false

                                return
                            }


                            window.cancelAnimationFrame(
                                resizeAnimationFrameId
                            )


                            resizeAnimationFrameId =
                                window.requestAnimationFrame(
                                    () => {

                                        scrollToTarget(
                                            'smooth'
                                        )

                                    }
                                )

                        })


                    resizeObserver.observe(
                        mainContent
                    )


                    /*
                     * We only need to protect the initial
                     * loading period.
                     *
                     * We don't want to force the user
                     * back to Contact forever.
                     */

                    observerTimeout =
                        window.setTimeout(
                            () => {

                                resizeObserver
                                    ?.disconnect()

                                resizeObserver = null

                            },
                            5000
                        )

                }
            )


        /*
         * =========================================
         * Cleanup
         * =========================================
         */

        return () => {

            window.cancelAnimationFrame(
                animationFrameId
            )


            window.cancelAnimationFrame(
                resizeAnimationFrameId
            )


            if (
                observerTimeout !==
                undefined
            ) {

                window.clearTimeout(
                    observerTimeout
                )

            }


            resizeObserver
                ?.disconnect()

        }

    }, [
        location.pathname,
        location.search,
        location.hash,
        location.key,
    ])


    return null
}


export default ScrollToHash