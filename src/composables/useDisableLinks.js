// src/composables/useDisableLinks.js
import { onMounted, watch, nextTick } from 'vue';

export function useDisableLinks(contentRef, domain) {
    const disableLinks = () => {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            if (link.href.includes(domain)) {
                link.style.pointerEvents = 'none';
                link.style.color = 'black'; // Optional: Change the color to indicate it's disabled
                link.title = 'This link is disabled';
            }
        });
    };

    // Watch for changes in the contentRef
    watch(contentRef, async () => {
        await nextTick(); // Wait for DOM updates
        disableLinks();
    });

    // Run initially on mount if content is already there
    onMounted(async () => {
        await nextTick(); // Wait for DOM updates
        disableLinks();
    });
}
