import React, { useState } from 'react';
import ReactModal from 'react-modal';
import modalStyles from '../../common/modalStyles';
import classes from './OverallResultModal.module.css';

const OverallResultModal = ({ data, removeFromDOM }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      removeFromDOM();
    }, 500);
  };

  const students = [...data];
  students.sort((a, b) => (a.cgpa > b.cgpa) ? -1 : ((b.cgpa > a.cgpa) ? 1 : 0));

  return (
    <ReactModal
      closeTimeoutMS={500}
      isOpen={open}
      style={modalStyles}
    >
      <div className='cross-icon-container'>
        <p>Overall Result</p>
        <button onClick={handleClose}>&#10006;</button>
      </div>
      <div className={classes["reminder"]}>Reminder: GPA doesn't matter</div>
      <div className={classes['content-container']}>
        {students.slice(0, 35).map((s, i) => <div className={classes['student']} key={s.roll}>
          <span className={classes['rank']}>
            {i + 1}.
          </span>
          {s.name}
          <span className={classes['rank']}>
            ({s.cgpa}) ({s.grade})
          </span>
        </div>)}
      </div>
    </ReactModal >
  );
};

export default OverallResultModal;
