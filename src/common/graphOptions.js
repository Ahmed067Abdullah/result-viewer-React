export default flag => ({
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: true
    },
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: 'straight',
    width: 2,
  },
  title: {
    text: `University result: ${flag ? 'CGPA' : 'GPA'}`,
    align: 'left'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
  },
  yaxis: {
    min: 2.5,
    max: 4
  }
});