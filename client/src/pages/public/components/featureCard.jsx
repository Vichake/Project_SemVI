import React from 'react';
import Market from '../../../assets/images/market.jpg';
import Techniques from '../../../assets/images/Technqui.jpg';
import Sell from '../../../assets/images/sell.jpg';
import Scheme from '../../../assets/images/scheme.jpg';
import Instrument from '../../../assets/images/Instrument.jpg';

const featureData = [
  {
    id: "feature1",
    img: Market,
    alt: "Market",
    href: "productF.html",
    en: "Find Nearby Market",
    mr: "जवळील बाजार शोधा",
    desc: "Locate markets nearby and plan your selling efficiently.",
    descMr: "जवळचे बाजार शोधा आणि विक्रीची योजना प्रभावीपणे आखा."
  },
  {
    id: "feature2",
    img: Techniques,
    alt: "Techniques",
    href: "tj6ap.html",
    en: "Learn New Techniques",
    mr: "नवीन तंत्रे शिका",
    desc: "Stay ahead with innovative farming methods and resources.",
    descMr: "नवीन शेती पद्धती व संसाधनांद्वारे पुढे रहा."
  },
  {
    id: "feature3",
    img: Sell,
    alt: "Sell Product",
    href: "selltest2.html",
    en: "Sell Product",
    mr: "उत्पादन विक्री",
    desc: "List your produce online and connect directly with buyers.",
    descMr: "तुमचे उत्पादन ऑनलाइन सूचीबद्ध करा आणि थेट खरेदीदारांशी जोडा."
  },
  {
    id: "feature4",
    img: Scheme,
    alt: "Government Schemes",
    href: "schemes.html",
    en: "Know New Government Schemes",
    mr: "नवीन सरकारी योजना जाणून घ्या",
    desc: "Stay informed about the latest government initiatives for farmers.",
    descMr: "शेतकऱ्यांसाठी नवीन सरकारी योजनांची माहिती मिळवा."
  },
  {
    id: "feature5",
    img: Instrument,
    alt: "Rent Instrument",
    href: "./images/rent-instrument.html",
    en: "Rent An Instrument",
    mr: "शेतीची अवजारे भाड्याने घ्या",
    desc: "Stay informed about new and easy-to-use tools in agriculture.",
    descMr: "शेतीतील नवीन व वापरण्यास सुलभ साधनांबद्दल माहिती मिळवा."
  }
];

function FeatureCards({ language }) {
  return (
    <section className="features" id='features'>
      <h2 className="section-title">
        {language === 'mr' ? 'आमच्या सुविधा' : 'Our Features'}
      </h2>
      <div className="feature-grid">
        {featureData.map(({ id, img, alt, href, en, mr, desc, descMr }) => (
          <div className="feature-card" key={id}>
            <a href="#" className="feature-card-link">
              <img src={img} alt={alt} className="feature-image" />
              <h3 id={id}>{language === 'mr' ? mr : en}</h3>
              <p>{language === 'mr' ? descMr : desc}</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureCards;
