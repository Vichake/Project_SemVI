import { Content } from "../../models/Content.js";

export const getContent = async (req, res) => {
    try {
        const data = await Content.find({}); // Await is needed to fetch data

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No content found" });
        }
        
        return res.status(200).json({ 
            message: "Content fetched successfully",
            content: data 
        });

    } catch (error) {
        console.error("Error in fetching content:", error);
        return res.status(500).json({ message: "MongoDB Error: " + error.message });
    }
};
