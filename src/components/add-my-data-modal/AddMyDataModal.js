import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import firebase from 'firebase';
import { saveData } from './AddMyDataModal.service';
import modalStyles from '../../common/modalStyles';
import classes from './AddMyDataModal.module.css';

const AddMyDataModal = ({ removeFromDOM }) => {
  const [fieldValues, setFieldValues] = useState({ roll: '', results: '' });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    return () => {
      setFieldValues({ roll: '', results: '' });
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      removeFromDOM();
    }, 500);
  }

  const onSubmit = () => {
    const { roll, results } = fieldValues;
    const trimRoll = roll.trim();
    const trimResults = results.trim();

    if (!trimRoll || !trimResults) return;

    if (!firebase.apps.length) {
      alert("Sorry, Database is not setup by the developer");
      return;
    }

    setLoading(true);
    saveData(trimRoll, trimResults)
      .then(() => {
        handleClose();
        setFieldValues({ roll: '', results: '' });
        setTimeout(() => {
          alert("Your data is successfully recorded. It would be updated in the app soon");
        });
      })
      .catch(e => {
        console.log(e)
        alert("Error occured while storing your data, try again");
      })
      .finally(() => setLoading(false))
  };

  const fields = [
    {
      'name': 'roll',
      'label': 'Roll No',
      'helperText': ''
    },
    {
      'name': 'results',
      'label': 'Results',
      'helperText': 'GPA of each semester from 1st to 8th, comma separted'
    }
  ];

  return (
    <ReactModal
      closeTimeoutMS={500}
      isOpen={open}
      style={modalStyles}
    >
      <div className='cross-icon-container'>
        <p>Add my data</p>
        <button onClick={handleClose}>&#10006;</button>
      </div>
      <div className={classes['content-container']}>
        {fields.map(f => <div className={classes["field-container"]} key={f.name}>
          <span className={classes["field-label"]}>{f.label}:</span>
          <input
            onChange={e => setFieldValues({ ...fieldValues, [f.name]: e.target.value })}
            value={fieldValues[f.name]}
          />
          {f.helperText
            ? <span className={classes["field-helper-text"]}>{f.helperText}</span>
            : null}
        </div>)}
        <button
          disabled={!fieldValues.roll.trim() || !fieldValues.results.trim() || loading}
          className={classes['submit-btn']}
          onClick={onSubmit}>
          Submit
      </button>
      </div>
    </ReactModal >
  );
};

export default AddMyDataModal;
