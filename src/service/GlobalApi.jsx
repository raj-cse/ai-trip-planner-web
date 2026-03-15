import axios from "axios";

const PEXELS_API_KEY = import.meta.env.VITE_PEXEL_API_KEY;
const PEXELS_URL = 'https://api.pexels.com/v1/search';

/**
 * Kisi bhi place ya hotel ka naam bhej kar real image fetch karne ke liye
 */
export const GetPlaceDetails = async (query) => {
    try {
        const res = await axios.get(PEXELS_URL, {
            params: {
                query: query,
                per_page: 1
            },
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });

        // Agar image milti hai toh URL return karein, nahi toh fallback
        if (res.data.photos.length > 0) {
            return res.data.photos[0].src.large2x;
        }
        return 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop';
        
    } catch (error) {
        console.error("Pexels API Error:", error);
        return 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop';
    }
};