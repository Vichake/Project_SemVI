import {Instrument} from "../../models/instruments.js";

export const updateInstruments = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedInstrument = await Instrument.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedInstrument) {
      return res.status(404).json({ error: "Instrument not found" });
    }

    res.status(200).json(updatedInstrument);
  } catch (error) {
    console.error("Error updating instrument:", error.message);
    res.status(500).json({ error: "Server error while updating instrument" });
  }
};
