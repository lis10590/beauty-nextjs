export const dataArrange = (monthSales) => {
  let arr = [];
  for (const item of monthSales) {
    const obj = {
      year: item.year,
      revenue: item.revenue,
    };
    switch (item.month) {
      case 1:
        obj.month = "Jan";
        break;
      case 2:
        obj.month = "Feb";
        break;
      case 3:
        obj.month = "Mar";
        break;
      case 4:
        obj.month = "Apr";
        break;
      case 5:
        obj.month = "May";
        break;
      case 6:
        obj.month = "Jun";
        break;
      case 7:
        obj.month = "Jul";
        break;
      case 8:
        obj.month = "Aug";
        break;
      case 9:
        obj.month = "Sep";
        break;
      case 10:
        obj.month = "Oct";
        break;
      case 11:
        obj.month = "Nov";
        break;
      default:
        obj.month = "Dec";
    }

    arr.push(obj);
  }

  return arr;
};

export const chartOptions = (title) => {
  return {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
};

export const chartData = (labels, data) => {
  return {
    labels: labels,
    datasets: [
      {
        label: "Revenue (ILS)",
        data: data,
        backgroundColor: ["#f14668"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
};
