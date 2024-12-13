import React, { useEffect, useState } from 'react';
import '../assets/css/InstallmentPage.css';
import { FaTimes } from 'react-icons/fa';

const InstallmentPage = ({ onClose }) => {
    const [searchInput, setSearchInput] = useState('');
    const [installmentData, setInstallmentData] = useState([
        {
            invoiceImage: "https://gss.kedaiemasion.my/assets/public/img/product/KHBK000KFP001%2000427/info/item_photo.jpg?1733967126",
            invoiceName: "tests1",
            invoiceDate: "20/07/2021",
            deposit: 50,
            itemName: "KERABU FESYEN PAKU (KHB000KFP001 00427)",
            weight: 1.25,
            price: 336
        },
        {
            invoiceImage: "https://gss.kedaiemasion.my/assets/public/img/product/KHBK000KFP001%2000427/info/item_photo.jpg?1733967126",
            invoiceName: "tests2",
            invoiceDate: "21/08/2022",
            deposit: 60,
            itemName: "KERABU FESYEN PAKU (KHB000KFP001 00427)",
            weight: 1.25,
            price: 337
        },
    ]);
    const [selectedInvoice, setSelectedInvoice] = useState('');
    const [openView, setOpenView] = useState(false);

    return (
        <div className="installment-dialog-overlay">

            <div className="installment-dialog-container">
                <div className="installment-dialog-header">
                    <h4 className="installment-dialog-heading font-custom">Installment</h4>
                    <FaTimes className="installment-dialog-close-btn" onClick={() => { onClose(); }} />
                </div>

                <div className="installment-dialog-content-container hide-scroll-container">
                    <span className="font-custom">Search with IC or Document:</span>
                    <div className="d-flex align-items-center">
                        <input
                            className="feedback_input form-control font-custom mb-3"
                            type="text"
                            placeholder="Search with IC or Document"
                            value={searchInput}
                            onChange={(e) => { setSearchInput(e.target.value); }}
                        />
                        <button className="installment-dialog-search-btn mb-3">
                            Search
                        </button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th className="fs-7">Invoices</th>
                                <th className="fs-7">Deposit</th>
                                <th className="fs-7">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {installmentData.map((item, index) => (
                                <tr key={index}>
                                    <td className="installment-invoice-content fs-8">
                                        <img className="installment-invoice-image" src={item.invoiceImage} alt="image" />
                                        <p className="font-custom-2">{item.invoiceName}</p>
                                        <p className="font-custom-2 fw-bold">{item.invoiceDate}</p>
                                    </td>
                                    <td className="installment-deposit-content">
                                        <p className="font-custom-2">RM{item.deposit.toFixed(2)}</p>
                                    </td>
                                    <td className="installment-action-content">
                                        <button className="installment-view-btn" onClick={() => { setSelectedInvoice(item); setOpenView(!openView); }}>View</button>
                                        <button className="installment-payment-btn">Payment</button>
                                        <button className="installment-paymentlog-btn">Payment log</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {openView && openView !== '' &&
                <div className="installment-dialog-view-overlay">
                    <div className="installment-dialog-view-container">
                        <div className="installment-dialog-header">
                            <h4 className="installment-dialog-heading font-custom">{selectedInvoice.invoiceName}</h4>
                            <FaTimes className="installment-dialog-close-btn" onClick={() => { setOpenView(!openView); }} />
                        </div>

                        <div className="installment-dialog-view-content-container">
                            <div className="installment-dialog-view-content hide-scroll-container">
                                <div className="installment-dialog-view-box">
                                <img className="installment-view-dialog-image" src={selectedInvoice.invoiceImage} alt="image" />
                                <div className="installment-dialog-view-details">
                                    <label className="fw-bold mb-3 font-custom-2">{selectedInvoice.itemName}</label>
                                    <em className=" font-custom-2 fs-7">Weight: {selectedInvoice.weight}g</em>
                                    <em className=" font-custom-2 fs-7">Quantity: 1</em>
                                    <em className="text-danger fs-5 font-custom-2">RM{selectedInvoice.price.toFixed(2)}</em>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default InstallmentPage;
