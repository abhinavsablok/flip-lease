import React, { useEffect, useState } from 'react';
import '../../style.css';
import logo from '../../images/FLIP_text.png';
import { API } from '../../api';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

export function Rental() {
  let { id } = useParams();

  const [rental, setRental] = useState(null);
  document.title = "FLIP Rental"

  useEffect(() => {
    API({
      url: `/leases/${id}`,
      method: 'get',
    })
      .then((res) => {
        setRental(res.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [id]);

  const triggerUnlock = () => {
    API({
      url: `/leases/${id}/control`,
      data: {type: 'unlock'},
      method: 'post',
    });

    toast.success('Unlocking scooter...', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    });
  };

  const triggerLock = () => {
    API({
      url: `/leases/${id}/control`,
      data: {type: 'lock'},
      method: 'post',
    });

    toast.success('Locking scooter...', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    });
  };
  const triggerRing = () => {
    API({
      url: `/leases/${id}/control`,
      data: {type: 'toot'},
      method: 'post',
    });

    toast.success('Ringing scooter...', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    });
  };

  return (
    <div className="container">
      <div><Toaster position="top-right"/></div>
      <div className="topContainer">
        <div>
          <img src={logo} alt="FLIP Logo" />
        </div>
        {rental ? (
          <>
            <label><b>Vehicle Code</b></label>
            <span>#{rental.vehicleCode}</span>
            <hr></hr>
            <label><b>Status</b></label>
            <span>Locked: {rental.locked ? 'Yes' : 'No'}, Charging: {rental.charging ? 'Yes' : 'No'}</span>
            <hr></hr>
            <label><b>Battery</b></label>
            <span>{rental.batteryPercentage}% (about {Math.ceil(rental.remainingRange / 1000)}km)</span>
            <hr></hr>
            <label><b>Updated At</b></label>
            <span>{moment(rental.updatedAt).fromNow()}</span>
          </>
        ) : (
          <p>Unable to find rental.</p>
        )}
      </div>
      {rental &&
      <div className="buttonContainer">
        <button className="button" onClick={triggerUnlock} disabled={!rental}>
          Unlock
        </button>
        <span className="buttonSpacer" />
        <button className="button" onClick={triggerLock} disabled={!rental}>
          Lock
        </button>
        <span className="buttonSpacer" />
        <button className="button" onClick={triggerRing} disabled={!rental}>
          Ring
        </button>
      </div>
      }
    </div>
  );
}
