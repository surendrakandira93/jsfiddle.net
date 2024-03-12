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
        //var $timeSpam = new Date().getTime(); // ddMMyyyy
        var $timeSpam = moment(new Date()).format("DDMMYYYY"); // ddMMyyyy
        var $domainName = 'https://raw.githubusercontent.com/surendrakandira93/jsfiddle.net/master/';
        var table = null;
        var userInfoArr = Array();
        var modelJson = new Array();
        var $aliash = getUrlVars();      
        
        $("#inline_content input[name='btnradio']").click(function () {
            alert('You clicked radio!');
            if ($('input:radio[name=type]:checked').val() == "walk_in") {
                alert($('input:radio[name=type]:checked').val());
                //$('#select-table > .roomNumber').attr('enabled',false);
            }
        });

        $(".list_view").on('click',function(){
            $(".view_btn").removeClass('active');
            $(this).addClass('active');
            $(".filter_div").hide();
        ListViewBind();
        });

        $(".grid_view").on('click',function(){
            $(".view_btn").removeClass('active');
            $(this).addClass('active');
               if (table != null) {
                        table.destroy();
                        table = null;
                    }
            $(".filter_div").show();
        CardViewBind(3);
        });

        $("input[name='btnradio']").change(function () {

            var $val = parseInt($(this).val());
            CardViewBind($val);
        });

        function CardViewBind($val){
            switch ($val) {
                case 1:
                    modelJson.sort(WinRateDescSort);
                    BindDataInHtml();
                    break;
                case 2:
                    modelJson.sort(MaxDDDescSort);
                    BindDataInHtml();
                    break;
                case 3:
                    modelJson.sort(PnlDDRatioDescSort);
                    BindDataInHtml();
                    break;
                case 4:
                    modelJson.sort(NetPNLDescSort);
                    BindDataInHtml();
                    break;
            }
        }

         function ListViewBind(){
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

        function bindPNLSummary(key) {
            modelJson = new Array();
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
                    key = "All";
                    $("#barChartLeval").html('Monthly PNL');
            }
           

            var userList = userInfoArr;
            $(".title_date").html('');
            
            GetValByKey(key, function (response) {
                //if (userList.length > 0 && result.length > 0) {

                var allUserObj = {};
                if (response.fromdate != null) {
                    $(".title_date").html(`${response.title} from  ${moment(response.fromdate).format('DD/MM/YYYY')} to  ${moment(response.todate).format('DD/MM/YYYY')
}`);
                }               

                    for (var i = 0; i < userList.length; i++) {
                        let userSummary = response.result.filter(function (el) {
                            return el.name === userList[i].userid;
                        });

                        if (userSummary.length > 0 && userSummary[0].realisedpnl != undefined) {
                            allUserObj = userSummary[0];
                            allUserObj.username = userList[i].username;
                            allUserObj.userid = userList[i].userid;
                            allUserObj.profilepic = userList[i].profilepic;
                            allUserObj.twitterurl = userList[i].twitterurl;
                            allUserObj.userid = userList[i].userid;
                            allUserObj.key = key;
                            allUserObj.pnlsource = userList[i].pnlsource;
                            modelJson.push(allUserObj);
                        }

                    }
                    
                modelJson.sort(PnlDDRatioDescSort);
                BindDataInHtml();
                    flexTable();              

                HideLoading()
            });
        }

        function BindDataInHtml() {
            $("#true_nl_rows").empty();
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
                        height: '2em',
                        barSpacing: 2,
                        barWidth: 2,
                        'negBarColor': '#f35631',
                        'barColor': '#10b983'
                    });

            }, 1)
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
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
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
                $("#logo_txt").html('myPnL');
            }
            ShowLoading();
            LoadeChatFirstTime();
            $(".grid_view").addClass('active');
        }
    }

    $(function () {
        var self = new PNLDashboard();
        self.init();
    })
})(jQuery)