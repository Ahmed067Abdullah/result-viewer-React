import React from 'react';
import modalStyles from '../../common/modalStyles';
import ReactModal from 'react-modal';
import classes from './FactsModal.module.css';

const FactsModal = ({ data, open, handleClose }) => {
  let max4GPAsByStudent = { name: '', count: 0 };
  let max4GPAsInASemester = [0, 0, 0, 0, 0, 0, 0];
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

  for (let i = 0; i < data.length; i++) {
    const { results, name, cgpa, gender } = data[i];

    let count4GPAs = 0;
    for (let j = 0; j < results.length; j++) {
      if (results[j] === 4.00) {
        max4GPAsInASemester[j]++;
        count4GPAs++;
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

  return (
    <ReactModal
      isOpen={open}
      style={modalStyles}
    >
      <div className='cross-icon-container'>
        <p>Interesting facts</p>
        <button onClick={handleClose}>&#10006;</button>
      </div>
      <div className={classes['content-container']}>
        <ol>
          <li>Total <span>{studentsScoring4GPAs}</span> students have secured 4 GPA in a semester till now.</li>
          <li><span>{max4GPAsByStudent.name}</span> has scored 4 GPA the most <span>({max4GPAsByStudent.count})</span> times.</li>
          <li>Semester <span>{max4GPAsInOneSemester.number}</span> had the most <span>({max4GPAsInOneSemester.count})</span> 4 GPA scoring students.</li>
          <li>Semester <span>{semestersWithNo4GPAs.join(",")}</span> had no student able to score 4 GPA.</li>
          <li>None of the <span>boys</span> have ever scored 4 GPA</li>
          <li>The average CGPA of the class is <span>{avgCGPA}</span></li>
          <li>The average CGPA of Boys in the class is <span>{avgCGPAOfBoys}</span></li>
          <li>The average CGPA of Girls in the class is <span>{avgCGPAOfGirls}</span></li>
          <li>There are <span>{studentsWithAbove3point7CGPA}</span> students having CGPA over 3.7.</li>
          <li>There are <span>{studentsWithAbove3point5CGPA}</span> students having CGPA over 3.5.</li>
          <li>There are <span>{studentsWithAbove3CGPA}</span> students having CGPA over 3.0.</li>
          <li>Aap stable hote reh jaenge, unk 2 bche bi ho chuke hnge <span role="img" aria-label="">😂😂</span>.</li>
        </ol>
      </div>
    </ReactModal >
  )
}

export default FactsModal;
