import {Instrument} from "../../models/instruments.js";

export const deleteInstruments = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedInstrument = await Instrument.findByIdAndDelete(id);

    if (!deletedInstrument) {
      return res.status(404).json({ error: "Instrument not found" });
    }

    res.status(200).json({ message: "Instrument deleted successfully" });
  } catch (error) {
    console.error("Error deleting instrument:", error.message);
    res.status(500).json({ error: "Server error while deleting instrument" });
  }
};
