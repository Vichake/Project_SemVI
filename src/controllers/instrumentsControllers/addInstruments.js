import Instrument from "../../models/instrumentModel.js";

export const addInstruments = async (req, res) => {
  try {
    const { instrumentName, instrumentCategory, instrumentStatus, lastServiceDate } = req.body;

    const newInstrument = new Instrument({
      instrumentName,
      instrumentCategory,
      instrumentStatus,
      lastServiceDate,
    });

    const savedInstrument = await newInstrument.save();
    res.status(201).json(savedInstrument);
  } catch (error) {
    console.error("Error adding instrument:", error.message);
    res.status(500).json({ error: "Server error while adding instrument" });
  }
};
