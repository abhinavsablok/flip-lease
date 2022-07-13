import React, { useEffect, useState } from 'react';
import '../../style.css';
import logo from '../../images/FLIP_text.png';
import { API, normalizedAPIError } from '../../api';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

export function Lease() {
  let { id } = useParams();

  const [lease, setLease] = useState(null);
  document.title = "FLIP Lease"

  useEffect(() => {
    API({
      url: `/leases/${id}`,
      method: 'get',
    })
      .then((res) => {
        setLease(res.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [id]);

  const triggerUnlock = async () => {
    try {
        await API({
          url: `/leases/${id}/control`,
          data: { type: 'unlock' },
          method: 'post',
        });
  
        toast.success('Unlocking scooter...', {
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

  const triggerLock = async () => {
    try {
        await API({
          url: `/leases/${id}/control`,
          data: { type: 'lock' },
          method: 'post',
        });
  
        toast.success('Locking scooter...', {
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

  const triggerRing = async () => {
    try {
        await API({
          url: `/leases/${id}/control`,
          data: { type: 'toot' },
          method: 'post',
        });
  
        toast.success('Ringing scooter...', {
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

  const triggerRefresh = async () => {
    await API({
      url: `/leases/${id}/control`,
      data: { type: 'refresh' },
      method: 'post',
    })
    window.location.reload(false)

    toast.success('Refreshing...');
  };

  const triggerHatch = async () => {
    try {
        await API({
          url: `/leases/${id}/control`,
          data: { type: 'hatch' },
          method: 'post',
        });
  
        toast.success('Opening hatch...', {
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

  const triggerShutdown = async () => {
    try {
        await API({
          url: `/leases/${id}/control`,
          data: { type: 'shutdown' },
          method: 'post',
        });
  
        toast.success('Shutting down...', {
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

  const triggerStartup = async () => {
    try {
      await API({
        url: `/leases/${id}/control`,
        data: { type: 'startup' },
        method: 'post',
      });

      toast.success('Starting up...', {
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

  return (
    <div className="container">
      <div><Toaster position="top-right"/></div>
      <div className="topContainer">
        <div>
          <img src={logo} alt="FLIP Logo" />
        </div>
        {lease ? (
          <>
            <label><b>Vehicle ID</b></label>
            <span>#{lease.vehicle.vehicleCode}</span>
            <hr></hr>
            <label><b>Vehicle Info</b></label>
            <span>Lock State: {lease.vehicle.locked ? 'Locked' : 'Unlocked'}</span>
            <span>Charging: {lease.vehicle.charging ? 'Yes' : 'No'}</span>
            <span>Last GPS: {moment(lease.vehicle.lastContact).fromNow()}</span>
            <span>Location: <a
              className="appLink"
              href={`https://www.google.com/maps/search/?api=1&query=${lease.vehicle.location.coordinates[1]}%2C${lease.vehicle.location.coordinates[0]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open In Google Maps
            </a></span>
            <hr></hr>
            <label><b>Battery</b></label>
            <span>{lease.vehicle.batteryPercentage}%</span>
            <span>{Math.ceil(lease.vehicle.remainingRange / 1000)}km remaining</span>
          </>
        ) : (
          <p>Unable to find lease.</p>
        )}
      </div>
      {lease &&
      <div className="buttonContainer">
        <button className="button" onClick={triggerUnlock} disabled={!lease}>
          <i className="mdi mdi-lock-open-variant" /> Unlock
        </button>
        <span className="buttonSpacer" />
        <button className="button" onClick={triggerLock} disabled={!lease}>
          <i className="mdi mdi-lock" /> Lock
        </button>
        <span className="buttonSpacer" />
        <button className="squareButton" onClick={triggerRing} disabled={!lease}>
          <i className="mdi mdi-bell" />
        </button>
        <span className="buttonSpacer" />
        <button className="squareButton" onClick={triggerRefresh} disabled={!lease}>
          <i className="mdi mdi-refresh" />
        </button>
      </div>
      }

      {lease && lease.lease.extraActions &&
      <div className="buttonContainer">
        <button className="button" onClick={triggerShutdown} disabled={!lease}>
        <i className="mdi mdi-power-standby" /> Shutdown
        </button>
        <span className="buttonSpacer" />
        <button className="button" onClick={triggerStartup} disabled={!lease}>
          <i className="mdi mdi-power-standby" /> Startup
        </button>
        <span className="buttonSpacer" />
        <button className="button" onClick={triggerHatch} disabled={!lease}>
          <i className="mdi mdi-battery-lock-open" /> Hatch
        </button>
      </div>
      }
    </div>
  );
}
