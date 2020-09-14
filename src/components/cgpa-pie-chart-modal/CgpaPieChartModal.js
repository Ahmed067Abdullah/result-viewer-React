import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import ReactModal from 'react-modal';
import modalStyles from '../../common/modalStyles';
import classes from './CgpaPieChartModal.module.css';

const CgpaPieChartModal = ({ allStudents, removeFromDOM }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      removeFromDOM();
    }, 500);
  }

  const pieChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < allStudents.length; i++) {
    const { cgpa } = allStudents[i];
    let index = null;
    if (cgpa > 3) {
      index = +(4.000 - cgpa).toString().split(".")[1][0] + 1;
    } else {
      index = 11;
    }
    pieChartData[index]++;
  }

  return (
    <ReactModal
      closeTimeoutMS={500}
      isOpen={open}
      style={modalStyles}
    >
      <div className='cross-icon-container'>
        <p>CGPA Pie Chart</p>
        <button onClick={handleClose}>&#10006;</button>
      </div>
      <div className={classes['graph-container']}>
        <div>
          <ReactApexChart
            height={'400'}
            options={{
              chart: {
                type: 'pie',
                height: 350,
              },
              labels: ['4', '3.9', '3.8', '3.7', '3.6', '3.5', '3.4', '3.3', '3.2', '3.1', '3.0', '< 3.0'],
            }}
            series={pieChartData}
            type="pie"
            width={'100%'}
          />
        </div>
      </div>
    </ReactModal>
  );
};

export default CgpaPieChartModal;
