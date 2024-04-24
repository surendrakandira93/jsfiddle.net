var GlobalPNL = {};

GlobalPNL.bindEquityChart= function(result) {
    var para = { xs: result, element: 'google_line_pnl', colors: ['#2c7be5'] };
    GoogleChart.drawChartEquityChart(para);
}

GlobalPNL.bindDrawDownChart= function(result) {
    var para = { xs: result, element: 'google_drawdown_pnl', colors: ['#fe595c'] };
    GoogleChart.drawChartEquityChart(para);
}

GlobalPNL.bindEquityBothChart= function(result) {
    var para = { xs: result, element: 'google_line_both_pnl', colors: ['#42a53f', '#2c7be5'], columns: ['Net PNL', 'Realized PnL'] };
    GoogleChart.drawChartEquityBothChart(para);
}

GlobalPNL.bindPnLAndDrawnDownChart= function(result) {
    var para = { xs: result, element: 'google_line_both_pnl_dd', colors: ['#42a53f', '#fe595c'], columns: ['PNL', 'DD'] };
    GoogleChart.drawChartEquityBothChart(para);
}

GlobalPNL.bindBarChart= function(result) {
    var para = { xs: result, element: 'google_bar_pnl' };
    GoogleChart.DrawChartLossProfitChart(para);
}

GlobalPNL.bindBarAllChart= function(result) {
    var para = { xs: result, element: 'google_bar_all_pnl' };
    GoogleChart.DrawChartBarAllChart(para);
}

GlobalPNL.bindBarStackedChart= function(result) {
    var para = { xs: result, element: 'google_bar_stacked_pnl' };
    GoogleChart.DrawChartBarStackedChart(para);
}

GlobalPNL.bindMonthlyBreaup= function(result) {
    $("#tbl_monthly").empty();
    var $html = `<div class="h-100"><div class="table-responsive scrollbar"><table class="table table-bordered"><thead><tr><th style="font-size: 12px;" scope="col">Year</th><th style="font-size: 12px;" scope="col">Jan</th><th style="font-size: 12px;" scope="col">Feb</th><th style="font-size: 12px;" scope="col">Mar</th><th style="font-size: 12px;" scope="col">Apr</th><th style="font-size: 12px;" scope="col">May</th><th style="font-size: 12px;" scope="col">Jun</th><th style="font-size: 12px;" scope="col">Jul</th><th style="font-size: 12px;" scope="col">Aug</th><th style="font-size: 12px;" scope="col">Sep</th><th style="font-size: 12px;" scope="col">Oct</th><th style="font-size: 12px;" scope="col">Nov</th><th style="font-size: 12px;" scope="col">Dec</th><th style="font-size: 12px;" scope="col">Total</th></tr></thead><tbody>`;
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            $html += `<tr><td>${result[i].year}</td>`;
            for (var j = 0; j < result[i].monthly.length; j++) {
                $html += `<td style="font-size:14px;color:${(result[i].monthly[j].pnl < 0 ? "#fe595c" : "#42a53f")};" data-bs-toggle="tooltip" data-bs-placement="top" title="${GlobalPNL.formatMoney(result[i].monthly[j].pnl)}">${result[i].monthly[j].pnlstr}</td>`;
            }
            $html += `<td style="font-size:14px;color:${(result[i].total < 0 ? "#fe595c" : "#42a53f")};" data-bs-toggle="tooltip" data-bs-placement="top" title="${GlobalPNL.formatMoney(result[i].total)}">${result[i].totalstr}</td></tr>`;
        }
    } else {
        $html += `<tr><td colspan="13">Data not foud</td></tr>`;
    }
    $("#tbl_monthly").html($html);
    GlobalPNL.tooltipInit();
}

