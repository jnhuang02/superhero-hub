const loadGifts = async () => {
    try {
        const url = `${import.meta.env.BASE_URL}data/gifts.js`
        const mod = await import(url)
        return mod.default || mod.gifts || mod.data || []
    } catch (err) {
        console.error('Error loading gifts module:', err)
        return []
    }
}

// ...existing renderGifts and other code...
