import React, { useState } from 'react';
import ReactModal from 'react-modal';
import modalStyles from '../../common/modalStyles';
import classes from './FactsModal.module.css';

const FactsModal = ({ avgGPAs, data, removeFromDOM }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      removeFromDOM();
    }, 500);
  }

  let max4GPAsByStudent = { name: '', count: 0 };
  let max4GPAsInASemester = [0, 0, 0, 0, 0, 0, 0, 0];
  let max4GPAsInOneSemester = {};
  let semestersWithNo4GPAs = [];
  let studentsScoring4GPAs = 0;
  let studentsWithAbove3point7CGPA = 0;
  let studentsWithAbove3point5CGPA = 0;
  let studentsWithAbove3CGPA = 0;
  let totalCGPAs = 0;
  let totalCGPAOfBoys = 0;
  let totalCGPAOfGirls = 0;
  let totalBoys = 0;
  let totalGirls = 0;
  let boyWith4GPA = false;
  let girlWith4GPA = false;

  for (let i = 0; i < data.length; i++) {
    const { results, name, cgpa, gender } = data[i];

    let count4GPAs = 0;
    for (let j = 0; j < results.length; j++) {
      if (results[j] === 4.00) {
        max4GPAsInASemester[j]++;
        count4GPAs++;
        if (gender) {
          boyWith4GPA = true;
        } else {
          girlWith4GPA = true;
        }
      }
    }
    if (count4GPAs > max4GPAsByStudent.count) {
      max4GPAsByStudent = { name, count: count4GPAs }
    }
    if (count4GPAs) {
      studentsScoring4GPAs++;
    }
    if (cgpa > 2.99) {
      studentsWithAbove3CGPA++;
      if (cgpa > 3.49) {
        studentsWithAbove3point5CGPA++;
        if (cgpa > 3.69) {
          studentsWithAbove3point7CGPA++;
        }
      }
    }
    totalCGPAs += +cgpa;
    if (gender) {
      totalCGPAOfBoys += +cgpa;
      totalBoys++;
    } else {
      totalCGPAOfGirls += +cgpa;
      totalGirls++;
    }
  }


  max4GPAsInOneSemester = { number: 0, count: 0 };
  for (var i = 0; i < max4GPAsInASemester.length; i++) {
    if (max4GPAsInASemester[i] > max4GPAsInOneSemester.count) {
      max4GPAsInOneSemester = { number: i + 1, count: max4GPAsInASemester[i] };
    }
    if (!max4GPAsInASemester[i]) {
      semestersWithNo4GPAs.push(i);
    }
  }

  const avgCGPA = (totalCGPAs / data.length).toFixed(3);
  const avgCGPAOfBoys = (totalCGPAOfBoys / totalBoys).toFixed(3);
  const avgCGPAOfGirls = (totalCGPAOfGirls / totalGirls).toFixed(3);

  let maxAvgGPA = { number: 1, value: avgGPAs[0] };
  let minAvgGPA = { number: 1, value: avgGPAs[0] };
  for (let i = 1; i < avgGPAs.length; i++) {
    if (avgGPAs[i] > maxAvgGPA.value) {
      maxAvgGPA = { number: i + 1, value: avgGPAs[i] };
    }
    if (avgGPAs[i] < minAvgGPA.value) {
      minAvgGPA = { number: i + 1, value: avgGPAs[i] };
    }
  }

  let no4GPAGender = '';
  if (!boyWith4GPA && girlWith4GPA) {
    no4GPAGender = <li>None of the <span>boys</span> have ever scored 4 GPA.</li>;
  }
  if (boyWith4GPA && !girlWith4GPA) {
    no4GPAGender = <li>None of the <span>girls</span> have ever scored 4 GPA.</li>;
  }

  return (
    <ReactModal
      closeTimeoutMS={500}
      isOpen={open}
      style={modalStyles}
    >
      <div className='cross-icon-container'>
        <p>Interesting facts</p>
        <button onClick={handleClose}>&#10006;</button>
      </div>
      <p className="info-text">Calculated from available data.</p>
      <div className={classes['content-container']}>
        <ol>
          <li>Total <span>{studentsScoring4GPAs}</span> students have secured 4 GPA till now.</li>
          <li><span>{max4GPAsByStudent.name}</span> has scored 4 GPA the most <span>({max4GPAsByStudent.count})</span> times.</li>
          <li>Semester <span>{max4GPAsInOneSemester.number}</span> had the most <span>({max4GPAsInOneSemester.count})</span> 4 GPA scoring students.</li>
          <li>Semester <span>{semestersWithNo4GPAs.join(",")}</span> had no student able to score 4 GPA.</li>
          {no4GPAGender}
          <li>The average CGPA of the class is <span>{avgCGPA}</span>.</li>
          <li>The average CGPA of Boys in the class is <span>{avgCGPAOfBoys}</span>.</li>
          <li>The average CGPA of Girls in the class is <span>{avgCGPAOfGirls}</span>.</li>
          <li>Semester <span>{maxAvgGPA.number}</span> had the best overall class result with average GPA of <span>{maxAvgGPA.value}</span>.</li>
          <li>Semester <span>{minAvgGPA.number}</span> had the worst overall class result with average GPA of <span>{minAvgGPA.value}</span>.</li>
          <li>There are <span>{studentsWithAbove3point7CGPA}</span> students having CGPA over 3.7.</li>
          <li>There are <span>{studentsWithAbove3point5CGPA}</span> students having CGPA over 3.5.</li>
          <li>There are <span>{studentsWithAbove3CGPA}</span> students having CGPA over 3.0.</li>
          {/* <li>Aap stable hote reh jaenge, unk 2 bche bi ho chuke hnge <span role="img" aria-label="">😂😂</span>.</li> */}
        </ol>
      </div>
    </ReactModal >
  );
};

export default FactsModal;
