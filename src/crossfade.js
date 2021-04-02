import { crossfade } from 'svelte/transition'

const [send, receive] = crossfade({
  duration: 800,

  fallback(node) {
    const style = getComputedStyle(node)
    const transform = style.transform === 'none' ? '' : style.transform

    return {
      duration: 600,
      css: (t) => `
        transform: ${transform} scale(${t});
        opacity: ${t}
      `,
    }
  },
})
const imageKey = 'IMAGE_TRANSITION'
export { send, receive, imageKey }
