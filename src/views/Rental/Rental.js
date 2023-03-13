import React, { useEffect, useState } from 'react';
import '../../style.css';
import logo from '../../images/FLIP_text.png';
import { API, normalizedAPIError } from '../../api';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

export function Lease() {
  const { id } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [lease, setLease] = useState(null);
  const [error, setError] = useState(null);

  document.title = "FLIP Lease"

  useEffect(() => {
    (async () => {
      try {
        const response = await API({
          url: `/leases/${id}`,
          method: 'get',
        });

        setLoaded(true);
        setLease(response.data);
      } catch (error) {
        setLoaded(true);
        setError(error.response ? error.response.data : { msg: error.message });
        console.warn(`Get lease error. ${error.response ? error.response.data : { error: error.message }}`);
      }
    })();
  }, [id]);

  async function triggerAction(type, successMessage) {
    try {
      await API({
        url: `/leases/${id}/control`,
        data: { type },
        method: 'post',
      });

      toast.success(successMessage, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }
      });
    } catch (error) {
      toast.error(normalizedAPIError(error).message, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }
      });
    }
  };

  if (!loaded) return <p className="loadingText">Loading...</p>;
  if (error) return <p className="loadingText">{error.msg}</p>;
  return (
    <div className="container">
      <div><Toaster position="top-right"/></div>
      <div className="topContainer">
        <div>
          <img src={logo} alt="FLIP Logo" />
        </div>
        <label><b>Vehicle ID</b></label>
        <span>#{lease.vehicle.vehicleCode}</span>
        <hr></hr>
        <label><b>Vehicle Info</b></label>
        <span>Lock State: {lease.vehicle.locked ? 'Locked' : 'Unlocked'}</span>
        <span>Charging: {lease.vehicle.charging ? 'Yes' : 'No'}</span>
        <span>Last GPS: {lease.vehicle.lastContactTime ? moment(lease.vehicle.lastContactTime).fromNow() : 'N/A'}</span>
        <span>Location: <a
            className="appLink"
            href={`https://www.google.com/maps/search/?api=1&query=${lease.vehicle.location.coordinates[1]}%2C${lease.vehicle.location.coordinates[0]}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </span>
        <hr></hr>
        <label><b>Battery</b></label>
        <span>{lease.vehicle.batteryPercentage}%</span>
        <span>{Math.ceil(lease.vehicle.remainingRange / 1000)}km remaining</span>
      </div>

      {/* extra buttons */}
      {lease.lease.extraActions && (
        <div className="buttonContainer">
          <button className="button" onClick={() => triggerAction('shutdown', 'Powering off vehicle...')}>
          <i className="mdi mdi-power-standby" /> Power Off
          </button>
          <span className="buttonSpacer" />
          <button className="button" onClick={() => triggerAction('startup', 'Powering on vehicle...')}>
            <i className="mdi mdi-power-standby" /> Power On
          </button>
          <span className="buttonSpacer" />
          <button className="button" onClick={() => triggerAction('hatch', 'Opening hatch...')}>
            <i className="mdi mdi-battery-lock-open" /> Open Battery
          </button>
        </div>
      )}
      
      {/* main buttons */}
      <div className="buttonContainer">
        <button className="button" onClick={() => triggerAction('unlock', 'Unlocking vehicle...')}>
          <i className="mdi mdi-lock-open-variant" /> Unlock
        </button>
        <span className="buttonSpacer" />
        <button className="button" onClick={() => triggerAction('lock', 'Locking vehicle...')}>
          <i className="mdi mdi-lock" /> Lock
        </button>
        <span className="buttonSpacer" />
        <button className="squareButton" onClick={() => triggerAction('ring', 'Ringing vehicle...')}>
          <i className="mdi mdi-bell" />
        </button>
      </div>
    </div>
  );
}