GlobalPNL.bindWeeklyBreaup= function(result) {
    $("#tbl_weekly").empty();
    var $html = `<div class="h-100"><div class="table-responsive scrollbar"><table class="table table-bordered"><thead><tr><th style="font-size: 12px;" scope="col">Year</th><th style="font-size: 12px;" scope="col">Mon</th><th style="font-size: 12px;" scope="col">Tue</th><th style="font-size: 12px;" scope="col">Wed</th><th style="font-size: 12px;" scope="col">Thu</th><th style="font-size: 12px;" scope="col">Fri</th><th style="font-size: 12px;" scope="col">Sat</th><th style="font-size: 12px;" scope="col">Sun</th><th style="font-size: 12px;" scope="col">Total</th></tr></thead><tbody>`;
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            $html += `<tr><td>${result[i].year}</td>`;
            for (var j = 0; j < result[i].monthly.length; j++) {
                $html += `<td style="font-size:14px;color:${(result[i].monthly[j].pnl < 0 ? "#fe595c" : "#42a53f")};"  data-bs-toggle="tooltip" data-bs-placement="top" title="${GlobalPNL.formatMoney(result[i].monthly[j].pnl)}">${result[i].monthly[j].pnlstr}</td>`;
            }
            $html += `<td style="font-size:14px;color:${(result[i].total < 0 ? "#fe595c" : "#42a53f")};" data-bs-toggle="tooltip" data-bs-placement="top" title="${GlobalPNL.formatMoney(result[i].total)}">${result[i].totalstr}</td></tr>`;
        }
    } else {
        $html += `<tr><td colspan="6">Data not foud</td></tr>`;
    }
    $("#tbl_weekly").html($html);
    GlobalPNL.tooltipInit();
}

GlobalPNL.bindStatistics= function(result) {
    if (result) {
        $(".TotalTradingDays").html(result.totaltradingdays);
        $(".WinDays").html(result.windays);
        $(".LossDays").html(result.lossdays);
        $(".MaxWinningStreakDays").html(result.maxwinningstreakdays);
        $(".MaxLosingStreakDays").html(result.maxlosingstreakdays);
        $(".WinRate").html(`${result.winrate.toFixed(2)} %`);
        $(".AvgMonthlyProfit").html(`Rs. ${result.avgmonthlyprofitstr}`);
        $(".TotalProfit").html(`Rs. ${result.totalprofitstr}`);
        $(".TotalProfit").attr("title", GlobalPNL.formatMoney(result.totalprofit));

        $(".MaxProfitinaDay").html(`Rs. ${result.maxprofitadaystr}`);
        $(".MaxProfitinaDay").attr("title", GlobalPNL.formatMoney(result.maxprofitaday));

        $(".MaxLossinaDay").html(`Rs. ${result.maxlossadaystr}`);
        $(".MaxLossinaDay").attr("title", GlobalPNL.formatMoney(result.maxlossaday));

        $(".AvgProfitLossDaily").html(`Rs. ${result.avgprofit_lossdailystr}`);
        $(".AvgProfitLossDaily").attr("title", GlobalPNL.formatMoney(result.avgprofit_lossdaily));

        $(".AvgProfitonProfitDays").html(`Rs. ${result.avgprofitonprofitdaysstr}`);
        $(".AvgProfitonProfitDays").attr("title", GlobalPNL.formatMoney(result.avgprofitonprofitdays));

        $(".AvgLossonLossDays").html(`Rs. ${result.avglossonlossdaysstr}`);
        $(".AvgLossonLossDays").attr("title", GlobalPNL.formatMoney(result.avglossonlossdays));

        $(".MaxDrawdown").html(`Rs. ${result.maxdrawdownstr}`);
        $(".MaxDrawdown").attr("title", GlobalPNL.formatMoney(result.maxdrawdown));

        $(".LoosRate").html(`${result.lossrate.toFixed(2)} %`);
        $(".MaxDDDays").html(`${result.maxdddays} [${result.maxdddaysstr}]`);
        $(".MaxDDDays").attr("title", GlobalPNL.formatMoney(result.maxdddays));

        $(".RewardToRisk").html(`${result.rewardtorisk}`);
        $(".ExpectancyRatio").html(`${result.expectancyratio}`);

        GlobalPNL.tooltipInit();
    }
}

GlobalPNL.bindPiChar= function(result) {
    var para = { xs: result, element: 'google_pie_pnl', colors: ['#42a53f', '#02a8b5', '#3366cc', '#ff9900', '#990099'] };
    GoogleChart.drawDonutChart(para);
}

