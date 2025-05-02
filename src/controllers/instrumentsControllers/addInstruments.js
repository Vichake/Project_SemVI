import { Instrument } from "../../models/instruments.js";

export const addInstruments = async (req, res) => {
  try {
    const {
      instrumentName,
      instrumentCategory,
      instrumentStatus,
      rentPerHour,
      location,
      farmer,
      contactNumber,
      lastServiceDate,
      quantity
    } = req.body;
    console.log("Request body:", req.body); // Log the request body to see what is being sent
    const newInstrument = new Instrument({
      instrumentName: instrumentName,
      instrumentCategory: instrumentCategory,
      instrumentStatus: instrumentStatus,
      rentPerHour: rentPerHour,
      location: location,
      farmer: farmer,
      contactNumber: contactNumber,
      lastServiceDate: lastServiceDate,
      quantity: quantity,
    });

    const savedInstrument = await newInstrument.save();
    res.status(201).json(savedInstrument);
  } catch (error) {
    console.error("Error adding instrument:", error.message);
    res.status(500).json({ error: "Server error while adding instrument" });
  }
};
