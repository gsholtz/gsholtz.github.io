
null == window.DI && (window.DI = {}), null == window.DI.WebPush && (window.DI.WebPush = {}), function (e) { "use strict"; var n = "8507:MQ9CPafbnVWtfY8sZ3ptFJbIW3TUw5ms", t = {"Unknown":0,"Chrome":4,"Firefox":8}, o = !1; firebase.initializeApp({"messagingSenderId":"375116057734"}); var i = firebase.messaging(); function r(e) { Notification && "granted" === Notification.permission && !document.hidden && "serviceWorker" in navigator && navigator.serviceWorker.register("/DI.WebPush-sw.js", { scope: "/di-push-scope", updateViaCache: "all" }).then(function (n) { i.useServiceWorker(n), e && e.call() }).catch(function (e) { console.log("Service Worker Error", e) }) } function a() { var e = window.localStorage.getItem("PushToken"); null != e && f(e) } function c() { return null !== window.localStorage.getItem("ContactIdentifier") } function s() { var e = window.localStorage.getItem("IsIdentitySent"); return null != e && "1" == e } function l(e) { return window.localStorage.setItem("IsIdentitySent", e ? 1 : 0) } function f(e) { if (void 0 !== e && null !== e) { var i = window.localStorage.getItem("PushToken"); if (!d() || null !== i && i !== e || c() && !s()) { var r = window.localStorage.getItem("ContactIdentifier"), a = null, f = null, w = null; null != r && ("contact" == (a = (r = JSON.parse(r)).identificationType) || "sendlog" == a ? f = r.id + ":" + r.key : "project" == a && (w = r.keys)); var h = { ContactIdentificationType: a, ContactIdentification: f, Fields: w, Token: e, Domain: location.host, Language: window.localStorage.getItem("language"), idPlatformPush: g(t) }; !0 === o && console.log("Sending token to server with data: ", h); var v = n.split(":"), I = new Headers({ "Content-Type": "text/plain" }), m = JSON.stringify(h); fetch("https://devapp.hq2.rep/T/OFC4/WPT/" + v[0] + "/" + v[1], { mode: "cors", method: "POST", headers: I, body: m }).then(function (e) { !0 === o && console.log(responseText), u(!0), l(null != r) }).catch(function (e) { !0 === o && (console.log(status), console.log(responseText)) }) } else !0 === o && console.log("Token already sent to server so won't send it again unless it changes"); window.localStorage.setItem("PushToken", e) } } function g(e) { var n, t = new RegExp("Edge/[.0-9]*"), i = new RegExp("Chrome/[.0-9]*(sMobile)?|CriOS"), r = new RegExp("Firefox/[.0-9]*$|FxiOS/"), a = navigator.userAgent; return n = t.test(a) ? "Unknown" : i.test(a) ? "Chrome" : r.test(a) ? "Firefox" : "Unknown", !0 === o && console.log(a + " matched with " + n), e[n] } function d() { return 1 == window.localStorage.getItem("sentToServer") } function u(e) { window.localStorage.setItem("sentToServer", e ? 1 : 0) } i.onTokenRefresh(function () { r(function () { i.getToken().then(function (e) { u(!1), f(e) }).catch(function (e) { !0 === o && console.log("Unable to retrieve refreshed token", e) }) }) }), i.onMessage(function (e) { !0 === o && console.log("onMessage :Message received. ", e), function (e) { if (!Notification || "granted" !== Notification.permission || document.hidden) return; navigator.serviceWorker.getRegistration("/di-push-scope").then(function (n) { n.active.postMessage({ showNotification: e }) }).catch(function (e) { !0 === o && console.log(e) }) }(e) }), e.Init = function () { !function () { if (!c()) { var e = function () { var e = window.location.search.slice(1), n = {}; if (null == e || "" == e) return n; for (var t = decodeURIComponent(e).split("&"), o = 0; o < t.length; o++) { var i = t[o].split("="); n[i[0]] = i[1] } return n }(); if (void 0 !== e.oft_id && void 0 !== e.oft_k) { var n = { id: e.oft_id, key: e.oft_k, identificationType: "sendlog" }; window.localStorage.setItem("ContactIdentifier", JSON.stringify(n)) } else if (void 0 !== e.oft_c && void 0 !== e.oft_ck) { var n = { id: e.oft_c, key: e.oft_ck, identificationType: "contact" }; window.localStorage.setItem("ContactIdentifier", JSON.stringify(n)) } } }(), d() && c() && !s() && a(), o = window.location.search.slice(1).split("&").indexOf("ofsysDebug=1") > -1 }, e.ResetIdentify = function () { l(!1), window.localStorage.removeItem("ContactIdentifier"), !0 === o && console.log("Identity reset") }, e.Identify = function () { if (c()) !0 === o && console.log("Contact already identified, " + window.localStorage.getItem("ContactIdentifier")); else { var e = {}; if (1 === arguments.length && arguments[0].constructor === {}.constructor) for (var n in arguments[0]) e[n] = arguments[0][n]; else if (1 === arguments.length && arguments[0].constructor === [].constructor && arguments[0].length % 2 == 0) for (var t = 0; t < arguments[0].length; t++)t % 2 == 0 && "string" == typeof (n = arguments[0][t]) && 0 === n.indexOf("f_") && (e[n] = arguments[0][t + 1]); else { if (!(arguments.length > 0 && arguments.length % 2 == 0)) throw "invalid parameters"; for (t = 0; t < arguments.length; t++)t % 2 == 0 && "string" == typeof (n = arguments[t]) && 0 === n.indexOf("f_") && (e[n] = arguments[t + 1]) } var i = { keys: e, identificationType: "project" }; window.localStorage.setItem("ContactIdentifier", JSON.stringify(i)), !0 === o && console.log("Contact identified") } d() && !s() && a() }, e.RequestPermission = function (e) { if (void 0 === e || null == e || !e.match(/^[A-z]{2}$/g)) throw "DI.WebPush.RequestPermission : invalid language, the language must be 2 alphabeticals characters"; window.localStorage.setItem("language", e); var n = g(t); n !== t.Firefox && n !== t.Chrome || i.requestPermission().then(function () { r(function () { i.getToken().then(function (e) { e ? f(e) : (!0 === o && console.log("No Instance ID token available. Request permission to generate one."), u(!1)) }).catch(function (e) { !0 === o && console.log("An error occurred while retrieving token. ", e), u(!1) }) }) }).catch(function (e) { !0 === o && console.log("Unable to get permission to notify.", e) }) } }(window.DI.WebPush), DI.WebPush.Init();

