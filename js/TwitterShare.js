(function ($) {
  
    function PNLDashboard() {
        var $this = this, form;
        //var $timeSpam = new Date().getTime(); // ddMMyyyy
        var $timeSpam = moment(new Date()).format("DDMMYYYY"); // ddMMyyyy
        var $domainName = 'https://raw.githubusercontent.com/surendrakandira93/jsfiddle.net/master/';
        var table = null;
        var allModelJson = new Array();
        var modelJson = new Array();    

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
                    callback({ data: allModelJson });
                },
                paging: false,               
                columns: [
                    {
                        data: null,
                        bSortable: true,
                        render: function (data, type, row, meta) {
                            return `<div class="d-flex align-items-center">
                                                                            <div class="avatar avatar-xl">
                                                                                <img class="rounded-circle" src="${(row.avatar_url != null && row.avatar_url != "" ? row.avatar_url : "http://rtwelfare.club/img/default-Profile.png")}" alt="">
                                                                            </div>
                                                                            <h6 class="mb-0 ps-2">${row.name}</h6>
                                                                        </div>`;
                        }
                    }
                    ,
                    {
                        data: 'media',
                        bSortable: false,
                        render: function (data, type, row, meta) {
                            return type === 'display'
                                ? `<img class="img-fluid img-thumbnail" src="${row.media}" alt="">`
                                : data;
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
                            return type === 'display' ? `<span style="color:${row.netpnlcolor}">${row.netpnl}</span>` : row.netpnl;

                        }
                    },
                    {
                        data: null,
                        bSortable: true,
                        render: function (data, type, row, meta) {
                            if (type === "display") {
                                // format data here
                                return `${row.chargestaxes}`; // This is formatted data
                            }
                            return row.chargestaxes;
                        }
                    },
                    {
                        data: 'twitter',
                        bSortable: false,
                        render: function (data, type, row, meta) {
                            var encodedImage = encodeURIComponent(row.media);
                            var encodedTweet = encodedImage +" "+ encodeURIComponent(`Congratulations @${row.twitter} Please find your verified pnl for FY 2023-24 #VerifiedPnLByMyPnLBook`);
                            var encodedUrl = encodeURIComponent(row.link);
                            
                            return `<a target="_blank" href="https://twitter.com/intent/tweet?text=${encodedTweet}&url=${encodedUrl}"> Share on twitter </a>`;
                        }
                    }
                ]
            });
        }

        function bindPNLSummary() {
            allModelJson = new Array();
            ShowLoading();
            $(".title_date").html('');

            GetValByKey(function (response) {                
                allModelJson = response; 
                BindDataWithDayFilter();
                HideLoading()
            });
        }

      
        function BindDataWithDayFilter() {            
                ListViewBind()           
        }

        function GetValByKey(onSuccess) {
            $.ajax({
                type: "GET",
                url: `${$domainName}pnl/pnlsnapshot.json?v=${$timeSpam}`,
                dataType: "json",
                success: function (response) {
                    //var result = JSON.parse(response);
                    onSuccess(response);
                },
                error: function () {
                }
            });
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
            bindPNLSummary();

        }

       
        $this.init = function () {
            
            ShowLoading();
            LoadeChatFirstTime();

        }
    }

    $(function () {
        var self = new PNLDashboard();
        self.init();
    })
})(jQuery)