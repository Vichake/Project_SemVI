import { Content } from "../models/Content.js";
export const addContent = async (req, res) => {
        try {
            const {title, type, description, thumbnail, url, duration} = req.body;
            console.log("Request body:", req.body);
            if (!title || !type || !description || !thumbnail || !url) {
                return res.status(400).json({ message: "All fields are required" });
            }
            if (type !== 'article' && type !== 'video') {
                return res.status(400).json({ message: "Type must be either 'article' or 'video'" });
            }
            const content = new Content({
                title: title,
                type: type,
                description: description,
                thumbnail: thumbnail,
                url: url,
                duration: duration
            });
            const savedContent = await content.save();
            return res.status(201).json({ 
                message: "Content added successfully",
                content: savedContent });
            
        } catch (error) {
            console.error("Error in adding content:", error);
            return res.status(500).json({ message: "MongoDB Error: " + error.message });
        }
}