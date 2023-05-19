(function ($) {
    function PNLDashboard() {
        var $this = this, form;

        function initilizeModel() {

            $('.equity_chart').click(function () {
                $(".equity_chart").removeClass('active');
                $(this).addClass('active');
                var type = $(this).data('type');

                bindEquityChart();
            });

            $('.equity_both_chart').click(function () {
                $(".equity_both_chart").removeClass('active');
                $(this).addClass('active');
                var type = $(this).data('type');

                bindEquityBothChart();
            });

            $('.bar_chart').click(function () {
                $(".bar_chart").removeClass('active');
                $(this).addClass('active');
                var type = $(this).data('type');
                bindBarChart();
            });

        }

        function bindEquityChart() {
            $.getJSON('pnl/user1/getEquityChart.json', function (result) {
                var para = { xs: result, element: 'google_line_pnl' };
                GoogleChart.drawChartEquityChart(para)
            });
        }

        function bindEquityBothChart() {
            $.getJSON('pnl/user1/getEquityBothChart.json', function (result) {               
                var para = { xs: result, element: 'google_line_both_pnl' };
                GoogleChart.drawChartEquityBothChart(para)               
            });
        }

        function bindBarChart() {
            $.getJSON('pnl/user1/getBarChart.json', function (result) {
                var para = { xs: result, element: 'google_bar_pnl' };
                GoogleChart.DrawChartLossProfitChart(para)
            });
        }


        function bindPiChar() {
            $.getJSON('pnl/user1/getPiChar.json', function (result) {
                var para = { xs: result, element: 'google_pie_pnl', colors: ['#42a53f', '#fe595c', '#3366cc', '#ff9900', '#990099'] };
                GoogleChart.drawDonutChart(para)
            });
        }


        function bindSummary() {
            $.getJSON('pnl/user1/calculateSummary.json', function (result) {
                // debugger;
                var summary = result;
                var googleChaerVal = new Array();
                var echaerVal = new Array();
                $("#pnl_summart_label").empty();
                $("#RealisedPNL_div").attr('data-countup', JSON.stringify(summary.realisedPNL));
                $("#chargesTaxes_div").attr('data-countup', JSON.stringify(summary.chargesTaxes));
                $("#netRealisedPNL_div").attr('data-countup', JSON.stringify(summary.netRealisedPNL));
                $("#UnrealisedPNL_div").attr('data-countup', JSON.stringify(summary.unrealisedPNL));

                $("#total_pnl").html(`${summary.realisedPNL.endValue.toFixed(0)} ${summary.realisedPNL.suffix}`);

                $("#chargesTaxes_div").css('color', '#000');
                $("#netRealisedPNL_div").css('color', summary.netRealisedPNL.actualValue > 0 ? '#10b983' : summary.netRealisedPNL.actualValue < 0 ? '#f35631' : '#000');

                
                googleChaerVal.push({ pnL: summary.netRealisedPNL.actualValue, weekDay: summary.netRealisedPNL.name, color: summary.netRealisedPNL.color });
                echaerVal.push({ value: summary.netRealisedPNL.actualValue, name: summary.netRealisedPNL.name, color: summary.netRealisedPNL.color });
                $("#pnl_summart_label").append(` <div class="d-flex flex-between-center mb-1">
                                <div class="d-flex align-items-center">
                                    <span class="dot" style="background-color:${summary.chargesTaxes.color}"></span><span class="fw-semi-bold">${summary.netRealisedPNL.name}</span>
                                </div>
                                <div class="d-xxl-none">${summary.netRealisedPNL.endValue.toFixed(2)} ${summary.netRealisedPNL.suffix}</div>
                            </div>`);

                googleChaerVal.push({ pnL: summary.chargesTaxes.actualValue, weekDay: summary.chargesTaxes.name, color: summary.chargesTaxes.color });
                echaerVal.push({ value: summary.chargesTaxes.actualValue, name: summary.chargesTaxes.name, color: summary.chargesTaxes.color });
                $("#pnl_summart_label").append(` <div class="d-flex flex-between-center mb-1">
                                <div class="d-flex align-items-center">
                                    <span class="dot" style="background-color:${summary.chargesTaxes.color}"></span><span class="fw-semi-bold">${summary.chargesTaxes.name}</span>
                                </div>
                                <div class="d-xxl-none">${summary.chargesTaxes.endValue.toFixed(2)} ${summary.chargesTaxes.suffix}</div>
                            </div>`);


                setTimeout(countupInit, 1);

                var para = { xs: googleChaerVal, element: 'google_pie_pnl_summary', colors: ['#42a53f', '#fe595c'] };
                GoogleChart.drawDonutChart(para);

                $(".echart-market-share").attr('data-datajson', JSON.stringify(echaerVal));
                setTimeout(pnlSummaryInit, 1);
            });
        }

        function LoadeChatFirstTime() {
            bindEquityChart();
            bindEquityBothChart();
            bindBarChart();
            bindPiChar();
            bindSummary();
        }

        $this.init = function () {
            initilizeModel();

            setTimeout(LoadeChatFirstTime, 500);
        }
    }

    $(function () {
        var self = new PNLDashboard();
        self.init();
    })
})(jQuery)