const applicationKey = '8507:MQ9CPafbnVWtfY8sZ3ptFJbIW3TUw5ms';

self.addEventListener('push', e =>
{
	if (e && e.data)
	{
		e.waitUntil(showNotification(e.data.json()));
	}
});

function showNotification(payload)
{
	if (!payload.data || payload.data.PushSource !== "DI")
		return;

	var notificationTitle = payload.data.Title || 'Notification';
	var notificationOptions = {
	};

	if (payload.data.Body)
		notificationOptions.body = payload.data.Body;
	if (payload.data.Title)
		notificationOptions.title = payload.data.Title;
	if (payload.data.URLRedirection)
	{
		if (!notificationOptions.data)
			notificationOptions.data = {};
		notificationOptions.data['url'] = payload.data.URLRedirection;
	}
	if (payload.data.Icon)
		notificationOptions.icon = payload.data.Icon;
	if (payload.data.Image)
		notificationOptions.image = payload.data.Image;
	if (payload.data.Direction)
		notificationOptions.direction = payload.data.Direction;
	if (payload.data.Sound)
	{
		notificationOptions.silent = false;
		notificationOptions.sound = payload.data.Sound;
	}
	if (payload.data.Action1_Title)
	{
		if (!notificationOptions.data)
			notificationOptions.data = {};
		notificationOptions.actions = [];
		var action1 = { action: 0, title: payload.data.Action1_Title };
		if (payload.data.Action1_Icon)
			action1['icon'] = payload.data.Action1_Icon;
		notificationOptions.actions.push(action1);
		if (payload.data.Action1_URL)
			notificationOptions.data['action0_url'] = payload.data.Action1_URL;
	}
	if (payload.data.Action2_Title)
	{
		if (!notificationOptions.data)
			notificationOptions.data = {};
		if (!notificationOptions.actions)
			notificationOptions.actions = [];
		var action2 = { action: 1, title: payload.data.Action2_Title };
		if (payload.data.Action2_Icon)
			action2['icon'] = payload.data.Action2_Icon;
		notificationOptions.actions.push(action2);
		if (payload.data.Action2_URL)
			notificationOptions.data['action1_url'] = payload.data.Action2_URL;
	}

	if (payload.data.OFSYSReceptionID)
	{
		var data = {
			"ApplicationId": applicationKey,
			"PushId": payload.data.OFSYSReceptionID
		};
		var keys = applicationKey.split(':');

		corsAjax({
			"url": 'https://devapp.hq2.rep/T/OFC4/WPR/' + keys[0] + '/' + keys[1],
			"data": JSON.stringify(data)
		});
	}

	return self.registration.showNotification(notificationTitle, notificationOptions);
}

function corsAjax(options)
{
	var headers = new Headers({ "Content-Type": "text/plain" });
	var body = options.data;
	fetch(options.url, { mode: 'cors', method: 'POST', headers: headers, body: body }).then(function (response)
	{
		
	});
}

self.addEventListener('notificationclick', function (event) 
{
	var url = event.notification.data.url;
	if (event.action != null && event.action != '')
	{
		url = event.notification.data['action' + event.action + '_url'];
	}

	event.notification.close();
	event.waitUntil(clients.openWindow(url));
});

self.addEventListener('message', function (evt)
{
	if (typeof evt.data.showNotification !== 'undefined')
	{
		showNotification(evt.data.showNotification);
	}
});
