/*google.charts.load('current', { packages: ['corechart', 'line'] });*/
google.charts.load('visualization', '1.0', { 'packages': ['corechart', 'bar', 'line', 'geochart'] });
//google.charts.load('current', { 'packages': ['corechart', 'bar', 'line', 'geochart'], 'mapsApiKey': 'AIzaSyDzZ6uwr469KAgQeW2GFqSYxykj3Zmag8U' });
var geoChart;
var GoogleChart = {};
var cal;
var calArr = new Array();
GoogleChart.drawChartEquityChart = function (params) {

    var arrInput = params.xs;
    var element = params.element;
    var colors = params.colors;

    var data = new google.visualization.DataTable();
    data.addColumn('date', 'X');
    data.addColumn('number', 'Equity');

    for (var i = 0; i < arrInput.length; i++) {
        data.addRow([new Date(arrInput[i].date), arrInput[i].pnl]);
    }
    var options = {
        height: 300,
        legend: { position: 'none' },
        chartArea: {
            left: "7%",
            top: "4%",
            height: "85%",
            width: "85%"
        },
        legend: { position: 'none' },
        vAxis: {
            format: 'short',
            textStyle: { color: 'gray' },
            'stroke-color': 'transparent'
        },
        hAxis: {
            format: 'MMM-yy',
            textStyle: { color: 'gray' },
            'stroke-color': 'transparent'
        },
        backgroundColor: { fill: 'transparent' },
        colors: colors

    };

    var chart = new google.visualization.LineChart(document.getElementById(element));
    chart.draw(data, options);
    window.addEventListener('resize', function () {
        chart.draw(data, options);
    }, false);
}

GoogleChart.drawLineChartForPNLData = function (params) {

    var arrInput = params.xs;
    var element = params.element;
    var colors = params.colors;

    var data = new google.visualization.DataTable();
    data.addColumn('datetime', 'X');
    data.addColumn('number', 'Equity');

    for (var i = 0; i < arrInput.length; i++) {
        data.addRow([new Date(arrInput[i].created_at), arrInput[i].total_profit]);
    }
    var options = {
        height: 300,
        legend: { position: 'none' },
        chartArea: {
            left: "7%",
            top: "4%",
            height: "85%",
            width: "85%"
        },
        legend: { position: 'none' },
        vAxis: {
            format: 'short',
            textStyle: { color: 'gray' },
            'stroke-color': 'transparent'
        },
        hAxis: {
            format: 'HH:mm',
            textStyle: { color: 'gray' },
            'stroke-color': 'transparent'
        },
        backgroundColor: { fill: 'transparent' },
        colors: colors

    };

    var chart = new google.visualization.LineChart(document.getElementById(element));
    //chart.draw(data, options);
    setTimeout(function () {
        chart.draw(data, options);
    }, 1000)
    window.addEventListener('resize', function () {
        chart.draw(data, options);
    }, false);
}

GoogleChart.drawChartEquityBothChart = function (params) {

    var arrInput = params.xs;
    var element = params.element;
    var colors = params.colors;
    var columns = params.columns;

    var data = new google.visualization.DataTable();
    data.addColumn('date', 'X');

    for (var i = 0; i < columns.length; i++) {
        data.addColumn('number', columns[i]);
    }
    // data.addColumn('number', 'Net PNL');
    //data.addColumn('number', 'Realized PnL');

    for (var i = 0; i < arrInput.length; i++) {
        data.addRow([new Date(arrInput[i].date), arrInput[i].netpnl, arrInput[i].pnl]);
    }
    var options = {
        legend: { position: 'none' },
        height: 300,
        chartArea: {
            left: "7%",
            top: "4%",
            height: "85%",
            width: "85%"
        },
        legend: { position: 'none' },
        vAxis: {
            format: 'short',
            textStyle: { color: 'gray' },
            'stroke-color': 'transparent'
        },
        hAxis: {
            format: 'MMM-yy',
            textStyle: { color: 'gray' },
            'stroke-color': 'transparent'
        },
        backgroundColor: { fill: 'transparent' },
        colors: colors

    };

    var chart = new google.visualization.LineChart(document.getElementById(element));
    chart.draw(data, options);
    window.addEventListener('resize', function () {
        chart.draw(data, options);
    }, false);
}

