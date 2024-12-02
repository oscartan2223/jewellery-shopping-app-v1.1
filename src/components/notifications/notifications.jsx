import React, { useState, useEffect } from "react";
import './notifications.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Notifications = ({ onClose }) => {
    const [noticationData, setNotificationData] = useState();

    useEffect(() => {
        setNotificationData(
            `
            <strong>(((SILA AMBIL PERHATIAN))) </strong> <br><br>
            <strong class="text-danger">**(29/11/2024) Jumaat cuti, parcel jumaat, sabtu dan ahad akan dipos out isnin **</strong> <br> <br>
            Bayar SEBELUM PUKUL 4:00PM,PARCEL akan dipost out hari keesok, Bayar selepas pukul 4.00pm parcel akan dipos out dua hari kemudian.
            (kecuali sabtu dan bila hari keesok adalah cuti am).
            `
        );
    }, []);

    return (
        <div className="notification-overlay-container" onClick={onClose}>
            <div className="notification-container" onClick={(e) => { e.stopPropagation(); }}>
                <div className="notification-heading-container">
                    <h3 className="select-none mb-0 notification-heading font-custom-2">Note:</h3>
                    <FontAwesomeIcon className="notification-close" onClick={onClose} icon={faTimes} />
                </div>

                <div className="notification-content-container">
                    <label className="notification-content hide-scroll-container font-custom-2" dangerouslySetInnerHTML={{ __html: noticationData }} />
                </div>
            </div>
        </div>
    );
};

export default Notifications