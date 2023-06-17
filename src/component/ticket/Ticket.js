import './Ticket.css'
import React, { useState } from 'react';

const Ticket = () => {
  const countriesData = {
    Iran: ['Tabriz', 'Tehran', 'Shiraz', 'Esfahan', 'Mashhad'],
    Turkey: ['Istanbul', 'Ezmir', 'Ankara', 'Antaliya'],
    US: ['Los Angles', 'San Diego', 'Chicago'],
  };

  const [mainCountryCities, setMainCountryCities] = useState([]);
  const [ticketReserved, setTicketReserved] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const selectHandler = (event) => {
    const mainCountry = event.target.value;

    if (mainCountry === '-1') {
      setMainCountryCities([]);
    } else {
      const cities = countriesData[mainCountry];
      setMainCountryCities(cities);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phoneNumber);
  };

  const reserveTicket = () => {
    if (!firstName || !lastName || !phoneNumber || !email) {
      setError('Please complete all the inputs.');
    } else if (!validateEmail(email)) {
      setError('Please enter a valid email.');
    } else if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number.');
    } else {
      setTicketReserved(true);
      setError('');
    }
  };

  return (
    <>

      <h1 className='title'>RESERVE ONLINE TICKET</h1>    
      <div className="container">
        <div className="right">
          <div className="box">
            <input
              className="fnameInput"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="box">
            <input
              className="lnameInput"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="box">
            <input
              className="phoneInput"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="col-xs-12 left">
          <div className="box">
            <input
              className="emailInput"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!validateEmail(email) && email && <p className="error">Please enter a valid email.</p>}
          </div>
          <div className="box">
            <select className="countrySelect" onChange={selectHandler}>
              <option value="-1">Please Select ...</option>
              <option className="option" value="Iran">
                Iran
              </option>
              <option className="option" value="Turkey">
                Turkey
              </option>
              <option className="option" value="US">
                United States
              </option>
            </select>
          </div>
          <div className="box">
            <select className="citySelect">
              {mainCountryCities.length ? (
                mainCountryCities.map((city) => (
                  <option value={city} key={city}>
                    {city}
                  </option>
                ))
              ) : (
                <option value="-1">Please Select ...</option>
              )}
            </select>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="col-md-12 box">
          {ticketReserved ? (
            <p>Ticket is reserved!</p>
          ) : (
            <>
              {error && <p className="error">{error}</p>}
              <button className="btn" onClick={reserveTicket}>
                Book a ticket
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Ticket;

