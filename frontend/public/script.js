// d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", function (err, rows) {
d3.csv("/output.csv", function (err, rows) {

  function unpack(rows, key) {
    return rows.map(function (row) { return row[key]; });
  }

  function cluster_archs(rows) {
    var map = new Map();
    rows.forEach(element => {
      if (!map.has(element["architecture"])) {
        map[element["architecture"]] = [];
      }
      map[element["architecture"]].push([element["committer_date_readable"], element["source_lines_of_code"]]);
    });
    return map;
  }

  // var trace1 = {
  //   type: "scatter",
  //   mode: "markers",
  //   x: unpack(rows, 'committer_date_readable'),
  //   y: unpack(rows, 'source_lines_of_code'),
  //   line: { color: '#17BECF' }
  // }

  function trace_from_data(map, name) {
    var x = [];
    var y = [];
    map[name].forEach(date => {
      console.log(date)
      x.push(date[0]);
      y.push(date[1])
    });
    return {
      type: "scatter",
      mode: "markers",
      x: x,
      y: y,
      line: { color: '#17BECF' }

    }
  }
  const traces = cluster_archs(rows)
  var archs = unpack(rows, "architecture")
  var data = []
  archs.forEach(element => {
    data.push(trace_from_data(traces, element))    
  });
  // var data = traces.forEach(function(key) {trace_from_data(traces, key)});
  // var data = [trace_from_data(traces, "arm")]
  var layout = {
    title: {
      text: 'kconfig (cumulative)'
    },
    xaxis: {
      range: ['2002-01-01', '2024-12-31'],
      type: 'date',
      title: 'Date of commit2'
    },
    yaxis: {
      autorange: true,
      // range: [86.8700008333, 138.870004167],
      type: 'linear',
      title: 'Source LOC'
    },
  };

  // console.log(data);

  Plotly.newPlot('myDiv', data, layout);
})
