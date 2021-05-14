// https://babeljs.cn/en/repl es6 -- es5
class Demo {
	constructor(opt, fn) {
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
		}, (opt || {}))
		// 创建属性
		this.const('version', '1.0.80')
		this.$ = {
			dom(id) {
				if (!id) return null
				return document.querySelector(id)
			},
			all(id) {
				if (!id) return []
				let len = document.querySelectorAll(id)
				return len.length > 0 ? Array.from(len) : []
			},
			id(id) {
				if (!id) return null
				return document.getElementById(id)
			},
			// html input... name
			name(name) {
				if (!name) return []
				var len = document.getElementsByName(name)
				return len.length > 0 ? Array.from(len) : []
			},
			// html tag
			tag(tag) {
				if (!tag) return []
				var len = document.getElementsByTagName(tag)
				return len.length > 0 ? Array.from(len) : []
			}
		}
		this._init(r => {
			fn ? fn(r) : null
		});
	}
	// dom常用方法
	js(id, flag = 1) {
		var dom = id
		var t = this
		if (flag) {
			dom = this.$.dom(id)
		}
		if (!dom) {
			return {}
		}
		return {
			dom: function () {
				return dom
			},
			html: function (text) {
				if (!arguments.length) return dom.innerHTML
				let c = t._is_obj(text).code
				if (c === 4 || c === 6) {
					text = JSON.stringify(text)
				}
				dom.innerHTML = text
			},
			text: function (text) {
				if (!arguments.length) return dom.innerText
				dom.innerText = text
			},
			brother: function (cls = '') {
				if (!cls) return dom
				return dom.parentNode.querySelector(cls)
			},
			addClass: function (c) {
				if (t._is_obj(c).code === 4) {
					c.forEach(k => {
						dom.classList.add(k)
					})
					return 1
				}
				dom.classList.add(c)
			},
			removeClass: function (c) {
				var s = dom.className
				if (t._is_obj(c).code === 4) {
					c.forEach(k => {
						if (s.indexOf(k) >= 0) {
							dom.classList.remove(c)
						}
					})
					return 1
				}
				if (s.indexOf(c) >= 0) {
					dom.classList.remove(c)
				}
			},
			toggleClass: function (c) {
				var to = function (l) {
					if (dom.className.indexOf(l) >= 0) {
						dom.classList.remove(c)
					} else {
						dom.classList.add(c)
					}
				}
				if (t._is_obj(c).code === 4) {
					c.forEach(k => {
						to(k)
					})
					return 1
				}
				to(c)
			},
			append: function (c) {
				if (!c) return 0
				dom.innerHTML += c
			},
			appendChild: function (c) {
				if (!c) return 0
				dom.appendChild(c)
			},
			remove: function () {
				dom.parentNode.removeChild(dom)
			},
			style: function (e, f) {
				var str = ''
				if (t._is_obj(e).code === 6) {
					for (var k in e) {
						str += `${k}:${e[k]};`
						if (f) {
							dom.style[k] = e[k]
						}
					}
				} else {
					f = !1
					str = e
				}
				if (!f) {
					dom.setAttribute('style', str)
				}
			},
			attr: function (e, f) {
				if (t._is_obj(e).code === 6) {
					Object.keys(e).forEach(r => {
						dom.setAttribute('data-' + r, e[r])
					})
					return !0
				} else if (t._is_obj(e).code == 4) {
					let val = {}
					e.forEach(r => {
						val[r] = dom.getAttribute('data-' + r) || ''
					})
					return val
				}
				if (arguments.length > 1) {
					dom.setAttribute(e, f)
				} else {
					return dom.getAttribute(e)
				}
			},
			click: function (fn, time) {
				if (arguments.length > 0) {
					dom.onclick = function (e) {
						let that = this
						if (time > 0 && !isNaN(time)) {
							that.setAttribute('disabled', 'true')
							setTimeout(() => {
								that.removeAttribute('disabled')
							}, time * 1e3)
						}
						t.focus(that)
						fn(that, e)
						e.preventDefault()
						t.stopBubble(e)
					}
				} else {
					dom.click()
				}
			},
			json: function (json) {
				json = json || {}
				dom.innerHTML = t.showJson(json)
			},
			width: function (e) {
				if (arguments.length) {
					dom.style.width = isNaN(e) ? e : e + 'px'
				} else {
					return dom.clientWidth
				}
			},
			height: function (e) {
				if (arguments.length) {
					dom.style.height = isNaN(e) ? e : e + 'px'
				} else {
					return dom.clientHeight
				}
			},
			square: function (w, h) {
				if (w) {
					if (!h) { h = w }
					t.js(dom, 0).width(w)
					t.js(dom, 0).height(h)
				} else {
					return {
						w: dom.clientWidth,
						h: dom.clientHeight
					}
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
			val: function (e) {
				if (arguments.length) {
					dom.value = e
				} else {
					return dom.value
				}
			},
			input: function (fn) {
				if (arguments.length) {
					dom.oninput = function (e) {
						fn(this, e)
					}
				}
			},
			keydown: function (fn) {
				if (arguments.length) {
					dom.onkeydown = function (e) {
						e = e || window.event
						var os = {
							event: e,
							code: e.keyCode,
							value: this.value,
							key: e.key,
							dom: dom
						}
						fn(os, this)
					}
				}
			},
			find: function (cls) {
				var getDom = function (arr) {
					var ds = []
					arr.forEach(function (k) {
						ds.push({ name: k.replace(/[.|#]/, ''), dom: Array.from(dom.querySelectorAll(k)) })
					})
					return ds
				}
				// 数组
				if (t._is_obj(cls).code === 4) {
					return getDom(cls)
				}
				// 字符串 两个参数
				if (arguments.length > 1) {
					return getDom([cls])[0].dom
				}
				return dom.querySelector(cls)
			},
			video: function (opt) {
				opt = Object.assign({
					"x5-video-player-type": "h5",
					"x5-video-player-fullscreen": "false"
				}, (opt || {}))
				for (var k in opt) {
					dom.setAttribute(k, opt[k])
				}
			},
			index: function () {
				let index = 0
				do {
					index++
				} while (dom = dom.previousElementSibling);
				return index
			},
			offset: function () {
				let _d = dom.getBoundingClientRect()
				let _m = document.body
				return {
					top: _d.top + _m.scrollTop,
					left: _d.left + _m.scrollLeft,
					self: {
						top: _d.top,
						left: _d.left
					}
				}
			},
			replaceVal: function (reg) {
				reg = reg || /[^\u4e00-\u9fa5]/g
				var c = (tar) => {
					let v = tar.value
					tar.value = v.replace(new RegExp(reg), '')
				}
				dom.onfocus = (e) => {
					c(e.target)
				}
				dom.onkeyup = (e) => {
					c(e.target)
				}
				dom.onblur = (e) => {
					c(e.target)
				}
			},
			child: function (v) {
				return Array.from(v ? dom.querySelectorAll(v) : dom.children)
			},
			bgc: function (text) {
				let dm = t.js(dom, 0).child('[data-background-list]')
				if (dm.length) {
					text = text || 'green|#18bc9c'
					dm.forEach(k => {
						let bgc = k.getAttribute('data-bgc') || text
						bgc = bgc.split('|')
						if (bgc.length === 1) {
							bgc[1] = bgc[0]
						}
						k.style.background = t.algorithm().gradients((bgc[2] || 90) * 1, bgc[0], bgc[1] || '')
					})
				}
				return dm
			},
			show: function () {
				let v = dom.getAttribute('data-fade') || 'hide'
				if (v === 'hide') {
					var i = 0;
					dom.style.display = ''
					dom.setAttribute('data-fade', 'show')
					var c = () => {
						dom.style.opacity = i > 1 ? 1 : i
						i += Math.random() / 10
						if (i < 1.001) {
							setTimeout(() => { c() }, 50)
						}
					}
					c()
				}
				return dom
			},
			hide: function () {
				let v = dom.getAttribute('data-fade') || 'show'
				if (v === 'show') {
					var i = 1
					var c = () => {
						dom.style.opacity = i < 0 ? 0 : i
						i -= Math.random() / 10
						if (i > -0.001) {
							setTimeout(() => { c() }, 50)
						} else {
							dom.style.display = 'none'
							dom.setAttribute('data-fade', 'hide')
						}
					}
					c()
				}
				return dom
			},
			toggle: function () {
				let v = dom.getAttribute('data-fade') || ''
				return t.js(dom, 0)[v === 'show' ? 'hide' : 'show']()
			},
			file: function (fn, opt) {
				opt = opt || {}
				let id = 'file-' + t.rand(1e4, 1e5 - 1)
				let v = demo._div('input', 'm_inp');
				let b = demo._div('label');
				let text = dom.innerText
				v.setAttribute('type', 'file')
				v.setAttribute('id', id)
				if (opt.more) {
					v.setAttribute('multiple', true)
				}
				let accept = ''
				switch (opt.type) {
					case 'txt':
						accept = 'text/plain'
						break
					case 'other':
						accept = opt.accept || ''
						break
					default:
						accept = 'image/png,image/gif,image/jpg,image/jpeg'
				}
				v.setAttribute('accept', accept)
				b.setAttribute('for', id)
				b.setAttribute('style', 'display:block')
				dom.innerHTML = ''
				dom.appendChild(v)
				dom.appendChild(b)
				b.innerHTML = text || 'Upload'
				if (t.$.id(id)) {
					t.$.id(id).onchange = function () {
						let os = {
							files: this.files,
							file: this.files[0],
							time: t.timeout(),
							id: id,
							el: dom
						}
						if (os.file) {
							fn ? fn(os) : null
						}
					}
				}
			},
			scrollbar: function () {
				if (dom.clientHeight > dom.parentNode.clientHeight) {
					dom.parentNode.classList.add(t.options.prefix + '_scrollbar')
				}
			}
		}
	}
	// loading
	loading(opt) {
		var os = Object.assign({
			theme: this.options.theme,
			dom: 'body'
		}, (opt || {}))
		var t = this
		var sty = t.options.prefix + '_loading'
		var d = t.$.dom('.' + sty)
		if (d && os.dom === 'body') {
			d.className = sty + (os.theme === '' ? '' : ' ' + os.theme)
			return false
		}
		var l = document.createElement('div');
		l.setAttribute('class', sty + (os.theme === '' ? '' : ' ' + os.theme))
		if (os.id) {
			l.setAttribute('id', t.options.prefix + '-' + os.id)
		}
		if (os.dom === 'body') {
			document.body.appendChild(l)
		} else {
			l.setAttribute('style', 'position:absolute')
			t.$.dom(os.dom).appendChild(l)
		}
		return l
	}
	// alert
	alert(err, num, opt, fn) {
		var os = Object.assign({
			title: '',
			timeout: 2000,
			screen: 0,
			sty: 'alert',
			btnSuccessText: '确定',
			btnErrorText: '取消',
			btnSuccessStyle: '',
			btnErrorStyle: ''
		}, (opt || {}))
		num = num || 0
		var t = this
		var load = null
		var les = arguments.length > 3
		if (os.screen) {
			load = t.loading({
				theme: t.options.theme + ' model',
				id: 'loading-' + t.rand(1000, 9999)
			})
		}
		var hidden = function (l, fe) {
			var len = arguments.length
			if (l) {
				l.classList.add('hidden')
				setTimeout(function () {
					if (l) {
						t.remove(l)
						l = null
					}
					if (load) {
						t.remove(load)
						load = null
					}
					if (len > 1) {
						fe()
					}
					if (les) {
						fn({
							code: 1,
							type: 'all',
							status: 'remove',
							options: os.data || {}
						})
					}
				}, 200)
			}
		}
		if (num > 99) {
			var old = t.js('body').find("[id^='" + t.options.prefix + "-alert-']")
			var ld = t.js('body').find('[id^="' + t.options.prefix + '-loading-"]')
			if (old) {
				if (ld) {
					load = ld
				}
				hidden(old)
			}
			ld = null
			old = null
			return 0
		}
		var sty = t.options.prefix + '_model.' + os.sty
		var d = t.$.dom('.' + sty)
		if (d) {
			hidden(d, function () {
				d = null
				t.alert(err, num, opt)
			})
			return false
		}
		var l = document.createElement('div')
		var tps = ['error', 'success', 'warning', 'default']
		num = num >= tps.length ? tps.length - 1 : num
		l.setAttribute('class', sty.replace('.', ' ') + ' hidden ' + tps[num])
		l.setAttribute('id', t.options.prefix + '-alert-' + t.rand(1000, 9999))
		if (t._is_obj(err).type === 'object') {
			err = JSON.stringify(err)
		}
		var str = ''
		var id = '_' + t.rand(1000, 9999) + '-'
		if (os.title) {
			str += '<h3 class="title">' + os.title + '</h3>'
		}
		str += '<i class="close"></i>'
		str += '<p class="msg">' + (err === undefined ? '' : err) + '</p>'
		if (os.sty !== 'alert') {
			str += '<div class="btn">'
			str += '<button class="m_btn ' + os.btnSuccessStyle + '" id="' + id + 's">' + os.btnSuccessText + '</button>'
			str += '<button class="m_btn ' + os.btnErrorStyle + '" id="' + id + 'e">' + os.btnErrorText + '</button>'
			str += '</div>'
		}
		l.innerHTML = str
		document.body.appendChild(l)
		var c = l.querySelector('.close')
		var s = l.querySelector('#' + id + 's')
		var e = l.querySelector('#' + id + 'e')
		if (os.sty === 'alert' && les) {
			fn({
				code: 1,
				type: 'alert',
				status: 'create',
				options: os.data || {}
			})
		}
		if (c) {
			c.onclick = function (e) {
				hidden(l)
				t.stopBubble(e)
			}
		}
		if (les) {
			fn({ code: 3e3, box: l })
			if (s) {
				t.js(s, 0).click(function () {
					fn({
						btn: 'success',
						t: s,
						code: 1,
						box: l,
						options: os.data || {}
					})
					hidden(l)
				})
			}
			if (e) {
				t.js(e, 0).click(function () {
					fn({
						btn: 'error',
						t: e,
						code: 0,
						box: l,
						options: os.data || {}
					})
					hidden(l)
				})
			}
		}
		setTimeout(function () {
			l.classList.remove('hidden')
		}, 50)
		if (os.timeout > 500) {
			t._timers('alert_timer', function (e) {
				if (e) {
					hidden(l)
				}
			}, 0, os.timeout)
		}
	}
	// rand
	rand(min, max) {
		min = min * 1;
		if (arguments.length === 1) {
			min = min > 9 ? 9 : (min < 1 ? 1 : min)
			max = ('1e' + min) * 1 - 1
			min = ('1e' + (min - 1)) * 1
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
		if (!max && arguments.length > 1) {
			return Math.floor(Math.random() * min)
		}
		max = max * 1
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	// remove
	remove(t) {
		if (t && t.parentNode) {
			t.parentNode.removeChild(t)
			t = null
		}
		return 1
	}
	// 时间
	timeout(num, type, join) {
		if (!num || isNaN(num)) {
			num = Date.now()
		}
		num = parseInt(num)
		join = join || '/'
		function wk(n) {
			return '星期' + ([
				"日",
				"一",
				"二",
				"三",
				"四",
				"五",
				"六"
			][n])
		}
		function zero(n) {
			return (n < 10 ? ('0' + n) : n)
		}
		if ((num + '').length > 10) {
			num = Math.floor(num / 1000)
		}
		var yt = new Date(num * 1000)
		var wd = yt.getDay()
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
		}
		wd = null
		yt = null
		num = null
		os.m = zero(os.m)
		os.d = zero(os.d)
		os.h = zero(os.h)
		os.i = zero(os.i)
		os.s = zero(os.s)

		function ymd(os, s, f) {
			if (f) {
				return os.y + s + os.m
			}
			return os.y + s + os.m + s + os.d
		}
		function his(os, s, f) {
			if (f) {
				return os.h + s + os.i
			}
			return os.h + s + os.i + s + os.s
		}
		function md(os, s) {
			return os.m + s + os.d
		}

		var ret = ''
		switch (type) {
			case 'alls':
				ret = ymd(os, join) + ' ' + his(os, ':')
				break
			case 'ymd':
				ret = ymd(os, join)
				break
			case 'md':
				ret = md(os, join)
				break
			case 'his':
				ret = his(os, join)
				break
			case 'array':
				ret = [
					os.y, os.m, os.d, os.h, os.i, os.s, os.ms
				]
				break
			case 'object':
				ret = os
				break
			case 'zero':
				ret = new Date(ymd(os, '/') + ' 00:00:00').getTime()
				break
			case 'day':
				ret = os.week
				break
			case 'rotate':
				ret = {
					s: os.s * 6,
					i: (os.i + os.s / 60) * 6,
					h: (os.h % 12 + os.i / 60) * 30
				}
				break
			default:
				ret = ymd(os, join) + ' ' + his(os, ':', 1)
		}
		return ret
	}
	// local
	local() {
		return this._storage('localStorage')
	}
	// session
	session() {
		return this._storage('sessionStorage')
	}
	// 获取url参数
	getUrl(str) {
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
	}
	// 获取url某个参数
	getUrlParam(param, str) {
		var search = window.location.search.substring(1)
		if (arguments.length > 1) {
			search = str.split("?")[1]
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
	}
	// scroll
	scroll(box, opt) {
		if (!this.$scroll) return false
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
		}, (opt || {})))
		return a
	}
	// click
	click(box, fn) {
		let ts = this
		if (ts._is_obj(box).code === 3) {
			box = ts.js(box).dom()
		}
		if (arguments.length > 1) {
			if (box.length >= 1) {
				for (var i = 0; i < box.length; i++) {
					let ind = 'data-tab-click-index'
					box[i].setAttribute(ind, i)
					box[i].onclick = function (e) {
						ts.focus(this)
						fn({
							index: this.getAttribute(ind) * 1,
							e,
							dom: this
						})
						ts.stopBubble(e)
					}
				}
			} else {
				box.onclick = function (e) {
					ts.focus(this)
					fn({
						index: 0,
						e,
						dom: this
					})
					ts.stopBubble(e)
				}
			}
		} else {
			return box.click()
		}
	}
	// class
	class(box) {
		if (this._is_obj(box).code === 3) {
			box = this.js(box).dom()
		}
		var d = []
		if (box.length >= 1) {
			for (var j = 0; j < box.length; j++) {
				d.push(box[j])
			}
		} else {
			d = [box]
		}
		return {
			add(v) {
				if (v === '' || !v) return false
				d.forEach(function (k) {
					if (k) {
						k.className.indexOf(v) < 0 && k.classList.add(v)
					}
				})
			},
			remove(v) {
				if (v === '' || !v) return false
				d.forEach(function (k) {
					if (k) {
						k.className.indexOf(v) >= 0 && k.classList.remove(v)
					}
				})
			},
			name(v) {
				d.forEach(function (k) {
					if (k) {
						k.className = v || ''
					}
				})
			}
		}
	}
	// ajax
	ajax(url) {
		var t = this
		if (!window.Promise) {
			return {}
		}
		let par = (data) => {
			let params = ''
			if (t._is_obj(data).code === 6) {
				Object.keys(data).forEach(k => {
					params += k + '=' + data[k] + '&'
				})
				params = params.substr(0, params.length - 1)
			} else { params = data }
			return params
		}
		url = url || ''
		let send = (m, ts, h, opt) => {
			return t.copy(Object.assign({
				url: t.options.api + url,
				method: m,
				timeout: ts || t.options.ajaxTimeout,
				headers: h,
				withCredentials: t.options.ajaxCookie
			}, opt))
		}
		return {
			get(data, fn, type, header) {
				var headers = t.copy(header || {})
				if (type === 'json') {
					headers['Content-Type'] = "application/json"
				}
				if (t._is_obj(type).code === 6) {
					headers = type
				}
				var len = arguments.length > 1

				t.$axios(send('get', '', headers, { params: data })).then(function (e) {
					if (e.status === 200) {
						if (len) {
							fn(e.data)
						}
					}
				}).catch(function (e) {
					if (len) {
						if (e.response) {
							fn({
								code: 0,
								data: e.response,
								err: e.response.data
							})
						} else {
							fn({
								code: 0,
								data: e,
								err: e.message
							})
						}
					}
				})
			},
			post(data, fn, type = '', header) {
				var len = arguments.length > 1
				var headers = t.copy(header || {})
				if (type === 'json') {
					headers['Content-Type'] = "application/json"
				} else {
					if (typeof data === 'object') {
						var d = ''
						for (var k in data) {
							d += k + '=' + data[k] + '&'
						}
						data = d.substring(0, d.length - 1)
					}
				}
				if (t._is_obj(type).code === 6) {
					headers = type
				}
				t.$axios(send('post', '', headers, { data: data })).then(function (e) {
					if (e.status === 200) {
						if (len) {
							fn(e.data)
						}
					}
				}).catch(function (e) {
					if (len) {
						if (e.response) {
							fn({
								code: 0,
								data: e.response,
								err: e.response.data
							})
						} else {
							fn({
								code: 0,
								data: e,
								err: e.message
							})
						}
					}
				})
			},
			upload(data, fn, header) {
				var len = arguments.length > 1
				var fd = new FormData()
				if (t._is_obj(data).code === 6) {
					for (let k in data) {
						fd.append(k, data[k])
					}
				} else {
					fd = data
				}
				var headers = t.copy(Object.assign({ "Content-Type": 'multipart/form-data;boundary=' + Date.now() }, (header || {})))
				t.$axios({
					url: t.options.api + url,
					method: 'post',
					timeout: t.options.ajaxUploadTimeout,
					headers: headers,
					withCredentials: t.options.ajaxCookie,
					data: fd,
					onUploadProgress: function (e) {
						var pro = parseInt((e.loaded / e.total) * 100) / 100
						fn({
							code: 2,
							type: 'progress',
							progress: pro
						})
					}
				}).then(function (e) {
					if (e.status === 200) {
						if (len) {
							fn(e.data)
						}
					}
				}).catch(function (e) {
					if (len) {
						if (e.response) {
							fn({
								code: 0,
								data: e.response,
								err: e.response.data
							})
						} else {
							fn({
								code: 0,
								data: e,
								err: e.message
							})
						}
					}
				})
			},
			other(method, data, fn, type, header) {
				var headers = t.copy(header || {})
				if (type === 'json') {
					headers['Content-Type'] = "application/json"
				} else {
					if (typeof data === 'object') {
						var d = ''
						for (var k in data) {
							d += k + '=' + data[k] + '&'
						}
						data = d.substring(0, d.length - 1)
					}
				}
				if (t._is_obj(type).code === 6) {
					headers = type
				}
				var len = arguments.length > 1
				t.$axios(send((method || 'post'), '', headers, { data: data })).then(function (e) {
					if (e.status === 200) {
						if (len) {
							fn(e.data)
						}
					}
				}).catch(function (e) {
					if (len) {
						if (e.response) {
							fn({
								code: 0,
								data: e.response,
								err: e.response.data
							})
						} else {
							fn({
								code: 0,
								data: e,
								err: e.message
							})
						}
					}
				})
			},
			plain(data, fn, flag) {
				let params = par(data)
				let u = ((flag ? '' : t.options.api) + url).split('?')[0] + (params ? ('?' + params) : '')
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
			cipher(data, fn, flag) {
				var xhr = new XMLHttpRequest();
				xhr.open("POST", (flag ? '' : t.options.api) + url, true);
				// 添加http头，发送信息至服务器时内容编码类型
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
						fn.call(this, xhr.responseText);
					}
				};
				xhr.send(par(data));
			}
		}
	}
	// jsonp 1.0.3
	jsonp(url, params, timeout) {
		params = params || {}
		timeout = timeout || this.jsonp_timeout

		function randomStr() { return (Math.floor(Math.random() * 100000) * Date.now()).toString(16) }

		function formatParams(queryName, value) {
			queryName = queryName.replace(/=/g, '')
			var result = []

			switch (value.constructor) {
				case String:
				case Number:
				case Boolean:
					result.push(encodeURIComponent(queryName) + '=' + encodeURIComponent(value))
					break

				case Array:
					value.forEach(function (item) {
						result = result.concat(formatParams(queryName + '[]=', item))
					})
					break

				case Object:
					Object.keys(value).forEach(function (key) {
						var item = value[key]
						result = result.concat(formatParams(queryName + '[' + key + ']', item))
					})
					break
			}

			return result
		}

		function flatten(array) {
			var querys = []
			array.forEach(function (item) {
				if (typeof item === 'string') {
					querys.push(item)
				} else {
					querys = querys.concat(flatten(item))
				}
			})
			return querys
		}

		return new Promise(function (resolve, reject) {
			if (typeof url !== 'string') {
				throw new Error('[jsonp] Type of param "url" is not string.')
			}

			var callbackQuery = params.callbackQuery || 'callback'
			var callbackName = params.callbackName || 'jsonp_' + randomStr()

			params[callbackQuery] = callbackName

			// Remove callbackQuery and callbackName.
			delete params.callbackQuery
			delete params.callbackName

			// Convert params to querying str.
			var queryStrs = []
			Object.keys(params).forEach(function (queryName) {
				queryStrs = queryStrs.concat(formatParams(queryName, params[queryName]))
			})

			var queryStr = flatten(queryStrs).join('&')

			// Timeout timer.
			var timeoutTimer = null

			// Setup timeout.
			if (typeof timeout === 'number') {
				timeoutTimer = setTimeout(function () {
					removeErrorListener()
					headNode.removeChild(paddingScript)
					delete window[callbackName]
					reject({
						statusText: 'Request Timeout',
						status: 408
					})
				}, timeout)
			}

			// Create global function.
			window[callbackName] = function (json) {
				clearTimeout(timeoutTimer)
				removeErrorListener()
				headNode.removeChild(paddingScript)
				resolve(json)
				delete window[callbackName]
			}

			// Create script element.
			var headNode = document.querySelector('head')
			var paddingScript = document.createElement('script')

			// Add error listener.
			paddingScript.addEventListener('error', onError)

			// Append to head element.
			paddingScript.src = url + (/\?/.test(url) ? '&' : '?') + queryStr
			headNode.appendChild(paddingScript)

			/**
			 * Padding script on-error event.
			 * @param {Event} event
			 */
			function onError(event) {
				removeErrorListener()
				clearTimeout(timeoutTimer)
				reject({
					status: 400,
					statusText: 'Bad Request'
				})
			}

			/**
			 * Remove on-error event listener.
			 */
			function removeErrorListener() {
				paddingScript.removeEventListener('error', onError)
			}
		})
	}
	// is by
	platform() {
		// ['pc', 'android', 'iphone']
		var i = (navigator.userAgent.match(
			/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
		))
		if (i) {
			var u = window.navigator.userAgent,
				app = window.navigator.appVersion;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
			var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if (isAndroid) {
				return 1
			}
			if (isIOS) {
				return 2
			}
		}
		var w = document.body.clientWidth
		if (w < 750) {
			return 1
		}
		return 0
	}
	// 移动端检测滑动
	touch(dom, fn) {
		if (typeof dom === 'string') {
			dom = this.$.dom(dom)
		}
		var run = {
			view: ['pc', 'android', 'iphone'][this.$web],
			code: -1
		}
		var len = arguments.length
		if (!dom || !this.$web) {
			if (len > 1) {
				fn(run)
			}
			return false
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
				var os = {}
				if (Math.abs(nx) <= 1 || Math.abs(ny) <= 1) {
					os = {
						code: 0,
						text: '点击',
						dire: 'click'
					}
				} else {
					if (angle < 45 && angle >= -45) {
						os = {
							code: 2,
							text: '右',
							dire: 'right'
						}
					} else if (angle < 135 && angle >= 45) {
						os = {
							code: 3,
							text: '下',
							dire: 'down'
						}
					} else if ((angle <= 180 && angle >= 135) || (angle >= -180 && angle < -135)) {
						os = {
							code: 4,
							text: '左',
							dire: 'left'
						}
					} else if (angle <= -45 && angle >= -135) {
						os = {
							code: 1,
							text: '上',
							dire: 'up'
						}
					}
				}
				run = Object.assign(run, os)
				run.target = dom
				if (len > 0) {
					fn(run)
				}
			}
		}
	}
	// json格式化展示
	showJson(json) {
		if (typeof json !== 'string') {
			json = JSON.stringify(json, undefined, 2);
		}
		json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
		return json.replace(
			/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
			function (match) {
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
	}
	// resize
	resize(dom, fn, timeout) {
		dom = this.$.dom(dom) || document.body
		var len = arguments.length > 1
		var p = {
			w: dom.clientWidth,
			h: dom.clientHeight
		}
		var t = this
		dom.onresize = function () {
			t._timers('resize_timer', function (e) {
				if (e) {
					var o = {
						w: dom.clientWidth,
						h: dom.clientHeight
					}
					if (o.h !== p.h && o.w !== p.w) {
						o.dire = 'auto'
					} else if (o.w !== p.w) {
						o.dire = 'width'
					} else {
						o.dire = 'height'
					}
					if (len) {
						fn(o)
					}
				}
			}, 0, timeout || 800)
		}
	}
	// eval方法
	eval(fn, flag) {
		if (!flag) {
			// var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
			let str = '(function(){' + fn + '})()'
			// return new Fn('return ' + str)();
			return this.fn(str)
		}
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.text = fn;
		document.getElementsByTagName('head')[0].appendChild(script);
		document.head.removeChild(document.head.lastChild);
		script = null
	}
	// eval
	fn(str) {
		let j = (new Function("return " + str))()
		return j
	}
	// fixed box 全局弹框盒子
	frame(opt, fn) {
		opt = Object.assign({
			dom: 'body',
			type: 'frame', // [frame,template,html]
			theme: 'shadow_right',
			title: 'Title',
			header: true,
			close: true,
			scroll: false,
			style: {},
			move: false,
			moveDom: '',
			id: 'frame-' + this.rand(1000, 9999)
		}, opt)
		var len = arguments.length > 1
		var error = (e, t, c) => { return { err: e, by: t, code: c || 0 } }
		var c = error('dom is null', 'frame-dom')
		var dom = this.$.dom(opt.dom)
		if (!dom) {
			if (len) {
				fn(c)
			}
			return c
		}
		opt.theme = opt.theme ? (opt.theme + (!opt.header ? ' auto' : '')) : (!opt.header ? 'auto' : '')
		if (!opt.style['z-index']) {
			opt.style['z-index'] = Math.ceil((Date.now() - new Date(this.timeout('', 'y/m/d')).getTime()) / 1000)
		}
		var s = ''
		s +=
			`<div class="${this.options.prefix}_frame${opt.theme ? ' ' + opt.theme : ''} hidden" data-frame id="${opt.id}">`
		if (opt.header) {
			s += `<header class="frame_header"><b>${opt.title}</b>`
			if (opt.close) {
				s += `<span class="close" data-frame-close>X</span>`
			}
			s += "</header>"
		} else {
			if (opt.close) {
				s += `<span class="close" data-frame-close>X</span>`
			}
		}
		s += `<div class="frame_main" id="${opt.id}-main">`
		switch (opt.type) {
			case 'frame':
				s += `<iframe src="${opt.src}" frameborder="0"></iframe>`
				break
			case 'template':
				s += `<div class="content" data-frame-content>${opt.template}</div>`
				break
			default:
				s += `<div class="content" data-frame-content></div>`
		}
		s += '</div>'
		if (opt.foot) {
			s += `<div class="frame_foot" id="${opt.id}-foot"></div>`
		}
		s += '</div>'
		if (opt.type === 'frame' && !opt.src) {
			c = error('frame src is null', 'frame-src')
			if (len) {
				fn(c)
			}
			return c
		} else if (opt.type === 'template' && !opt.template) {
			c = error('frame template is null', 'frame-template')
			if (len) {
				fn(c)
			}
			return c
		}
		dom.innerHTML = s
		s = null
		c = error('frame create end', 'frame-create', 1)
		if (len) {
			fn(c)
		}
		var n = dom.querySelector('[data-frame]')
		var e = dom.querySelector('[data-frame-close]')
		var cont = dom.querySelector('[data-frame-content]')
		var scroll = null
		var foot = null
		var head = null
		if (opt.foot) {
			foot = dom.querySelector('.frame_foot')
			cont.style['padding-bottom'] = foot.clientHeight + 'px'
		}
		if (opt.header) {
			head = dom.querySelector('.frame_header')
		}
		if (opt.style) {
			var sty = ''
			for (var k in opt.style) {
				if (k) {
					sty += `${k}:${opt.style[k]};`
				}
			}
			if (sty) {
				n.setAttribute('style', sty)
			}
		}
		var t = this
		function nus() {
			n = null
			e = null
			c = null
			cont = null
			scroll = null
			foot = null
			head = null
		}
		if (n) {
			if (e) {
				e.onclick = function (r) {
					n.classList.add('hidden')
					setTimeout(function () {
						t.remove(n)
						c = error('frame is delete', 'frame-delete', 1)
						if (len) {
							fn(c)
						}
						nus()
					}, 1000)
					t.stopBubble(r)
				}
			}
			if (opt.scroll && cont) {
				scroll = t.scroll('#' + opt.id + '-main')
				c = error('frame scroll is create success', 'frame-scroll', 1)
				if (len) {
					fn(c)
				}
			}
			if (opt.move) {
				t.move(n, function (me) {
					if (me.code) {
						t.js(n, 0).style(Object.assign({
							left: me.left, top: me.top,
							margin: '0',
							bottom: 'auto',
							right: 'auto',
							transition: 'all 0s'
						}, opt.style))
					} else {
						n.style.transition = 'all .8s'
					}
				}, opt.moveDom)
			}
			c = error('frame all success', 'frame-all-' + opt.type, 1)
			c.dom = n
			c.doms = {
				scroll: scroll,
				close: e,
				content: cont,
				header: head,
				footer: foot,
				main: t.$.id(opt.id + '-main')
			}
			if (len) {
				fn(c)
			}
			setTimeout(function () {
				n.classList.remove('hidden')
			}, 50)
			return c
		} else {
			c = error('frame dom is null', 'frame-dom-null')
			if (len) {
				fn(c)
			}
			nus()
		}
	}
	// location
	location(url, opt, fn) {
		var len = arguments.length > 2
		let ts = this
		if (!url) {
			return false
		}
		opt = Object.assign({
			time: 0,
			target: ''
		}, opt)
		function open() {
			if (!window.open) {
				ts.alert('window.open is null')
				return 0
			}
			let a = null
			try {
				a = window.open("_blank")
				a.location = url
			} catch (e) {
				ts.alert('浏览器禁用 window.open')
			}
			return a
		}
		function lo() {
			if (url === window.location.href) {
				window.location.reload()
				return false
			}
			if (opt.target === 'open') {
				open(url)
				return false
			}
			window.location.href = url
			return true
		}
		if (opt.time < 1) {
			lo()
		} else {
			if (len) {
				var i = opt.time * 1
				var t = setInterval(function () {
					if (i <= 0) {
						clearInterval(t)
						t = null
						lo()
						return false
					}
					if (len) {
						fn(i)
					}
					i--
				}, 1000)
			}
		}
	}
	// 树结构
	tree(data, id, to) {
		id = id || 'id'
		to = to || 'by'
		var result = []
		if (!Array.isArray(data)) {
			return result
		}
		data.forEach(function (item) {
			delete item.children;
		})
		var map = {};
		data.forEach(function (item) {
			map[item[id]] = item;
		})
		data.forEach(function (item) {
			var parent = map[item[to]];
			if (parent) {
				(parent.children || (parent.children = [])).push(item);
			} else {
				result.push(item);
			}
		})
		return result;
	}
	// focus 1.0.4重置
	focus(btn) {
		if (this._is_obj(btn).code === 3) {
			btn = this.$.dom(btn)
		}
		if (btn.blur) {
			btn.blur()
		} else {
			this.$.dom('body').focus()
		}
		return btn
	}
	// 加载script 0.6
	script(src, fn, text) {
		if (!src) return false
		var s = document.createElement('script');
		s.type = 'text/javascript';
		if (arguments.length > 2) {
			s.text = text
		} else {
			s.async = true;
			s.src = src;
		}
		if (arguments.length > 1) {
			s.onload = fn
		}
		var t = document.getElementsByTagName('script')[0];
		t.parentNode.insertBefore(s, t);
		s = null
		t = null
		return !0
	}
	// hover 0.6
	hover(box, fn, fn2) {
		var len = arguments.length > 1
		var le2 = arguments.length > 2
		if (this._is_obj(box).code === 3) {
			box = this.$.all(box)
		}
		if (len) {
			if (box.length >= 1) {
				for (var i = 0; i < box.length; i++) {
					box[i].setAttribute('data-tab', i)
					box[i].onmouseenter = function (e) {
						fn({
							index: this.getAttribute('data-tab') * 1,
							e,
							dom: this,
							type: 'enter'
						})
					}
					box[i].onmousemove = function (e) {
						fn({
							index: this.getAttribute('data-tab') * 1,
							e,
							dom: this,
							type: 'move'
						})
					}
					if (le2) {
						box[i].onmouseleave = function (e) {
							fn2({
								index: this.getAttribute('data-tab') * 1,
								e,
								dom: this,
								type: 'leave'
							})
						}
					}
				}
			} else {
				box.onmouseenter = function (e) {
					fn({
						index: 0,
						e,
						dom: this
					})
				}
				if (le2) {
					box.onmouseleave = function (e) {
						fn2({
							index: 0,
							e,
							dom: this
						})
					}
				}
			}
		} else {
			return box
		}
	}
	// tab 0.6
	tab(dom, opt, fn) {
		opt = Object.assign({
			index: 0, event: 'click', list: '[data-tab-list]', nav: '[data-tab]'
		}, opt)
		var t = this
		if (t._is_obj(dom).code === 3) {
			dom = t.$.dom(dom)
		}
		var tabs = Array.from(dom.querySelectorAll(opt.nav))
		if (tabs.length) {
			t.class(tabs).name('')
			tabs.forEach(function (k, v) {
				if (k && !t.js(k, 0).attr('data-index')) {
					t.js(k, 0).attr('data-index', v)
				}
			})
			if (opt.event === 'hover') {
				t.hover(tabs, function (e) {
					if (e.type === 'enter') {
						e.dom.click()
					}
				})
			}
			t.click(tabs, function (e) {
				var _t = e.dom
				var _i = t.js(_t, 0).attr('data-index')
				if (_i === undefined) { _i = opt.index }
				t.class(tabs).name('')
				t.js(_t, 0).addClass('active')
				t.focus(_t)
				fn ? fn({ index: _i * 1, that: _t }) : null
				if (opt.list) {
					var list = t.$.all(opt.list)
					if (list && list.length) {
						t.class(list).name('')
						t.js(list[_i * 1], 0).addClass('show')
					}
				}
				return ''
			})
			setTimeout(() => {
				if (opt.index < tabs.length) {
					tabs[opt.index * 1].click()
				}
			}, 200)
		}
	}
	// move 0.7
	move(dom, fn, box) {
		if (box && this._is_obj(box).code === 3) {
			box = this.$.dom(box)
		}
		if (this._is_obj(dom).code === 3) {
			dom = this.$.dom(dom)
		}
		if (!dom) return null
		var width = box ? box.clientWidth : window.innerWidth
		var height = box ? box.clientHeight : window.innerHeight
		dom.onmousedown = function (e) {
			var event = e || window.event
			var x = event.clientX - dom.offsetLeft
			var y = event.clientY - dom.offsetTop
			if (typeof dom.setCapture !== 'undefined') {
				dom.setCapture()
			}
			var ux = 0, uy = 0
			document.onmousemove = function (ev) {
				var e = ev || window.event
				var mx = e.clientX - x
				var my = e.clientY - y
				mx = mx > (width - dom.offsetWidth) ? (width - dom.offsetWidth) : (mx < 0 ? 0 : mx)
				my = my > (height - dom.offsetHeight) ? (height - dom.offsetHeight) : (my < 0 ? 0 : my)
				ux = mx
				uy = my
				fn ? fn({
					left: mx + 'px',
					top: my + 'px',
					code: 1
				}) : null
			}
			document.onmouseup = function () {
				this.onmousemove = null;
				this.onmouseup = null;
				//修复低版本ie bug  
				if (typeof dom.releaseCapture != 'undefined') {
					dom.releaseCapture();
				}
				fn ? fn({
					left: ux,
					top: uy,
					code: 0
				}) : null
				ux = null
				uy = null
			}
		}
	}
	// array 0.8
	array(arr) {
		var t = this
		if (!arr.length || t._is_obj(arr).code !== 4) {
			return {}
		}
		return {
			rand: function () {
				var a = t.copy(arr)
				return a.sort(function () {
					return Math.random() - 0.5
				})
			},
			agg: function (name) {
				var r = {}
				if (!name) {
					return r
				}
				arr.forEach(function (k) {
					var v = k[name]
					if (!(v === undefined || v === '')) {
						if (r[v]) {
							r[v].push(k)
						} else {
							r[v] = [k]
						}
					}
				})
				return r
			},
			unique: function (k) {
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
			max: function () {
				return Math.max.apply(null, arr)
			},
			min: function () {
				return Math.min.apply(null, arr)
			},
			sort: function (key) {
				return {
					reverse: function () {
						if (key) {
							return arr.sort(function (a, b) {
								return b[key].localeCompare(a[key])
							})
						}
						return arr.sort(function (a, b) {
							return a - b
						})
					},
					sort: function () {
						if (key) {
							return arr.sort(function (a, b) {
								return a[key].localeCompare(b[key])
							})
						}
						return arr.sort(function (a, b) {
							return b - a
						})
					}
				}
			},
			sum: function (num, tp) {
				num = num || 0
				tp = tp || 0
				return arr.reduce(function (a, b) {
					a += ''
					b += ''
					var len = '0'
					if (a.indexOf('.') >= 0) {
						len = a
					}
					if (b.indexOf('.') >= 0) {
						len = b
					}
					if (a.indexOf('.') >= 0 && b.indexOf('.') >= 0) {
						len = a.length > b.length ? a : b
					}
					var index = 0
					if (len.indexOf(".") >= 0) {
						index = len.length - len.indexOf('.') - 1
						index = ('1e' + index) * 1
						a = a * index
						b = b * index
					}
					a *= 1
					b *= 1
					index = (index < 1 ? 1 : index)
					var c = (a + b) / index
					switch (tp) {
						case 1: // -
							c = (a - b) / index
							break
						case 2: // *
							c = (a * b) / index
							break
						case 3: // /
							c = a / b
							break
						case 4: // %
							c = (a / index) % (b / index)
							break
						default: // +
					}
					len = null
					index = null
					return c
				}) + num * 1
			},
			// 分割指定长度的元素数组 1.0.56
			chunk: function (size, list) {
				size = size || 1
				list = list || []
				let tmp = arr
				if (size <= 0) {
					return list
				}
				while (tmp.length) {
					list.push(tmp.splice(0, size))
				}
				return list
			},
			// 转obj
			obj: function (key, val) {
				let v = {}
				arr.forEach(r => {
					if (r[key] !== undefined) {
						v[r[key]] = r[val]
					}
				})
				return v
			}
		}
	}
	// 深拷贝 1.0
	copy(o) {
		if (o === '' || o === null || o === undefined || o === NaN) { return '' }
		return JSON.parse(JSON.stringify(o))
	}
	// font-size 1.0.2
	font(width, s) {
		width = width || 1920
		let w = window.innerWidth * (100 / width)
		if (s) { w = s }
		document.documentElement.style.fontSize = w + 'px';
		this.font_em = !0
	}
	// css 懒加载 1.0.32
	cssLazy(id) {
		id = id || 'css-lazy'
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
			link: function (url) {
				if (!url) return 0
				if (!f) {
					var d = document.createElement('link');
					d.setAttribute('rel', 'stylesheet');
					d.setAttribute('id', id);
					d.setAttribute('href', url);
					document.getElementsByTagName('head')[0].appendChild(d);
					d = null;
				}
			},
			text: function (c) {
				if (!c) return 0
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
		}
	}
	// hash检测 1.0.34
	hash(fn, str, tex) {
		str = str === 0 ? 0 : str || ''
		tex = tex || ''
		let that = this
		let a = window.location.hash
		if (tex) {
			try {
				a = that.eval('return ' + tex)
			} catch (err) {
				tex = ''
				a = ''
				fn({ code: 0, data: err + '' })
			}
		}
		if (a != str) {
			str = a
			fn({ code: 1, data: str })
		}
		fc()
		function fc() {
			if (that.is_hash) return 0
			var t = setTimeout(() => {
				clearTimeout(t)
				t = null
				that.hash(e => { fn(e) }, str, tex)
			}, 200)
		}
	}
	// 初始化部分 1.0.35
	refresh(n) {
		let t = this
		t.loading_timer = null
		t.alert_timer = null
		// t.btn_timer = null
		t.resize_timer = null
		t.timer_timer = null
		t.jsonp_timer = null
		t.down_timer = null
		t.toast_timer = null
		t.jsonp_timeout = 8000
		t.is_hash = false
		t.is_cache = 0
		let api = t.$config.select('api')
		if (api) {
			t.options.api = api
		}
		if (t.options.scroll && window.BScroll) {
			t.$scroll = window.BScroll
		}
		if (t.options.ajax && window.axios) {
			t.$axios = window.axios
		}
		console.log('%c 欢迎使用！当前版本：%c' + t.version + '。%c 更新时间：' + t.__TIME__, 'color:tomato', 'color:green', 'color:orange')
		if (t.options.debugger) {
			console.log('%c 禁止调试！', 'color:orange');
			setInterval(function () {
				var a = Date.now()
				debugger
				return a
			}, 100);
		}
		if (!n) {
			console.log('%c 重置成功', 'color:#99cc33')
		}
		return { option: t.options, scroll: t.$scroll || '', ajax: t.$axios || '', ver: t.version }
	}
	// route路由 1.0.4
	route() {
		let that = this
		function p(p, i, t, b) { return { path: p, title: t || '', id: i || 1, by: b || -1 } }
		function tit(t) {
			that.js('title').html(t)
		}
		function link(fn, cal) {
			let os = that.$routeConfig.now
			if (os.path) {
				window.location.hash = os.path
				tit(os.title)
				lazy(r => { fn ? fn(r) : null })
			} else {
				cal ? cal() : null
			}
		}
		function now(id) {
			if (id <= 0) return {}
			let a = that.$routeConfig.path.filter(j => {
				return j.id === id
			})
			if (a.length) {
				return a[0]
			}
			return {}
		}
		function lazy(fn) {
			let obj = that.$routeConfig.now
			let os = {
				lazy: obj.path.replace(/\//g, '_'),
				params: obj.params.join('&'),
				path: obj.path,
				back: {},
				id: obj.id,
				title: obj.title,
				code: 1
			}
			os.back = now(os.by)
			os.params = that.getUrl('?' + os.params)
			let old = that.$.all('script[src*="' + that.$routeConfig.prefix + '"]')
			if (old.length) {
				for (let i = 0; i < old.length; i++) {
					that.remove(old[i])
				}
			}
			that.script(that.$routeConfig.prefix + os.lazy + that.$routeConfig.suffix)
			that.$routeConfig.now = os
			fn(os)
			os = null
		}
		return {
			// 装载路由
			create: function (arr, fn, fn2) {
				if (that._is_obj(arr).code === 4 && arr.length > 0) {
					let a = arr.filter(k => {
						return k.path !== ''
					})
					// 路由装填
					that.$routeConfig.path = that.array(a).unique('path')
					that.$route.config()
					fn ? fn() : null
					return 1
				}
				fn2 ? fn2() : null
				return 0
			},
			// 路由初始化
			init: function (fn) {
				// 检测当前路由 that.$routeConfig.now
				link(e => {
					fn ? fn(e) : null
				}, () => {
					that.$route.push(window.location.hash || '/')
				})
			},
			// 跳转路由
			push: function (path, fn) {
				let p = path.substr(1)
				p = !p ? 'index' : p
				p = p.split('/')
				let ph = p.filter(j => {
					return j.indexOf('=') < 0 && j
				}).join('/')
				let ps = that.$routeConfig.path.filter(k => {
					return k.path === ph
				})
				if (ps.length) {
					ps = ps[0]
				} else {
					ps = null
					fn ? fn({ code: 0, err: '错误路由' }) : demo.alert('错误路由')
					return 0
				}
				window.location.hash = ps.path
				tit(ps.title)
				let params = []
				p = p.join('/').replace(ph, '').split('/')
				if (p.length > 1) {
					params = p.splice(1)
				}
				ps.params = params
				that.$routeConfig.now = ps
				ps = null
				lazy(e => {
					fn ? fn(e) : null
				})
			},
			// 回退路由
			back: function (fn) {
				let os = (that.$routeConfig.now || {}).back || {}
				that.$routeConfig.now = os
				link(e => {
					fn ? fn(e) : null
				}, () => {
					window.history.go(-1)
				})
				os = null
			},
			// 路由快速装填
			array: function (arr) {
				if (that._is_obj(arr).code === 4 && arr.length > 0) {
					let a = arr.map(k => {
						return p(k[0], k[1], k[2], k[3])
					})
					return a
				}
				return []
			},
			// 设置标题
			title: function (t) { tit(t) },
			// 重置路由
			reset: function (arr, opt, fn) {
				that.$route.create(arr || [])
				that.$route.config(opt || {})
				fn ? fn() : null
			},
			// 清除路由
			destroy: function () {
				that.$routeConfig = {
					path: [],
					now: {},
					prefix: '',
					suffix: ''
				}
			},
			// 配置设置
			config: function (opt) {
				opt = opt || {}
				that.$routeConfig.prefix = opt.prefix || './lazy/'
				that.$routeConfig.suffix = opt.suffix || '.base.js?v=' + Date.now()
			}
		}
	}
	// 懒加载js方法 1.0.4
	lazy() {
		let that = this
		return {
			// 页面懒加载
			page: function (dom, opt, fn) {
				if (that._is_obj(dom).code === 3) {
					dom = that.js(dom).dom()
				}
				that.js(dom, 0).html('')
				opt = Object.assign({
					vue: true,
					id: 'lazy-' + Date.now(),
					class: 'app_view',
					html: 'html',
					style: '',
					link: '',
					suffix: '.base.css?v=' + Date.now(),
					prefix: ''
				}, opt)
				var index = that._div('div', opt.class)
				index.setAttribute('id', opt.id)
				if (opt.vue) {
					index.setAttribute('v-clock', '')
				}
				index.innerHTML = opt.html
				if (opt.style) {
					that.cssLazy('css-text-' + opt.id).text(opt.style)
				}
				if (opt.link) {
					if (that._is_obj(opt.link).code === 4) {
						opt.link.length && opt.link.forEach((k, v) => {
							that.cssLazy('css-link-' + opt.id + '-' + v).link(opt.prefix + k.replace(/\.css/, '') + opt.suffix)
						})
					} else {
						that.cssLazy('css-link-' + opt.id).link(opt.prefix + opt.link.replace(/\.css/, '') + opt.suffix)
					}
				}
				dom.appendChild(index)
				fn ? fn() : null
			},
			// 图片懒加载
			image: function (tag) {
				tag = tag || 'img'
				let imgs = that.$.all(tag);
				let len = imgs.length;
				// 视口的高度
				let viewHeight = document.documentElement.clientHeight;
				// 滚动条高度
				let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
				for (let i = 0; i < len; i++) {
					let offsetHeight = imgs[i].offsetTop;
					if (offsetHeight < viewHeight + scrollHeight) {
						let src = imgs[i].dataset.src;
						imgs[i].src = src;
					}
				}
			},
			// 页面滚动加载
			scroll: function (fn) {
				let d = document.documentElement
				let c = d.clientHeight;
				let s = d.scrollTop;
				let h = d.scrollHeight;
				if (c + s >= h) {
					// 检测到滚动至页面底部，进行后续操作
					fn ? fn() : null
				}

			},
			// 渲染几万条数据不卡住页面
			bulk: function (len, count, dom, html, tag, cls, fn) {
				tag = tag || 'li'
				cls = cls || ''
				if (!window.requestAnimationFrame || !document.createDocumentFragment) {
					return '不支持'
				}
				if (arguments.length < 4 || that._is_obj(arguments[3]).code !== 5) {
					return '传入正确参数'
				}
				setTimeout(() => {
					// 插入十万条数据
					let total = len || 100;
					// 一次插入的数据
					let once = count || 20;
					let c = 0
					// 插入数据需要的次数
					let loopCount = Math.ceil(total / once);
					let countOfRender = 0;
					let ul = dom
					if (that._is_obj(dom).code === 3) {
						ul = that.$.dom(dom)
					}
					// 添加数据的方法
					function add() {
						let fragment = document.createDocumentFragment();
						for (let i = 0; i < once; i++) {
							c++
							let li = that._div(tag, cls)
							let ht = html(c, countOfRender, loopCount)
							if (ht) {
								li.innerHTML = ht
								fragment.appendChild(li);
							}
							li.setAttribute('data-bulk-id', c)
						}
						ul.appendChild(fragment);
						countOfRender += 1;
						loop();
					}
					function loop() {
						if (countOfRender < loopCount) {
							if (countOfRender + 1 === loopCount) {
								let end = total % once
								once = end > 0 ? end : once
							}
							window.requestAnimationFrame(add);
						} else {
							fn ? fn(Array.from(ul.querySelectorAll('[data-bulk-id]'))) : null
						}
					}
					loop();
				}, 0)
			}
		}
	}
	// 防抖 1.0.4 触发高频时间后n秒内函数只会执行一次,如果n秒内高频时间再次触发,则重新计算时间。
	// 防抖常应用于用户进行搜索输入节约请求资源，window触发resize事件时进行防抖只触发一次。
	debounce(fn, time) {
		let timeout = null;
		return function () {
			if (timeout !== null) clearTimeout(timeout)
			timeout = setTimeout(() => {
				fn.apply(this, arguments);
			}, time);
		}
	}
	// 节流 高频时间触发,但n秒内只会执行一次,所以节流会稀释函数的执行频率
	// 节流常应用于鼠标不断点击触发、监听滚动事件。
	throttle(fn, time) {
		let prev = Date.now();
		return function () {
			let context = this;
			let args = arguments;
			let now = Date.now();
			if (now - prev >= time) {
				fn.apply(context, args);
				prev = Date.now();
			}
		}
	}
	// 外置接入 1.0.4
	access(name, data, fn) {
		let m = '接入成功'
		if (this[name]) {
			m = '该方法已存在'
			fn ? fn({ c: !1, m }) : null
			return m
		}
		this[name] = data
		fn ? fn({ c: !0, m }) : null
		return m
	}
	// ctrl 1.0.46
	ctrl() {
		let t = this
		let ovh = 'position: fixed;left: -100vw;top: -100vh;z-index: -1000'
		return {
			// 复制到剪贴板
			c: function (el, text) {
				let val = text
				let bool = document.execCommand('copy')
				if (!bool) {
					t.alert('不支持')
					return 0
				}
				if (el) {
					try {
						if (t._is_obj(el).code === 3) { el = t.$.dom(el) }
						val = el.getAttribute('data-copy') || ''
					} catch (e) {
						val = ''
					}
				}
				let inp = t._div('textarea')
				let id = 'copy-' + Date.now() + '-' + t.rand(6)
				inp.value = val || 'copy'
				inp.setAttribute('id', id)
				inp.setAttribute('style', ovh)
				t.$.dom('body').appendChild(inp)
				inp.select()
				document.execCommand('copy')
				setTimeout(() => {
					t.remove(inp)
				}, 300)
				return 1
			},
			// 右键菜单
			r: function (el, opt, fn) {
				if (t._is_obj(el).code === 3) { el = t.$.dom(el) }
				opt = Object.assign({ item: [] }, opt)
				if (!opt.item.length) {
					el.oncontextmenu = function () {
						fn ? fn({ type: 'right' }) : null
						return false
					}
					return 1
				}
				let div = t._div('div', t.options.prefix + '_right')
				let scroll = opt.item.length > 6 ? 'scroll' : ''
				opt.id = opt.id || 'right-menu-' + Date.now() + '-' + t.rand(6)
				div.setAttribute('id', opt.id)
				let s = '<i class="close fa fa-close"></i><i class="before fa fa-hand-o-up"></i><div class="tab ' + scroll + '"><ul>'
				opt.item.forEach((j, v) => {
					s += '<li><span title="' + j.text + '" data-index="' + v + '">' + j.text + '</span></li>'
				})
				s += '</ul></div>'
				div.innerHTML = s
				t.$.dom('body').appendChild(div)
				let nid = '#' + opt.id
				let ns = null
				let timer = null
				let timeout = opt.timeout || 3e3
				timeout = timeout < 100 ? 100 : timeout
				if (scroll) {
					ns = t.scroll(nid + ' .tab', {})
				}
				t.click(nid + ' .close', () => {
					clear()
					t.js(nid).style({ opacity: 0 })
				})
				t.click(t.$.all(nid + ' .tab li span'), e => {
					let index = e.dom.getAttribute('data-index')
					let os = {
						data: t.copy(opt.item[index * 1]),
						type: 'click',
						scroll: ns,
						res: e,
						leave: timeout
					}
					if (os.data.callback) { delete os.data.callback }
					opt.item[index].callback ? opt.item[index].callback(os) : (fn ? fn(os) : null)
					t.click(nid + ' .close')
					os = null
				})
				el.oncontextmenu = function (e) {
					t.js(nid).style({ left: e.clientX + 'px', top: e.clientY + 'px' })
					return false
				}
				t.$.dom(nid).oncontextmenu = function () { return false }
				t.hover(nid, () => {
					clear()
				}, () => {
					clear()
					timer = setTimeout(() => {
						t.click(nid + ' .close')
					}, timeout)
				})
				function clear() {
					if (timer) {
						clearTimeout(timer)
						timer = null
					}
				}
			},
			// 禁用 ctrl+key shift+key key
			d: function (a, fn) {
				let v = (t._is_obj(a).code === 3 ? a.split(',') : a) || []
				let q = []
				if (v.length) {
					q = v.map(k => {
						let c = (k + '').split('-')
						let os = {
							c: c[0] === 'c',
							s: c[0] === 's'
						}
						os.key = c[1] || c[0]
						return os
					})
				}
				if (v.indexOf('right') >= 0) {
					document.oncontextmenu = function () { return false }
				}
				document.onkeydown = function (e) {
					let key = e.key.toLowerCase()
					let ns = q.filter(k => {
						return k.key.toLowerCase() === key && e.ctrlKey === k.c && e.shiftKey === k.s
					})
					if (v.indexOf('f12') >= 0) {
						if (e.ctrlKey && e.shiftKey && key === 'i') {
							fn ? fn({ key: 'f12' }) : null
							return false
						}
					}
					if (ns.length) {
						ns = ns[0]
						if (e.ctrlKey === ns.c && key === ns.key && !ns.s) {
							fn ? fn(ns) : null
							return false
						}
						if (e.shiftKey === ns.s && !ns.cal && key === ns.key) {
							fn ? fn(ns) : null
							return false
						}
					}
					return true
				}
			},
			// 方向 上下左右 wasd 8624
			k: function (el, fn, flag) {
				if (t._is_obj(el).code === 3) {
					el = t.$.dom(el)
				}
				let id = 'ctrl-k-input-keydown'
				var c = function (k, c, d) {
					return { code: c, key: k, val: d }
				}
				t.js(el, 0).click(res => {
					if (t.$.id(id)) {
						t.js('#' + id).remove()
					}
					let inp = t._div('input', 'm_inp')
					inp.setAttribute('id', id)
					inp.setAttribute('style', ovh)
					inp.setAttribute('autocomplete', 'off')
					res.appendChild(inp)
					inp.focus()
					let his = []
					inp.onkeydown = function (e) {
						let os = {}
						if (!e.shiftKey && !e.ctrlKey) {
							let cc = e.keyCode
							switch (cc) {
								case 38: // top
								case 87:
								case 104:
									os = c('up', 0, cc)
									break
								case 39: // right
								case 68:
								case 102:
									os = c('right', 1, cc)
									break
								case 40: // bottom
								case 83:
								case 98:
									os = c('bottom', 2, cc)
									break
								case 37: // left
								case 65:
								case 100:
									os = c('left', 3, cc)
									break
								default:
									os = c(e.key, 4, cc)
							}
						}
						inp.value = ''
						if (flag) {
							os.event = e
							his.push(os.key)
							os.his = his
						}
						fn ? fn(os) : null
						os = null
					}
				})
			}
		}
	}
	// 计算，算法
	algorithm() {
		let t = this
		return {
			/** 颜色值 */
			rgb: function (s, e) {
				s = s || 0
				e = e || 255
				return 'rgb(' + t.rand(s, e) + ',' + t.rand(s, e) + ',' + t.rand(s, e) + ')'
			},
			rgba: function (a, s, e) {
				s = s || 0
				e = e || 255
				a = a || 0.1
				return 'rgba(' + t.rand(s, e) + ',' + t.rand(s, e) + ',' + t.rand(s, e) + ',' + a + ')'
			},
			color: function () {
				return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
			},
			// 渐变
			gradients: function (...arg) {
				let deg = arg[0]
				let arr = arg
				if (t._is_obj(deg).code === 1) {
					arr = arr.splice(1)
				} else {
					deg = 0
				}
				arr = arr.filter(l => {
					return t._is_obj(l).code === 3 && l !== ''
				})
				if (arr.length < 2) {
					arr = [t.algorithm().rgb(), t.algorithm().rgb()]
				}
				arr = arr.join(',')
				return 'linear-gradient(' + deg + 'deg,' + arr + ')'
			},

		}
	}
	// cookie 1.0.52
	cookie() {
		let t = this
		let prefix = function (k) {
			return t.options.prefix + '_' + k
		}
		let repl = function (k) {
			if (!k) return ''
			return k.replace(prefix(''), '')
		}
		return {
			set: function (k, val, d) {
				d = d || 'd7';
				let v = d.substr(0, 1)
				let day = d.substr(1)
				day = isNaN(day) ? 7 : day * 1
				let time = 1000 * (v === 'd' ? 86400 : (v === 'h' ? 3600 : 1)) * day
				let date = new Date()
				date.setTime(date.getTime() + time)
				if (t._is_obj(k).code !== 7 && t._is_obj(val).code !== 7) {
					document.cookie = prefix(k) + "=" + escape(val) + ";expires=" + date.toGMTString();
				}
				v = null
				day = null
				time = null
				date = null
				return !0
			},
			get: function (key, f) {
				let o = t.cookie().getter(key)
				if (f) return o
				let c = t._is_obj(o).code
				if (c === 6) {
					o.key = repl(o.key)
				} else if (c === 4) {
					o = o.filter(k => {
						return k.key.indexOf(prefix('')) === 0
					})
					o = o.map(k => {
						k.key = repl(k.key)
						return k
					})
				}
				return o
			},
			getter: function (key) {
				let v = document.cookie || ''
				v = v.split(';')
				if (v.length) {
					v = v.map(k => {
						let a = k.split('=')
						return { key: a[0].trim(), val: unescape(a[1]) }
					})
					v = v.filter(r => {
						return r.key !== ''
					})
					if (t._is_obj(key).code === 3) {
						v = v.filter(r => {
							return r.key === prefix(key)
						})
						return v[0] || {}
					}
					return v
				}
				return []
			},
			del: function (key) {
				let date = new Date()
				date.setTime(date.getTime() - 1)
				let name = t.cookie().getter(key).val
				if (name != null) {
					document.cookie = prefix(key) + "=" + escape(name) + ";expires=" + date.toGMTString();
				}
				date = null
				name = null
				return !0
			},
			clear: function () {
				let d = t.cookie().getter()
				if (d.length) {
					d = d.filter(k => {
						return k.key.indexOf(prefix('')) === 0
					})
					if (d.length) {
						d.forEach(res => {
							t.cookie().del(repl(res.key))
						})
					}
				}
				d = null
				return !0
			}
		}
	}
	// 计算字符串字节 1.0.57
	/**
	 * @param  {String} str 
	 * @param  {String} charset utf-8, utf-16
	 * @return {Number}
	 */
	sizeof(str, charset) {
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
	}
	// 缓存 1.0.57
	cache() {
		let t = this
		let n = 'cache_'
		let s = 1024 * 1024 * 4.8;
		let w = ['$session', '$local']
		let _n = function (key) {
			return t.options.prefix + '_' + n + key
		}
		let _s = function (val) {
			return t.sizeof(val) < s
		}
		let _l = function (k, v) {
			t[w[t.is_cache]].set(k, v)
		}
		let _g = function (k) {
			let g = t[w[t.is_cache]].get(_n(k))
			if (t._is_obj(g).code === 7 || g === '') return false
			return g
		}
		return {
			set: function (key, val) {
				val += ''
				if (_s(val) && t._is_obj(val).code === 3) {
					if (_g(key) !== false) {
						return 0
					}
					_l(_n(key), val)
					return 1
				}
				return 0
			},
			edit: function (key, val) {
				val += ''
				if (_g(key) === false) return 0
				if (_s(val) && t._is_obj(val).code === 3) {
					_l(_n(key), val)
					return 1
				}
				return 0
			},
			get: function (key) {
				return _g(key)
			},
			del: function (key) {
				if (_g(key) === false) return 0
				t[w[t.is_cache]].clear(_n(key))
				return 1
			},
			name: function (key) {
				return { key: _n(key), val: _g(key) }
			},
			cut: function (key) {
				t.is_cache = !!key * 1
			}
		}
	}
	// log debug f12 1.0.58
	log(str, type) {
		if (!this.options.log) return str
		switch (type) {
			case 1:
				console.group(str)
				break
			case 2:
				console.groupCollapsed(str)
				break
			case 3:
				console.groupEnd()
				break
			case 4:
				console.warn(str)
				break
			case 5:
				console.error(str)
				break
			case 6:
				str = Object.assign({
					text: 'log',
					sty: 'color:orange'
				}, (str || {}))
				console.log('%c ' + str.text, str.sty)
				str = str.text
				break
			default:
				console.log(str)
		}
		return this
	}
	// 状态存储 1.0.59
	status() {
		let t = this
		let n = function (v) {
			return (t.options.prefix + 'status' + v).toUpperCase()
		}
		let s = function (v) {
			return (t.$session.get(n(v)) || {})
		}
		let e = function (v, d) {
			t.$session.set(n(v), d)
		}
		let f = function (p, n, v) {
			let d = s(p)
			if (t._is_obj(v).code < 7) {
				d[n] = v
				e(p, d)
			}
			return d[n] || ''
		}
		let p = function (name, def) {
			if (os[name]) return 0
			os[name] = function (n, v) {
				return f(name, n, v) || def
			}
		}
		let os = {
			page: function (n, v) {
				return f('page', n, v) || 1
			},
			status: function (n, v) {
				return f('status', n, v) || {}
			},
			code: function (n, v) {
				return f('code', n, v) || 400
			},
			add: function (n, d) {
				p(n, (d || ''))
			}
		}
		return os
	}
	// 设置不可更改属性 1.0.6
	const(name, val) {
		// enumerable 是否枚举/编辑
		// writable 是否可写，修改
		// configurable 是否可再被修改/删除
		if (this[name]) {
			return !1
		}
		try {
			Object.defineProperty(this, name, { enumerable: true, value: val, configurable: false, writable: false });
		} catch (e) {
			console.log(e + '')
		}
	}
	// 插件 1.0.6
	plugIn() {
		let t = this
		let n = t.options.prefix + '_plugins'
		let reset = (str) => {
			t.ajax(t.__DEMO_API__).plain({ send: str, type: 'plugins' }, res => {
				let v = JSON.parse(res)
				if (v.code) {
					v.data.forEach(k => {
						if (t[k.name] && t[k.name]()) {
							return 1
						}
						t.script(k.url, () => {
							t.access(k.name, t.fn(k.fn), r => {
								if (r.c) {
									up(k.name)
								}
							})
							t.js('script').remove()
						})
					})
				}
			}, true)
		}
		let up = (name) => {
			let v = t.$config.select(n) || []
			if (v.indexOf(name) < 0) { v.push(name) }
			t.$config.edit(n, v)
		}
		return {
			add: function (plug, fn, err) {
				let v = t.$config.select(n) || []
				if (t._is_obj(plug).code === 4) {
					reset(plug.join(','))
					v = v.concat(plug)
				} else {
					reset(plug)
					v = v.concat(plug.split(','))
				}
				let ns = t.array(v).unique()
				t.$config.edit(n, ns)
				let load = () => {
					try {
						fn ? fn(ns) : null
					} catch (e) {
						err ? err(e + '') : null
						setTimeout(() => {
							load()
						}, 500)
					}
				}
				load()
			},
			del: function (plug) {
				let v = t.$config.select(n) || []
				if (t._is_obj(plug).code === 4) {
					plug.forEach(rs => {
						v = v.filter(k => {
							return k !== rs
						})
					})
				} else {
					v = v.filter(k => {
						return k !== plug
					})
				}
				t.$config.edit(n, v)
			},
			init: function () {
				let a = t.options.plugins.concat(t.$config.select(n) || [])

				t.$config.add(n, a)
				if (a.length) {
					reset(a.join(','))
				}
			}
		}
	}
	// toast 1.0.61
	toast(err, timeout) {
		let ts = this
		let name = ts.options.prefix + '_toast'
		let isD = ts.$.dom('.' + name)
		let c = ts._is_obj(err).code
		let num = isNaN(timeout) ? 3e3 : (timeout < 1e3 ? 1e3 : +timeout)
		let v = (dom) => {
			if (c === 4 || c === 6) {
				ts.js(dom, 0).json(err)
			} else {
				dom.innerHTML = err
			}
		}
		let s = (dom) => {
			if (ts.$web === 0) {
				ts.class(dom).add('pc')
			} else if (ts.font_em) {
				ts.class(dom).add('em')
			}
			ts.class(dom).add('show')
			// n秒后删除
			if (ts.toast_timer !== null) {
				clearTimeout(ts.toast_timer)
				r(dom)
			} else {
				r(dom)
			}
			dom.onclick = (e) => {
				let m = err
				if (c === 4 || c === 6) {
					m = JSON.stringify(err)
				}
				ts.ctrl().c('', m)
				ts.log('copy success', 1).log(m, 0).log('', 3)
				ts.stopBubble(e)
			}
		}
		let r = (dom) => {
			ts.toast_timer = setTimeout(() => {
				ts.class(dom).remove('show')
				clearTimeout(ts.toast_timer)
				ts.toast_timer = null
			}, num)
		}
		if (isD) {
			v(isD)
			s(isD)
		} else {
			let d2 = ts._div('div', name)
			v(d2)
			ts.js('body').appendChild(d2)
			s(d2)
		}
	}
	// 停止冒泡
	stopBubble(e) {
		if (e && e.stopPropagation) {
			e.stopPropagation();
		} else {
			window.event.cancelBubble = true;
		}
	}
	// 阻止浏览器的默认行为
	stopDefault(e) {
		if (e && e.preventDefault) {
			e.preventDefault();
		} else {
			window.event.returnValue = false;
		}
		return false;
	}
	// 延时回调 用于不常用数据延时更新 1.0.73
	delay(opt, fn) {
		opt = this.copy(Object.assign({ timeout: 5, name: 'delay', type: 'get', item: '' }, (opt || {})))
		let tag = this.options.prefix + '-delay-' + opt.name
		let time = Date.now()
		let data = this.$local.get(tag) || {}
		if (opt.type === 'set') {
			data.item = opt.item
			data.time = time
			this.$local.set(tag, data)
			fn ? fn({ code: 0, data: data.item }) : null
		} else {
			if (!data.time || +data.time - opt.timeout * 6e4 > time) {
				this.$local.clear(tag)
				fn ? fn({ code: 1, data }) : null
			} else {
				fn ? fn({ code: 0, data: data.item }) : null
			}
		}
	}
	// prompt 1.0.75
	prompt(msg, fn, title) {
		let t = this
		let n = t.options.prefix + '_prompt'
		msg = msg || '请输入'
		title = title || msg
		if (!t.$.id(n)) {
			let div = t._div('div', n)
			div.setAttribute('id', n)
			div.innerHTML = '<p data-head></p><div data-main><input type="text" class="m_inp small"></div><div data-foot><button class="m_btn small" data-close>取消</button><button class="m_btn small" data-submit>确定</button></div>'
			document.body.appendChild(div)
			t.js('#' + n + ' [data-submit]').click(() => {
				let val = t.js('#' + n).find('input').value
				if (val !== '') {
					fn ? fn(val) : null
					ss()
					t.js('#' + n).find('input').value = ''
				} else { t.toast(msg) }
			})
			t.js('#' + n + ' [data-close]').click(() => {
				ss()
			})
		}
		let ss = (f) => {
			t.js('#' + n)[f ? 'addClass' : 'removeClass']('show')
		}
		setTimeout(() => {
			ss(!0)
		}, 200)
		t.js('#' + n + ' [data-head]').html(title)
		let _inp = t.js('#' + n).find('input')
		_inp.setAttribute('placeholder', msg)
		_inp.focus()
		_inp.onkeydown = function (e) {
			if (e.keyCode === 13) {
				t.js('#' + n + ' [data-submit]').click()
			}
		}
	}
	// 1.0.8 更改网页标题
	title(t) {
		this.js('title').html((t || 'title'))
	}
	/**----------------------------------- 内置  ----------------------------------------------- */
	// 初始化
	_init(fn) {
		let t = this
		t.$model = t._model()
		t.$fixed = t._fixed()
		t.$web = t.platform()
		t.$local = t.local()
		t.$session = t.session()
		t.route().destroy()
		t.$route = t.route()
		t.$lazy = t.lazy()
		t.$ctrl = t.ctrl()
		t.$alg = t.algorithm()
		t.$config = t._config()
		t.$cookie = t.cookie()
		t.$cache = t.cache()
		t.$save = t.status()
		// 1.0.8 新增 判断类型
		t.$obj = (a, c) => {
			let r = t._is_obj(a)
			if (c) return r.code
			return r
		}
		t.const('__DEMO__', "http://148.70.132.221:2020/base/")
		t.const('__DEMO_API__', t.__DEMO__ + 'api/')
		t.const('__TIME__', '2021-05-13 18:00:00')
		t.const('__DOC__', t.__DEMO__ + '#/doc')
		t.$plug = t.plugIn()
		t.$plug.init()
		t.font_em = !1
		delete t.$plug['init']
		fn(t.refresh(1))
	}
	// fixed
	_fixed() {
		var t = this
		return {
			bgc(v, dom) {
				dom = dom || 'body'
				if (t._is_obj(dom).code === 3) {
					dom = t.$.dom(dom)
				}
				if (t._is_obj(v).code === 6) {
					var s = ''
					for (var k in v) {
						s += `${k}:${v[k]};`
					}
				} else {
					v = v.replace('background:', '')
					s = 'background:' + v
				}
				if (dom) {
					var cls = t.options.prefix + '_fixed'
					if (t.$.dom('.' + cls)) {
						t.js('.' + cls).remove()
					}
					var c = t._div('div', cls)
					c.setAttribute('style', s)
					dom.appendChild(c)
					c = null
				}
			},
			image(v, dom) {
				dom = dom || 'body'
				if (t._is_obj(dom).code === 3) {
					dom = t.$.dom(dom)
				}
				if (dom) {
					var cls = t.options.prefix + '_fixed'
					if (t.$.dom('.' + cls)) {
						t.remove('.' + cls)
					}
					var c = t._div('div', cls)
					c.setAttribute('style', 'background:url(\'' + v +
						'\') no-repeat 0 0 transparent scroll;background-size:100% 100%')
					dom.appendChild(c)
					c = null
				}
			},
			gray(f) {
				let s = 'css-lazy-gray'
				if (f) {
					try {
						t.js('style[id="' + s + '"]').remove()
					} catch (e) { }
				} else {
					t.cssLazy(s).text('html{filter:grayscale(1);}')
				}
			}
		}
	}
	// 弹窗
	_model() {
		var t = this
		return {
			success(err, title) {
				t.alert(err, 1, {
					title: title
				})
			},
			error(err, title) {
				t.alert(err, 0, {
					title: title
				})
			},
			warning(err, title) {
				t.alert(err, 2, {
					title: title
				})
			},
			model(title, err, fn, type) {
				var len = arguments.length
				type = type === undefined ? 3 : type
				t.alert(err, type, {
					title: title,
					sty: 'model',
					timeout: 0
				}, function (e) {
					if (len > 2) {
						e.time = Date.now()
						fn(e)
					}
				})
			},
			popup(err, fn, fixed) {
				t.alert(err, 3, { sty: 'model', timeout: 0, screen: !!fixed }, function (e) {
					if (e.code === 3e3) {
						t.js(e.box, 0).addClass('popup')
					} else {
						fn ? fn(e) : null
					}
				})
			},
			info(err, flag, timeout) {
				timeout = timeout || 0
				flag = flag === undefined ? 1 : flag
				t.alert(err, flag, {
					timeout: timeout
				})
			}
		}
	}
	// 节流
	_timers(timer, fn, flag = 1, timeout) {
		var t = this
		if (t[timer] !== null) {
			if (flag) {
				clearTimeout(t[timer])
				t[timer] = null
			}
			return false
		}
		fn(0)
		t[timer] = setTimeout(function () {
			clearTimeout(t[timer])
			t[timer] = null
			fn(1)
		}, (timeout || 500))
	}
	// 本地存储
	_storage(name) {
		var _name = (this.options.name + '-local-' + this.version.replace(/\./g, '')).toUpperCase()
		function gt() {
			var a = window[name].getItem(_name) || '{}'
			try {
				a = JSON.parse(a)
			} catch (e) {
				a = {}
			}
			return a
		}
		function s(o) {
			if (!o) return 0
			window[name].setItem(_name, JSON.stringify(o))
			return o
		}
		function g(v, d) {
			var c = t._is_obj(a[v]).code
			if (c > 6 || c === 5) {
				return d
			}
			return a[v]
		}
		function _i() {
			a = gt()
		}
		var a = gt()
		var t = this
		return {
			all: function () {
				_i()
				return a
			},
			get: function (v, d = '') {
				_i()
				return g(v, d)
			},
			set: function (k, v) {
				if (!k) { k = t.options.prefix + '-null' }
				_i()
				a[k] = v
				return s(a)
			},
			clear: function (k) {
				_i()
				if (t._is_obj(k).code === 4 && k.length) {
					k.forEach(function (ks) {
						a[ks] = null
						delete a[ks]
					})
				} else {
					a[k] = null
					delete a[k]
				}
				return s(a)
			},
			reset: function () {
				return s({})
			}
		}
	}
	// 设置 style
	_style(d, t) {
		if (this._is_obj(t).code === 6) {
			for (var k in t) {
				d.style[k] = t[k]
			}
		}
	}
	// config 1.0.51 config配置
	_config() {
		let t = this
		let c = t.$local.get('config', {})
		function fg(k) {
			return t._is_obj(c[k]).code === 7
		}
		function gt(k) {
			return t._is_obj(k).code === 3
		}
		return {
			delete: function (v) {
				if (!fg(v)) {
					delete c[v]
					t.$local.set('config', c)
					return 1
				}
				return 0
			},
			add: function (k, v) {
				if (gt(k) && fg(k)) {
					c[k] = v
					t.$local.set('config', c)
					return 1
				}
				return 0
			},
			edit: function (k, v) {
				if (gt(k) && !fg(k)) {
					c[k] = v
					t.$local.set('config', c)
					return 1
				}
				return 0
			},
			select: function (k) {
				if (!fg(k)) {
					return c[k]
				}
				if (gt(k)) {
					return ''
				}
				return c
			},
			switch(n, k, v) {
				let vv = t._config()[n]
				if (n !== 'switch' && vv) {
					return vv(k, v)
				}
				return 0
			}
		}
	}
	// 判断类型为object
	_is_obj(o) {
		var c = 0
		var t = ''
		switch (Object.prototype.toString.call(o)) {
			case '[object Number]':
				c = 1
				t = 'number'
				break
			case '[object Boolean]':
				c = 2
				t = 'boolean'
				break
			case '[object String]':
				c = 3
				t = 'string'
				break
			case '[object Array]':
				c = 4
				t = 'array'
				break
			case '[object Function]':
				c = 5
				t = 'function'
				break
			case '[object Object]':
				c = 6
				t = 'object'
				break
			case '[object Undefined]':
				c = 7
				t = 'undefined'
				break
			case '[object Null]':
				c = 8
				t = 'null'
				break
			default:
		}
		return {
			code: c,
			type: t
		}
	}
	// 创建dom
	_div(str, cls, text) {
		var c = document.createElement(str || 'div')
		var cd = this._is_obj(text).code
		if (cd !== 7) {
			if (cd === 4 || cd === 6) { text = JSON.stringify(text) }
			c.appendChild(document.createTextNode(text))
		}
		cd = null
		c.setAttribute('class', cls || '')
		return c
	}
}
(function () {
	if (!window.demo) { var demo = window.demo = new Demo() }
})()
