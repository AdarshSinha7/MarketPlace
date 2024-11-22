import Navbar from "./Navbar";
import axie from "../tile.jpeg";
import { useLocation, useParams } from 'react-router-dom';
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState, useEffect } from "react";
import { GetIpfsUrlFromPinata } from "../utils";

export default function NFTPage (props) {

    const [data, updateData] = useState({});
    const [message, updateMessage] = useState("");
    const [currAddress, updateCurrAddress] = useState("0x");
    const { tokenId } = useParams();  // Get tokenId from the URL params

    useEffect(() => {
        // Assuming you are fetching the NFT data from an API or similar
        axios.get(`API_ENDPOINT_HERE/${tokenId}`)
            .then((response) => {
                updateData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching NFT data:", error);
            });
    }, [tokenId]);  // Runs when the component mounts or tokenId changes

    const buyNFT = async (tokenId) => {
        // Logic to handle NFT purchase goes here
        console.log(`Buying NFT with token ID: ${tokenId}`);
        
        try {
            // Example purchase logic (modify according to your needs)
            // const result = await someSmartContract.buy(tokenId);
            updateMessage("NFT Purchased Successfully!");
        } catch (error) {
            console.error("Error buying NFT:", error);
            updateMessage("Failed to purchase NFT.");
        }
    };

    return(
        <div style={{"min-height":"100vh"}}>
            <Navbar />
            <div className="flex ml-20 mt-20">
                <img src={data.image} alt="" className="w-2/5" />
                <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
                    <div>
                        Name: {data.name}
                    </div>
                    <div>
                        Description: {data.description}
                    </div>
                    <div>
                        Price: <span className="">{data.price + " ETH"}</span>
                    </div>
                    <div>
                        Owner: <span className="text-sm">{data.owner}</span>
                    </div>
                    <div>
                        Seller: <span className="text-sm">{data.seller}</span>
                    </div>
                    <div>
                        { currAddress !== data.owner && currAddress !== data.seller ?
                            <button 
                                className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" 
                                onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
                            : <div className="text-emerald-700">You are the owner of this NFT</div>
                        }
                    </div>
                    <div className="text-green text-center mt-3">{message}</div>
                </div>
            </div>
        </div>
    );
}
