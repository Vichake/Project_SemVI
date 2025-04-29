import { Scheme } from "../../models/scheme";

export const updateSchemes = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedSchemes = await Scheme.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedSchemes) {
      return res.status(404).json({ error: "Instrument not found" });
    }

    res.status(200).json(updatedSchemes);
  } catch (error) {
    console.error("Error updating instrument:", error.message);
    res.status(500).json({ error: "Server error while updating instrument" });
  }
};