GoogleChart.drawChartAreaChart = function (params) {

    var arrInput = params.xs;
    var element = params.element;

    var data = new google.visualization.DataTable();
    data.addColumn('date', 'X');
    data.addColumn('number', 'Equity');

    for (var i = 0; i < arrInput.length; i++) {
        data.addRow([new Date(arrInput[i].date), arrInput[i].pnl]);
    }
    var data1 = new google.visualization.DataTable();
    data1.addColumn('date', 'X');
    data1.addColumn('number', 'PNL');

    for (var i = 0; i < arrInput.length; i++) {
        data1.addRow([new Date(arrInput[i].date), arrInput[i].charges]);
    }

    var options = {
        legend: { position: 'none' },
        height: 300,
        chartArea: {
            left: "7%",
            top: "4%",
            height: "85%",
            width: "85%"
        },
        series: {
            0: { color: '#e2431e' }
        },
        legend: { position: 'none' },
        vAxis: {
            format: 'short',
            textStyle: { color: 'gray' },
            'stroke-color': 'transparent'
        },
        hAxis: {
            format: 'MMM-yy',
            textStyle: { color: 'gray' },
            'stroke-color': 'red'
        },
        backgroundColor: { fill: 'transparent' }
    };

    var chart = new google.visualization.AreaChart(document.getElementById(element));
    chart.draw(data, options);
    window.addEventListener('resize', function () {
        chart.draw(data, options);
    }, false);

    //var chart1 = new google.visualization.AreaChart(document.getElementById('google_net_profit_loss_pnl_area'));
    //chart1.draw(data1, options);
    //window.addEventListener('resize', function () {
    //    chart.draw(data1, options);
    //}, false);
}

GoogleChart.DrawChartLossProfitChart = function (params) {

    var arrInput = params.xs;
    var typeStr = params.types;

    var arrData2 = new Array();
    arrData2.push(["Month", "Profit", { role: 'style' }]);

    for (var i = 0; i < arrInput.length; i++) {
        var subArr2 = new Array();
        subArr2.push(new Date(arrInput[i].date));
        subArr2.push(arrInput[i].pnl);
        if (arrInput[i].pnl < 0) {
            subArr2.push('color: #dc3912');
        } else {
            subArr2.push('color: #109618');
        }
        arrData2.push(subArr2);
    }

    var data = new google.visualization.arrayToDataTable(arrData2);

    var options = {
        height: 300,
        chartArea: {
            left: "7%",
            top: "4%",
            height: "85%",
            width: "85%"
        },
        legend: { position: 'none' },
        vAxis: { format: 'short', textStyle: { color: 'gray' } },
        hAxis: { format: 'MMM-yy', textStyle: { color: 'gray' } },
        backgroundColor: { fill: 'transparent' }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('google_bar_pnl'));
    chart.draw(data, options);
    window.addEventListener('resize', function () {
        chart.draw(data, options);
    }, false);
}

GoogleChart.DrawChartBarAllChart = function (params) {

    var arrInput = params.xs;
    var typeStr = params.types;

    var arrData2 = new Array();
    arrData2.push(["Month", "Net PNL", { role: 'style' }, "PNL", { role: 'style' }, "Charge", { role: 'style' }]);
    for (var i = 0; i < arrInput.length; i++) {
        var subArr2 = new Array();
        subArr2.push(new Date(arrInput[i].date));

        subArr2.push(arrInput[i].netpnl);
        if (arrInput[i].netpnl < 0) {
            subArr2.push('color: #dc3912');
        } else {
            subArr2.push('color: #109618');
        }
        subArr2.push(arrInput[i].pnl);
        if (arrInput[i].pnl < 0) {
            subArr2.push('color: #FA8072');
        } else {
            subArr2.push('color: #90EE90');
        }
        subArr2.push(arrInput[i].charges);
        subArr2.push('color: #02a8b5');
        arrData2.push(subArr2);
    }

    var data = new google.visualization.arrayToDataTable(arrData2);

    var options = {
        height: 300,
        chartArea: {
            left: "7%",
            top: "4%",
            height: "85%",
            width: "85%"
        },
        legend: { position: 'none' },
        //colors: ['#00FF7F', '#90EE90', '#3366cc'],
        vAxis: { format: 'short', textStyle: { color: 'gray' } },
        hAxis: { format: 'MMM-yy', textStyle: { color: 'gray' } },
        backgroundColor: { fill: 'transparent' }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('google_bar_all_pnl'));
    chart.draw(data, options);
    window.addEventListener('resize', function () {
        chart.draw(data, options);
    }, false);
}

