import React, { useEffect, useState } from 'react';
import '../assets/css/InstallmentPage.css';
import { FaTimes } from 'react-icons/fa';
import { useAuth } from '../authContext';

const InstallmentPage = ({ onClose }) => {
    const { isLoggedIn } = useAuth();
    const [searchInput, setSearchInput] = useState('');
    const [installmentData, setInstallmentData] = useState([
        {
            installmentNo: "INST-0000024",
            invoiceImage: "https://gss.kedaiemasion.my/assets/public/img/product/KHBK000KFP001%2000427/info/item_photo.jpg?1733967126",
            invoiceName: "tests1",
            invoiceDate: "20/07/2021",
            deposit: 50,
            itemName: "KERABU FESYEN PAKU (KHB000KFP001 00427)",
            weight: 1.25,
            price: 336,
            installmentPrice: 370
        },
        {
            installmentNo: "INST-0000025",
            invoiceImage: "https://gss.kedaiemasion.my/assets/public/img/product/KHBK000KFP001%2000427/info/item_photo.jpg?1733967126",
            invoiceName: "tests2",
            invoiceDate: "21/08/2022",
            deposit: 60,
            itemName: "KERABU FESYEN PAKU (KHB000KFP001 00427)",
            weight: 1.25,
            price: 337,
            installmentPrice: 370
        },
    ]);
    const [selectedInvoice, setSelectedInvoice] = useState('');
    const [openView, setOpenView] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [openPaymentLog, setOpenPaymentLog] = useState(false);

    useEffect(() => {
        if (isLoggedIn === false) {
            const timer = setTimeout(() => {
                onClose();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn]);

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
                                        <button className="installment-payment-btn" onClick={() => { setSelectedInvoice(item); setOpenPayment(!openPayment); }}>Payment</button>
                                        <button className="installment-paymentlog-btn" onClick={() => { setSelectedInvoice(item); setOpenPaymentLog(!openPaymentLog); }}>Payment log</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {openView &&
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

            {openPayment &&
                <div className="installment-dialog-payment-overlay">
                    <div className="installment-dialog-payment-container">
                        <div className="installment-dialog-header">
                            <h4 className="installment-dialog-heading font-custom-2 fw-bold">Installment: {selectedInvoice.installmentNo}</h4>
                            <FaTimes className="installment-dialog-close-btn" onClick={() => { setOpenPayment(!openPayment); }} />
                        </div>

                        <div className="installment-dialog-payment-content-container">
                            <div>
                                <span>Deposit:</span>
                                <span>RM 50.00</span>
                            </div>

                            <div>
                                <span>Installment Period:</span>
                                <span>6 Months</span>
                            </div>

                            <div>
                                <span>Monthly Payment:</span>
                                <span>RM 53.00</span>
                            </div>

                            <div>
                                <span>Last Month Payment:</span>
                                <span>RM 55.00</span>
                            </div>

                            <div>
                                <span>First Installment Date:</span>
                                <span>20/07/2021</span>
                            </div>

                            <div>
                                <span>Last Installment Date:</span>
                                <span>20/02/2022</span>
                            </div>

                            <div>
                                <span>Total:</span>
                                <span>RM 336.00</span>
                            </div>

                            <div>
                                <span>Installment Price:</span>
                                <span>RM 370.00</span>
                            </div>

                            <div>
                                <span>Paid Amount:</span>
                                <span>RM 50.00</span>
                            </div>

                            <div>
                                <span>Balance:</span>
                                <span>RM 320</span>
                            </div>

                            <div>
                                <span>Extra Services (Monthly):</span>
                                <span>RM 5.72</span>
                            </div>

                            <div>
                                <span>Payment Type:<strong className="text-danger">*</strong></span>
                                <span>Installment (**Dropdown**)</span>
                            </div>

                            <div>
                                <span>Payment Amount:<strong className="text-danger">*</strong></span>
                                <input type="number" value="53.00" />
                            </div>

                            <div>
                                <span>Pay With<strong className="text-danger">*</strong></span>
                                <label className="sidebar-cart-remark-radio-container">
                                    <input type="radio" />
                                    iPay88
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {openPaymentLog &&
                <div className="installment-dialog-paymentlog-overlay">
                    <div className="installment-dialog-paymentlog-container">
                        <div className="installment-dialog-header">
                            <h4 className="installment-dialog-heading">{selectedInvoice.invoiceName}</h4>
                            <FaTimes className="installment-dialog-close-btn" onClick={() => { setOpenPaymentLog(!openPaymentLog); }} />
                        </div>

                        <div className="installment-dialog-paymentlog-content-container ">
                            <div className='hide-scroll-container'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="fs-7 w-25 border-none border-top border-bottom">Date</th>
                                            <th className="fs-7 w-25 border-none border-top border-bottom">Details</th>
                                            <th className="fs-7 w-25 border-none border-top border-bottom">Amount</th>
                                            <th className="fs-7 w-25 border-none border-top border-bottom">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="paymentlog-balance-row">
                                            <td className="fs-8 border-none border-top border-bottom" />
                                            <td className="fs-8 border-none border-top border-bottom" />
                                            <td className="fs-8 border-none border-top border-bottom" />
                                            <td className="fs-8 border-none border-top border-bottom">{selectedInvoice.installmentPrice.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td className="fs-8 border-none border-top border-bottom">{selectedInvoice.invoiceDate}</td>
                                            <td className="fs-8 border-none border-top border-bottom">Deposit</td>
                                            <td className="fs-8 border-none border-top border-bottom">{selectedInvoice.deposit.toFixed(2)}</td>
                                            <td className="fs-8 border-none border-top border-bottom">{(selectedInvoice.installmentPrice - selectedInvoice.deposit).toFixed(2)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default InstallmentPage;
