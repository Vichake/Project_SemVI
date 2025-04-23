import { Market } from '../models/market.model.js'

export const getMarketData =  async(req, res)=> {
    try {
        let marketData = await Market.find({}) //.sort({ createdAt: -1 }).limit(10).exec();
        // console.log("Market data fetched successfully", marketData);
        if(!marketData || marketData.length === 0) {
            return res.status(404).json({ message: "No market data found" });
        }
        
        return res.status(200).json(marketData);
    } catch (err) {
        console.error("Error in getting market data", err);
        return res.status(500).json({ message: "Error fetching market data" });
    }
}