import React from 'react';
import { useNavigate } from 'react-router-dom';


const join = ({language='en'})=>{
    const navigate = useNavigate();
    const handleJoinClick = () => {
        navigate('/register');
    };
    const text = {
        en: {
          heading: "New Here?",
          description: "Join our platform and explore a world of opportunities for farmers.",
          button: "Join Now"
        },
        mr: {
          heading: "नवीन सदस्य?",
          description: "आमच्या प्लॅटफॉर्मवर सामील व्हा आणि शेतकऱ्यांसाठीच्या संधींचा शोध घ्या.",
          button: "आता सामील व्हा"
        }
      };

    return (
        <div className="join-section" id="join">
            <h2>{text[language].heading}</h2>
            <p>{text[language].description}</p>
            <button onClick={handleJoinClick} className="join-button">{text[language].button}</button>
        </div>
    );
}

export default join;