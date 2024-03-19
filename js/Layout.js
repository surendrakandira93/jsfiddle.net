(function ($) {
    function Layout() {
        var $this = this;
        function initilize() {

            $(".org-inv-accept").on('click', function () {
                var id = $(this).data('id');
                var actontype = $(this).data('actontype');
                $(this).parent().remove();
                $.ajax("/Home/UpdateInvitation", {
                    type: "POST",
                    data: { id: id, status: actontype },
                    success: function (result) {
                        Global.ToastrSuccess(result.message)
                    }
                });
            });
        }

        $this.init = function () {

            initilize();
        }
    }

    $(function () {
        var self = new Layout();
        self.init();
    })
})(jQuery)