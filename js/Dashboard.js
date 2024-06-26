﻿(function ($) {
    window.onresize = function (event) {
        flexTable();
    };
    function flexTable() {
        if ($(window).width() < 768) {
            $(".mobile_div").show();
            $(".desktop_div").hide();
        } else {
            $(".mobile_div").hide();
            $(".desktop_div").show();
        }
    }
    function PNLDashboard() {
        var $this = this, form;
        var $timeSpam = moment(new Date()).format("DDMMYYYY");
        var $domainName = 'https://raw.githubusercontent.com/surendrakandira93/jsfiddle.net/master/';
        var $aliash = getUrlVars();
        var $key = getKeyVars();
        var $title = "";
        let userInfo;

        function initilizeModel() {
            flexTable();

            $(".menu_dynamic").removeClass('active');
            $(`[data-key="${$key}"]`).addClass('active');

            switch ($key) {
                case "All":
                    break;
                case "Last90Days":
                    $title = "Last 90 Days";
                    pageUrl = `/${$key}/`;
                    break;
                case "Last180Days":
                    $title = "Last 180 Days";
                    pageUrl = `/${$key}/`;
                    break;
                case "Last360Days":
                    $title = "Last 360 Days";
                    pageUrl = `/${$key}/`;
                    break;
                case "PreviousFY":
                    $title = "Previous FY";
                    pageUrl = `/${$key}/`;
                    break;
                case "CurrentFY":
                    $title = "Current FY";
                    pageUrl = `/${$key}/`;
                    break;
                case "CurrentMonth":
                    $title = "Current Month";
                    pageUrl = `/${$key}/`;
                    break;
                case "Last60Days":
                    $title = "Last 60 Days";
                    pageUrl = `/${$key}/`;
                    break;
                case "Last30Days":
                    $title = "Last 30 Days";
                    pageUrl = `/${$key}/`;
                    break;
                case "PreviousDay":
                    $title = "Previous Day";
                    pageUrl = `/${$key}/`;
                    break;
                case "CurrentWeek":
                    $title = "Current Week";
                    pageUrl = `/${$key}/`;
                    break;
                case "Last7Days":
                    $title = "Last 7 Days";
                    pageUrl = `/${$key}/`;
                case "PreviousMonth":
                    $title = "Previous Month";
                    pageUrl = `/${$key}/`;
                    break;
                case "FY2324":
                    $title = "FY 2023-24";
                    pageUrl = `/${$key}/`;
                    break;
                default:
            }

            if ($title != "") {
                $(".bredcrum_title").html($title);
            } else {
                $(".bredcrum_title").remove();
            }
            $('.equity_chart').click(function () {
                $(".equity_chart").removeClass('active');
                $(this).addClass('active');
                var type = $(this).data('type');
                bindEquityChart(type);
            });

            $('.drawdown_chart').click(function () {
                $(".drawdown_chart").removeClass('active');
                $(this).addClass('active');
                var type = $(this).data('type');
                bindDrawDownChart(type);
            });

            $('.equity_both_chart').click(function () {
                $(".equity_both_chart").removeClass('active');
                $(this).addClass('active');
                var type = $(this).data('type');
                bindEquityBothChart(type);
            });

            $('.pnl_dd_both_chart').click(function () {
                $(".pnl_dd_both_chart").removeClass('active');
                $(this).addClass('active');
                var type = $(this).data('type');
                bindPnLAndDrawnDownChart(type);
            });

            $('.bar_chart').click(function () {
                $(".bar_chart").removeClass('active');
                $(this).addClass('active');
                var type = $(this).data('type');
                bindBarChart(type);
            });

            $('.bar_all_chart').click(function () {
                $(".bar_all_chart").removeClass('active');
                $(this).addClass('active');
                var type = $(this).data('type');
                bindBarAllChart(type);
            });

            $('.bar_stacked_chart').click(function () {
                $(".bar_stacked_chart").removeClass('active');
                $(this).addClass('active');
                var type = $(this).data('type');
                bindBarStackedChart(type);
            });
        }

        function GetValByKey(typeKey, onSuccess) {
            $.ajax({
                type: "GET",
                url: `${$domainName}pnl/${$aliash}${pageUrl}${typeKey}.json?v=${$timeSpam}`,
                dataType: "json",
                success: function (response) {
                    //var result = JSON.parse(response);
                    onSuccess(response);
                },
                error: function () {
                }
            });
        }

        function GetUserInfo(onSuccess) {
            $.ajax({
                type: "GET",
                url: `${$domainName}pnl/userInfo.json?v=${$timeSpam}`,
                dataType: "json",
                success: function (response) {
                    let userInfos = response.filter(function (el) {
                        return el.userid === $aliash && el.isprivate === false;
                    });
                    onSuccess(userInfos.length > 0 ? userInfos[0] : {});
                },
                error: function () {
                }
            });
        }

        function bindEquityChart(type) {

            GetValByKey(`${type}_getEquityChart`, function (result) {
                GlobalPNL.bindEquityChart(result);
            });

        }

        function bindDrawDownChart(type) {

            GetValByKey(`${type}_getDrawDownChart`, function (result) {
                GlobalPNL.bindDrawDownChart(result);
            });
        }

        function bindEquityBothChart(type) {
            GetValByKey(`${type}_getEquityBothChart`, function (result) {
                GlobalPNL.bindEquityBothChart(result);
            });

        }

        function bindPnLAndDrawnDownChart(type) {
            GetValByKey(`${type}_getEquityAndDDChart`, function (result) {
                GlobalPNL.bindPnLAndDrawnDownChart(result);
            });
        }

        function bindBarChart(type) {
            GetValByKey(`${type}_getBarChart`, function (result) {
                GlobalPNL.bindBarChart(result);
            });
        }

        function bindBarAllChart(type) {
            GetValByKey(`${type}_getBarAllChart`, function (result) {
                GlobalPNL.bindBarAllChart(result);
            });
        }

        function bindBarStackedChart(type) {
            GetValByKey(`${type}_getBarAllChart`, function (result) {
                GlobalPNL.bindBarStackedChart(result);
            });
        }

        function bindPiChar() {
            GetValByKey(`getPiChar`, function (result) {
                GlobalPNL.bindPiChar(result);
            });
        }

        function bindHeatMap() {
            GetValByKey(`getHeatMap`, function (result) {
                GlobalPNL.bindHeatMap(result);
            });
        }

        function bindSummary() {
            GetValByKey(`calculateSummary`, function (result) {
                GlobalPNL.bindSummary(result);
            });
        }

        function bindPNLSummary() {
            GetValByKey(`getMonthlyBreakup`, function (result) {
                GlobalPNL.bindMonthlyBreaup(result);
            });
        }

        function bindWeeklyBreaup() {

            GetValByKey(`getWeeklyBreakup`, function (result) {
                GlobalPNL.bindWeeklyBreaup(result);
            });

        }

        function bindStatistics() {
            GetValByKey(`statistics`, function (result) {
                GlobalPNL.bindStatistics(result)
            });
        }

        function getUrlVars() {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[1]);
            }
            return vars.length > 0 && vars[0] != undefined ? vars[0] : 'user1';
        }

        function getKeyVars() {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[1]);
            }
            return vars.length > 1 && vars[1] != undefined ? vars[1] : 'All';
        }

        function LoadeChatFirstTime() {
            $(".menu_dynamic").each(function () {
                var href = $(this).attr('href');
                var newHref = href.replace("$userKey", $aliash);
                $(this).attr('href', newHref);
            })

            GetUserInfo(function (result) {
                if (result.username) {
                    $(".user_profile_img").attr("src", result.profilepic);
                    $(".twiter_url").attr("href", result.twitterurl);
                    $(".pnlsource_url").attr("href", result.pnlsource);
                    $(".user_name").html(result.username);
                    userInfo = result;

                    bindEquityChart('day');
                    bindDrawDownChart('day');
                    bindEquityBothChart('day');
                    bindPnLAndDrawnDownChart('day');
                    bindBarChart('month');
                    bindBarAllChart('month');
                    bindBarStackedChart('month');
                    bindPiChar();
                    bindHeatMap();
                    bindSummary();
                    bindPNLSummary();
                    bindWeeklyBreaup();
                    bindStatistics();

                } else {
                    $(".hide_user_Info").hide();
                }
            });

            //bindPNLManu();
            //bindEquityChart('day');
            //bindDrawDownChart('day');
            //bindEquityBothChart('day');
            //bindPnLAndDrawnDownChart('day');
            //bindBarChart('month');
            //bindBarAllChart('month');
            //bindBarStackedChart('month');
            //bindPiChar();
            //bindHeatMap();
            //bindSummary();
            //bindPNLSummary();
            //bindWeeklyBreaup();
            //bindStatistics();
        }

        function bindPNLManu() {

            $(".menu_dynamic").each(function () {
                var href = $(this).attr('href');
                var newHref = href.replace("$userKey", $aliash);
                $(this).attr('href', newHref);
            })

            $.getJSON(`${$domainName}pnl/userInfo.json?v=${$timeSpam}`, function (result) {
                if (result.length > 0) {

                    let userInfos = result.filter(function (el) {
                        return el.userid === $aliash && el.isprivate === false;
                    });
                    if (userInfos.length > 0) {
                        $(".user_profile_img").attr("src", userInfos[0].profilepic);
                        $(".twiter_url").attr("href", userInfos[0].twitterurl);
                        $(".pnlsource_url").attr("href", userInfos[0].pnlsource);
                        $(".user_name").html(userInfos[0].username);
                        userInfo = userInfos[0];
                    } else {
                        $(".hide_user_Info").hide();
                    }

                }
            });
        }

        function tooltipInit() {
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new window.bootstrap.Tooltip(tooltipTriggerEl, {
                    trigger: 'hover'
                });
            });
        };

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

        $this.init = function () {
            var hostName = window.location.hostname;
            if (hostName == "true-pnl.rtwelfare.club") {
                $("#logo_img").attr('src', 'Approved.svg');
                $("#logo_txt").html('truePnL');
            } else {
                $("#logo_img").attr('src', 'Approved.svg');
                $("#logo_txt").html('myPnL');
            }
            initilizeModel();
            setTimeout(LoadeChatFirstTime, 500);
        }
    }

    $(function () {
        var self = new PNLDashboard();
        self.init();
    })
})(jQuery)