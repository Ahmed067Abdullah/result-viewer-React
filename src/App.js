import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ReactApexChart from 'react-apexcharts';
import AddMyDataModal from './components/add-my-data-modal/AddMyDataModal';
import OverallResultModal from './components/overall-result-modal/OverallResultModal';
import data from './common/data2';
import graphOptions from './common/graphOptions';
import creditHours from './common/creditHours';
import './App.css';
import FactsModal from './components/facts-modal/FactsModal';
import { updateCount, updateSelectCount } from './components/add-my-data-modal/AddMyDataModal.service';

const App = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [showCGPA, setShowCGPA] = useState(false);
  const [showAvg, setShowAvg] = useState(false);
  const [avgGPAs, setAvgGPAs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showFactsModal, setShowFactsModal] = useState(false);

  useEffect(() => {
    updateCount();
    setAllStudents(data.map(o => ({
      ...o,
      'cgpa': getCGPA(o.results)
    })));

    const sumGPAs = data.reduce(
      (totalArr, d) => totalArr.map((t, i) => t + d.results[i]),
      [0, 0, 0, 0, 0, 0, 0]
    );
    setAvgGPAs(sumGPAs.map(s => (s / data.length).toFixed(3)));
  }, []);

  const downloadDataHandler = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  const getSumOfArray = arr => arr.reduce((total, r) => r + total, 0);

  const getCGPA = results => {
    if (!results || !results.length) return 0;
    if (results.length === 1) return results[0];
    const totalGPA = getSumOfArray(results.map((r, i) => r * creditHours[i]));
    const totalCH = getSumOfArray(creditHours.slice(0, results.length));
    return (totalGPA / totalCH).toFixed(3);
  };

  let graphData = [];
  let CGPAs = [];
  if (students.length) {
    if (showCGPA) {
      for (let i = 0; i < students.length; i++) {
        const { name, results, cgpa } = students[i];
        graphData.push({ name, data: results.map((_, j) => getCGPA(results.slice(0, j + 1))) });
        CGPAs.push({ name, cgpa });
      }
    } else {
      for (let i = 0; i < students.length; i++) {
        const { name, results: data, cgpa } = students[i];
        graphData.push({ name, data });
        CGPAs.push({ name, cgpa });
      }
    }
    if (showAvg) {
      graphData.push({ name: "Average GPA", data: avgGPAs });
    }
  }

  return (
    <div>
      <div className="top-btns-container">
        <button
          onClick={() => setShowModal(true)}>
          {'Add/Edit my data'}
        </button>
        <button
          onClick={downloadDataHandler}>
          {'Download JSON data'}
        </button>
        <button
          onClick={() => setShowFactsModal(true)}>
          {'Some interesting facts'}
        </button>
        <button
          onClick={() => setShowResultModal(true)}>
          {'View overall result'}
        </button>
      </div>
      <AddMyDataModal
        open={showModal}
        handleClose={() => setShowModal(false)}
      />
      <OverallResultModal
        open={showResultModal}
        handleClose={() => setShowResultModal(false)}
        data={allStudents}
      />
      <FactsModal
        open={showFactsModal}
        handleClose={() => setShowFactsModal(false)}
        data={allStudents}
        avgGPAs={avgGPAs}
      />
      <p className="heading">Agae meri mout ka tamasha dekhne!</p>
      <div className="select-container">
        <Select
          isClearable
          isMulti
          isSearchable
          getOptionValue={o => o.roll}
          getOptionLabel={o => `${o.name} (${o.roll})`}
          onChange={val => {
            if (val && val.length) {
              const newStudent = val.find(v => !students.find(s => s.roll === v.roll));
              updateSelectCount(newStudent.roll);
            }
            setStudents(val || []);
          }}
          placeholder="Select students..."
          name="students"
          options={allStudents}
        />
      </div>
      {students.length
        ? <div className="student-data-container">
          <div className="note">Results may not be correct if the student has reattempted any course.</div>
          <div className="cgpa-container">
            {CGPAs.map((c, i) => <span key={i}>{`${c.name} (${c.cgpa})`}</span>)}
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

export default App;
