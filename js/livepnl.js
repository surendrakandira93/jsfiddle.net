(function ($) {
    window.onresize = function (event) {
        flexTable();
    };
    function flexTable() {
        if ($(window).width() < 768) {
            localStorage.setItem('viewType', 2);
            $(".mobile_div").show();
            $(".desktop_div").hide();
        } else {
            $(".mobile_div").hide();
            $(".desktop_div").show();
        }
    }
    function PNLDashboard() {
        var $this = this, form;
        //var $timeSpam = new Date().getTime(); // ddMMyyyy
        var $timeSpam = moment(new Date()).format("DDMMYYYY"); // ddMMyyyy
        var $domainName = 'https://raw.githubusercontent.com/surendrakandira93/jsfiddle.net/master/';
        var table = null;
        var userInfoArr = Array();
        var allModelJson = new Array();
        var modelJson = new Array();
        var $aliash = getUrlVars();   
        function ListViewBind() {
            $("#true_nl_rows").empty();
            $("#pnl_table_template").tmpl().appendTo("#true_nl_rows");
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
                            height: '2em',
                            barSpacing: 2,
                            barWidth: 2,
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
                            return `<a href="Details.html?user=${row.userid}&key=${row.key}">
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
                            return row.maxdrawdownint;
                            // return row.maxdrawdown;
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
                            return `<a target="_blank" href="${row.twitterurl}"> <img src="twitter-x.svg" style="width: 15px;" /> </a> <a target="_blank" href="${row.pnlsource}"> <img src="zerodha.png" style="width: 15px;" /></a>`;
                        }
                    }
                ]
            });
        }

        function bindPNLSummary() {
            allModelJson = new Array();        

            var userList = userInfoArr;
            GetValByKey(function (response) {
                //if (userList.length > 0 && result.length > 0) {

                var allUserObj = {};
                for (var i = 0; i < userList.length; i++) {
                    let positions = response.filter(function (el) {
                        return el.name === userList[i].twitter_profile.word_hash;
                    });

                    if (positions.length > 0 && positions[0].position_snapshot_data != undefined) {
                        allUserObj = userList[i];
                        allUserObj.live_share_mode = positions[0].twitter_data.live_share_mode;
                        allUserObj.total_profit = positions[0].position_snapshot_data.total_profit;
                        allUserObj.snapshot_liveliness_state = positions[0].snapshot_liveliness_state;
                        allModelJson.push(allUserObj);
                    }
                }

                BindDataWithDayFilter();

                flexTable();

                HideLoading()
            });
        }

      
        function BindDataWithDayFilter() {            
            BindDataInHtml();            
        }

        function BindDataInHtml() {
            $("#true_nl_rows").empty();
            if (allModelJson.length > 0) {
                $("#pnl_row_template").tmpl(allModelJson).appendTo("#true_nl_rows");

            } else {
                $("#true_nl_rows").html('<span>Record not found </span>');
            }

            setTimeout(function () {
                $('img').each(function () {
                    // Check if the image source is invalid
                    if (!this.complete || typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {
                        // Replace with default image
                        $(this).attr('src', 'img/default-Profile.png');
                    }
                });
            }, 1)
           
        }
        function GetValByKey(onSuccess) {
            $.ajax({
                type: "GET",
                url: `${$domainName}pnl/livepnlData.json?v=${$timeSpam}`,
                dataType: "json",
                success: function (response) {
                    //var result = JSON.parse(response);
                    onSuccess(response);
                },
                error: function () {
                }
            });
        }


        function WinRateDescSort(a, b) {
            var x = a.winrate;
            var y = b.winrate;
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
        function MaxDDDescSort(a, b) {
            var x = a.maxdrawdownint;
            var y = b.maxdrawdownint;
            //var x = a.maxdrawdown;
            //var y = b.maxdrawdown;
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
        function PnlDDRatioDescSort(a, b) {
            var x = a.pnlddratio;
            var y = b.pnlddratio;
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
        function NetPNLDescSort(a, b) {
            var x = a.netrealisedpnl.actualvalue;
            var y = b.netrealisedpnl.actualvalue;
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }

        function TotalTradingDayDescSort(a, b) {
            var x = a.totaltradingdays;
            var y = b.totaltradingdays;
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
            $.getJSON(`${$domainName}pnl/livepnlUserprofiles.json?v=${$timeSpam}`, function (result) {
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
                $("#logo_txt").html('myPnL');
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