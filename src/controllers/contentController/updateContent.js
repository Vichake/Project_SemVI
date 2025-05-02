import { Content } from "../../models/Content.js";
export const updateContent = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
    
        const updatedContent = await Content.findByIdAndUpdate(id, updates, { new: true });
        
        if (!updatedContent) {
            return res.status(404).json({ error: "Content not found" });
        }
    
        res.status(200).json(updatedContent);
    } catch (error) {
        console.error("Error updating content:", error.message);
        return res.status(500).json({ error: "Server error while updating content" });
    }    
}