GlobalPNL.bindHeatMap= function(result) {
    var $html = '';
    for (var i = result.startyear; i <= result.endyear; i++) {
        $html += `<div class="card-header"><div class="row flex-between-center"><div class="col-6 col-sm-auto d-flex align-items-center pe-0"><h6 class="fs-0 mb-0 text-nowrap py-2 py-xl-0">${i}</h6></div></div></div><div id="heat_map_cal_${i}"></div>`;
    }
    $(".heatyear").html($html);
    var para = { data: result.items, min: result.min, max: result.max };
    GoogleChart.drawCalHeatMap(para);
}

GlobalPNL.bindSummary= function(result) {
    var summary = result;
    var googleChaerVal = new Array();
    var echaerVal = new Array();
    $("#pnl_summart_label").empty();
    $(".RealisedPNL_div").html(summary.realisedpnl.prefix + summary.realisedpnl.endvalue.toFixed(summary.realisedpnl.decimalplaces) + summary.realisedpnl.suffix);
    $(".RealisedPNL_div").attr('title', GlobalPNL.formatMoney(summary.realisedpnl.actualvalue));
    $("#chargesTaxes_div").html(summary.chargestaxes.prefix + summary.chargestaxes.endvalue.toFixed(summary.chargestaxes.decimalplaces) + summary.chargestaxes.suffix);
    $("#chargesTaxes_div").attr('title', GlobalPNL.formatMoney(summary.chargestaxes.actualvalue));
    $("#netRealisedPNL_div").html(summary.netrealisedpnl.prefix + summary.netrealisedpnl.endvalue.toFixed(summary.netrealisedpnl.decimalplaces) + summary.netrealisedpnl.suffix);
    $("#netRealisedPNL_div").attr('title', GlobalPNL.formatMoney(summary.netrealisedpnl.actualvalue));
    //$("#UnrealisedPNL_div").html(summary.unrealisedpnl.prefix + summary.unrealisedpnl.endvalue.toFixed(summary.unrealisedpnl.decimalplaces) + summary.unrealisedpnl.suffix);
    $("#UnrealisedPNL_div").html(summary.pnlddratio==0?'1.00:' :summary.pnlddratio.toFixed(2));

    $("#total_pnl").html(`${summary.realisedpnl.endvalue.toFixed(0)} ${summary.realisedpnl.suffix}`);

    $("#chargesTaxes_div").css('color', '#000');
    $("#netRealisedPNL_div").css('color', summary.netrealisedpnl.actualvalue > 0 ? '#10b983' : summary.netrealisedpnl.actualvalue < 0 ? '#f35631' : '#000');


    googleChaerVal.push({ pnl: summary.netrealisedpnl.actualvalue, weekday: summary.netrealisedpnl.name, color: summary.netrealisedpnl.color });
    echaerVal.push({ value: summary.netrealisedpnl.actualvalue, name: summary.netrealisedpnl.name, color: summary.netrealisedpnl.color });
    $("#pnl_summart_label").append(` <div class="d-flex flex-between-center mb-1"> <div class="d-flex align-items-center"></div>`);

    googleChaerVal.push({ pnl: summary.chargestaxes.actualvalue, weekday: summary.chargestaxes.name, color: summary.chargestaxes.color });
    echaerVal.push({ value: summary.chargestaxes.actualValue, name: summary.chargestaxes.name, color: summary.chargestaxes.color });
    $("#pnl_summart_label").append(` <div class="d-flex flex-between-center mb-1">                                                                                                                                       </div>`);
    GlobalPNL.tooltipInit();
    var para = { xs: googleChaerVal, element: 'google_pie_pnl_summary', colors: ['#42a53f', '#02a8b5'] };
    GoogleChart.drawDonutChart(para);
}       

GlobalPNL.tooltipInit=function() {
    //var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    //tooltipTriggerList.map(function (tooltipTriggerEl) {
    //    return new window.bootstrap.Tooltip(tooltipTriggerEl, {
    //        trigger: 'hover'
    //    });
    //});

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
};

GlobalPNL.formatMoney=function(amount, decimalCount = 2, decimal = ".", thousands = ",") {
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
