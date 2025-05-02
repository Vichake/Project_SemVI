import { Scheme } from "../../models/scheme.js";

export const getSchemes = async (req,res)=>{
    try {
        const scheme = await Scheme.find().sort({createdAt: -1});

        if(!scheme.length){
            return res.status(404).json({message: "No Schemes found"});
        }
        return res.status(200).json(scheme)
    } catch (err) {
        console.error("Error fetching Scheme",err);
        res.status(500).json({message: "Server error"});
    }
}