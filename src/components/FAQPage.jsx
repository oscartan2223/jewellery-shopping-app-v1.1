import React, { useEffect, useState } from 'react';
import '../assets/css/FAQPage.css';

const FAQPage = () => {
    const [faqData, setFaqData] = useState([]);
    const [faqGuide, setFaqGuide] = useState(false);
    const [faqLink, setFaqLink] = useState("");

    useEffect(() => {
        const fetchedData = [
            { heading: "How can I purchase a product?", content: "By preparing your wallet. <a href='https://admin.kedaiemasion.my/assets/public/img/faq/Measurement.pdf'>Click here</a> to learn more." },
            { heading: "How many days does delivery take?", content: "The delivery time might be differ, in the worst case delivery time might take up to infinity days." },
            { heading: "How to request a refund?", content: "The refund policy allows users to request a refund start from next century." },
        ];
        setFaqData(fetchedData);
        setFaqLink("https://admin.kedaiemasion.my/assets/public/img/faq/Measurement.pdf");
        setFaqGuide(true);
    }, []);

    return (
        <div>
            <div className="faq-content-site">
                <div className="faq-container">
                <div className="container-marketing">
                    <h1 className="faq-heading">FAQ - Frequently Asked Questions</h1>
                    <div className="accordion w-100" id="basicAccordion">
                        {faqData.map((faq, index) => (
                            <div className="accordion-item" key={index}>
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${index}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse${index}`}
                                    >
                                        {faq.heading}
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${index}`}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={`heading${index}`}
                                    data-bs-parent="#basicAccordion"
                                >
                                    <div className="accordion-body">
                                    <p dangerouslySetInnerHTML={{ __html: faq.content }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {faqData.length > 0 && <hr className="featurette-divider" />}

                </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
