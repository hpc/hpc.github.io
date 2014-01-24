  d3.json("https://api.github.com/users/hpc/repos", function (json) {
    var fill = d3.scale.category20();

    d3.layout.cloud().size([960, 600])
      .words(json.map(function (d) {
        return {
          text: d.name,
          href: d.html_url,
          size: json.length
        };
      }))
      .padding(5)
      .rotate(function () {
        return~~ (Math.random() * 2) * 90;
      })
      .font("Impact")
      .fontSize(function (d) {
        return d.size;
      })
      .on("end", draw)
      .start();

    function draw(words) {
      d3.select("body").append("svg")
        .attr("width", 960)
        .attr("height", 600)
        .append("g")
        .attr("transform", "translate(480,300)")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function (d) {
          return d.size + "px";
        })
        .style("font-family", "Impact")
        .style("fill", function (d, i) {
          return fill(i);
        })
        .attr("text-anchor", "middle")
        .attr("transform", function (d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) {
          return d.text;
        })
        .on('click', function (d) {
          window.location.href = d.href;
        });
    }

  });
