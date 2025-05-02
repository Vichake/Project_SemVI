import { Scheme } from "../../models/scheme.js";

export const addSchemes = async (req, res) => {
  try {

    const { name,
      description,
      eligibility,
      startDate,
      endDate,
      status,
      officialWebsite,
      guidelinesUrl,
      schemeType,
      stateName
    } = req.body;


    const scheme = new Scheme({
      schemeName: name,
      schemeDescription: description,
      schemeEligibility: eligibility,
      startDate: startDate,
      endDate: endDate || null,
      status: status,
      officialWebsite: officialWebsite,
      guidelinesUrl: guidelinesUrl,
      schemeType: schemeType,
      stateName: stateName || null
    });

    const savedScheme = await scheme.save();
    res.status(201).json(savedScheme);

  } catch (err) {
    console.error("Error adding schemes:", err);
    res.status(500).json({ error: "Server error while adding schemes" });
  }
};
