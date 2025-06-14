import axios from "axios";

export const shortenUrl = async (longUrl) => {
    try {
        const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        return response.data;
    } catch (error) {
        console.error("Error shortening URL:", error);
        return longUrl;
    }
};