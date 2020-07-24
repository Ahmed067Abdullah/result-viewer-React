import React from 'react';
import ReactApexChart from 'react-apexcharts';
import ReactModal from 'react-modal';
import modalStyles from '../../common/modalStyles';
import classes from './GenderSegregatedGraphModal.module.css';

const GenderSegregatedGraphModal = ({ allStudents, open, handleClose }) => {
  const barGraphData = [{
    name: 'Girls',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }, {
    name: 'Boys',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }];

  for (let i = 0; i < allStudents.length; i++) {
    const { gender, cgpa } = allStudents[i];
    let index = null;
    if (cgpa > 3) {
      index = +(4.000 - cgpa).toString().split(".")[1][0] + 1;
    } else {
      index = 11;
    }
    barGraphData[gender].data[index]++;
  }

  return (
    <ReactModal
      isOpen={open}
      style={modalStyles}
    >
      <div className='cross-icon-container'>
        <p>Gender Segregated Graph (CGPA)</p>
        <button onClick={handleClose}>&#10006;</button>
      </div>
      <div className={classes['graph-container']}>
        <div>
          <ReactApexChart
            height={'400'}
            options={{
              chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                  show: false
                },
              },
              xaxis: {
                categories: ['4', '3.9', '3.8', '3.7', '3.6', '3.5', '3.4', '3.3', '3.2', '3.1', '3.0', '< 3.0'],
              }
            }}
            series={barGraphData}
            type="bar"
            width={'100%'}
          />
        </div>
      </div>
    </ReactModal>
  );
};

export default GenderSegregatedGraphModal;
