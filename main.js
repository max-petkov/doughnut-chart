const containerLabels = document.querySelector(".doughnut-labels");
const ctx = document.getElementById("doughnut-chart");
const config = {
  type: "doughnut",
  data: {
    labels: ["Accept", "Optimize", "Manage"],
    datasets: [
      {
        data: [87.2, 30.9, 40.7],
        backgroundColor: ["#CDE9FF", "#E0D0FF", "#CCFAE9"],
        hoverBackgroundColor: ["#CDE9FF", "#E0D0FF", "#CCFAE9"],
        cutout: "78%",
        borderWidth: 0,
        // rotation: 100,
      },
    ],
  },
  options: {
    animation: { duration: 0 },
    events: [],
    plugins: { legend: { display: false } },
  },
  plugins: [
    {
      afterDraw: (chart) => {
        const { width, height } = chart.chartArea;
        const gap = 16;

        console.log();

        chart.getDatasetMeta(0).data.forEach((datapoint, i) => {
          if (containerLabels.children.length !== chart.data.labels.length) {
            containerLabels.insertAdjacentHTML(
              "beforeend",
              `
                <div class="doughnut-label">
                    <div class="name">${chart.data.labels[i]}</div>
                    <div class="number" style="background-color: ${chart.data.datasets[0].backgroundColor[i]}">
                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.974609 15.9999L9.88539 0.851562L18.7962 15.9999H0.974609Z" fill="#020202"/>
                        </svg>
                        ${chart.data.datasets[0].data[i]}%
                    </div>
                </div>`
            );
          }

          const label = containerLabels.querySelectorAll(".doughnut-label")[i];
          const labelWidth = label.getBoundingClientRect().width;
          const labelHeight = label.getBoundingClientRect().height;

          let x = datapoint.tooltipPosition().x;
          let y = datapoint.tooltipPosition().y;

          const halfWidth = x > width / 2 ? "+" : "-";
          const halfHeight = y > height / 2 ? "+" : "-";

          label.style.top = y + "px";
          label.style.left = x + "px";

          label.style.transform = `translate(calc(-50% ${halfWidth} ${labelWidth}px), calc(-50% ${halfHeight} ${labelHeight}px))`;
        });
      },
    },
  ],
};

const doughnutChart = new Chart(ctx, config);