GoogleChart.DrawChartBarStackedChart = function (params) {

    var arrInput = params.xs;
    var typeStr = params.types;

    var arrData2 = new Array();
    arrData2.push(["Month", "Net PNL", { role: 'style' }, "Charge", { role: 'style' }]);
    for (var i = 0; i < arrInput.length; i++) {
        var subArr2 = new Array();
        subArr2.push(new Date(arrInput[i].date));

        subArr2.push(arrInput[i].netpnl);
        if (arrInput[i].netpnl < 0) {
            subArr2.push('color: #dc3912');
        }
        else {
            subArr2.push('color: #109618');
        }

        subArr2.push(arrInput[i].charges);
        subArr2.push('color: #02a8b5');
        arrData2.push(subArr2);
    }

    var data = new google.visualization.arrayToDataTable(arrData2);

    var options = {
        height: 300,
        chartArea: {
            left: "7%",
            top: "4%",
            height: "85%",
            width: "85%"
        },
        isStacked: true,
        legend: { position: 'none' },
        //colors: ['#00FF7F', '#90EE90', '#3366cc'],
        vAxis: { format: 'short', textStyle: { color: 'gray' } },
        hAxis: { format: 'MMM-yy', textStyle: { color: 'gray' } },
        backgroundColor: { fill: 'transparent' }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('google_bar_stacked_pnl'));
    chart.draw(data, options);
    window.addEventListener('resize', function () {
        chart.draw(data, options);
    }, false);
}

GoogleChart.DrawChartLossProfitPieChart = function (params) {

    var arrInput = params.xs;
    var typeStr = params.types;

    var arrData2 = new Array();
    arrData2.push(["Task", "Hours per Day"]);

    for (var i = 0; i < arrInput.length; i++) {
        var subArr2 = new Array();
        subArr2.push(arrInput[i].weekDay);

        if (arrInput[i].pnl < 0) {
            subArr2.push(0);
        } else {
            subArr2.push(parseInt(arrInput[i].pnl));
        }
        arrData2.push(subArr2);
    }
    var data = new google.visualization.arrayToDataTable(arrData2);

    var options = {
        height: 300,
        chartArea: {
            left: "7%",
            top: "4%",
            height: "85%",
            width: "85%"
        },
        backgroundColor: { fill: 'transparent' },
        legend: { textStyle: { color: 'gray' } }
    };

    var chart = new google.visualization.PieChart(document.getElementById('google_pie_pnl'));
    chart.draw(data, options);

    window.addEventListener('resize', function () {
        chart.draw(data, options);;
    }, false);
}

GoogleChart.drawDonutChart = function (params) {

    var arrInput = params.xs;
    var element = params.element;
    var colors = params.colors;
    var arrData2 = new Array();
    arrData2.push(["Task", "Hours per Day"]);

    for (var i = 0; i < arrInput.length; i++) {
        var subArr2 = new Array();

        //subArr2.push(arrInput[i].weekday);
        //if (arrInput[i].pnl < 0) {
        //    subArr2.push(arrInput[i].pnl * -1);
        //} else {
        //    subArr2.push(parseInt(arrInput[i].pnl));
        //}
        //arrData2.push(subArr2);


        if (arrInput[i].pnl > 0) {
            subArr2.push(arrInput[i].weekday);
            subArr2.push(parseInt(arrInput[i].pnl));
            arrData2.push(subArr2);
        }

    }

    var data = new google.visualization.arrayToDataTable(arrData2);

    var options = {
        height: 300,
        chartArea: {
            left: "7%",
            top: "4%",
            height: "85%",
            width: "85%"
        },
        pieHole: 0.75,
        pieSliceText: 'none',
        backgroundColor: { fill: 'transparent' },
        legend: { textStyle: { color: 'gray' } },
        is3D: true,
        colors: colors
    };

    var chart = new google.visualization.PieChart(document.getElementById(element));
    chart.draw(data, options);
    window.addEventListener('resize', function () {
        chart.draw(data, options);;
    }, false);
}

