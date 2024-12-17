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
    const [paymentAmount, setPaymentAmount] = useState(53);
    const [paymentMethod, setPaymentMethod] = useState("ipay88");
    const [selectedPaymentType, setSelectedPaymentType] = useState('');

    useEffect(() => {
        if (isLoggedIn === false) {
            const timer = setTimeout(() => {
                onClose();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn]);

    const handleOpenPayment = (installmentNo) => {
        //get api here using installmentNo (use await prevent run error by empty data)
        const item = {
            deposit: 50,
            installmentPeriod: "6 Months",
            monthlyPayment: 53,
            lastMonthPayment: 55,
            firstInstallmentDate: "20/07/2021",
            lastInstallmentDate: "20/02/2022",
            total: 336,
            installmentPrice: 370,
            paidAmount: 50,
            balance: 320,
            extraServices: 5.72,
            paymentType: "full-payment",
            paymentAmount: 53.00,
            payMethod: "ipay88"
        }
        setSelectedInvoice(item);
        setPaymentAmount(item.paymentAmount || 0);
        setPaymentMethod(item.payMethod || "ipay88");
        setSelectedPaymentType(item.paymentType || '');
        setOpenPayment(!openPayment);
    }

    const handleChange = (e) => {
        setSelectedPaymentType(e.target.value);
        console.log("handle the get api again here");
    };

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
                                        <button className="installment-payment-btn" onClick={() => { handleOpenPayment(item.installmentNo) }}>Payment</button>
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

                        <div className="installment-dialog-payment-content-container hide-scroll-container">
                            <div className="mb-4 w-100 d-flex">
                                <span className="w-25 mr-3 font-custom-2">Deposit:</span>
                                <span className="font-custom-2">RM {selectedInvoice.deposit || ''}</span>
                            </div>

                            <div className="mb-4 w-100 d-flex">
                                <span className="w-25 mr-3 font-custom-2">Installment Period:</span>
                                <span className="font-custom-2">{selectedInvoice.installmentPeriod || ''}</span>
                            </div>

                            <div className="mb-4 w-100 d-flex">
                                <span className="w-25 mr-3 font-custom-2">Monthly Payment:</span>
                                <span className="font-custom-2">RM {selectedInvoice.monthlyPayment || ''}</span>
                            </div>

                            <div className="mb-4 w-100 d-flex">
                                <span className="w-25 mr-3 font-custom-2">Last Month Payment:</span>
                                <span className="font-custom-2">RM {selectedInvoice.lastMonthPayment || ''}</span>
                            </div>

                            <div className="mb-4 w-100 d-flex">
                                <span className="w-25 mr-3 font-custom-2">First Installment Date:</span>
                                <span className="font-custom-2">{selectedInvoice.firstInstallmentDate || ''}</span>
                            </div>

                            <div className="mb-4 w-100 d-flex">
                                <span className="w-25 mr-3 font-custom-2">Last Installment Date:</span>
                                <span className="font-custom-2">{selectedInvoice.lastInstallmentDate || ''}</span>
                            </div>

                            <div className="mb-4 w-100 d-flex">
                                <span className="w-25 mr-3 font-custom-2">Total:</span>
                                <span className="font-custom-2">RM {selectedInvoice.total || ''}</span>
                            </div>

                            <div className="mb-4 w-100 d-flex">
                                <span className="w-25 mr-3 font-custom-2">Installment Price:</span>
                                <span className="font-custom-2">RM {selectedInvoice.installmentPrice || ''}</span>
                            </div>

                            <div className="mb-4 w-100 d-flex">
                                <span className="w-25 mr-3 font-custom-2">Paid Amount:</span>
                                <span className="fw-bold">RM {selectedInvoice.paidAmount || ''}</span>
                            </div>

                            <div className="mb-4 w-100 d-flex">
                                <span className="w-25 mr-3 font-custom-2">Balance:</span>
                                <span className="font-custom-2">RM {selectedInvoice.balance || ''}</span>
                            </div>

                            <div className="mb-4 w-100 d-flex">
                                <span className="w-25 mr-3 font-custom-2">Extra Services (Monthly):</span>
                                <span className="font-custom-2">RM {selectedInvoice.extraServices || ''}</span>
                            </div>

                            <div className="mb-4 w-100 d-flex">
                                <span className="w-25 mr-3 font-custom-2 ">Payment Type:<strong className="text-danger">*</strong></span>
                                <select
                                    className="feedback_input form-control font-custom-2 installment-input"
                                    value={selectedPaymentType}
                                    onChange={handleChange}
                                >
                                    <option value="" hidden>-Payment Type-</option>
                                    <option value="full-payment">Full Payment</option>
                                    <option value="installment">Installment</option>
                                </select>
                            </div>

                            <div className="mb-4 w-100 d-flex">
                                <span className="w-25 mr-3 font-custom-2">Payment Amount:<strong className="text-danger">*</strong></span>
                                <input className="feedback_input form-control font-custom-2 installment-input" type="number" value={paymentAmount}
                                    onKeyDown={(e) => { if (!/^\d*$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== ".") { e.preventDefault(); } }}
                                    onChange={(e) => { setPaymentAmount(e.target.value); }} />
                            </div>

                            <div className="mb-4 w-100 d-flex">
                                <span className="w-25 mr-3 font-custom-2">Pay With<strong className="text-danger">*</strong></span>
                                <label className="sidebar-cart-remark-radio-container all-center font-custom-2 fs-6 mr-3">
                                    <input className="m-0 mr-2" type="radio" checked={paymentMethod === "ipay88"} onClick={() => setPaymentMethod("ipay88")} readOnly />
                                    iPay88
                                </label>
                            </div>

                            <div className="mb-4 w-100 d-flex">
                                <span className="text-danger fs-7 font-custom-2">
                                    Note: An additional RM 5.72 will be charged monthly for overdue payment made after 20/02/2222. Our company reserves the right to terminate this transaction in the event that payments are not paid for 3 consecutive months. (Please take note that the goods cannot be changed and the order cannot be cancelled or changed for installment)
                                </span>
                            </div>

                            <div className="mb-3 d-flex installment-payment-btn-container">
                                <button
                                    className="installment-payment-back-button btn-secondary w-100 mb-3"
                                    type="button"
                                    onClick={() => { setOpenPayment(!openPayment); onClose(); }}>
                                    <strong>Close</strong>
                                </button>

                                <button
                                    className="installment-payment-submit-button btn-secondary w-100 mb-5"
                                    type="button"
                                    onClick={() => { console.log("do further logic here"); }}>
                                    <strong>Submit</strong>
                                </button>
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
