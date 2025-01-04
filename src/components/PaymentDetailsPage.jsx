import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../assets/css/PaymentDetailsPage.css';

const PaymentDetailsPage = ({ showAlert }) => {
    const navigate = useNavigate();
    const amount = useLocation().state;

    const [openTac, setOpenTac] = useState(false);
    const [openCompanyTac, setOpenCompanyTac] = useState(false);

    const [collectType, setCollectType] = useState('');
    const [identityType, setIdentityType] = useState('ic');

    const [remark, setRemark] = useState('');
    const [deliveryDetails, setDeliveryDetails] = useState({
        deliveryWith: 'gdex',
        identity: '920831105391',
        name: 'Lim',
        address: '1-2-3 unit A, Jalan test, taman test only',
        cities: '',
        postcode: '',
        state: '',
        country: 'MALAYSIA',
        phone: '0169551982',
        email: 'ginz30@gmail.com',
        whatsapp: 'no'
    });
    const [selfcollectDetails, setSelfcollectDetails] = useState({
        identity: '920831105391',
        pickerName: 'Lim',
        pickerPhone: '0169551982',
        pickerEmail: 'ginz30@gmail.com',
        collectDate: '02/01/2025 03:34 PM - 02/01/2025 03:34 PM'
    });



    const handleDeliveryChange = (e) => {
        const { name, value } = e.target;
        setDeliveryDetails((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelfcollectChange = (e) => {
        const { name, value } = e.target;
        setSelfcollectDetails((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOpen = (value) => {
        console.log('success');
        if (value === 'first') {
            setOpenTac(true);
        } else {
            setOpenCompanyTac(true);
        }
    }

    const handleClick = () => {
        const validateFields = (fields, prefix) => {
            for (const [key, value] of Object.entries(fields)) {
                if (value === '') {
                    showAlert("warning", `${prefix} ${key.replace(/([A-Z])/g, ' $1')} cannot be empty!`);
                    return false;
                }
            }
            return true;
        };

        if (collectType === '') {
            showAlert("warning", "Please select Collect Type!");
            return;
        }

        if (collectType === 'delivery') {
            const deliveryFields = {
                'Carrier': deliveryDetails.deliveryWith,
                'Name': deliveryDetails.name,
                'Address': deliveryDetails.address,
                'Cities': deliveryDetails.cities,
                'Postcode': deliveryDetails.postcode,
                'State': deliveryDetails.state,
                'Phone': deliveryDetails.phone,
                'Email': deliveryDetails.email,
            };
            if (!validateFields(deliveryFields, "Delivery")) return;
        }
    
        if (collectType === 'selfcollect') {
            const selfCollectFields = {
                'Picker Name': selfcollectDetails.pickerName,
                'Picker Phone': selfcollectDetails.pickerPhone,
                'Picker Email': selfcollectDetails.pickerEmail,
                'Collect Date': selfcollectDetails.collectDate,
            };
            if (!validateFields(selfCollectFields, "Self Collect")) return;
        }
    
        // Validate for TAC
        const firstTac = document.getElementById('first_tac');
        const secondTac = document.getElementById('second_tac');
        if (firstTac && secondTac) {
            if (firstTac.checked && secondTac.checked) {
                showAlert("success", "Your confirmation was successful. Proceeding to the payment gateway...", 2);
            } else {
                showAlert("warning", "Please read and agree to the TAC by ticking the box before proceeding.", 3);
            }
        } else {
            console.error("Unable to get element!");
        }
    };
    

    return (
        <>
            {amount && amount !== '' ? (
                <div className="w-100 all-center">
                    {collectType === "" &&
                        <div className="feedback_form">
                            <h2 className="w-100 border-bottom pb-3 mb-4">Collect Type</h2>
                            <div className="d-flex mb-3">
                                <span className="mr-4">Collect Type<strong className="text-danger">*</strong></span>
                                <label className="mr-3">
                                    <input className="mr-2" type="radio" readOnly radioGroup="collectType" checked={collectType === 'delivery'}
                                        onClick={() => { setCollectType(collectType !== 'delivery' ? 'delivery' : ''); }} />
                                    Delivery
                                </label>
                                <label>
                                    <input className="mr-2" type="radio" readOnly radioGroup="collectType" checked={collectType === 'selfcollect'}
                                        onClick={() => { setCollectType(collectType !== 'selfcollect' ? 'selfcollect' : ''); }} />
                                    Self Collect
                                </label>
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Remark:</span>
                                <input className="form-control" type="text" value={remark} onChange={(e) => setRemark(e.target.value)} />
                            </div>

                            <span className="section-divider" />
                            <div className="all-center flex-column paymentdetails-ordersummary-spacing">
                                <h2 className="paymentdetails-ordersummary-heading">Order Summary</h2>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Order Subtotal
                                    <label>RM {amount}.00</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Total
                                    <label className="fw-bold fs-6">RM {amount}.00</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Payment Type
                                    <label>Pay Now</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Grand Total
                                    <label className="fw-bold fs-6">RM {amount}.00</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Payment Amt
                                    <label className="fw-bold fs-6">RM {amount}.00</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Pay With
                                    <label>
                                        <input className="mr-2" type="radio" checked readOnly />
                                        iPay88
                                    </label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    <input className="mr-2" type="checkbox" id="first_tac" />
                                    I agree with the&nbsp; <a role="button" onClick={() => { handleOpen('first') }}>Term And Conditions.</a>
                                </span>
                                <strong className="text-danger w-100 fs-8 mb-2">* You Must Agree with the Term And Conditions to process</strong>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    <input className="mr-2" type="checkbox" id="second_tac" />
                                    I agree with the&nbsp; <a role="button" onClick={() => { handleOpen('second') }}>Company Term And Condition.</a>
                                </span>
                                <strong className="text-danger w-100 fs-8 mb-5">* You Must Agree with the Company Term And Conditions to process</strong>
                                <button
                                    className="paymentdetails-confirm-button btn-secondary w-100 mb-3"
                                    type="button"
                                    onClick={handleClick}>
                                    <strong>Confirm</strong>
                                </button>

                                <button
                                    className="paymentdetails-back-button btn-secondary w-100 mb-5"
                                    type="button" onClick={() => { navigate(-1); }}>
                                    <strong>Back</strong>
                                </button>
                            </div>
                        </div>
                    }
                    {collectType === "delivery" &&
                        <div className="feedback_form">
                            <h2 className="w-100 border-bottom pb-3 mb-4">Collect Type</h2>
                            <div className="d-flex mb-3">
                                <span className="mr-4">Collect Type<strong className="text-danger">*</strong></span>
                                <label className="mr-3">
                                    <input className="mr-2" type="radio" readOnly radioGroup="collectType" checked={collectType === 'delivery'}
                                        onClick={() => { setCollectType(collectType !== 'delivery' ? 'delivery' : ''); }} />
                                    Delivery
                                </label>
                                <label>
                                    <input className="mr-2" type="radio" readOnly radioGroup="collectType" checked={collectType === 'selfcollect'}
                                        onClick={() => { setCollectType(collectType !== 'selfcollect' ? 'selfcollect' : ''); }} />
                                    Self Collect
                                </label>
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Delivery with:</span>
                                <select className="form-control" name="deliveryWith" value={deliveryDetails.deliveryWith}
                                    onChange={handleDeliveryChange}>
                                    <option value="gdex">GDEX</option>
                                </select>
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <div className="d-flex mb-2">
                                    <span className="mr-4">IC: <strong className="text-danger">*</strong></span>
                                    <label className="mr-3">
                                        <input className="mr-2" type="radio" radioGroup="identityType" checked={identityType === 'ic'}
                                            onClick={() => { setIdentityType('ic'); }} readOnly />
                                        IC
                                    </label>
                                    <label>
                                        <input className="mr-2" type="radio" radioGroup="identityType" checked={identityType === 'passport'}
                                            onClick={() => { setIdentityType('passport'); }} readOnly />
                                        Passport
                                    </label>
                                </div>
                                <input className="form-control" type="text" value={deliveryDetails.identity} onChange={handleDeliveryChange}
                                    name="identity" disabled />
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Name: <strong className="text-danger">*</strong></span>
                                <input className="form-control" type="text" name="name" value={deliveryDetails.name}
                                    onChange={handleDeliveryChange} />
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Address: <strong className="text-danger">*</strong></span>
                                <input className="form-control" type="text" name="address" value={deliveryDetails.address}
                                    onChange={handleDeliveryChange} placeholder="ENTER ADDRESS" />
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Cities: <strong className="text-danger">*</strong></span>
                                <input className="form-control" type="text" name="cities" value={deliveryDetails.cities}
                                    onChange={handleDeliveryChange} placeholder="CITIES" />
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Postcode: <strong className="text-danger">*</strong></span>
                                <input className="form-control" type="text" name="postcode" value={deliveryDetails.postcode}
                                    onChange={handleDeliveryChange} placeholder="Postcode" />
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">State: <strong className="text-danger">*</strong></span>
                                <select className="form-control" name="state" value={deliveryDetails.state} onChange={handleDeliveryChange} >
                                    <option value="">-- SELECT STATE --</option>
                                    <option value="JOHOR">JOHOR</option>
                                    <option value="KEDAH">KEDAH</option>
                                    <option value="KELANTAN">KELANTAN</option>
                                    <option value="MELAKA">MELAKA</option>
                                    <option value="NEGERI SEMBILAN">NEGERI SEMBILAN</option>
                                    <option value="PAHANG">PAHANG</option>
                                    <option value="PULAU PINANG">PULAU PINANG</option>
                                    <option value="PERAK">PERAK</option>
                                    <option value="PERLIS">PERLIS</option>
                                    <option value="SELANGOR">SELANGOR</option>
                                    <option value="TERENGGANU">TERENGGANU</option>
                                    <option value="SABAH">SABAH</option>
                                    <option value="LABUAN">LABUAN</option>
                                    <option value="SARAWAK">SARAWAK</option>
                                    <option value="KUALA LUMPUR">KUALA LUMPUR</option>
                                    <option value="PUTRAJAYA">PUTRAJAYA</option>
                                </select>
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Country: <strong className="text-danger">*</strong></span>
                                <select className="form-control" name="country" value={deliveryDetails.country} onChange={handleDeliveryChange}
                                    disabled >
                                    <option value="MALAYSIA">MALAYSIA</option>
                                </select>
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Phone: <strong className="text-danger">*</strong></span>
                                <input className="form-control" type="text" name="phone" value={deliveryDetails.phone}
                                    onChange={handleDeliveryChange} />
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Email: <strong className="text-danger">*</strong></span>
                                <input className="form-control" type="text" name="email" value={deliveryDetails.email}
                                    onChange={handleDeliveryChange} />
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Whatsapp:</span>
                                <select className="form-control" name="whatsapp" value={deliveryDetails.whatsapp} onChange={handleDeliveryChange} >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>

                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Remark:</span>
                                <input className="form-control" type="text" value={remark} onChange={(e) => setRemark(e.target.value)} />
                            </div>
                            <span className="section-divider" />
                            <div className="all-center flex-column paymentdetails-ordersummary-spacing">
                                <h2 className="paymentdetails-ordersummary-heading">Order Summary</h2>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Order Subtotal
                                    <label>RM {amount}.00</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Total
                                    <label className="fw-bold fs-6">RM {amount}.00</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Payment Type
                                    <label>Pay Now</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Grand Total
                                    <label className="fw-bold fs-6">RM {amount}.00</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Payment Amt
                                    <label className="fw-bold fs-6">RM {amount}.00</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Pay With
                                    <label>
                                        <input className="mr-2" type="radio" checked readOnly />
                                        iPay88
                                    </label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    <input className="mr-2" type="checkbox" id="first_tac" />
                                    I agree with the&nbsp; <a role="button" onClick={() => { handleOpen('first') }}>Term And Conditions.</a>
                                </span>
                                <strong className="text-danger w-100 fs-8 mb-2">* You Must Agree with the Term And Conditions to process</strong>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    <input className="mr-2" type="checkbox" id="second_tac" />
                                    I agree with the&nbsp; <a role="button" onClick={() => { handleOpen('second') }}>Company Term And Condition.</a>
                                </span>
                                <strong className="text-danger w-100 fs-8 mb-5">* You Must Agree with the Company Term And Conditions to process</strong>
                                <button
                                    className="paymentdetails-confirm-button btn-secondary w-100 mb-3"
                                    type="button"
                                    onClick={handleClick}>
                                    <strong>Confirm</strong>
                                </button>

                                <button
                                    className="paymentdetails-back-button btn-secondary w-100 mb-5"
                                    type="button" onClick={() => { navigate(-1); }}>
                                    <strong>Back</strong>
                                </button>
                            </div>
                        </div>
                    }
                    {collectType === "selfcollect" &&
                        <div className="feedback_form">
                            <h2 className="w-100 border-bottom pb-3 mb-4">Collect Type</h2>
                            <div className="d-flex mb-3">
                                <span className="mr-4">Collect Type<strong className="text-danger">*</strong></span>
                                <label className="mr-3">
                                    <input className="mr-2" type="radio" readOnly radioGroup="collectType" checked={collectType === 'delivery'}
                                        onClick={() => { setCollectType(collectType !== 'delivery' ? 'delivery' : ''); }} />
                                    Delivery
                                </label>
                                <label>
                                    <input className="mr-2" type="radio" readOnly radioGroup="collectType" checked={collectType === 'selfcollect'}
                                        onClick={() => { setCollectType(collectType !== 'selfcollect' ? 'selfcollect' : ''); }} />
                                    Self Collect
                                </label>
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <div className="d-flex mb-2">
                                    <span className="mr-4">IC: <strong className="text-danger">*</strong></span>
                                    <label className="mr-3">
                                        <input className="mr-2" type="radio" radioGroup="identityType" checked={identityType === 'ic'}
                                            onClick={() => { setIdentityType('ic'); }} readOnly />
                                        IC
                                    </label>
                                    <label>
                                        <input className="mr-2" type="radio" radioGroup="identityType" checked={identityType === 'passport'}
                                            onClick={() => { setIdentityType('passport'); }} readOnly />
                                        Passport
                                    </label>
                                </div>
                                <input className="form-control" type="text" value={selfcollectDetails.identity} onChange={handleSelfcollectChange}
                                    name="identity" disabled />
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Picker Name: <strong className="text-danger">*</strong></span>
                                <input className="form-control" type="text" name="pickerName" value={selfcollectDetails.pickerName}
                                    onChange={handleSelfcollectChange} />
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Picker Phone: <strong className="text-danger">*</strong></span>
                                <input className="form-control" type="text" name="pickerPhone" value={selfcollectDetails.pickerPhone}
                                    onChange={handleSelfcollectChange} />
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Picker Email: <strong className="text-danger">*</strong></span>
                                <input className="form-control" type="text" name="pickerEmail" value={selfcollectDetails.pickerEmail}
                                    onChange={handleSelfcollectChange} />
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Collect Date: <strong className="text-danger">*</strong></span>
                                <input className="form-control" type="text" name="collectDate" value={selfcollectDetails.collectDate}
                                    onChange={handleSelfcollectChange} />
                            </div>
                            <div className="d-flex flex-column mb-4">
                                <span className="mb-2">Remark:</span>
                                <input className="form-control" type="text" value={remark} onChange={(e) => setRemark(e.target.value)} />
                            </div>
                            <span className="section-divider" />
                            <div className="all-center flex-column paymentdetails-ordersummary-spacing">
                                <h2 className="paymentdetails-ordersummary-heading">Order Summary</h2>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Order Subtotal
                                    <label>RM {amount}.00</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Total
                                    <label className="fw-bold fs-6">RM {amount}.00</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Payment Type
                                    <label>Pay Now</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Grand Total
                                    <label className="fw-bold fs-6">RM {amount}.00</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Payment Amt
                                    <label className="fw-bold fs-6">RM {amount}.00</label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    Pay With
                                    <label>
                                        <input className="mr-2" type="radio" checked readOnly />
                                        iPay88
                                    </label>
                                </span>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    <input className="mr-2" type="checkbox" id="first_tac" />
                                    I agree with the&nbsp; <a role="button" onClick={() => { handleOpen('first') }}>Term And Conditions.</a>
                                </span>
                                <strong className="text-danger w-100 fs-8 mb-2">* You Must Agree with the Term And Conditions to process</strong>
                                <span className="paymentdetails-ordersummary-total fs-8">
                                    <input className="mr-2" type="checkbox" id="second_tac" />
                                    I agree with the&nbsp; <a role="button" onClick={() => { handleOpen('second') }}>Company Term And Condition.</a>
                                </span>
                                <strong className="text-danger w-100 fs-8 mb-5">* You Must Agree with the Company Term And Conditions to process</strong>
                                <button
                                    className="paymentdetails-confirm-button btn-secondary w-100 mb-3"
                                    type="button"
                                    onClick={handleClick}>
                                    <strong>Confirm</strong>
                                </button>

                                <button
                                    className="paymentdetails-back-button btn-secondary w-100 mb-5"
                                    type="button" onClick={() => { navigate(-1); }}>
                                    <strong>Back</strong>
                                </button>
                            </div>
                        </div>
                    }
                </div>
            ) : (
                <div />
            )}
        </>
    );
};

export default PaymentDetailsPage;
