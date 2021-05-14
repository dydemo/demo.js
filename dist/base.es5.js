"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// https://babeljs.cn/en/repl es6 -- es5
var Demo = /*#__PURE__*/function () {
    function Demo(opt, fn) {
        _classCallCheck(this, Demo);

        this.options = Object.assign({
            prefix: 'demo',
            theme: 'light',
            name: 'demo',
            ajax: !0,
            scroll: !0,
            api: '',
            ajaxCookie: !1,
            debugger: !1,
            log: !0,
            plugins: [],
            ajaxTimeout: 8e3,
            ajaxUploadTimeout: 2e4
        }, opt || {}); // 创建属性

        this.const('version', '1.0.80');
        this.$ = {
            dom: function dom(id) {
                if (!id) return null;
                return document.querySelector(id);
            },
            all: function all(id) {
                if (!id) return [];
                var len = document.querySelectorAll(id);
                return len.length > 0 ? Array.from(len) : [];
            },
            id: function id(_id) {
                if (!_id) return null;
                return document.getElementById(_id);
            },
            // html input... name
            name: function name(_name2) {
                if (!_name2) return [];
                var len = document.getElementsByName(_name2);
                return len.length > 0 ? Array.from(len) : [];
            },
            // html tag
            tag: function tag(_tag) {
                if (!_tag) return [];
                var len = document.getElementsByTagName(_tag);
                return len.length > 0 ? Array.from(len) : [];
            }
        };

        this._init(function (r) {
            fn ? fn(r) : null;
        });
    } // dom常用方法


    _createClass(Demo, [{
        key: "js",
        value: function js(id) {
            var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
            var _dom = id;
            var t = this;

            if (flag) {
                _dom = this.$.dom(id);
            }

            if (!_dom) {
                return {};
            }

            return {
                dom: function dom() {
                    return _dom;
                },
                html: function html(text) {
                    if (!arguments.length) return _dom.innerHTML;

                    var c = t._is_obj(text).code;

                    if (c === 4 || c === 6) {
                        text = JSON.stringify(text);
                    }

                    _dom.innerHTML = text;
                },
                text: function text(_text) {
                    if (!arguments.length) return _dom.innerText;
                    _dom.innerText = _text;
                },
                brother: function brother() {
                    var cls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
                    if (!cls) return _dom;
                    return _dom.parentNode.querySelector(cls);
                },
                addClass: function addClass(c) {
                    if (t._is_obj(c).code === 4) {
                        c.forEach(function (k) {
                            _dom.classList.add(k);
                        });
                        return 1;
                    }

                    _dom.classList.add(c);
                },
                removeClass: function removeClass(c) {
                    var s = _dom.className;

                    if (t._is_obj(c).code === 4) {
                        c.forEach(function (k) {
                            if (s.indexOf(k) >= 0) {
                                _dom.classList.remove(c);
                            }
                        });
                        return 1;
                    }

                    if (s.indexOf(c) >= 0) {
                        _dom.classList.remove(c);
                    }
                },
                toggleClass: function toggleClass(c) {
                    var to = function to(l) {
                        if (_dom.className.indexOf(l) >= 0) {
                            _dom.classList.remove(c);
                        } else {
                            _dom.classList.add(c);
                        }
                    };

                    if (t._is_obj(c).code === 4) {
                        c.forEach(function (k) {
                            to(k);
                        });
                        return 1;
                    }

                    to(c);
                },
                append: function append(c) {
                    if (!c) return 0;
                    _dom.innerHTML += c;
                },
                appendChild: function appendChild(c) {
                    if (!c) return 0;

                    _dom.appendChild(c);
                },
                remove: function remove() {
                    _dom.parentNode.removeChild(_dom);
                },
                style: function style(e, f) {
                    var str = '';

                    if (t._is_obj(e).code === 6) {
                        for (var k in e) {
                            str += "".concat(k, ":").concat(e[k], ";");

                            if (f) {
                                _dom.style[k] = e[k];
                            }
                        }
                    } else {
                        f = !1;
                        str = e;
                    }

                    if (!f) {
                        _dom.setAttribute('style', str);
                    }
                },
                attr: function attr(e, f) {
                    if (t._is_obj(e).code === 6) {
                        Object.keys(e).forEach(function (r) {
                            _dom.setAttribute('data-' + r, e[r]);
                        });
                        return !0;
                    } else if (t._is_obj(e).code == 4) {
                        var val = {};
                        e.forEach(function (r) {
                            val[r] = _dom.getAttribute('data-' + r) || '';
                        });
                        return val;
                    }

                    if (arguments.length > 1) {
                        _dom.setAttribute(e, f);
                    } else {
                        return _dom.getAttribute(e);
                    }
                },
                click: function click(fn, time) {
                    if (arguments.length > 0) {
                        _dom.onclick = function (e) {
                            var that = this;

                            if (time > 0 && !isNaN(time)) {
                                that.setAttribute('disabled', 'true');
                                setTimeout(function () {
                                    that.removeAttribute('disabled');
                                }, time * 1e3);
                            }

                            t.focus(that);
                            fn(that, e);
                            e.preventDefault();
                            t.stopBubble(e);
                        };
                    } else {
                        _dom.click();
                    }
                },
                json: function json(_json) {
                    _json = _json || {};
                    _dom.innerHTML = t.showJson(_json);
                },
                width: function width(e) {
                    if (arguments.length) {
                        _dom.style.width = isNaN(e) ? e : e + 'px';
                    } else {
                        return _dom.clientWidth;
                    }
                },
                height: function height(e) {
                    if (arguments.length) {
                        _dom.style.height = isNaN(e) ? e : e + 'px';
                    } else {
                        return _dom.clientHeight;
                    }
                },
                square: function square(w, h) {
                    if (w) {
                        if (!h) {
                            h = w;
                        }

                        t.js(_dom, 0).width(w);
                        t.js(_dom, 0).height(h);
                    } else {
                        return {
                            w: _dom.clientWidth,
                            h: _dom.clientHeight
                        };
                    }
                },
                // form: function (fn) {
                // 	var s = dom.querySelectorAll('[data-input]')
                // 	var a = []
                // 	if (s.length) {
                // 		for (var k = 0; k < s.length; k++) {
                // 			if (s[k]) {
                // 				a.push({
                // 					key: s[k],
                // 					val: (s[k].value || s[k].getAttribute('data-value')) || '',
                // 					name: (s[k].name || s[k].getAttribute('data-name')) || 'form-' + t.rand(1000, 9999),
                // 					rule: s[k].getAttribute('data-rule') || '',
                // 					range: (s[k].getAttribute('data-range') || '6-18').split('-'),
                // 					message: s[k].getAttribute('data-error') || s[k].getAttribute('data-message') || ''
                // 				})
                // 			}
                // 		}
                // 	}
                // 	if (arguments.length) {
                // 		fn(a)
                // 	}
                // 	return a
                // },
                val: function val(e) {
                    if (arguments.length) {
                        _dom.value = e;
                    } else {
                        return _dom.value;
                    }
                },
                input: function input(fn) {
                    if (arguments.length) {
                        _dom.oninput = function (e) {
                            fn(this, e);
                        };
                    }
                },
                keydown: function keydown(fn) {
                    if (arguments.length) {
                        _dom.onkeydown = function (e) {
                            e = e || window.event;
                            var os = {
                                event: e,
                                code: e.keyCode,
                                value: this.value,
                                key: e.key,
                                dom: _dom
                            };
                            fn(os, this);
                        };
                    }
                },
                find: function find(cls) {
                    var getDom = function getDom(arr) {
                        var ds = [];
                        arr.forEach(function (k) {
                            ds.push({
                                name: k.replace(/[.|#]/, ''),
                                dom: Array.from(_dom.querySelectorAll(k))
                            });
                        });
                        return ds;
                    }; // 数组


                    if (t._is_obj(cls).code === 4) {
                        return getDom(cls);
                    } // 字符串 两个参数


                    if (arguments.length > 1) {
                        return getDom([cls])[0].dom;
                    }

                    return _dom.querySelector(cls);
                },
                video: function video(opt) {
                    opt = Object.assign({
                        "x5-video-player-type": "h5",
                        "x5-video-player-fullscreen": "false"
                    }, opt || {});

                    for (var k in opt) {
                        _dom.setAttribute(k, opt[k]);
                    }
                },
                index: function index() {
                    var index = 0;

                    do {
                        index++;
                    } while (_dom = _dom.previousElementSibling);

                    return index;
                },
                offset: function offset() {
                    var _d = _dom.getBoundingClientRect();

                    var _m = document.body;
                    return {
                        top: _d.top + _m.scrollTop,
                        left: _d.left + _m.scrollLeft,
                        self: {
                            top: _d.top,
                            left: _d.left
                        }
                    };
                },
                replaceVal: function replaceVal(reg) {
                    reg = reg || /[^\u4e00-\u9fa5]/g;

                    var c = function c(tar) {
                        var v = tar.value;
                        tar.value = v.replace(new RegExp(reg), '');
                    };

                    _dom.onfocus = function (e) {
                        c(e.target);
                    };

                    _dom.onkeyup = function (e) {
                        c(e.target);
                    };

                    _dom.onblur = function (e) {
                        c(e.target);
                    };
                },
                child: function child(v) {
                    return Array.from(v ? _dom.querySelectorAll(v) : _dom.children);
                },
                bgc: function bgc(text) {
                    var dm = t.js(_dom, 0).child('[data-background-list]');

                    if (dm.length) {
                        text = text || 'green|#18bc9c';
                        dm.forEach(function (k) {
                            var bgc = k.getAttribute('data-bgc') || text;
                            bgc = bgc.split('|');

                            if (bgc.length === 1) {
                                bgc[1] = bgc[0];
                            }

                            k.style.background = t.algorithm().gradients((bgc[2] || 90) * 1, bgc[0], bgc[1] || '');
                        });
                    }

                    return dm;
                },
                show: function show() {
                    var v = _dom.getAttribute('data-fade') || 'hide';

                    if (v === 'hide') {
                        var i = 0;
                        _dom.style.display = '';

                        _dom.setAttribute('data-fade', 'show');

                        var c = function c() {
                            _dom.style.opacity = i > 1 ? 1 : i;
                            i += Math.random() / 10;

                            if (i < 1.001) {
                                setTimeout(function () {
                                    c();
                                }, 50);
                            }
                        };

                        c();
                    }

                    return _dom;
                },
                hide: function hide() {
                    var v = _dom.getAttribute('data-fade') || 'show';

                    if (v === 'show') {
                        var i = 1;

                        var c = function c() {
                            _dom.style.opacity = i < 0 ? 0 : i;
                            i -= Math.random() / 10;

                            if (i > -0.001) {
                                setTimeout(function () {
                                    c();
                                }, 50);
                            } else {
                                _dom.style.display = 'none';

                                _dom.setAttribute('data-fade', 'hide');
                            }
                        };

                        c();
                    }

                    return _dom;
                },
                toggle: function toggle() {
                    var v = _dom.getAttribute('data-fade') || '';
                    return t.js(_dom, 0)[v === 'show' ? 'hide' : 'show']();
                },
                file: function file(fn, opt) {
                    opt = opt || {};
                    var id = 'file-' + t.rand(1e4, 1e5 - 1);

                    var v = demo._div('input', 'm_inp');

                    var b = demo._div('label');

                    var text = _dom.innerText;
                    v.setAttribute('type', 'file');
                    v.setAttribute('id', id);

                    if (opt.more) {
                        v.setAttribute('multiple', true);
                    }

                    var accept = '';

                    switch (opt.type) {
                        case 'txt':
                            accept = 'text/plain';
                            break;

                        case 'other':
                            accept = opt.accept || '';
                            break;

                        default:
                            accept = 'image/png,image/gif,image/jpg,image/jpeg';
                    }

                    v.setAttribute('accept', accept);
                    b.setAttribute('for', id);
                    b.setAttribute('style', 'display:block');
                    _dom.innerHTML = '';

                    _dom.appendChild(v);

                    _dom.appendChild(b);

                    b.innerHTML = text || 'Upload';

                    if (t.$.id(id)) {
                        t.$.id(id).onchange = function () {
                            var os = {
                                files: this.files,
                                file: this.files[0],
                                time: t.timeout(),
                                id: id,
                                el: _dom
                            };

                            if (os.file) {
                                fn ? fn(os) : null;
                            }
                        };
                    }
                },
                scrollbar: function scrollbar() {
                    if (_dom.clientHeight > _dom.parentNode.clientHeight) {
                        _dom.parentNode.classList.add(t.options.prefix + '_scrollbar');
                    }
                }
            };
        } // loading

    }, {
        key: "loading",
        value: function loading(opt) {
            var os = Object.assign({
                theme: this.options.theme,
                dom: 'body'
            }, opt || {});
            var t = this;
            var sty = t.options.prefix + '_loading';
            var d = t.$.dom('.' + sty);

            if (d && os.dom === 'body') {
                d.className = sty + (os.theme === '' ? '' : ' ' + os.theme);
                return false;
            }

            var l = document.createElement('div');
            l.setAttribute('class', sty + (os.theme === '' ? '' : ' ' + os.theme));

            if (os.id) {
                l.setAttribute('id', t.options.prefix + '-' + os.id);
            }

            if (os.dom === 'body') {
                document.body.appendChild(l);
            } else {
                l.setAttribute('style', 'position:absolute');
                t.$.dom(os.dom).appendChild(l);
            }

            return l;
        } // alert

    }, {
        key: "alert",
        value: function alert(err, num, opt, fn) {
            var os = Object.assign({
                title: '',
                timeout: 2000,
                screen: 0,
                sty: 'alert',
                btnSuccessText: '确定',
                btnErrorText: '取消',
                btnSuccessStyle: '',
                btnErrorStyle: ''
            }, opt || {});
            num = num || 0;
            var t = this;
            var load = null;
            var les = arguments.length > 3;

            if (os.screen) {
                load = t.loading({
                    theme: t.options.theme + ' model',
                    id: 'loading-' + t.rand(1000, 9999)
                });
            }

            var hidden = function hidden(l, fe) {
                var len = arguments.length;

                if (l) {
                    l.classList.add('hidden');
                    setTimeout(function () {
                        if (l) {
                            t.remove(l);
                            l = null;
                        }

                        if (load) {
                            t.remove(load);
                            load = null;
                        }

                        if (len > 1) {
                            fe();
                        }

                        if (les) {
                            fn({
                                code: 1,
                                type: 'all',
                                status: 'remove',
                                options: os.data || {}
                            });
                        }
                    }, 200);
                }
            };

            if (num > 99) {
                var old = t.js('body').find("[id^='" + t.options.prefix + "-alert-']");
                var ld = t.js('body').find('[id^="' + t.options.prefix + '-loading-"]');

                if (old) {
                    if (ld) {
                        load = ld;
                    }

                    hidden(old);
                }

                ld = null;
                old = null;
                return 0;
            }

            var sty = t.options.prefix + '_model.' + os.sty;
            var d = t.$.dom('.' + sty);

            if (d) {
                hidden(d, function () {
                    d = null;
                    t.alert(err, num, opt);
                });
                return false;
            }

            var l = document.createElement('div');
            var tps = ['error', 'success', 'warning', 'default'];
            num = num >= tps.length ? tps.length - 1 : num;
            l.setAttribute('class', sty.replace('.', ' ') + ' hidden ' + tps[num]);
            l.setAttribute('id', t.options.prefix + '-alert-' + t.rand(1000, 9999));

            if (t._is_obj(err).type === 'object') {
                err = JSON.stringify(err);
            }

            var str = '';
            var id = '_' + t.rand(1000, 9999) + '-';

            if (os.title) {
                str += '<h3 class="title">' + os.title + '</h3>';
            }

            str += '<i class="close"></i>';
            str += '<p class="msg">' + (err === undefined ? '' : err) + '</p>';

            if (os.sty !== 'alert') {
                str += '<div class="btn">';
                str += '<button class="m_btn ' + os.btnSuccessStyle + '" id="' + id + 's">' + os.btnSuccessText + '</button>';
                str += '<button class="m_btn ' + os.btnErrorStyle + '" id="' + id + 'e">' + os.btnErrorText + '</button>';
                str += '</div>';
            }

            l.innerHTML = str;
            document.body.appendChild(l);
            var c = l.querySelector('.close');
            var s = l.querySelector('#' + id + 's');
            var e = l.querySelector('#' + id + 'e');

            if (os.sty === 'alert' && les) {
                fn({
                    code: 1,
                    type: 'alert',
                    status: 'create',
                    options: os.data || {}
                });
            }

            if (c) {
                c.onclick = function (e) {
                    hidden(l);
                    t.stopBubble(e);
                };
            }

            if (les) {
                fn({
                    code: 3e3,
                    box: l
                });

                if (s) {
                    t.js(s, 0).click(function () {
                        fn({
                            btn: 'success',
                            t: s,
                            code: 1,
                            box: l,
                            options: os.data || {}
                        });
                        hidden(l);
                    });
                }

                if (e) {
                    t.js(e, 0).click(function () {
                        fn({
                            btn: 'error',
                            t: e,
                            code: 0,
                            box: l,
                            options: os.data || {}
                        });
                        hidden(l);
                    });
                }
            }

            setTimeout(function () {
                l.classList.remove('hidden');
            }, 50);

            if (os.timeout > 500) {
                t._timers('alert_timer', function (e) {
                    if (e) {
                        hidden(l);
                    }
                }, 0, os.timeout);
            }
        } // rand

    }, {
        key: "rand",
        value: function rand(min, max) {
            min = min * 1;

            if (arguments.length === 1) {
                min = min > 9 ? 9 : min < 1 ? 1 : min;
                max = ('1e' + min) * 1 - 1;
                min = ('1e' + (min - 1)) * 1;
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            if (!max && arguments.length > 1) {
                return Math.floor(Math.random() * min);
            }

            max = max * 1;
            return Math.floor(Math.random() * (max - min + 1) + min);
        } // remove

    }, {
        key: "remove",
        value: function remove(t) {
            if (t && t.parentNode) {
                t.parentNode.removeChild(t);
                t = null;
            }

            return 1;
        } // 时间

    }, {
        key: "timeout",
        value: function timeout(num, type, join) {
            if (!num || isNaN(num)) {
                num = Date.now();
            }

            num = parseInt(num);
            join = join || '/';

            function wk(n) {
                return '星期' + ["日", "一", "二", "三", "四", "五", "六"][n];
            }

            function zero(n) {
                return n < 10 ? '0' + n : n;
            }

            if ((num + '').length > 10) {
                num = Math.floor(num / 1000);
            }

            var yt = new Date(num * 1000);
            var wd = yt.getDay();
            var os = {
                y: yt.getFullYear(),
                m: yt.getMonth() + 1,
                d: yt.getDate(),
                h: yt.getHours(),
                i: yt.getMinutes(),
                s: yt.getSeconds(),
                ms: yt.getMilliseconds(),
                default: num,
                w: wk(wd),
                week: wd
            };
            wd = null;
            yt = null;
            num = null;
            os.m = zero(os.m);
            os.d = zero(os.d);
            os.h = zero(os.h);
            os.i = zero(os.i);
            os.s = zero(os.s);

            function ymd(os, s, f) {
                if (f) {
                    return os.y + s + os.m;
                }

                return os.y + s + os.m + s + os.d;
            }

            function his(os, s, f) {
                if (f) {
                    return os.h + s + os.i;
                }

                return os.h + s + os.i + s + os.s;
            }

            function md(os, s) {
                return os.m + s + os.d;
            }

            var ret = '';

            switch (type) {
                case 'alls':
                    ret = ymd(os, join) + ' ' + his(os, ':');
                    break;

                case 'ymd':
                    ret = ymd(os, join);
                    break;

                case 'md':
                    ret = md(os, join);
                    break;

                case 'his':
                    ret = his(os, join);
                    break;

                case 'array':
                    ret = [os.y, os.m, os.d, os.h, os.i, os.s, os.ms];
                    break;

                case 'object':
                    ret = os;
                    break;

                case 'zero':
                    ret = new Date(ymd(os, '/') + ' 00:00:00').getTime();
                    break;

                case 'day':
                    ret = os.week;
                    break;

                case 'rotate':
                    ret = {
                        s: os.s * 6,
                        i: (os.i + os.s / 60) * 6,
                        h: (os.h % 12 + os.i / 60) * 30
                    };
                    break;

                default:
                    ret = ymd(os, join) + ' ' + his(os, ':', 1);
            }

            return ret;
        } // local

    }, {
        key: "local",
        value: function local() {
            return this._storage('localStorage');
        } // session

    }, {
        key: "session",
        value: function session() {
            return this._storage('sessionStorage');
        } // 获取url参数

    }, {
        key: "getUrl",
        value: function getUrl(str) {
            if (typeof str == "undefined") {
                var url = decodeURI(location.search); //获取url中"?"符后的字符串
            } else {
                var url = "?" + str.split("?")[1];
            }

            var obj = new Object();

            if (url.indexOf("?") != -1) {
                var _str = url.substr(1);

                var s = _str.split("&");

                for (var i = 0; i < s.length; i++) {
                    obj[s[i].split("=")[0]] = decodeURI(s[i].split("=")[1] || '');
                }
            }

            return obj;
        } // 获取url某个参数

    }, {
        key: "getUrlParam",
        value: function getUrlParam(param, str) {
            var search = window.location.search.substring(1);

            if (arguments.length > 1) {
                search = str.split("?")[1];
            }

            var query = decodeURI(search);
            var vars = query.split("&");

            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");

                if (pair[0] == param) {
                    return pair[1];
                }
            }

            return null;
        } // scroll

    }, {
        key: "scroll",
        value: function scroll(box, opt) {
            if (!this.$scroll) return false;
            var a = new this.$scroll(box, Object.assign({
                scrollX: false,
                scrollY: true,
                bounce: true,
                click: true,
                mouseWheel: true,
                probeType: 1,
                scrollbar: true,
                preventDefaultException: {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|DIV|P)$/
                }
            }, opt || {}));
            return a;
        } // click

    }, {
        key: "click",
        value: function click(box, fn) {
            var ts = this;

            if (ts._is_obj(box).code === 3) {
                box = ts.js(box).dom();
            }

            if (arguments.length > 1) {
                if (box.length >= 1) {
                    var _loop = function _loop() {
                        var ind = 'data-tab-click-index';
                        box[i].setAttribute(ind, i);

                        box[i].onclick = function (e) {
                            ts.focus(this);
                            fn({
                                index: this.getAttribute(ind) * 1,
                                e: e,
                                dom: this
                            });
                            ts.stopBubble(e);
                        };
                    };

                    for (var i = 0; i < box.length; i++) {
                        _loop();
                    }
                } else {
                    box.onclick = function (e) {
                        ts.focus(this);
                        fn({
                            index: 0,
                            e: e,
                            dom: this
                        });
                        ts.stopBubble(e);
                    };
                }
            } else {
                return box.click();
            }
        } // class

    }, {
        key: "class",
        value: function _class(box) {
            if (this._is_obj(box).code === 3) {
                box = this.js(box).dom();
            }

            var d = [];

            if (box.length >= 1) {
                for (var j = 0; j < box.length; j++) {
                    d.push(box[j]);
                }
            } else {
                d = [box];
            }

            return {
                add: function add(v) {
                    if (v === '' || !v) return false;
                    d.forEach(function (k) {
                        if (k) {
                            k.className.indexOf(v) < 0 && k.classList.add(v);
                        }
                    });
                },
                remove: function remove(v) {
                    if (v === '' || !v) return false;
                    d.forEach(function (k) {
                        if (k) {
                            k.className.indexOf(v) >= 0 && k.classList.remove(v);
                        }
                    });
                },
                name: function name(v) {
                    d.forEach(function (k) {
                        if (k) {
                            k.className = v || '';
                        }
                    });
                }
            };
        } // ajax

    }, {
        key: "ajax",
        value: function ajax(url) {
            var t = this;

            if (!window.Promise) {
                return {};
            }

            var par = function par(data) {
                var params = '';

                if (t._is_obj(data).code === 6) {
                    Object.keys(data).forEach(function (k) {
                        params += k + '=' + data[k] + '&';
                    });
                    params = params.substr(0, params.length - 1);
                } else {
                    params = data;
                }

                return params;
            };

            url = url || '';

            var send = function send(m, ts, h, opt) {
                return t.copy(Object.assign({
                    url: t.options.api + url,
                    method: m,
                    timeout: ts || t.options.ajaxTimeout,
                    headers: h,
                    withCredentials: t.options.ajaxCookie
                }, opt));
            };

            return {
                get: function get(data, fn, type, header) {
                    var headers = t.copy(header || {});

                    if (type === 'json') {
                        headers['Content-Type'] = "application/json";
                    }

                    if (t._is_obj(type).code === 6) {
                        headers = type;
                    }

                    var len = arguments.length > 1;
                    t.$axios(send('get', '', headers, {
                        params: data
                    })).then(function (e) {
                        if (e.status === 200) {
                            if (len) {
                                fn(e.data);
                            }
                        }
                    }).catch(function (e) {
                        if (len) {
                            if (e.response) {
                                fn({
                                    code: 0,
                                    data: e.response,
                                    err: e.response.data
                                });
                            } else {
                                fn({
                                    code: 0,
                                    data: e,
                                    err: e.message
                                });
                            }
                        }
                    });
                },
                post: function post(data, fn) {
                    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                    var header = arguments.length > 3 ? arguments[3] : undefined;
                    var len = arguments.length > 1;
                    var headers = t.copy(header || {});

                    if (type === 'json') {
                        headers['Content-Type'] = "application/json";
                    } else {
                        if (_typeof(data) === 'object') {
                            var d = '';

                            for (var k in data) {
                                d += k + '=' + data[k] + '&';
                            }

                            data = d.substring(0, d.length - 1);
                        }
                    }

                    if (t._is_obj(type).code === 6) {
                        headers = type;
                    }

                    t.$axios(send('post', '', headers, {
                        data: data
                    })).then(function (e) {
                        if (e.status === 200) {
                            if (len) {
                                fn(e.data);
                            }
                        }
                    }).catch(function (e) {
                        if (len) {
                            if (e.response) {
                                fn({
                                    code: 0,
                                    data: e.response,
                                    err: e.response.data
                                });
                            } else {
                                fn({
                                    code: 0,
                                    data: e,
                                    err: e.message
                                });
                            }
                        }
                    });
                },
                upload: function upload(data, fn, header) {
                    var len = arguments.length > 1;
                    var fd = new FormData();

                    if (t._is_obj(data).code === 6) {
                        for (var k in data) {
                            fd.append(k, data[k]);
                        }
                    } else {
                        fd = data;
                    }

                    var headers = t.copy(Object.assign({
                        "Content-Type": 'multipart/form-data;boundary=' + Date.now()
                    }, header || {}));
                    t.$axios({
                        url: t.options.api + url,
                        method: 'post',
                        timeout: t.options.ajaxUploadTimeout,
                        headers: headers,
                        withCredentials: t.options.ajaxCookie,
                        data: fd,
                        onUploadProgress: function onUploadProgress(e) {
                            var pro = parseInt(e.loaded / e.total * 100) / 100;
                            fn({
                                code: 2,
                                type: 'progress',
                                progress: pro
                            });
                        }
                    }).then(function (e) {
                        if (e.status === 200) {
                            if (len) {
                                fn(e.data);
                            }
                        }
                    }).catch(function (e) {
                        if (len) {
                            if (e.response) {
                                fn({
                                    code: 0,
                                    data: e.response,
                                    err: e.response.data
                                });
                            } else {
                                fn({
                                    code: 0,
                                    data: e,
                                    err: e.message
                                });
                            }
                        }
                    });
                },
                other: function other(method, data, fn, type, header) {
                    var headers = t.copy(header || {});

                    if (type === 'json') {
                        headers['Content-Type'] = "application/json";
                    } else {
                        if (_typeof(data) === 'object') {
                            var d = '';

                            for (var k in data) {
                                d += k + '=' + data[k] + '&';
                            }

                            data = d.substring(0, d.length - 1);
                        }
                    }

                    if (t._is_obj(type).code === 6) {
                        headers = type;
                    }

                    var len = arguments.length > 1;
                    t.$axios(send(method || 'post', '', headers, {
                        data: data
                    })).then(function (e) {
                        if (e.status === 200) {
                            if (len) {
                                fn(e.data);
                            }
                        }
                    }).catch(function (e) {
                        if (len) {
                            if (e.response) {
                                fn({
                                    code: 0,
                                    data: e.response,
                                    err: e.response.data
                                });
                            } else {
                                fn({
                                    code: 0,
                                    data: e,
                                    err: e.message
                                });
                            }
                        }
                    });
                },
                plain: function plain(data, fn, flag) {
                    var params = par(data);
                    var u = ((flag ? '' : t.options.api) + url).split('?')[0] + (params ? '?' + params : '');
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', u, true);

                    xhr.onreadystatechange = function () {
                        // readyState == 4说明请求已完成
                        if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                            // 从服务器获得数据 
                            fn.call(this, xhr.responseText);
                        }
                    };

                    xhr.send();
                },
                cipher: function cipher(data, fn, flag) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", (flag ? '' : t.options.api) + url, true); // 添加http头，发送信息至服务器时内容编码类型

                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                            fn.call(this, xhr.responseText);
                        }
                    };

                    xhr.send(par(data));
                }
            };
        } // jsonp 1.0.3

    }, {
        key: "jsonp",
        value: function jsonp(url, params, timeout) {
            params = params || {};
            timeout = timeout || this.jsonp_timeout;

            function randomStr() {
                return (Math.floor(Math.random() * 100000) * Date.now()).toString(16);
            }

            function formatParams(queryName, value) {
                queryName = queryName.replace(/=/g, '');
                var result = [];

                switch (value.constructor) {
                    case String:
                    case Number:
                    case Boolean:
                        result.push(encodeURIComponent(queryName) + '=' + encodeURIComponent(value));
                        break;

                    case Array:
                        value.forEach(function (item) {
                            result = result.concat(formatParams(queryName + '[]=', item));
                        });
                        break;

                    case Object:
                        Object.keys(value).forEach(function (key) {
                            var item = value[key];
                            result = result.concat(formatParams(queryName + '[' + key + ']', item));
                        });
                        break;
                }

                return result;
            }

            function flatten(array) {
                var querys = [];
                array.forEach(function (item) {
                    if (typeof item === 'string') {
                        querys.push(item);
                    } else {
                        querys = querys.concat(flatten(item));
                    }
                });
                return querys;
            }

            return new Promise(function (resolve, reject) {
                if (typeof url !== 'string') {
                    throw new Error('[jsonp] Type of param "url" is not string.');
                }

                var callbackQuery = params.callbackQuery || 'callback';
                var callbackName = params.callbackName || 'jsonp_' + randomStr();
                params[callbackQuery] = callbackName; // Remove callbackQuery and callbackName.

                delete params.callbackQuery;
                delete params.callbackName; // Convert params to querying str.

                var queryStrs = [];
                Object.keys(params).forEach(function (queryName) {
                    queryStrs = queryStrs.concat(formatParams(queryName, params[queryName]));
                });
                var queryStr = flatten(queryStrs).join('&'); // Timeout timer.

                var timeoutTimer = null; // Setup timeout.

                if (typeof timeout === 'number') {
                    timeoutTimer = setTimeout(function () {
                        removeErrorListener();
                        headNode.removeChild(paddingScript);
                        delete window[callbackName];
                        reject({
                            statusText: 'Request Timeout',
                            status: 408
                        });
                    }, timeout);
                } // Create global function.


                window[callbackName] = function (json) {
                    clearTimeout(timeoutTimer);
                    removeErrorListener();
                    headNode.removeChild(paddingScript);
                    resolve(json);
                    delete window[callbackName];
                }; // Create script element.


                var headNode = document.querySelector('head');
                var paddingScript = document.createElement('script'); // Add error listener.

                paddingScript.addEventListener('error', onError); // Append to head element.

                paddingScript.src = url + (/\?/.test(url) ? '&' : '?') + queryStr;
                headNode.appendChild(paddingScript);
                /**
                 * Padding script on-error event.
                 * @param {Event} event
                 */

                function onError(event) {
                    removeErrorListener();
                    clearTimeout(timeoutTimer);
                    reject({
                        status: 400,
                        statusText: 'Bad Request'
                    });
                }
                /**
                 * Remove on-error event listener.
                 */


                function removeErrorListener() {
                    paddingScript.removeEventListener('error', onError);
                }
            });
        } // is by

    }, {
        key: "platform",
        value: function platform() {
            // ['pc', 'android', 'iphone']
            var i = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);

            if (i) {
                var u = window.navigator.userAgent,
                    app = window.navigator.appVersion;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g

                var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

                if (isAndroid) {
                    return 1;
                }

                if (isIOS) {
                    return 2;
                }
            }

            var w = document.body.clientWidth;

            if (w < 750) {
                return 1;
            }

            return 0;
        } // 移动端检测滑动

    }, {
        key: "touch",
        value: function touch(dom, fn) {
            if (typeof dom === 'string') {
                dom = this.$.dom(dom);
            }

            var run = {
                view: ['pc', 'android', 'iphone'][this.$web],
                code: -1
            };
            var len = arguments.length;

            if (!dom || !this.$web) {
                if (len > 1) {
                    fn(run);
                }

                return false;
            }

            dom.addEventListener('touchstart', ts, false);
            dom.addEventListener('touchmove', ts, false);
            dom.addEventListener('touchend', ts, false);
            var sx, sy, mx, my, ex, ey, nx, ny, angle;

            function ts(event) {
                event.preventDefault();

                if (event.type == "touchstart") {
                    //console.log('开始');
                    var touch = event.touches[0];
                    sx = Math.floor(touch.pageX);
                    sy = Math.floor(touch.pageY);
                } else if (event.type == "touchmove") {
                    //console.log('滑动中');
                    var touch = event.touches[0];
                    mx = Math.floor(touch.pageX);
                    my = Math.floor(touch.pageY);
                } else if (event.type == "touchend" || event.type == "touchcancel") {
                    ex = Math.floor(event.changedTouches[0].pageX);
                    ey = Math.floor(event.changedTouches[0].pageY);
                    nx = ex - sx;
                    ny = ey - sy;
                    angle = Math.atan2(ny, nx) * 180 / Math.PI;
                    var os = {};

                    if (Math.abs(nx) <= 1 || Math.abs(ny) <= 1) {
                        os = {
                            code: 0,
                            text: '点击',
                            dire: 'click'
                        };
                    } else {
                        if (angle < 45 && angle >= -45) {
                            os = {
                                code: 2,
                                text: '右',
                                dire: 'right'
                            };
                        } else if (angle < 135 && angle >= 45) {
                            os = {
                                code: 3,
                                text: '下',
                                dire: 'down'
                            };
                        } else if (angle <= 180 && angle >= 135 || angle >= -180 && angle < -135) {
                            os = {
                                code: 4,
                                text: '左',
                                dire: 'left'
                            };
                        } else if (angle <= -45 && angle >= -135) {
                            os = {
                                code: 1,
                                text: '上',
                                dire: 'up'
                            };
                        }
                    }

                    run = Object.assign(run, os);
                    run.target = dom;

                    if (len > 0) {
                        fn(run);
                    }
                }
            }
        } // json格式化展示

    }, {
        key: "showJson",
        value: function showJson(json) {
            if (typeof json !== 'string') {
                json = JSON.stringify(json, undefined, 2);
            }

            json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = '#ff9b26';

                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = '#ff4c2f';
                    } else {
                        cls = '#67e66e';
                    }
                } else if (/true|false/.test(match)) {
                    cls = '#414fff';
                } else if (/null/.test(match)) {
                    cls = '#999';
                }

                return '<span style="color:' + cls + '">' + match + '</span>';
            });
        } // resize

    }, {
        key: "resize",
        value: function resize(dom, fn, timeout) {
            dom = this.$.dom(dom) || document.body;
            var len = arguments.length > 1;
            var p = {
                w: dom.clientWidth,
                h: dom.clientHeight
            };
            var t = this;

            dom.onresize = function () {
                t._timers('resize_timer', function (e) {
                    if (e) {
                        var o = {
                            w: dom.clientWidth,
                            h: dom.clientHeight
                        };

                        if (o.h !== p.h && o.w !== p.w) {
                            o.dire = 'auto';
                        } else if (o.w !== p.w) {
                            o.dire = 'width';
                        } else {
                            o.dire = 'height';
                        }

                        if (len) {
                            fn(o);
                        }
                    }
                }, 0, timeout || 800);
            };
        } // eval方法

    }, {
        key: "eval",
        value: function _eval(fn, flag) {
            if (!flag) {
                // var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
                var str = '(function(){' + fn + '})()'; // return new Fn('return ' + str)();

                return this.fn(str);
            }

            var script = document.createElement('script');
            script.type = "text/javascript";
            script.text = fn;
            document.getElementsByTagName('head')[0].appendChild(script);
            document.head.removeChild(document.head.lastChild);
            script = null;
        } // eval

    }, {
        key: "fn",
        value: function fn(str) {
            var j = new Function("return " + str)();
            return j;
        } // fixed box 全局弹框盒子

    }, {
        key: "frame",
        value: function frame(opt, fn) {
            opt = Object.assign({
                dom: 'body',
                type: 'frame',
                // [frame,template,html]
                theme: 'shadow_right',
                title: 'Title',
                header: true,
                close: true,
                scroll: false,
                style: {},
                move: false,
                moveDom: '',
                id: 'frame-' + this.rand(1000, 9999)
            }, opt);
            var len = arguments.length > 1;

            var error = function error(e, t, c) {
                return {
                    err: e,
                    by: t,
                    code: c || 0
                };
            };

            var c = error('dom is null', 'frame-dom');
            var dom = this.$.dom(opt.dom);

            if (!dom) {
                if (len) {
                    fn(c);
                }

                return c;
            }

            opt.theme = opt.theme ? opt.theme + (!opt.header ? ' auto' : '') : !opt.header ? 'auto' : '';

            if (!opt.style['z-index']) {
                opt.style['z-index'] = Math.ceil((Date.now() - new Date(this.timeout('', 'y/m/d')).getTime()) / 1000);
            }

            var s = '';
            s += "<div class=\"".concat(this.options.prefix, "_frame").concat(opt.theme ? ' ' + opt.theme : '', " hidden\" data-frame id=\"").concat(opt.id, "\">");

            if (opt.header) {
                s += "<header class=\"frame_header\"><b>".concat(opt.title, "</b>");

                if (opt.close) {
                    s += "<span class=\"close\" data-frame-close>X</span>";
                }

                s += "</header>";
            } else {
                if (opt.close) {
                    s += "<span class=\"close\" data-frame-close>X</span>";
                }
            }

            s += "<div class=\"frame_main\" id=\"".concat(opt.id, "-main\">");

            switch (opt.type) {
                case 'frame':
                    s += "<iframe src=\"".concat(opt.src, "\" frameborder=\"0\"></iframe>");
                    break;

                case 'template':
                    s += "<div class=\"content\" data-frame-content>".concat(opt.template, "</div>");
                    break;

                default:
                    s += "<div class=\"content\" data-frame-content></div>";
            }

            s += '</div>';

            if (opt.foot) {
                s += "<div class=\"frame_foot\" id=\"".concat(opt.id, "-foot\"></div>");
            }

            s += '</div>';

            if (opt.type === 'frame' && !opt.src) {
                c = error('frame src is null', 'frame-src');

                if (len) {
                    fn(c);
                }

                return c;
            } else if (opt.type === 'template' && !opt.template) {
                c = error('frame template is null', 'frame-template');

                if (len) {
                    fn(c);
                }

                return c;
            }

            dom.innerHTML = s;
            s = null;
            c = error('frame create end', 'frame-create', 1);

            if (len) {
                fn(c);
            }

            var n = dom.querySelector('[data-frame]');
            var e = dom.querySelector('[data-frame-close]');
            var cont = dom.querySelector('[data-frame-content]');
            var scroll = null;
            var foot = null;
            var head = null;

            if (opt.foot) {
                foot = dom.querySelector('.frame_foot');
                cont.style['padding-bottom'] = foot.clientHeight + 'px';
            }

            if (opt.header) {
                head = dom.querySelector('.frame_header');
            }

            if (opt.style) {
                var sty = '';

                for (var k in opt.style) {
                    if (k) {
                        sty += "".concat(k, ":").concat(opt.style[k], ";");
                    }
                }

                if (sty) {
                    n.setAttribute('style', sty);
                }
            }

            var t = this;

            function nus() {
                n = null;
                e = null;
                c = null;
                cont = null;
                scroll = null;
                foot = null;
                head = null;
            }

            if (n) {
                if (e) {
                    e.onclick = function (r) {
                        n.classList.add('hidden');
                        setTimeout(function () {
                            t.remove(n);
                            c = error('frame is delete', 'frame-delete', 1);

                            if (len) {
                                fn(c);
                            }

                            nus();
                        }, 1000);
                        t.stopBubble(r);
                    };
                }

                if (opt.scroll && cont) {
                    scroll = t.scroll('#' + opt.id + '-main');
                    c = error('frame scroll is create success', 'frame-scroll', 1);

                    if (len) {
                        fn(c);
                    }
                }

                if (opt.move) {
                    t.move(n, function (me) {
                        if (me.code) {
                            t.js(n, 0).style(Object.assign({
                                left: me.left,
                                top: me.top,
                                margin: '0',
                                bottom: 'auto',
                                right: 'auto',
                                transition: 'all 0s'
                            }, opt.style));
                        } else {
                            n.style.transition = 'all .8s';
                        }
                    }, opt.moveDom);
                }

                c = error('frame all success', 'frame-all-' + opt.type, 1);
                c.dom = n;
                c.doms = {
                    scroll: scroll,
                    close: e,
                    content: cont,
                    header: head,
                    footer: foot,
                    main: t.$.id(opt.id + '-main')
                };

                if (len) {
                    fn(c);
                }

                setTimeout(function () {
                    n.classList.remove('hidden');
                }, 50);
                return c;
            } else {
                c = error('frame dom is null', 'frame-dom-null');

                if (len) {
                    fn(c);
                }

                nus();
            }
        } // location

    }, {
        key: "location",
        value: function location(url, opt, fn) {
            var len = arguments.length > 2;
            var ts = this;

            if (!url) {
                return false;
            }

            opt = Object.assign({
                time: 0,
                target: ''
            }, opt);

            function open() {
                if (!window.open) {
                    ts.alert('window.open is null');
                    return 0;
                }

                var a = null;

                try {
                    a = window.open("_blank");
                    a.location = url;
                } catch (e) {
                    ts.alert('浏览器禁用 window.open');
                }

                return a;
            }

            function lo() {
                if (url === window.location.href) {
                    window.location.reload();
                    return false;
                }

                if (opt.target === 'open') {
                    open(url);
                    return false;
                }

                window.location.href = url;
                return true;
            }

            if (opt.time < 1) {
                lo();
            } else {
                if (len) {
                    var i = opt.time * 1;
                    var t = setInterval(function () {
                        if (i <= 0) {
                            clearInterval(t);
                            t = null;
                            lo();
                            return false;
                        }

                        if (len) {
                            fn(i);
                        }

                        i--;
                    }, 1000);
                }
            }
        } // 树结构

    }, {
        key: "tree",
        value: function tree(data, id, to) {
            id = id || 'id';
            to = to || 'by';
            var result = [];

            if (!Array.isArray(data)) {
                return result;
            }

            data.forEach(function (item) {
                delete item.children;
            });
            var map = {};
            data.forEach(function (item) {
                map[item[id]] = item;
            });
            data.forEach(function (item) {
                var parent = map[item[to]];

                if (parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    result.push(item);
                }
            });
            return result;
        } // focus 1.0.4重置

    }, {
        key: "focus",
        value: function focus(btn) {
            if (this._is_obj(btn).code === 3) {
                btn = this.$.dom(btn);
            }

            if (btn.blur) {
                btn.blur();
            } else {
                this.$.dom('body').focus();
            }

            return btn;
        } // 加载script 0.6

    }, {
        key: "script",
        value: function script(src, fn, text) {
            if (!src) return false;
            var s = document.createElement('script');
            s.type = 'text/javascript';

            if (arguments.length > 2) {
                s.text = text;
            } else {
                s.async = true;
                s.src = src;
            }

            if (arguments.length > 1) {
                s.onload = fn;
            }

            var t = document.getElementsByTagName('script')[0];
            t.parentNode.insertBefore(s, t);
            s = null;
            t = null;
            return !0;
        } // hover 0.6

    }, {
        key: "hover",
        value: function hover(box, fn, fn2) {
            var len = arguments.length > 1;
            var le2 = arguments.length > 2;

            if (this._is_obj(box).code === 3) {
                box = this.$.all(box);
            }

            if (len) {
                if (box.length >= 1) {
                    for (var i = 0; i < box.length; i++) {
                        box[i].setAttribute('data-tab', i);

                        box[i].onmouseenter = function (e) {
                            fn({
                                index: this.getAttribute('data-tab') * 1,
                                e: e,
                                dom: this,
                                type: 'enter'
                            });
                        };

                        box[i].onmousemove = function (e) {
                            fn({
                                index: this.getAttribute('data-tab') * 1,
                                e: e,
                                dom: this,
                                type: 'move'
                            });
                        };

                        if (le2) {
                            box[i].onmouseleave = function (e) {
                                fn2({
                                    index: this.getAttribute('data-tab') * 1,
                                    e: e,
                                    dom: this,
                                    type: 'leave'
                                });
                            };
                        }
                    }
                } else {
                    box.onmouseenter = function (e) {
                        fn({
                            index: 0,
                            e: e,
                            dom: this
                        });
                    };

                    if (le2) {
                        box.onmouseleave = function (e) {
                            fn2({
                                index: 0,
                                e: e,
                                dom: this
                            });
                        };
                    }
                }
            } else {
                return box;
            }
        } // tab 0.6

    }, {
        key: "tab",
        value: function tab(dom, opt, fn) {
            opt = Object.assign({
                index: 0,
                event: 'click',
                list: '[data-tab-list]',
                nav: '[data-tab]'
            }, opt);
            var t = this;

            if (t._is_obj(dom).code === 3) {
                dom = t.$.dom(dom);
            }

            var tabs = Array.from(dom.querySelectorAll(opt.nav));

            if (tabs.length) {
                t.class(tabs).name('');
                tabs.forEach(function (k, v) {
                    if (k && !t.js(k, 0).attr('data-index')) {
                        t.js(k, 0).attr('data-index', v);
                    }
                });

                if (opt.event === 'hover') {
                    t.hover(tabs, function (e) {
                        if (e.type === 'enter') {
                            e.dom.click();
                        }
                    });
                }

                t.click(tabs, function (e) {
                    var _t = e.dom;

                    var _i = t.js(_t, 0).attr('data-index');

                    if (_i === undefined) {
                        _i = opt.index;
                    }

                    t.class(tabs).name('');
                    t.js(_t, 0).addClass('active');
                    t.focus(_t);
                    fn ? fn({
                        index: _i * 1,
                        that: _t
                    }) : null;

                    if (opt.list) {
                        var list = t.$.all(opt.list);

                        if (list && list.length) {
                            t.class(list).name('');
                            t.js(list[_i * 1], 0).addClass('show');
                        }
                    }

                    return '';
                });
                setTimeout(function () {
                    if (opt.index < tabs.length) {
                        tabs[opt.index * 1].click();
                    }
                }, 200);
            }
        } // move 0.7

    }, {
        key: "move",
        value: function move(dom, fn, box) {
            if (box && this._is_obj(box).code === 3) {
                box = this.$.dom(box);
            }

            if (this._is_obj(dom).code === 3) {
                dom = this.$.dom(dom);
            }

            if (!dom) return null;
            var width = box ? box.clientWidth : window.innerWidth;
            var height = box ? box.clientHeight : window.innerHeight;

            dom.onmousedown = function (e) {
                var event = e || window.event;
                var x = event.clientX - dom.offsetLeft;
                var y = event.clientY - dom.offsetTop;

                if (typeof dom.setCapture !== 'undefined') {
                    dom.setCapture();
                }

                var ux = 0,
                    uy = 0;

                document.onmousemove = function (ev) {
                    var e = ev || window.event;
                    var mx = e.clientX - x;
                    var my = e.clientY - y;
                    mx = mx > width - dom.offsetWidth ? width - dom.offsetWidth : mx < 0 ? 0 : mx;
                    my = my > height - dom.offsetHeight ? height - dom.offsetHeight : my < 0 ? 0 : my;
                    ux = mx;
                    uy = my;
                    fn ? fn({
                        left: mx + 'px',
                        top: my + 'px',
                        code: 1
                    }) : null;
                };

                document.onmouseup = function () {
                    this.onmousemove = null;
                    this.onmouseup = null; //修复低版本ie bug  

                    if (typeof dom.releaseCapture != 'undefined') {
                        dom.releaseCapture();
                    }

                    fn ? fn({
                        left: ux,
                        top: uy,
                        code: 0
                    }) : null;
                    ux = null;
                    uy = null;
                };
            };
        } // array 0.8

    }, {
        key: "array",
        value: function array(arr) {
            var t = this;

            if (!arr.length || t._is_obj(arr).code !== 4) {
                return {};
            }

            return {
                rand: function rand() {
                    var a = t.copy(arr);
                    return a.sort(function () {
                        return Math.random() - 0.5;
                    });
                },
                agg: function agg(name) {
                    var r = {};

                    if (!name) {
                        return r;
                    }

                    arr.forEach(function (k) {
                        var v = k[name];

                        if (!(v === undefined || v === '')) {
                            if (r[v]) {
                                r[v].push(k);
                            } else {
                                r[v] = [k];
                            }
                        }
                    });
                    return r;
                },
                unique: function unique(k) {
                    if (arguments.length) {
                        var res = new Map();
                        return arr.filter(function (arr) {
                            return !res.has(arr[k]) && res.set(arr[k], 1);
                        });
                    }

                    var temp = [];

                    for (var i = 0; i < arr.length; i++) {
                        if (temp.indexOf(arr[i]) === -1) {
                            temp.push(arr[i]);
                        }
                    }

                    return temp;
                },
                max: function max() {
                    return Math.max.apply(null, arr);
                },
                min: function min() {
                    return Math.min.apply(null, arr);
                },
                sort: function sort(key) {
                    return {
                        reverse: function reverse() {
                            if (key) {
                                return arr.sort(function (a, b) {
                                    return b[key].localeCompare(a[key]);
                                });
                            }

                            return arr.sort(function (a, b) {
                                return a - b;
                            });
                        },
                        sort: function sort() {
                            if (key) {
                                return arr.sort(function (a, b) {
                                    return a[key].localeCompare(b[key]);
                                });
                            }

                            return arr.sort(function (a, b) {
                                return b - a;
                            });
                        }
                    };
                },
                sum: function sum(num, tp) {
                    num = num || 0;
                    tp = tp || 0;
                    return arr.reduce(function (a, b) {
                        a += '';
                        b += '';
                        var len = '0';

                        if (a.indexOf('.') >= 0) {
                            len = a;
                        }

                        if (b.indexOf('.') >= 0) {
                            len = b;
                        }

                        if (a.indexOf('.') >= 0 && b.indexOf('.') >= 0) {
                            len = a.length > b.length ? a : b;
                        }

                        var index = 0;

                        if (len.indexOf(".") >= 0) {
                            index = len.length - len.indexOf('.') - 1;
                            index = ('1e' + index) * 1;
                            a = a * index;
                            b = b * index;
                        }

                        a *= 1;
                        b *= 1;
                        index = index < 1 ? 1 : index;
                        var c = (a + b) / index;

                        switch (tp) {
                            case 1:
                                // -
                                c = (a - b) / index;
                                break;

                            case 2:
                                // *
                                c = a * b / index;
                                break;

                            case 3:
                                // /
                                c = a / b;
                                break;

                            case 4:
                                // %
                                c = a / index % (b / index);
                                break;

                            default: // +

                        }

                        len = null;
                        index = null;
                        return c;
                    }) + num * 1;
                },
                // 分割指定长度的元素数组 1.0.56
                chunk: function chunk(size, list) {
                    size = size || 1;
                    list = list || [];
                    var tmp = arr;

                    if (size <= 0) {
                        return list;
                    }

                    while (tmp.length) {
                        list.push(tmp.splice(0, size));
                    }

                    return list;
                },
                // 转obj
                obj: function obj(key, val) {
                    var v = {};
                    arr.forEach(function (r) {
                        if (r[key] !== undefined) {
                            v[r[key]] = r[val];
                        }
                    });
                    return v;
                }
            };
        } // 深拷贝 1.0

    }, {
        key: "copy",
        value: function copy(o) {
            if (o === '' || o === null || o === undefined || o === NaN) {
                return '';
            }

            return JSON.parse(JSON.stringify(o));
        } // font-size 1.0.2

    }, {
        key: "font",
        value: function font(width, s) {
            width = width || 1920;
            var w = window.innerWidth * (100 / width);

            if (s) {
                w = s;
            }

            document.documentElement.style.fontSize = w + 'px';
            this.font_em = !0;
        } // css 懒加载 1.0.32

    }, {
        key: "cssLazy",
        value: function cssLazy(id) {
            id = id || 'css-lazy';
            var r = document.head.children;
            var f = !1;

            if (r.length) {
                for (var j = 0; j < r.length; j++) {
                    if (r[j].id === id) {
                        f = !0;
                    }
                }
            }

            return {
                link: function link(url) {
                    if (!url) return 0;

                    if (!f) {
                        var d = document.createElement('link');
                        d.setAttribute('rel', 'stylesheet');
                        d.setAttribute('id', id);
                        d.setAttribute('href', url);
                        document.getElementsByTagName('head')[0].appendChild(d);
                        d = null;
                    }
                },
                text: function text(c) {
                    if (!c) return 0;

                    if (!f) {
                        var d = document.createElement('style');
                        d.setAttribute('type', 'text/css');
                        d.setAttribute('id', id);

                        try {
                            d.appendChild(document.createTextNode(c));
                        } catch (es) {
                            style.styleSheet.cssText = c;
                        }

                        document.getElementsByTagName('head')[0].appendChild(d);
                        d = null;
                    }
                }
            };
        } // hash检测 1.0.34

    }, {
        key: "hash",
        value: function hash(fn, str, tex) {
            str = str === 0 ? 0 : str || '';
            tex = tex || '';
            var that = this;
            var a = window.location.hash;

            if (tex) {
                try {
                    a = that.eval('return ' + tex);
                } catch (err) {
                    tex = '';
                    a = '';
                    fn({
                        code: 0,
                        data: err + ''
                    });
                }
            }

            if (a != str) {
                str = a;
                fn({
                    code: 1,
                    data: str
                });
            }

            fc();

            function fc() {
                if (that.is_hash) return 0;
                var t = setTimeout(function () {
                    clearTimeout(t);
                    t = null;
                    that.hash(function (e) {
                        fn(e);
                    }, str, tex);
                }, 200);
            }
        } // 初始化部分 1.0.35

    }, {
        key: "refresh",
        value: function refresh(n) {
            var t = this;
            t.loading_timer = null;
            t.alert_timer = null; // t.btn_timer = null

            t.resize_timer = null;
            t.timer_timer = null;
            t.jsonp_timer = null;
            t.down_timer = null;
            t.toast_timer = null;
            t.jsonp_timeout = 8000;
            t.is_hash = false;
            t.is_cache = 0;
            var api = t.$config.select('api');

            if (api) {
                t.options.api = api;
            }

            if (t.options.scroll && window.BScroll) {
                t.$scroll = window.BScroll;
            }

            if (t.options.ajax && window.axios) {
                t.$axios = window.axios;
            }

            console.log('%c 欢迎使用！当前版本：%c' + t.version + '。%c 更新时间：' + t.__TIME__, 'color:tomato', 'color:green', 'color:orange');

            if (t.options.debugger) {
                console.log('%c 禁止调试！', 'color:orange');
                setInterval(function () {
                    var a = Date.now();
                    debugger;
                    return a;
                }, 100);
            }

            if (!n) {
                console.log('%c 重置成功', 'color:#99cc33');
            }

            return {
                option: t.options,
                scroll: t.$scroll || '',
                ajax: t.$axios || '',
                ver: t.version
            };
        } // route路由 1.0.4

    }, {
        key: "route",
        value: function route() {
            var that = this;

            function p(p, i, t, b) {
                return {
                    path: p,
                    title: t || '',
                    id: i || 1,
                    by: b || -1
                };
            }

            function tit(t) {
                that.js('title').html(t);
            }

            function link(fn, cal) {
                var os = that.$routeConfig.now;

                if (os.path) {
                    window.location.hash = os.path;
                    tit(os.title);
                    lazy(function (r) {
                        fn ? fn(r) : null;
                    });
                } else {
                    cal ? cal() : null;
                }
            }

            function now(id) {
                if (id <= 0) return {};
                var a = that.$routeConfig.path.filter(function (j) {
                    return j.id === id;
                });

                if (a.length) {
                    return a[0];
                }

                return {};
            }

            function lazy(fn) {
                var obj = that.$routeConfig.now;
                var os = {
                    lazy: obj.path.replace(/\//g, '_'),
                    params: obj.params.join('&'),
                    path: obj.path,
                    back: {},
                    id: obj.id,
                    title: obj.title,
                    code: 1
                };
                os.back = now(os.by);
                os.params = that.getUrl('?' + os.params);
                var old = that.$.all('script[src*="' + that.$routeConfig.prefix + '"]');

                if (old.length) {
                    for (var i = 0; i < old.length; i++) {
                        that.remove(old[i]);
                    }
                }

                that.script(that.$routeConfig.prefix + os.lazy + that.$routeConfig.suffix);
                that.$routeConfig.now = os;
                fn(os);
                os = null;
            }

            return {
                // 装载路由
                create: function create(arr, fn, fn2) {
                    if (that._is_obj(arr).code === 4 && arr.length > 0) {
                        var a = arr.filter(function (k) {
                            return k.path !== '';
                        }); // 路由装填

                        that.$routeConfig.path = that.array(a).unique('path');
                        that.$route.config();
                        fn ? fn() : null;
                        return 1;
                    }

                    fn2 ? fn2() : null;
                    return 0;
                },
                // 路由初始化
                init: function init(fn) {
                    // 检测当前路由 that.$routeConfig.now
                    link(function (e) {
                        fn ? fn(e) : null;
                    }, function () {
                        that.$route.push(window.location.hash || '/');
                    });
                },
                // 跳转路由
                push: function push(path, fn) {
                    var p = path.substr(1);
                    p = !p ? 'index' : p;
                    p = p.split('/');
                    var ph = p.filter(function (j) {
                        return j.indexOf('=') < 0 && j;
                    }).join('/');
                    var ps = that.$routeConfig.path.filter(function (k) {
                        return k.path === ph;
                    });

                    if (ps.length) {
                        ps = ps[0];
                    } else {
                        ps = null;
                        fn ? fn({
                            code: 0,
                            err: '错误路由'
                        }) : demo.alert('错误路由');
                        return 0;
                    }

                    window.location.hash = ps.path;
                    tit(ps.title);
                    var params = [];
                    p = p.join('/').replace(ph, '').split('/');

                    if (p.length > 1) {
                        params = p.splice(1);
                    }

                    ps.params = params;
                    that.$routeConfig.now = ps;
                    ps = null;
                    lazy(function (e) {
                        fn ? fn(e) : null;
                    });
                },
                // 回退路由
                back: function back(fn) {
                    var os = (that.$routeConfig.now || {}).back || {};
                    that.$routeConfig.now = os;
                    link(function (e) {
                        fn ? fn(e) : null;
                    }, function () {
                        window.history.go(-1);
                    });
                    os = null;
                },
                // 路由快速装填
                array: function array(arr) {
                    if (that._is_obj(arr).code === 4 && arr.length > 0) {
                        var a = arr.map(function (k) {
                            return p(k[0], k[1], k[2], k[3]);
                        });
                        return a;
                    }

                    return [];
                },
                // 设置标题
                title: function title(t) {
                    tit(t);
                },
                // 重置路由
                reset: function reset(arr, opt, fn) {
                    that.$route.create(arr || []);
                    that.$route.config(opt || {});
                    fn ? fn() : null;
                },
                // 清除路由
                destroy: function destroy() {
                    that.$routeConfig = {
                        path: [],
                        now: {},
                        prefix: '',
                        suffix: ''
                    };
                },
                // 配置设置
                config: function config(opt) {
                    opt = opt || {};
                    that.$routeConfig.prefix = opt.prefix || './lazy/';
                    that.$routeConfig.suffix = opt.suffix || '.base.js?v=' + Date.now();
                }
            };
        } // 懒加载js方法 1.0.4

    }, {
        key: "lazy",
        value: function lazy() {
            var that = this;
            return {
                // 页面懒加载
                page: function page(dom, opt, fn) {
                    if (that._is_obj(dom).code === 3) {
                        dom = that.js(dom).dom();
                    }

                    that.js(dom, 0).html('');
                    opt = Object.assign({
                        vue: true,
                        id: 'lazy-' + Date.now(),
                        class: 'app_view',
                        html: 'html',
                        style: '',
                        link: '',
                        suffix: '.base.css?v=' + Date.now(),
                        prefix: ''
                    }, opt);

                    var index = that._div('div', opt.class);

                    index.setAttribute('id', opt.id);

                    if (opt.vue) {
                        index.setAttribute('v-clock', '');
                    }

                    index.innerHTML = opt.html;

                    if (opt.style) {
                        that.cssLazy('css-text-' + opt.id).text(opt.style);
                    }

                    if (opt.link) {
                        if (that._is_obj(opt.link).code === 4) {
                            opt.link.length && opt.link.forEach(function (k, v) {
                                that.cssLazy('css-link-' + opt.id + '-' + v).link(opt.prefix + k.replace(/\.css/, '') + opt.suffix);
                            });
                        } else {
                            that.cssLazy('css-link-' + opt.id).link(opt.prefix + opt.link.replace(/\.css/, '') + opt.suffix);
                        }
                    }

                    dom.appendChild(index);
                    fn ? fn() : null;
                },
                // 图片懒加载
                image: function image(tag) {
                    tag = tag || 'img';
                    var imgs = that.$.all(tag);
                    var len = imgs.length; // 视口的高度

                    var viewHeight = document.documentElement.clientHeight; // 滚动条高度

                    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;

                    for (var i = 0; i < len; i++) {
                        var offsetHeight = imgs[i].offsetTop;

                        if (offsetHeight < viewHeight + scrollHeight) {
                            var src = imgs[i].dataset.src;
                            imgs[i].src = src;
                        }
                    }
                },
                // 页面滚动加载
                scroll: function scroll(fn) {
                    var d = document.documentElement;
                    var c = d.clientHeight;
                    var s = d.scrollTop;
                    var h = d.scrollHeight;

                    if (c + s >= h) {
                        // 检测到滚动至页面底部，进行后续操作
                        fn ? fn() : null;
                    }
                },
                // 渲染几万条数据不卡住页面
                bulk: function bulk(len, count, dom, html, tag, cls, fn) {
                    tag = tag || 'li';
                    cls = cls || '';

                    if (!window.requestAnimationFrame || !document.createDocumentFragment) {
                        return '不支持';
                    }

                    if (arguments.length < 4 || that._is_obj(arguments[3]).code !== 5) {
                        return '传入正确参数';
                    }

                    setTimeout(function () {
                        // 插入十万条数据
                        var total = len || 100; // 一次插入的数据

                        var once = count || 20;
                        var c = 0; // 插入数据需要的次数

                        var loopCount = Math.ceil(total / once);
                        var countOfRender = 0;
                        var ul = dom;

                        if (that._is_obj(dom).code === 3) {
                            ul = that.$.dom(dom);
                        } // 添加数据的方法


                        function add() {
                            var fragment = document.createDocumentFragment();

                            for (var i = 0; i < once; i++) {
                                c++;

                                var li = that._div(tag, cls);

                                var ht = html(c, countOfRender, loopCount);

                                if (ht) {
                                    li.innerHTML = ht;
                                    fragment.appendChild(li);
                                }

                                li.setAttribute('data-bulk-id', c);
                            }

                            ul.appendChild(fragment);
                            countOfRender += 1;
                            loop();
                        }

                        function loop() {
                            if (countOfRender < loopCount) {
                                if (countOfRender + 1 === loopCount) {
                                    var end = total % once;
                                    once = end > 0 ? end : once;
                                }

                                window.requestAnimationFrame(add);
                            } else {
                                fn ? fn(Array.from(ul.querySelectorAll('[data-bulk-id]'))) : null;
                            }
                        }

                        loop();
                    }, 0);
                }
            };
        } // 防抖 1.0.4 触发高频时间后n秒内函数只会执行一次,如果n秒内高频时间再次触发,则重新计算时间。
        // 防抖常应用于用户进行搜索输入节约请求资源，window触发resize事件时进行防抖只触发一次。

    }, {
        key: "debounce",
        value: function debounce(fn, time) {
            var timeout = null;
            return function () {
                var _arguments = arguments,
                    _this = this;

                if (timeout !== null) clearTimeout(timeout);
                timeout = setTimeout(function () {
                    fn.apply(_this, _arguments);
                }, time);
            };
        } // 节流 高频时间触发,但n秒内只会执行一次,所以节流会稀释函数的执行频率
        // 节流常应用于鼠标不断点击触发、监听滚动事件。

    }, {
        key: "throttle",
        value: function throttle(fn, time) {
            var prev = Date.now();
            return function () {
                var context = this;
                var args = arguments;
                var now = Date.now();

                if (now - prev >= time) {
                    fn.apply(context, args);
                    prev = Date.now();
                }
            };
        } // 外置接入 1.0.4

    }, {
        key: "access",
        value: function access(name, data, fn) {
            var m = '接入成功';

            if (this[name]) {
                m = '该方法已存在';
                fn ? fn({
                    c: !1,
                    m: m
                }) : null;
                return m;
            }

            this[name] = data;
            fn ? fn({
                c: !0,
                m: m
            }) : null;
            return m;
        } // ctrl 1.0.46

    }, {
        key: "ctrl",
        value: function ctrl() {
            var t = this;
            var ovh = 'position: fixed;left: -100vw;top: -100vh;z-index: -1000';
            return {
                // 复制到剪贴板
                c: function c(el, text) {
                    var val = text;
                    var bool = document.execCommand('copy');

                    if (!bool) {
                        t.alert('不支持');
                        return 0;
                    }

                    if (el) {
                        try {
                            if (t._is_obj(el).code === 3) {
                                el = t.$.dom(el);
                            }

                            val = el.getAttribute('data-copy') || '';
                        } catch (e) {
                            val = '';
                        }
                    }

                    var inp = t._div('textarea');

                    var id = 'copy-' + Date.now() + '-' + t.rand(6);
                    inp.value = val || 'copy';
                    inp.setAttribute('id', id);
                    inp.setAttribute('style', ovh);
                    t.$.dom('body').appendChild(inp);
                    inp.select();
                    document.execCommand('copy');
                    setTimeout(function () {
                        t.remove(inp);
                    }, 300);
                    return 1;
                },
                // 右键菜单
                r: function r(el, opt, fn) {
                    if (t._is_obj(el).code === 3) {
                        el = t.$.dom(el);
                    }

                    opt = Object.assign({
                        item: []
                    }, opt);

                    if (!opt.item.length) {
                        el.oncontextmenu = function () {
                            fn ? fn({
                                type: 'right'
                            }) : null;
                            return false;
                        };

                        return 1;
                    }

                    var div = t._div('div', t.options.prefix + '_right');

                    var scroll = opt.item.length > 6 ? 'scroll' : '';
                    opt.id = opt.id || 'right-menu-' + Date.now() + '-' + t.rand(6);
                    div.setAttribute('id', opt.id);
                    var s = '<i class="close fa fa-close"></i><i class="before fa fa-hand-o-up"></i><div class="tab ' + scroll + '"><ul>';
                    opt.item.forEach(function (j, v) {
                        s += '<li><span title="' + j.text + '" data-index="' + v + '">' + j.text + '</span></li>';
                    });
                    s += '</ul></div>';
                    div.innerHTML = s;
                    t.$.dom('body').appendChild(div);
                    var nid = '#' + opt.id;
                    var ns = null;
                    var timer = null;
                    var timeout = opt.timeout || 3e3;
                    timeout = timeout < 100 ? 100 : timeout;

                    if (scroll) {
                        ns = t.scroll(nid + ' .tab', {});
                    }

                    t.click(nid + ' .close', function () {
                        clear();
                        t.js(nid).style({
                            opacity: 0
                        });
                    });
                    t.click(t.$.all(nid + ' .tab li span'), function (e) {
                        var index = e.dom.getAttribute('data-index');
                        var os = {
                            data: t.copy(opt.item[index * 1]),
                            type: 'click',
                            scroll: ns,
                            res: e,
                            leave: timeout
                        };

                        if (os.data.callback) {
                            delete os.data.callback;
                        }

                        opt.item[index].callback ? opt.item[index].callback(os) : fn ? fn(os) : null;
                        t.click(nid + ' .close');
                        os = null;
                    });

                    el.oncontextmenu = function (e) {
                        t.js(nid).style({
                            left: e.clientX + 'px',
                            top: e.clientY + 'px'
                        });
                        return false;
                    };

                    t.$.dom(nid).oncontextmenu = function () {
                        return false;
                    };

                    t.hover(nid, function () {
                        clear();
                    }, function () {
                        clear();
                        timer = setTimeout(function () {
                            t.click(nid + ' .close');
                        }, timeout);
                    });

                    function clear() {
                        if (timer) {
                            clearTimeout(timer);
                            timer = null;
                        }
                    }
                },
                // 禁用 ctrl+key shift+key key
                d: function d(a, fn) {
                    var v = (t._is_obj(a).code === 3 ? a.split(',') : a) || [];
                    var q = [];

                    if (v.length) {
                        q = v.map(function (k) {
                            var c = (k + '').split('-');
                            var os = {
                                c: c[0] === 'c',
                                s: c[0] === 's'
                            };
                            os.key = c[1] || c[0];
                            return os;
                        });
                    }

                    if (v.indexOf('right') >= 0) {
                        document.oncontextmenu = function () {
                            return false;
                        };
                    }

                    document.onkeydown = function (e) {
                        var key = e.key.toLowerCase();
                        var ns = q.filter(function (k) {
                            return k.key.toLowerCase() === key && e.ctrlKey === k.c && e.shiftKey === k.s;
                        });

                        if (v.indexOf('f12') >= 0) {
                            if (e.ctrlKey && e.shiftKey && key === 'i') {
                                fn ? fn({
                                    key: 'f12'
                                }) : null;
                                return false;
                            }
                        }

                        if (ns.length) {
                            ns = ns[0];

                            if (e.ctrlKey === ns.c && key === ns.key && !ns.s) {
                                fn ? fn(ns) : null;
                                return false;
                            }

                            if (e.shiftKey === ns.s && !ns.cal && key === ns.key) {
                                fn ? fn(ns) : null;
                                return false;
                            }
                        }

                        return true;
                    };
                },
                // 方向 上下左右 wasd 8624
                k: function k(el, fn, flag) {
                    if (t._is_obj(el).code === 3) {
                        el = t.$.dom(el);
                    }

                    var id = 'ctrl-k-input-keydown';

                    var c = function c(k, _c, d) {
                        return {
                            code: _c,
                            key: k,
                            val: d
                        };
                    };

                    t.js(el, 0).click(function (res) {
                        if (t.$.id(id)) {
                            t.js('#' + id).remove();
                        }

                        var inp = t._div('input', 'm_inp');

                        inp.setAttribute('id', id);
                        inp.setAttribute('style', ovh);
                        inp.setAttribute('autocomplete', 'off');
                        res.appendChild(inp);
                        inp.focus();
                        var his = [];

                        inp.onkeydown = function (e) {
                            var os = {};

                            if (!e.shiftKey && !e.ctrlKey) {
                                var cc = e.keyCode;

                                switch (cc) {
                                    case 38: // top

                                    case 87:
                                    case 104:
                                        os = c('up', 0, cc);
                                        break;

                                    case 39: // right

                                    case 68:
                                    case 102:
                                        os = c('right', 1, cc);
                                        break;

                                    case 40: // bottom

                                    case 83:
                                    case 98:
                                        os = c('bottom', 2, cc);
                                        break;

                                    case 37: // left

                                    case 65:
                                    case 100:
                                        os = c('left', 3, cc);
                                        break;

                                    default:
                                        os = c(e.key, 4, cc);
                                }
                            }

                            inp.value = '';

                            if (flag) {
                                os.event = e;
                                his.push(os.key);
                                os.his = his;
                            }

                            fn ? fn(os) : null;
                            os = null;
                        };
                    });
                }
            };
        } // 计算，算法

    }, {
        key: "algorithm",
        value: function algorithm() {
            var t = this;
            return {
                /** 颜色值 */
                rgb: function rgb(s, e) {
                    s = s || 0;
                    e = e || 255;
                    return 'rgb(' + t.rand(s, e) + ',' + t.rand(s, e) + ',' + t.rand(s, e) + ')';
                },
                rgba: function rgba(a, s, e) {
                    s = s || 0;
                    e = e || 255;
                    a = a || 0.1;
                    return 'rgba(' + t.rand(s, e) + ',' + t.rand(s, e) + ',' + t.rand(s, e) + ',' + a + ')';
                },
                color: function color() {
                    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
                },
                // 渐变
                gradients: function gradients() {
                    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
                        arg[_key] = arguments[_key];
                    }

                    var deg = arg[0];
                    var arr = arg;

                    if (t._is_obj(deg).code === 1) {
                        arr = arr.splice(1);
                    } else {
                        deg = 0;
                    }

                    arr = arr.filter(function (l) {
                        return t._is_obj(l).code === 3 && l !== '';
                    });

                    if (arr.length < 2) {
                        arr = [t.algorithm().rgb(), t.algorithm().rgb()];
                    }

                    arr = arr.join(',');
                    return 'linear-gradient(' + deg + 'deg,' + arr + ')';
                }
            };
        } // cookie 1.0.52

    }, {
        key: "cookie",
        value: function cookie() {
            var t = this;

            var prefix = function prefix(k) {
                return t.options.prefix + '_' + k;
            };

            var repl = function repl(k) {
                if (!k) return '';
                return k.replace(prefix(''), '');
            };

            return {
                set: function set(k, val, d) {
                    d = d || 'd7';
                    var v = d.substr(0, 1);
                    var day = d.substr(1);
                    day = isNaN(day) ? 7 : day * 1;
                    var time = 1000 * (v === 'd' ? 86400 : v === 'h' ? 3600 : 1) * day;
                    var date = new Date();
                    date.setTime(date.getTime() + time);

                    if (t._is_obj(k).code !== 7 && t._is_obj(val).code !== 7) {
                        document.cookie = prefix(k) + "=" + escape(val) + ";expires=" + date.toGMTString();
                    }

                    v = null;
                    day = null;
                    time = null;
                    date = null;
                    return !0;
                },
                get: function get(key, f) {
                    var o = t.cookie().getter(key);
                    if (f) return o;

                    var c = t._is_obj(o).code;

                    if (c === 6) {
                        o.key = repl(o.key);
                    } else if (c === 4) {
                        o = o.filter(function (k) {
                            return k.key.indexOf(prefix('')) === 0;
                        });
                        o = o.map(function (k) {
                            k.key = repl(k.key);
                            return k;
                        });
                    }

                    return o;
                },
                getter: function getter(key) {
                    var v = document.cookie || '';
                    v = v.split(';');

                    if (v.length) {
                        v = v.map(function (k) {
                            var a = k.split('=');
                            return {
                                key: a[0].trim(),
                                val: unescape(a[1])
                            };
                        });
                        v = v.filter(function (r) {
                            return r.key !== '';
                        });

                        if (t._is_obj(key).code === 3) {
                            v = v.filter(function (r) {
                                return r.key === prefix(key);
                            });
                            return v[0] || {};
                        }

                        return v;
                    }

                    return [];
                },
                del: function del(key) {
                    var date = new Date();
                    date.setTime(date.getTime() - 1);
                    var name = t.cookie().getter(key).val;

                    if (name != null) {
                        document.cookie = prefix(key) + "=" + escape(name) + ";expires=" + date.toGMTString();
                    }

                    date = null;
                    name = null;
                    return !0;
                },
                clear: function clear() {
                    var d = t.cookie().getter();

                    if (d.length) {
                        d = d.filter(function (k) {
                            return k.key.indexOf(prefix('')) === 0;
                        });

                        if (d.length) {
                            d.forEach(function (res) {
                                t.cookie().del(repl(res.key));
                            });
                        }
                    }

                    d = null;
                    return !0;
                }
            };
        } // 计算字符串字节 1.0.57

        /**
         * @param  {String} str 
         * @param  {String} charset utf-8, utf-16
         * @return {Number}
         */

    }, {
        key: "sizeof",
        value: function sizeof(str, charset) {
            var total = 0,
                charCode,
                i,
                len;
            charset = charset ? charset.toLowerCase() : '';

            if (charset === 'utf-16' || charset === 'utf16') {
                for (i = 0, len = str.length; i < len; i++) {
                    charCode = str.charCodeAt(i);

                    if (charCode <= 0xffff) {
                        total += 2;
                    } else {
                        total += 4;
                    }
                }
            } else {
                for (i = 0, len = str.length; i < len; i++) {
                    charCode = str.charCodeAt(i);

                    if (charCode <= 0x007f) {
                        total += 1;
                    } else if (charCode <= 0x07ff) {
                        total += 2;
                    } else if (charCode <= 0xffff) {
                        total += 3;
                    } else {
                        total += 4;
                    }
                }
            }

            return total;
        } // 缓存 1.0.57

    }, {
        key: "cache",
        value: function cache() {
            var t = this;
            var n = 'cache_';
            var s = 1024 * 1024 * 4.8;
            var w = ['$session', '$local'];

            var _n = function _n(key) {
                return t.options.prefix + '_' + n + key;
            };

            var _s = function _s(val) {
                return t.sizeof(val) < s;
            };

            var _l = function _l(k, v) {
                t[w[t.is_cache]].set(k, v);
            };

            var _g = function _g(k) {
                var g = t[w[t.is_cache]].get(_n(k));
                if (t._is_obj(g).code === 7 || g === '') return false;
                return g;
            };

            return {
                set: function set(key, val) {
                    val += '';

                    if (_s(val) && t._is_obj(val).code === 3) {
                        if (_g(key) !== false) {
                            return 0;
                        }

                        _l(_n(key), val);

                        return 1;
                    }

                    return 0;
                },
                edit: function edit(key, val) {
                    val += '';
                    if (_g(key) === false) return 0;

                    if (_s(val) && t._is_obj(val).code === 3) {
                        _l(_n(key), val);

                        return 1;
                    }

                    return 0;
                },
                get: function get(key) {
                    return _g(key);
                },
                del: function del(key) {
                    if (_g(key) === false) return 0;
                    t[w[t.is_cache]].clear(_n(key));
                    return 1;
                },
                name: function name(key) {
                    return {
                        key: _n(key),
                        val: _g(key)
                    };
                },
                cut: function cut(key) {
                    t.is_cache = !!key * 1;
                }
            };
        } // log debug f12 1.0.58

    }, {
        key: "log",
        value: function log(str, type) {
            if (!this.options.log) return str;

            switch (type) {
                case 1:
                    console.group(str);
                    break;

                case 2:
                    console.groupCollapsed(str);
                    break;

                case 3:
                    console.groupEnd();
                    break;

                case 4:
                    console.warn(str);
                    break;

                case 5:
                    console.error(str);
                    break;

                case 6:
                    str = Object.assign({
                        text: 'log',
                        sty: 'color:orange'
                    }, str || {});
                    console.log('%c ' + str.text, str.sty);
                    str = str.text;
                    break;

                default:
                    console.log(str);
            }

            return this;
        } // 状态存储 1.0.59

    }, {
        key: "status",
        value: function status() {
            var t = this;

            var n = function n(v) {
                return (t.options.prefix + 'status' + v).toUpperCase();
            };

            var s = function s(v) {
                return t.$session.get(n(v)) || {};
            };

            var e = function e(v, d) {
                t.$session.set(n(v), d);
            };

            var f = function f(p, n, v) {
                var d = s(p);

                if (t._is_obj(v).code < 7) {
                    d[n] = v;
                    e(p, d);
                }

                return d[n] || '';
            };

            var p = function p(name, def) {
                if (os[name]) return 0;

                os[name] = function (n, v) {
                    return f(name, n, v) || def;
                };
            };

            var os = {
                page: function page(n, v) {
                    return f('page', n, v) || 1;
                },
                status: function status(n, v) {
                    return f('status', n, v) || {};
                },
                code: function code(n, v) {
                    return f('code', n, v) || 400;
                },
                add: function add(n, d) {
                    p(n, d || '');
                }
            };
            return os;
        } // 设置不可更改属性 1.0.6

    }, {
        key: "const",
        value: function _const(name, val) {
            // enumerable 是否枚举/编辑
            // writable 是否可写，修改
            // configurable 是否可再被修改/删除
            if (this[name]) {
                return !1;
            }

            try {
                Object.defineProperty(this, name, {
                    enumerable: true,
                    value: val,
                    configurable: false,
                    writable: false
                });
            } catch (e) {
                console.log(e + '');
            }
        } // 插件 1.0.6

    }, {
        key: "plugIn",
        value: function plugIn() {
            var t = this;
            var n = t.options.prefix + '_plugins';

            var reset = function reset(str) {
                t.ajax(t.__DEMO_API__).plain({
                    send: str,
                    type: 'plugins'
                }, function (res) {
                    var v = JSON.parse(res);

                    if (v.code) {
                        v.data.forEach(function (k) {
                            if (t[k.name] && t[k.name]()) {
                                return 1;
                            }

                            t.script(k.url, function () {
                                t.access(k.name, t.fn(k.fn), function (r) {
                                    if (r.c) {
                                        up(k.name);
                                    }
                                });
                                t.js('script').remove();
                            });
                        });
                    }
                }, true);
            };

            var up = function up(name) {
                var v = t.$config.select(n) || [];

                if (v.indexOf(name) < 0) {
                    v.push(name);
                }

                t.$config.edit(n, v);
            };

            return {
                add: function add(plug, fn, err) {
                    var v = t.$config.select(n) || [];

                    if (t._is_obj(plug).code === 4) {
                        reset(plug.join(','));
                        v = v.concat(plug);
                    } else {
                        reset(plug);
                        v = v.concat(plug.split(','));
                    }

                    var ns = t.array(v).unique();
                    t.$config.edit(n, ns);

                    var load = function load() {
                        try {
                            fn ? fn(ns) : null;
                        } catch (e) {
                            err ? err(e + '') : null;
                            setTimeout(function () {
                                load();
                            }, 500);
                        }
                    };

                    load();
                },
                del: function del(plug) {
                    var v = t.$config.select(n) || [];

                    if (t._is_obj(plug).code === 4) {
                        plug.forEach(function (rs) {
                            v = v.filter(function (k) {
                                return k !== rs;
                            });
                        });
                    } else {
                        v = v.filter(function (k) {
                            return k !== plug;
                        });
                    }

                    t.$config.edit(n, v);
                },
                init: function init() {
                    var a = t.options.plugins.concat(t.$config.select(n) || []);
                    t.$config.add(n, a);

                    if (a.length) {
                        reset(a.join(','));
                    }
                }
            };
        } // toast 1.0.61

    }, {
        key: "toast",
        value: function toast(err, timeout) {
            var ts = this;
            var name = ts.options.prefix + '_toast';
            var isD = ts.$.dom('.' + name);

            var c = ts._is_obj(err).code;

            var num = isNaN(timeout) ? 3e3 : timeout < 1e3 ? 1e3 : +timeout;

            var v = function v(dom) {
                if (c === 4 || c === 6) {
                    ts.js(dom, 0).json(err);
                } else {
                    dom.innerHTML = err;
                }
            };

            var s = function s(dom) {
                if (ts.$web === 0) {
                    ts.class(dom).add('pc');
                } else if (ts.font_em) {
                    ts.class(dom).add('em');
                }

                ts.class(dom).add('show'); // n秒后删除

                if (ts.toast_timer !== null) {
                    clearTimeout(ts.toast_timer);
                    r(dom);
                } else {
                    r(dom);
                }

                dom.onclick = function (e) {
                    var m = err;

                    if (c === 4 || c === 6) {
                        m = JSON.stringify(err);
                    }

                    ts.ctrl().c('', m);
                    ts.log('copy success', 1).log(m, 0).log('', 3);
                    ts.stopBubble(e);
                };
            };

            var r = function r(dom) {
                ts.toast_timer = setTimeout(function () {
                    ts.class(dom).remove('show');
                    clearTimeout(ts.toast_timer);
                    ts.toast_timer = null;
                }, num);
            };

            if (isD) {
                v(isD);
                s(isD);
            } else {
                var d2 = ts._div('div', name);

                v(d2);
                ts.js('body').appendChild(d2);
                s(d2);
            }
        } // 停止冒泡

    }, {
        key: "stopBubble",
        value: function stopBubble(e) {
            if (e && e.stopPropagation) {
                e.stopPropagation();
            } else {
                window.event.cancelBubble = true;
            }
        } // 阻止浏览器的默认行为

    }, {
        key: "stopDefault",
        value: function stopDefault(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            } else {
                window.event.returnValue = false;
            }

            return false;
        } // 延时回调 用于不常用数据延时更新 1.0.73

    }, {
        key: "delay",
        value: function delay(opt, fn) {
            opt = this.copy(Object.assign({
                timeout: 5,
                name: 'delay',
                type: 'get',
                item: ''
            }, opt || {}));
            var tag = this.options.prefix + '-delay-' + opt.name;
            var time = Date.now();
            var data = this.$local.get(tag) || {};

            if (opt.type === 'set') {
                data.item = opt.item;
                data.time = time;
                this.$local.set(tag, data);
                fn ? fn({
                    code: 0,
                    data: data.item
                }) : null;
            } else {
                if (!data.time || +data.time - opt.timeout * 6e4 > time) {
                    this.$local.clear(tag);
                    fn ? fn({
                        code: 1,
                        data: data
                    }) : null;
                } else {
                    fn ? fn({
                        code: 0,
                        data: data.item
                    }) : null;
                }
            }
        } // prompt 1.0.75

    }, {
        key: "prompt",
        value: function prompt(msg, fn, title) {
            var t = this;
            var n = t.options.prefix + '_prompt';
            msg = msg || '请输入';
            title = title || msg;

            if (!t.$.id(n)) {
                var div = t._div('div', n);

                div.setAttribute('id', n);
                div.innerHTML = '<p data-head></p><div data-main><input type="text" class="m_inp small"></div><div data-foot><button class="m_btn small" data-close>取消</button><button class="m_btn small" data-submit>确定</button></div>';
                document.body.appendChild(div);
                t.js('#' + n + ' [data-submit]').click(function () {
                    var val = t.js('#' + n).find('input').value;

                    if (val !== '') {
                        fn ? fn(val) : null;
                        ss();
                        t.js('#' + n).find('input').value = '';
                    } else {
                        t.toast(msg);
                    }
                });
                t.js('#' + n + ' [data-close]').click(function () {
                    ss();
                });
            }

            var ss = function ss(f) {
                t.js('#' + n)[f ? 'addClass' : 'removeClass']('show');
            };

            setTimeout(function () {
                ss(!0);
            }, 200);
            t.js('#' + n + ' [data-head]').html(title);

            var _inp = t.js('#' + n).find('input');

            _inp.setAttribute('placeholder', msg);

            _inp.focus();

            _inp.onkeydown = function (e) {
                if (e.keyCode === 13) {
                    t.js('#' + n + ' [data-submit]').click();
                }
            };
        } // 1.0.8 更改网页标题

    }, {
        key: "title",
        value: function title(t) {
            this.js('title').html(t || 'title');
        }
        /**----------------------------------- 内置  ----------------------------------------------- */
        // 初始化

    }, {
        key: "_init",
        value: function _init(fn) {
            var t = this;
            t.$model = t._model();
            t.$fixed = t._fixed();
            t.$web = t.platform();
            t.$local = t.local();
            t.$session = t.session();
            t.route().destroy();
            t.$route = t.route();
            t.$lazy = t.lazy();
            t.$ctrl = t.ctrl();
            t.$alg = t.algorithm();
            t.$config = t._config();
            t.$cookie = t.cookie();
            t.$cache = t.cache();
            t.$save = t.status(); // 1.0.8 新增 判断类型

            t.$obj = function (a, c) {
                var r = t._is_obj(a);

                if (c) return r.code;
                return r;
            };

            t.const('__DEMO__', "http://148.70.132.221:2020/base/");
            t.const('__DEMO_API__', t.__DEMO__ + 'api/');
            t.const('__TIME__', '2021-05-13 18:00:00');
            t.const('__DOC__', t.__DEMO__ + '#/doc');
            t.$plug = t.plugIn();
            t.$plug.init();
            t.font_em = !1;
            delete t.$plug['init'];
            fn(t.refresh(1));
        } // fixed

    }, {
        key: "_fixed",
        value: function _fixed() {
            var t = this;
            return {
                bgc: function bgc(v, dom) {
                    dom = dom || 'body';

                    if (t._is_obj(dom).code === 3) {
                        dom = t.$.dom(dom);
                    }

                    if (t._is_obj(v).code === 6) {
                        var s = '';

                        for (var k in v) {
                            s += "".concat(k, ":").concat(v[k], ";");
                        }
                    } else {
                        v = v.replace('background:', '');
                        s = 'background:' + v;
                    }

                    if (dom) {
                        var cls = t.options.prefix + '_fixed';

                        if (t.$.dom('.' + cls)) {
                            t.js('.' + cls).remove();
                        }

                        var c = t._div('div', cls);

                        c.setAttribute('style', s);
                        dom.appendChild(c);
                        c = null;
                    }
                },
                image: function image(v, dom) {
                    dom = dom || 'body';

                    if (t._is_obj(dom).code === 3) {
                        dom = t.$.dom(dom);
                    }

                    if (dom) {
                        var cls = t.options.prefix + '_fixed';

                        if (t.$.dom('.' + cls)) {
                            t.remove('.' + cls);
                        }

                        var c = t._div('div', cls);

                        c.setAttribute('style', 'background:url(\'' + v + '\') no-repeat 0 0 transparent scroll;background-size:100% 100%');
                        dom.appendChild(c);
                        c = null;
                    }
                },
                gray: function gray(f) {
                    var s = 'css-lazy-gray';

                    if (f) {
                        try {
                            t.js('style[id="' + s + '"]').remove();
                        } catch (e) { }
                    } else {
                        t.cssLazy(s).text('html{filter:grayscale(1);}');
                    }
                }
            };
        } // 弹窗

    }, {
        key: "_model",
        value: function _model() {
            var t = this;
            return {
                success: function success(err, title) {
                    t.alert(err, 1, {
                        title: title
                    });
                },
                error: function error(err, title) {
                    t.alert(err, 0, {
                        title: title
                    });
                },
                warning: function warning(err, title) {
                    t.alert(err, 2, {
                        title: title
                    });
                },
                model: function model(title, err, fn, type) {
                    var len = arguments.length;
                    type = type === undefined ? 3 : type;
                    t.alert(err, type, {
                        title: title,
                        sty: 'model',
                        timeout: 0
                    }, function (e) {
                        if (len > 2) {
                            e.time = Date.now();
                            fn(e);
                        }
                    });
                },
                popup: function popup(err, fn, fixed) {
                    t.alert(err, 3, {
                        sty: 'model',
                        timeout: 0,
                        screen: !!fixed
                    }, function (e) {
                        if (e.code === 3e3) {
                            t.js(e.box, 0).addClass('popup');
                        } else {
                            fn ? fn(e) : null;
                        }
                    });
                },
                info: function info(err, flag, timeout) {
                    timeout = timeout || 0;
                    flag = flag === undefined ? 1 : flag;
                    t.alert(err, flag, {
                        timeout: timeout
                    });
                }
            };
        } // 节流

    }, {
        key: "_timers",
        value: function _timers(timer, fn) {
            var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
            var timeout = arguments.length > 3 ? arguments[3] : undefined;
            var t = this;

            if (t[timer] !== null) {
                if (flag) {
                    clearTimeout(t[timer]);
                    t[timer] = null;
                }

                return false;
            }

            fn(0);
            t[timer] = setTimeout(function () {
                clearTimeout(t[timer]);
                t[timer] = null;
                fn(1);
            }, timeout || 500);
        } // 本地存储

    }, {
        key: "_storage",
        value: function _storage(name) {
            var _name = (this.options.name + '-local-' + this.version.replace(/\./g, '')).toUpperCase();

            function gt() {
                var a = window[name].getItem(_name) || '{}';

                try {
                    a = JSON.parse(a);
                } catch (e) {
                    a = {};
                }

                return a;
            }

            function s(o) {
                if (!o) return 0;
                window[name].setItem(_name, JSON.stringify(o));
                return o;
            }

            function g(v, d) {
                var c = t._is_obj(a[v]).code;

                if (c > 6 || c === 5) {
                    return d;
                }

                return a[v];
            }

            function _i() {
                a = gt();
            }

            var a = gt();
            var t = this;
            return {
                all: function all() {
                    _i();

                    return a;
                },
                get: function get(v) {
                    var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

                    _i();

                    return g(v, d);
                },
                set: function set(k, v) {
                    if (!k) {
                        k = t.options.prefix + '-null';
                    }

                    _i();

                    a[k] = v;
                    return s(a);
                },
                clear: function clear(k) {
                    _i();

                    if (t._is_obj(k).code === 4 && k.length) {
                        k.forEach(function (ks) {
                            a[ks] = null;
                            delete a[ks];
                        });
                    } else {
                        a[k] = null;
                        delete a[k];
                    }

                    return s(a);
                },
                reset: function reset() {
                    return s({});
                }
            };
        } // 设置 style

    }, {
        key: "_style",
        value: function _style(d, t) {
            if (this._is_obj(t).code === 6) {
                for (var k in t) {
                    d.style[k] = t[k];
                }
            }
        } // config 1.0.51 config配置

    }, {
        key: "_config",
        value: function _config() {
            var t = this;
            var c = t.$local.get('config', {});

            function fg(k) {
                return t._is_obj(c[k]).code === 7;
            }

            function gt(k) {
                return t._is_obj(k).code === 3;
            }

            return {
                delete: function _delete(v) {
                    if (!fg(v)) {
                        delete c[v];
                        t.$local.set('config', c);
                        return 1;
                    }

                    return 0;
                },
                add: function add(k, v) {
                    if (gt(k) && fg(k)) {
                        c[k] = v;
                        t.$local.set('config', c);
                        return 1;
                    }

                    return 0;
                },
                edit: function edit(k, v) {
                    if (gt(k) && !fg(k)) {
                        c[k] = v;
                        t.$local.set('config', c);
                        return 1;
                    }

                    return 0;
                },
                select: function select(k) {
                    if (!fg(k)) {
                        return c[k];
                    }

                    if (gt(k)) {
                        return '';
                    }

                    return c;
                },
                switch: function _switch(n, k, v) {
                    var vv = t._config()[n];

                    if (n !== 'switch' && vv) {
                        return vv(k, v);
                    }

                    return 0;
                }
            };
        } // 判断类型为object

    }, {
        key: "_is_obj",
        value: function _is_obj(o) {
            var c = 0;
            var t = '';

            switch (Object.prototype.toString.call(o)) {
                case '[object Number]':
                    c = 1;
                    t = 'number';
                    break;

                case '[object Boolean]':
                    c = 2;
                    t = 'boolean';
                    break;

                case '[object String]':
                    c = 3;
                    t = 'string';
                    break;

                case '[object Array]':
                    c = 4;
                    t = 'array';
                    break;

                case '[object Function]':
                    c = 5;
                    t = 'function';
                    break;

                case '[object Object]':
                    c = 6;
                    t = 'object';
                    break;

                case '[object Undefined]':
                    c = 7;
                    t = 'undefined';
                    break;

                case '[object Null]':
                    c = 8;
                    t = 'null';
                    break;

                default:
            }

            return {
                code: c,
                type: t
            };
        } // 创建dom

    }, {
        key: "_div",
        value: function _div(str, cls, text) {
            var c = document.createElement(str || 'div');

            var cd = this._is_obj(text).code;

            if (cd !== 7) {
                if (cd === 4 || cd === 6) {
                    text = JSON.stringify(text);
                }

                c.appendChild(document.createTextNode(text));
            }

            cd = null;
            c.setAttribute('class', cls || '');
            return c;
        }
    }]);

    return Demo;
}();

(function () {
    if (!window.demo) {
        var demo = window.demo = new Demo();
    }
})();