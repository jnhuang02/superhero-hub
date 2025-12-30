// // FRONT-END ONLY: load data from /data/gifts.js (no backend fetch)
// const loadGifts = async () => {
//     try {
//         // use BASE_URL so this works on GitHub Pages (/superhero-hub/) and in dev (/)
//         const url = `${import.meta.env.BASE_URL}data/gifts.js`
//         const mod = await import(url)
//         return mod.default || mod.gifts || mod.data || []
//     } catch (err) {
//         console.error('Error loading gifts module:', err)
//         return []
//     }
// }

// // ...existing code...