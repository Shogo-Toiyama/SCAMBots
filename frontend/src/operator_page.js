import React from 'react';
import MakeRealtimeInfoField from './components/realtime_info_field';

function OperatorPage() {
  return (
    <div className="operator-page">
      <h1>SCAM Bots Operator Page</h1>
        <div>
          <h2>Real Time Info Field</h2>
          <MakeRealtimeInfoField temp = {50} humidity = {80} light_level = {40} distance = {30}/>
        </div>
        <div>
          <h2>Snapshot Info Field</h2>
          <p>Distance snapshots here.</p>
          <p>Fields name will be changed after.</p>
        </div>
        <div>
          <h2>API Call Section</h2>
          <p>Distance snapshots here.</p>
          <p>Fields name will be changed after.</p>
        </div>
        <div>
          <h2>Communication Field</h2>
          <p>Distance snapshots here.</p>
          <p>Fields name will be changed after.</p>
        </div>
    </div>
  );
}

export default OperatorPage;