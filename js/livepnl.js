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
        var $timeSpam = moment(new Date()).format("DDMMYYYYHHmmss"); // ddMMyyyy
        var $domainName = 'https://raw.githubusercontent.com/surendrakandira93/jsfiddle.net/master/';
        var table = null;
        var userInfoArr = Array();
        var allModelJson = new Array();
        var modelJson = new Array();
        var $aliash = getUrlVars();   
     

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