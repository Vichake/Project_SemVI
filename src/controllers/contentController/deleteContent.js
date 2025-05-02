import { Content } from "../../models/Content.js";
export const deleteContent = async (req, res) => {
    try {
        const { id } = req.params;
    
        const deletedInstrument = await Content.findByIdAndDelete(id);
    
        if (!deletedInstrument) {
          return res.status(404).json({ error: "Content not found" });
        }
    
        res.status(200).json({ message: "Instrument deleted successfully" });
      } catch (error) {
        console.error("Error deleting instrument:", error.message);
        res.status(500).json({ error: "Server error while deleting instrument" });
      }
}