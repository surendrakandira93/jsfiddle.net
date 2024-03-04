(function ($) {
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
        var $timeSpam = new Date().getTime();
        var $domainName = 'https://raw.githubusercontent.com/surendrakandira93/jsfiddle.net/master/';
        var table = null;
        var userInfoArr = Array()

        $.getJSON(`${$domainName}pnl/userInfo.json?v=${$timeSpam}`, function (result) {
            userInfoArr = result;
        });
        $(".nav-link").on('click', function () {
            var key = $(this).data('key');
            $(".nav-link").removeClass('active');
            $(this).addClass('active');
            bindPNLSummary(key);
        })

        $(".btn_data").on('click', function () {
            var key = $(this).data('key');
            $(".btn_data").removeClass('underline');
            $(this).addClass('underline');
            bindPNLSummary(key);
        })

        function bindPNLSummary(key) {
            var modelJson = new Array();
            ShowLoading();

            if (table != null) {
                table.destroy();
            }
            GetValByKey(key, function (result) {
                if (userInfoArr.length > 0) {

                    var allUserObj = {};

                    for (var i = 0; i < userInfoArr.length; i++) {
                        let userSummary = result.filter(function (el) {
                            return el.name === userInfoArr[i].userid;
                        });
                        console.log(userInfoArr[i].userid);

                        if (userSummary.length > 0 && userSummary[0].realisedpnl != undefined) {
                            console.log(userSummary[0].name);
                            allUserObj = userSummary[0];
                            allUserObj.username = userInfoArr[i].username;
                            allUserObj.userid = userInfoArr[i].userid;
                            allUserObj.profilepic = userInfoArr[i].profilepic;
                            allUserObj.twitterurl = userInfoArr[i].twitterurl;
                            allUserObj.userid = userInfoArr[i].userid;
                            allUserObj.pnlsource = userInfoArr[i].pnlsource;
                            console.log(allUserObj);
                            modelJson.push(allUserObj);
                        }

                    }

                    table = $('#tableUsers').DataTable({
                        paging: false,
                        order: [[1, 'desc']],
                        ajax: function (dataSent, callback, settings) {
                            callback({ data: modelJson });
                        },
                        paging: false,
                        drawCallback: function () {
                            $('.sparkline')
                                .map(function () {
                                    return $('canvas', this).length ? null : this;
                                })
                                .sparkline('html', {
                                    type: 'bar',
                                    width: '250px',
                                    'negBarColor': '#f35631', 'barColor': '#10b983'
                                });
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
                                    return type === 'display'
                                        ? '<span class="sparkline">' + data.toString() + '</span>'
                                        : data;
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
                    $("#pnl_row_template").tmpl(modelJson).appendTo("#true_nl_rows");
                    setTimeout(function () {
                        $('.sparkline_span')
                            .map(function () {
                                var $this = $('canvas', this).length ? null : this;
                                return $this;
                            })
                            .sparkline('html', {
                                type: 'bar',
                                width: '450px',
                                'negBarColor': '#f35631', 'barColor': '#10b983'
                            });
                    }, 1)
                    

                    flexTable();

                }

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
            bindPNLSummary('All');
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