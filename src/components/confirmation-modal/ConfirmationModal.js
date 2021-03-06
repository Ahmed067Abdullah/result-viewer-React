import React, { useState } from 'react';
import ReactModal from 'react-modal';
import modalStyles from '../../common/modalStyles';
import classes from './ConfirmationModal.module.css';

const ConfirmationModal = ({ removeFromDOM }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      removeFromDOM();
    }, 500);
  }
  
  const handleCancel = () => {
    window.history.back();
  }

  const hanleAgree = () => {
    localStorage.setItem("agreed", true);
    handleClose();
  }

  return (
    <ReactModal
      closeTimeoutMS={500}
      isOpen={open}
      style={modalStyles}
    >
      <div className={classes['content-container']}>
        <p className={classes.warning}>Disclaimer!</p>
        <p className={classes.text}>Some user activitites are anonymously recorded for developer insights.</p>
        <div className={classes['btns-container']}>
          {/* <button className={classes['cancel-btn']} onClick={handleCancel}>
            {'Cancel'}
          </button> */}
          <button onClick={hanleAgree}>
            {'I agree'}
          </button>
        </div>
      </div>
    </ReactModal >
  );
};

export default ConfirmationModal;
