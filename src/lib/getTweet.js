import 'axios'
import axios from 'axios';

const URL = "https://k0ebfgxsn1.execute-api.us-east-1.amazonaws.com/prod/api/v1/tweet";

export const getTweet = async() => {
    try {
        const res = await axios({
            method: "GET",
            url: URL
        });

        console.log("Successfully got tweet");
        return {
            "code": 200,
            "body": res.data
        }
    } catch (error) {
        console.log(`Error fetching tweet ${error.code}`);
        return {
            "code": error.code,
            "error": error.data
        }
    }
}