GoogleChart.DrawRegionsMap = function (params) {
    var dataArr = params.items;
    var total = 6961500;
    var dataVal = [];
    var strarr = new Array();
    dataVal.push(['Country', 'Popularity']);
    for (var i = 0; i < dataArr.length; i++) {
        dataVal.push([dataArr[i].name, dataArr[i].value]);
        strarr.push(dataArr[i].name);
    }

    var data = google.visualization.arrayToDataTable(dataVal);

    var options = {
        colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },


        defaultColor: '#f5f5f5',
    };

    geoChart = new google.visualization.GeoChart(document.getElementById('regions_country_map'));
    geoChart.draw(data, options);
}

GoogleChart.ExportRegionsMap = function (params) {
    var filePath = geoChart.getImageURI();
    var a = document.createElement("a"); //Create <a>
    a.href = filePath //Image Base64 Goes here
    a.download = "Image.png"; //File name Here
    a.click(); //Downloaded file
}

GoogleChart.drawPayOffChart = function (params) {

    var arrInputs = params.xs;
    console.log("load chart");
    console.log(arrInputs.length);
    for (var j = 0; j < arrInputs.length; j++) {
        var arrInput = arrInputs[j].chart;
        var palyOffChartId = `google_line_payoff_${j}`;
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Price')
        data.addColumn('number', 'P&LA');
        data.addColumn({ role: 'style' });
        data.addColumn({ type: 'string', role: 'tooltip' });
        data.addColumn('number', 'P&L');
        data.addColumn({ role: 'style' });
        data.addColumn({ type: 'string', role: 'tooltip' });

        for (var i = 0; i < arrInput.length; i++) {
            var dyColor = "";
            if (arrInput[i].final > 0) {
                dyColor = 'color: #45b001';
            } else {
                dyColor = 'color: #ec6500';
            }

            data.addRow([arrInput[i].stockprice, arrInput[i].final, dyColor, `P&L ${arrInput[i].final} \nChg. from Spot: (${arrInput[i].change}%)`, arrInput[i].today, 'color: #0000FF', `P&L - ${arrInput[i].today}`]);
        }

        var options = {
            title: 'PlayOff chart',
            focusTarget: 'category',
            legend: { position: 'none' },
            color: '#871b47',
            crosshair: { trigger: 'both', orientation: 'vertical', color: '#6ab7f3' },
            vAxis: {
                title: 'Profit & Loss',
                textStyle: { color: 'gray' },
                'stroke-color': 'transparent',
                logScale: false
            },
            hAxis: {
                title: 'Price',
                textStyle: { color: 'gray' },
                'stroke-color': 'transparent',
                logScale: false
            },
            seriesType: 'area',
            series: { 1: { type: 'line', lineDashStyle: [6, 6], axis: 'brightness' } }
        };
        console.log(palyOffChartId);
        var chart = new google.visualization.ComboChart(document.getElementById(palyOffChartId));

        chart.draw(data, options);


    }

}

GoogleChart.drawPayOffChart1 = function (params) {

    var arrInput = params.xs;
    var index = params.index;

    var palyOffChartId = `google_line_payoff_${index}`;
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Price')
    data.addColumn('number', 'P&LA');
    data.addColumn({ role: 'style' });
    data.addColumn({ type: 'string', role: 'tooltip' });
    data.addColumn('number', 'P&L');
    data.addColumn({ role: 'style' });
    data.addColumn({ type: 'string', role: 'tooltip' });

    for (var i = 0; i < arrInput.length; i++) {
        var dyColor = "";
        if (arrInput[i].final > 0) {
            dyColor = 'color: #45b001';
        } else {
            dyColor = 'color: #ec6500';
        }

        data.addRow([arrInput[i].stockprice, arrInput[i].final, dyColor, `P&L ${arrInput[i].final} \nChg. from Spot: (${arrInput[i].change}%)`, arrInput[i].today, 'color: #0000FF', `P&L - ${arrInput[i].today}`]);
    }

    var options = {
        title: 'PlayOff chart',
        focusTarget: 'category',
        legend: { position: 'none' },
        color: '#871b47',
        crosshair: { trigger: 'both', orientation: 'vertical', color: '#6ab7f3' },
        vAxis: {
            title: 'Profit & Loss',
            textStyle: { color: 'gray' },
            'stroke-color': 'transparent',
            logScale: false
        },
        hAxis: {
            title: 'Price',
            textStyle: { color: 'gray' },
            'stroke-color': 'transparent',
            logScale: false
        },
        seriesType: 'area',
        series: { 1: { type: 'line', lineDashStyle: [6, 6], axis: 'brightness' } }
    };
    console.log(palyOffChartId);
    var chart = new google.visualization.ComboChart(document.getElementById(palyOffChartId));

    chart.draw(data, options);

}

