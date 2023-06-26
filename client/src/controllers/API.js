import axios from "axios";

const BASE_API = import.meta.env.VITE_API_URL;

export const getUserTweet = async (tweet_id, token) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_API}/user/tweet/${tweet_id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.request(config)
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export const getUserInfo = async (user_id, token) => {
    try {
        if (!user_id) return null;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_API}/user/get_user/${user_id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.request(config)
        return response.data

    } catch (error) {
        console.error(error);
    }
}

export const likeTweetAPI = async (tweet_id, token) => {
    try {
        let data = JSON.stringify({
            "tweet_id": tweet_id
        });
    
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_API}/user/like`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };
    
        const response = await axios.request(config)
        return response.data;
        
    } catch (error) {
        console.error(error);
    }
}

export const dislikeTweetAPI = async (tweet_id, token) => {
    try {
        let data = JSON.stringify({
            "tweet_id": tweet_id
        });
    
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_API}/user/dislike`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };
    
        const response = await axios.request(config)
        return response.data;
        
    } catch (error) {
        console.error(error);
    }
}