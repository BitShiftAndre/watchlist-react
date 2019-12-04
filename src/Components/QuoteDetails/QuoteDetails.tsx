import React from 'react';
import Moment from 'moment';

const QuoteDetails = ({ stockData, index, callback }) => {
  const idName = `${stockData.symbol}${index}`;

  const displayValue = val => {
    return val.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  };

  const setColor = val => {
    return val < 0 ? '#ff675c' : '#68fc6f';
  };


  return (<>
    {/* could alter code to avoid copy pasting of collapse logic */}
    <tr>
      <th data-toggle="collapse" data-target={`#${idName}`} scope="row">{stockData.name}</th>
      <td data-toggle="collapse" data-target={`#${idName}`}>{stockData.symbol}</td>
      <td data-toggle="collapse" data-target={`#${idName}`}>{displayValue(stockData.price_Open)}</td>
      <td data-toggle="collapse" data-target={`#${idName}`}>{displayValue(stockData.close_Yesterday)}</td>
      <td data-toggle="collapse" data-target={`#${idName}`}>{displayValue(stockData.day_High)}</td>
      <td data-toggle="collapse" data-target={`#${idName}`}>{displayValue(stockData.day_Low)}</td>
      <td data-toggle="collapse" data-target={`#${idName}`}>{stockData.volume}</td>
      <td onClick={() => callback(index)}><i className="fas fa-times" style={{ color: '#ff675c', margin: 'auto' }}></i></td>
    </tr>
    <tr id={idName} className="collapse non-hover" data-parent="#accordionExample">
      <td colSpan={8}>
        <div>
          <ul>

            {/* room to format without tab logic */}
            <li><span>Change/Day</span> &emsp;&emsp; <span style={{ color: setColor(stockData.day_Change) }}>{displayValue(stockData.day_Change)}</span></li>
            <li><span>52-wk high</span> &emsp;&emsp; {displayValue(stockData["52_week_high"])}</li>
            <li><span>52-wk low</span> &emsp;&emsp; {displayValue(stockData["52_week_low"])}</li>
            <li><span>Vol.</span> &emsp;&emsp; {stockData.volume}</li>
            <li><span>Avg Vol.</span> &emsp;&emsp; {stockData.volume_Avg}</li>
            <li><span>Last Trade</span> &emsp;&emsp; {Moment(stockData.last_trade_Time).format('MM/DD/YYYY hh:MM')}</li>
          </ul>
        </div>
      </td>
    </tr>
  </>)
}

export default QuoteDetails;