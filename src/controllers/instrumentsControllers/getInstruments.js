import {Instrument} from "../../models/instruments.js";

export const getInstruments = async (req, res) => {
  try {
    const instruments = await Instrument.find(); // No userId filter
    res.status(200).json(instruments);
  } catch (error) {
    console.error("Error fetching instruments:", error.message);
    res.status(500).json({ error: "Server error while fetching instruments" });
  }
};
