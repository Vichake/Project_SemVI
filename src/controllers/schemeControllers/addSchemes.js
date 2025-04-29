import { Scheme } from "../../models/scheme";

export const addSchemes = async(req,res)=>{
    try {
        const { schemeName, schemeDescription, schemeEligibilty, startDate,endDate,instrumentStatus,currentBeneficiaries } = req.body;
        const scheme = new Scheme({
            schemeName,
            schemeDescription,
            schemeEligibilty,
            startDate,
            endDate,
            instrumentStatus,
            currentBeneficiaries,
        });
        const savedScheme = await scheme.save();
        console.log("Product saved successfully:", savedScheme);

    } catch (err) {
        console.error("Error adding schemes:", err);
        res.status(500).json({ error: "Server error while adding schemes" });
    }
}