GoogleChart.drawCalHeatMap = function (params) {

    if (calArr.length > 0) {
        for (var i = 0; i < calArr.length; i++) {
            calArr[i].destroy();
        }

    }

    var parser = function (data) {
        var stats = {};
        for (var d in data) {
            stats[data[d].date] = data[d].value;
        }
        return stats;
    };

    var minValue = parseInt(params.min);
    var maxValue = parseInt(params.max);
    var eualPart = parseInt(minValue * -1 / 4);
    var eualPart2 = parseInt(maxValue / 4);

    var legend = new Array();
    legend.push(minValue + eualPart, (eualPart + eualPart) * -1, eualPart * -1, -1, 1, eualPart2, (eualPart2 + eualPart2), maxValue - eualPart2)
    console.log(legend);
    var arr = params.data;

    for (var i = 0; i < arr.length; i++) {
        var testData = document.getElementById(`heat_map_cal_${(new Date(arr[i].calstartdate)).getFullYear()}`);
        console.log(testData);
        var obj = arr[i];
        var cal1 = new CalHeatMap();
        cal1.init({
            itemSelector: `#heat_map_cal_${(new Date(obj.calstartdate)).getFullYear()}`,
            start: new Date(obj.calstartdate),
            domain: "month",
            cellSize: 12,
            range: obj.range,
            weekStartOnMonday: false,
            domainGutter: 10,
            data: obj.data,
            afterLoadData: parser,
            domainLabelFormat: "%b-%Y",
            legendHorizontalPosition: "left",
            legendCellSize: 20,
            legend: legend,
            displayLegend: arr.length == (i + 1),
            considerMissingDataAsZero: false,
            legendColors: {
                empty: "rgb(237,237,237)",
            },
            tooltip: true,
            cellLabel: {
                empty: "Aucune données pour le {date}",
                filled: `{count} {name} at {date}`
            },
            onClick: function (date, nb) {
                var allrecords = params.records;
                var dayRecords = $.grep(allrecords, function (v) {
                    return moment(v.date).format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD');
                });
                if (dayRecords.length > 0)
                    heatmapSegment(moment(date).format('MMM DD, YYYY'), dayRecords);
            }
        });
        calArr.push(cal1);
    }

    $(".graph-label").on('click', function () {
        var allrecords = params.records;
        $(".graph-label").removeClass('active');
        $(this).addClass('active');
        var textMonth = $(this).html();
        var monthRecords = $.grep(allrecords, function (v) {
            return moment(v.date).format('MMM-YYYY') == textMonth;
        });
        if (monthRecords.length > 0)
            heatmapSegment(textMonth, monthRecords);
    })
}

function heatmapSegment(dateTitle, records) {

    let result = [];
    records.reduce(function (res, value) {
        if (!res[value.segment]) {
            res[value.segment] = { segment: value.segment, value: 0, charges:0 };
            result.push(res[value.segment])
        }
        res[value.segment].value += value.value;
        res[value.segment].charges += value.charges;
        return res;
    }, {});

    if (result.length > 0) {
        var $segHtml = '';
        for (var i = 0; i < result.length; i++) {
            var seg = "";
            // switch result[i].segment    
            switch (result[i].segment) {
                case 'EQ':
                    seg = "Equity";
                    break;
                case 'FO':
                    seg = "F&amp;O";
                    break;
                default:
            }
            $segHtml += `<div class="heatmap-segment">
                                        <p>${seg}:</p> <span class="${result[i].value < 0 ? 'neg' : 'pos'}">${formatMoney(result[i].value, 2)}</span><p style="padding-left: 5px;">Charges:</p><span style="padding-left: 5px;">${formatMoney(result[i].charges, 2)}</span>
                                    </div>`;
        }
        $('#heatmap_count').html(`<div class="heatmap-count"><p class="heatmap-date-label">Net realised P&amp;L</p> <p class="heatmap-date">${dateTitle}</p>${$segHtml}</div>`);
    }
}

function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign +
            (j ? i.substr(0, j) + thousands : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};