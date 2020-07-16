import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ReactApexChart from 'react-apexcharts';
import AddMyDataModal from '../../components/add-my-data-modal/AddMyDataModal';
import data from '../../common/data';
import graphOptions from '../../common/graphOptions';
import creditHours from '../../common/creditHours';
import './Result.css';

const Result = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [showCGPA, setShowCGPA] = useState(false);
  const [showAvg, setShowAvg] = useState(false);
  const [avgGPAs, setAvgGPAs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setAllStudents(data.map(o => ({
      ...o,
      'label': `${o.name} (${o.roll})`
    })));

    const sumGPAs = data.reduce(
      (totalArr, d) => totalArr.map((t, i) => t + d.results[i]),
      [0, 0, 0, 0, 0, 0, 0]
    );
    setAvgGPAs(sumGPAs.map(s => (s / data.length).toFixed(3)));

    // setStudents([{
    //   ...data[9],
    //   'label': `${data[9].name} (${data[9].roll})`
    // }])
  }, []);

  const getSumOfArray = arr => arr.reduce((total, r) => r + total, 0)

  const getCGPA = results => {
    if (!results || !results.length) return 0;
    if (results.length === 1) return results[0];
    const totalGPA = getSumOfArray(results.map((r, i) => r * creditHours[i]));
    const totalCH = getSumOfArray(creditHours.slice(0, results.length));
    return (totalGPA / totalCH).toFixed(3);
  };

  let graphData = [];
  let CGPAs = '';
  if (students.length) {
    if (showCGPA) {
      for (let i = 0; i < students.length; i++) {
        const { name, results } = students[i];
        graphData.push({ name, data: results.map((_, j) => getCGPA(results.slice(0, j + 1))) });
        CGPAs += `${getCGPA(results)}, `;
      }
    } else {
      for (let i = 0; i < students.length; i++) {
        const { name, results: data } = students[i];
        graphData.push({ name, data });
        CGPAs += `${getCGPA(data)}, `;
      }
    }
    if (showAvg) {
      graphData.push({ name: "Average GPA", data: avgGPAs });
    }
    CGPAs = CGPAs.slice(0, CGPAs.length - 2);
  }

  return (
    <div>
      <button
        className="add-my-data-btn"
        onClick={() => setShowModal(true)}>
        {'Add my data too'}
      </button>
      <AddMyDataModal
        open={showModal}
        handleClose={() => setShowModal(false)}
      />
      <p className="heading">Agae meri mout ka tamasha dekhne!</p>
      <div className="select-container">
        <Select
          isClearable
          isMulti
          getOptionValue={o => o.roll}
          onChange={val => setStudents(val || [])}
          placeholder="Select student..."
          isSearchable
          name="color"
          options={allStudents}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      {students.length
        ? <div className="student-data-container">
          <div className="cgpa-container">
            <span>CGPA(s):</span> {CGPAs}
          </div>
          <div className="graph-container">
            <ReactApexChart
              height={'100%'}
              options={graphOptions(showCGPA)}
              series={graphData}
              type="line"
              width={'100%'}
            />
          </div>
          <div className="button-container">
            <button onClick={() => setShowCGPA(!showCGPA)}>
              {`Show ${showCGPA ? 'GPA' : 'CGPA'} Graph`}
            </button>
            <button onClick={() => setShowAvg(!showAvg)}>
              {`${showAvg ? 'Hide' : 'Show'} Average Line`}
            </button>
          </div>
        </div>
        : null}
    </div>
  );
};

export default Result;
