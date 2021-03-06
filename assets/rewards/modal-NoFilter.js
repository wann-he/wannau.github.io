+function (a) {
    "use strict";
    function b(b) {
        var d = a.extend({}, c.defaults, b);
        return new c(d)
    }

    var c = function (a) {
        return this.options = a, window.modalLength = void 0 === window.modalLength ? 0 : window.modalLength, this.init(), this
    };
    c.VERSION = "1.0.3", c.defaults = {
        type: "alert",
        title: "未填写标题",
        section: "未填写内容",
        trueButton: "确定",
        falseButton: "取消",
        bodyClose: !0,
        saveClose: !0,
        callback: {
            show: function () {
                console.log("you showed a modal")
            }, close: function () {
                console.log("you removed a modal")
            }, save: function () {
                console.log("you clicked save button")
            }, cancel: function () {
                console.log("you clicked cancel button")
            }
        }
    }, c.prototype = {
        init: function () {
            return this.template(), a("body").append(this.template), this.$modal = a('.modal[timestamp="' + this.timestamp + '"]'), this.event().show(), this
        }, show: function () {
            this.$modal.show(), window.modalLength++, window.modalLength > 1 && this.$modal.css("background-color", "rgba(0,0,0,0)"), document.ontouchmove = function (a) {
                a.preventDefault()
            };
            var a = this.$modal.find(".modal-dialog").height();
            return this.$modal.find(".modal-dialog").css({"margin-top": -a / 2}).trigger("show"), this
        }, close: function () {
            return window.modalLength--, 0 == window.modalLength && (document.ontouchmove = null), this.$modal.remove(), this.$modal.trigger("close"), this
        }, event: function () {
            var a = this;
            return this.$modal.on("show", function () {
                a.options.callback.show && a.options.callback.show(a)
            }), this.$modal.on("close", function () {
                a.options.callback.close && a.options.callback.close(a)
            }), this.$modal.on("save", function () {
                a.options.callback.save && a.options.callback.save(a)
            }), this.$modal.on("cancel", function () {
                a.options.callback.cancel && a.options.callback.cancel(a)
            }), this.$modal.find(".modal-footer .modal-true").on("click", function () {
                a.options.saveClose && a.close(), a.$modal.trigger("save")
            }), this.$modal.find(".modal-footer .modal-false").on("click", function () {
                a.close(), a.$modal.trigger("cancel")
            }), this.$modal.find(".modal-dialog").on("click", function (a) {
                a = a || window.event, a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
            }), this.$modal.on("click", function () {
                "loading" != a.options.type && a.options.bodyHide && a.close()
            }), this
        }, template: function () {
            switch (this.timestamp = 1 * new Date, this.options.type) {
                case"loading":
                    this.template = '<div class="modal" timestamp="' + this.timestamp + '"><div class="modal-dialog loading"><img src="http://yun.duiba.com.cn/webapp/img/loading.gif"><p>' + this.options.title + "</p></div></div>";
                    break;
                case"alert":
                    this.template = '<div class="modal" timestamp="' + this.timestamp + '"><div class="modal-dialog"><div class="modal-header">' + this.options.title + '</div><div class="modal-footer"><span class="modal-true percent-100">' + this.options.trueButton + "</span></div></div></div>";
                    break;
                case"confirm":
                    this.template = '<div class="modal" timestamp="' + this.timestamp + '"><div class="modal-dialog"><div class="modal-header">' + this.options.title + '</div><div class="modal-section">' + this.options.section + '</div><div class="modal-footer"><span class="modal-false">' + this.options.falseButton + '</span><span class="modal-true">' + this.options.trueButton + "</span></div></div></div>"
            }
            return this
        }
    };
    var d = a.modal;
    a.modal = b, a.modal.Constructor = c, a.modal.noConflict = function () {
        return a.modal = d, this
    }
}(Zepto);