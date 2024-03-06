(function ($) {
    window.onresize = function (event) {
        flexTable();
    };
    function flexTable() {
        if ($(window).width() < 768) {
            $(".mobile_div").show();
            $(".desktop_div").hide();
            //setTimeout(function () {
            //    $('.sparkline_span')
            //        .map(function () {
            //            var $this = $('canvas', this).length ? null : this;
            //            return $this;
            //        })
            //        .sparkline('html', {
            //            type: 'bar',
            //            width: '850px',
            //            'negBarColor': '#f35631',
            //            'barColor': '#10b983'
            //        });

            //}, 1)
        } else {
            $(".mobile_div").hide();
            $(".desktop_div").show();

            //setTimeout(function () {
            //    $('.sparkline').map(function () {
            //        var $this = $('canvas', this).length ? null : this;
            //        return $this;
            //    }).sparkline('html', {
            //        type: 'bar',
            //        width: '850px',
            //        'negBarColor': '#f35631',
            //        'barColor': '#10b983'
            //    });
            //}, 1);
        }
    }
    function PNLDashboard() {
        var $this = this, form;
        var $timeSpam = new Date().getTime();
        var $domainName = 'https://raw.githubusercontent.com/surendrakandira93/jsfiddle.net/master/';
        var table = null;
        var userInfoArr = Array()
        var $aliash = getUrlVars();
       
        //$(".nav-click").on('click', function () {
        //    var key = $(this).data('key');
        //    $(".nav-click").removeClass('active');
        //    $(this).addClass('active');
        //    if (!$(".navbar-toggler-humburger-icon").hasClass('collapsed')) {
        //        $(".navbar-toggler-humburger-icon").click();
        //    }
        //    bindPNLSummary(key);
        //})



        function bindPNLSummary(key) {
            var modelJson = new Array();
            ShowLoading();
            switch (key) {
                case "All":                
                case "Last360Days":
                case "PreviousFY":
                case "CurrentFY":
                    $("#barChartLeval").html('Monthly PNL');
                    break;                
                case "Last60Days":              
                case "Last90Days":
                case "Last180Days":
                    $("#barChartLeval").html('Weekly PNL');
                    break;
                case "PreviousDay":
                case "CurrentWeek":
                case "Last7Days":
                case "PreviousMonth":
                case "CurrentMonth":
                case "Last30Days":
                    $("#barChartLeval").html('Daily PNL');
                    break;
                default:
                    $("#barChartLeval").html('Monthly PNL');
            }
           

            var userList = userInfoArr;
            //switch (key) {
            //    case "All":
            //        userList = userInfoArr;
            //        break;
            //    case "Last90Days":
            //        userList = userInfoArr.filter((f) => f.islast90days);
            //        break;
            //    case "Last180Days":
            //        userList = userInfoArr.filter((f) => f.islast180days);
            //        break;
            //    case "Last360Days":
            //        userList = userInfoArr.filter((f) => f.islast360days);
            //        break;
            //    case "PreviousFY":
            //        userList = userInfoArr.filter((f) => f.ispreviousfy);
            //        break;
            //    case "CurrentFY":
            //        userList = userInfoArr.filter((f) => f.iscurrentfy);
            //        break;
            //    case "CurrentMonth":
            //        userList = userInfoArr.filter((f) => f.iscurrentmonth);
            //        break;
            //    case "Last60Days":
            //        userList = userInfoArr.filter((f) => f.islast60days);
            //        break;
            //    case "Last30Days":
            //        userList = userInfoArr.filter((f) => f.islast30days);
            //        break;
            //    case "PreviousDay":
            //        userList = userInfoArr.filter((f) => f.ispreviousday);
            //        break;
            //    case "CurrentWeek":
            //        userList = userInfoArr.filter((f) => f.iscurrentweek);
            //        break;
            //    case "Last7Days":
            //        userList = userInfoArr.filter((f) => f.islast7days);
            //    case "PreviousMonth":
            //        userList = userInfoArr.filter((f) => f.ispreviousmonth);
            //        break;
            //    default:
            //        userList = userInfoArr;
            //}
            GetValByKey(key, function (result) {
                //if (userList.length > 0 && result.length > 0) {

                    var allUserObj = {};

                    for (var i = 0; i < userList.length; i++) {
                        let userSummary = result.filter(function (el) {
                            return el.name === userList[i].userid;
                        });

                        if (userSummary.length > 0 && userSummary[0].realisedpnl != undefined) {
                            allUserObj = userSummary[0];
                            allUserObj.username = userList[i].username;
                            allUserObj.userid = userList[i].userid;
                            allUserObj.profilepic = userList[i].profilepic;
                            allUserObj.twitterurl = userList[i].twitterurl;
                            allUserObj.userid = userList[i].userid;
                            allUserObj.pnlsource = userList[i].pnlsource;
                            modelJson.push(allUserObj);
                        }

                    }
                    if (table != null) {
                        table.destroy();
                        table = null;
                    }
                    table = $('#tableUsers').DataTable({
                        paging: false,
                        order: [[2, 'desc']],
                        ajax: function (dataSent, callback, settings) {
                            callback({ data: modelJson });
                        },
                        paging: false,
                        drawCallback: function () {
                            setTimeout(function () {
                                $('.sparkline').map(function () {
                                    var $this = $('canvas', this).length ? null : this;
                                    return $this;
                                }).sparkline('data-html', {
                                    type: 'bar',
                                    width: '850px',
                                    'negBarColor': '#f35631',
                                    'barColor': '#10b983'
                                });
                            }, 1);

                        },
                        columns: [
                            {
                                data: null,
                                bSortable: true,
                                render: function (data, type, row, meta) {
                                    return `<a href="Details.html?user=${row.userid}">
                                                                        <div class="d-flex align-items-center">
                                                                            <div class="avatar avatar-xl">
                                                                                <img class="rounded-circle" src="${(row.profilepic != null && row.profilepic != "" ? row.profilepic : "http://rtwelfare.club/img/default-Profile.png")}" alt="">
                                                                            </div>
                                                                            <h6 class="mb-0 ps-2">${row.username}</h6>
                                                                        </div>
                                                                    </a>`;
                                }
                            }
                            ,
                            {
                                data: 'barchart',
                                bSortable: false,
                                render: function (data, type, row, meta) {
                                    return type === 'display'
                                        ? '<span class="sparkline" data-html="' + data.toString() + '"></span>'
                                        : data;
                                }
                            },
                            {
                                data: null,
                                bSortable: true,
                                render: function (data, type, row, meta) {
                                    if (type === "display") {
                                        return row.pnlddratio != NaN ? `${row.pnlddratio.toFixed(2)}` : '0.00';
                                    }
                                    return row.pnlddratio;
                                }
                            },
                            {
                                data: null,
                                bSortable: true,
                                render: function (data, type, row, meta) {
                                    if (type === "display") {
                                        return `${row.winrate.toFixed(2)} %`;
                                    }
                                    return row.winrate;
                                }
                            },
                            {
                                data: null,
                                bSortable: true,
                                render: function (data, type, row, meta) {
                                    if (type === "display") {
                                        // format data here
                                        return `${row.realisedpnl.prefix}${row.realisedpnl.endvalue.toFixed(row.realisedpnl.decimalplaces)}${row.realisedpnl.suffix}`; // This is formatted data
                                    }
                                    return row.realisedpnl.actualvalue;
                                }
                            },
                            {
                                data: null,
                                bSortable: true,
                                render: function (data, type, row, meta) {
                                    if (type === "display") {
                                        // format data here
                                        return `${row.chargestaxes.prefix}${row.chargestaxes.endvalue.toFixed(row.chargestaxes.decimalplaces)}${row.chargestaxes.suffix}`; // This is formatted data
                                    }
                                    return row.chargestaxes.actualvalue;
                                }
                            },
                            {
                                data: null,
                                bSortable: true,
                                render: function (data, type, row, meta) {
                                    var colour = row.netrealisedpnl.actualvalue < 0 ? '#f35631' : '#10b983';
                                    return type === 'display' ? `<span style="color:${colour}">${row.netrealisedpnl.prefix}${row.netrealisedpnl.endvalue.toFixed(row.netrealisedpnl.decimalplaces)}${row.netrealisedpnl.suffix}</span>` : row.netrealisedpnl.actualvalue;

                                }
                            },

                            {
                                data: null,
                                bSortable: true,
                                render: function (data, type, row, meta) {
                                    if (type === "display") {
                                        // format data here
                                        return row.maxdrawdown; // This is formatted data
                                    }
                                    return row.maxdrawdown;
                                }
                            },
                            {
                                data: null,
                                bSortable: true,
                                render: function (data, type, row, meta) {
                                    if (type === "display") {
                                        // format data here
                                        return row.totaltradingdays; // This is formatted data
                                    }
                                    return row.totaltradingdays;
                                }
                            },
                            {
                                data: 'barchart',
                                bSortable: false,
                                render: function (data, type, row, meta) {
                                    return `<a target="_blank" href="${row.twitterurl}"> <span class="fab fa-twitter"></span></a> <a target="_blank" href="${row.pnlsource}"> <span class="far fa-eye"></span></a>`;
                                }
                            }
                        ]
                    });
                modelJson.sort(ArrDescSort);
                if (modelJson.length > 0) {
                    $("#pnl_row_template").tmpl(modelJson).appendTo("#true_nl_rows");
                } else {
                    $("#true_nl_rows").html('<span>Record not found </span>');
                }
                    setTimeout(function () {
                        $('.sparkline_span')
                            .map(function () {
                                var $this = $('canvas', this).length ? null : this;
                                return $this;
                            })
                            .sparkline('data-html', {
                                type: 'bar',
                                width: '135',
                                height: '38',
                                'negBarColor': '#f35631',
                                'barColor': '#10b983'
                            });

                    }, 1)


                    flexTable();

              //  }
                //else {
                //    if (table != null) {
                //        table.destroy();
                //        table = $('#tableUsers').DataTable({
                //            paging: false,
                //            order: [[2, 'desc']],
                //            ajax: function (dataSent, callback, settings) {
                //                callback({ data: [] });
                //            },
                //            paging: false
                //        });
                //        $("#true_nl_rows").empty();
                //    }
                //}

                HideLoading()
            });
        }

        function GetValByKey(typeKey, onSuccess) {
            $.ajax({
                type: "GET",
                url: `${$domainName}pnl/getAccountSummary_${typeKey}.json?v=${$timeSpam}`,
                dataType: "json",
                success: function (response) {
                    //var result = JSON.parse(response);
                    onSuccess(response);
                },
                error: function () {
                }
            });
        }


        function ArrDescSort(a, b) {
            var x = a.pnlddratio;
            var y = b.pnlddratio;
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }

        function ShowLoading(setting) {
            setting = jQuery.extend({
                effect: 'ios',
                text: '',
                bg: 'rgba(255, 255, 255, 0.7)',
                color: '#000',
                maxSize: '',
                waitTime: -1,
                textPos: 'vertical',
                fontSize: '',
                source: '../waitMe/img.svg',
                onClose: function () { },
                dvContent: 'dvWaitMe'
            }, setting);

            var $container = $('#' + setting.dvContent);
            if ($container.length) {
                //clear if already opened.
                $container.removeAttr('class').hide().children().remove();
                $container.css({
                    'width': '100%',
                    'height': '100%',
                    'position': 'fixed',
                    'top': '0',
                    'left': '0',
                    'z-index': '99999',
                    'display': 'none'
                });
                $('body').addClass('ajax-waitme');
                $container.waitMe({
                    effect: setting.Effect,
                    text: setting.Text,
                    bg: setting.background,
                    color: setting.ColorCode,
                    sizeW: setting.SizeW,
                    sizeH: setting.SizeH
                });
                $container.show();
            }
        };

        function HideLoading(setting) {
            setting = jQuery.extend({ dvContent: 'dvWaitMe' }, setting);
            var $container = $('#' + setting.dvContent);
            $container.removeAttr('class').hide().children().remove();
            $('body').removeClass('ajax-waitme');
        };

        function LoadeChatFirstTime() {
            $(".nav-click").removeClass('active');
            $(`[data-key="${$aliash}"]`).addClass('active');
            $.getJSON(`${$domainName}pnl/userInfo.json?v=${$timeSpam}`, function (result) {
                userInfoArr = result;
                bindPNLSummary($aliash);
            });
            
        }

        function getUrlVars() {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[1]);
            }
            return vars.length > 0 && vars[0] != undefined ? vars[0] : 'All';
        }
        $this.init = function () {

            var hostName = window.location.hostname;
            if (hostName == "true-pnl.rtwelfare.club") {
                $("#logo_img").attr('src', 'Approved.svg');
                $("#logo_txt").html('truePnL');
            } else {
                $("#logo_img").attr('src', 'Approved.svg');
                $("#logo_txt").html('myPnLbook');
            }
            ShowLoading();
            LoadeChatFirstTime();

        }
    }

    $(function () {
        var self = new PNLDashboard();
        self.init();
    })
})(jQuery)