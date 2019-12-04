import React, { useEffect, useState } from 'react';
import './Watchlist.scss';
import axios from 'axios';
import Moment from 'moment';
import { catchClause } from '@babel/types';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import QuoteDetails from '../QuoteDetails/QuoteDetails';

const Watchlist = () => {
  const [data, setData] = useState(Array<any>());
  const [query, setQuery] = useState('');
  const [show, setShow] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [alertVariant, setAlertVariant] = useState();


  useEffect(() => {
    fetch("https://localhost:5001/api/stocks")
      .then(res => res.json())
      .then(res => setData([...res]))
  }, []);

  const removeValue = (index) => {
    setData(data.filter(x => data.indexOf(x) !== index));
  }

  const fetchStock = (symbol) => {
    return fetch(`https://localhost:5001/api/stocks/${symbol}`)
      .then(res => res.json())
      .then(res => {
        data.push(res);
        setData([...data]);
        setQuery('');
      })
      .catch(err => {
        setQuery('');
        setAlertVariant('danger');
        setErrorText('There was a problem retrieving the symbol, please try again');
        setShow(true);
      });
  };


  const addValue = (symbol) => {
    if (symbol) {
      fetchStock(symbol);
      setData([...data]);
    } else {
      setShow(true);
      setAlertVariant('warning');
      setErrorText('Please enter a valid symbol to search')
    }
  }

  return (<>
    {show && (
      <Alert variant={alertVariant} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Whoops!</Alert.Heading>
        <p>
          {errorText}
        </p>
      </Alert>
    )}
    <div className="table-responsive">
      <div className="panel panel-default">
        <table className="table table-bordered table-dark table-hover" style={{ width: '60%', margin: 'auto', maxWidth: '1024px' }}>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Symbol</th>
              <th scope="col">Open</th>
              <th scope="col">Close</th>
              <th scope="col">High</th>
              <th scope="col">Low</th>
              <th scope="col">Volume</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="accordionExample">
            {
              data.map(s => <QuoteDetails key={data.indexOf(s)} stockData={s} index={data.indexOf(s)} callback={i => removeValue(i)} />)
            }
          </tbody>
        </table>
      </div>
      <div>
        <div id="footer-header">
          <div className="table-footer">
            {/* Upgrade: add validation logic, eg: remove characters that aren't allowed in stock symbols */}
            <form className="form-inline" onSubmit={event => {
              event.preventDefault();
              addValue(query);
            }}>
              <label htmlFor="symbol-Add">Add Symbol</label>
              <input className="symbol form-control" type="text" name="" id="symbol-add" value={query} onChange={event => setQuery(event.target.value)} />
            </form>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Watchlist;