if (typeof WIDGET == "undefined" || !WIDGET) {
    var WIDGET = {}
}
WIDGET.Lang = typeof WIDGET.Lang != "undefined" && WIDGET.Lang ? WIDGET.Lang : {
    isUndefined: function(e) {
        return typeof e === "undefined"
    },
    isString: function(e) {
        return typeof e === "string"
    }
};
WIDGET.DOM = typeof WIDGET.DOM != "undefined" && WIDGET.DOM ? WIDGET.DOM : {
    get: function(e) {
        return e && e.nodeType ? e : document.getElementById(e)
    },
    addListener: function(e, t, n) {
        if (WIDGET.Lang.isString(e)) {
            e = this.get(e)
        }
        if (e.addEventListener) {
            e.addEventListener(t, n, false)
        } else if (e.attachEvent) {
            e.attachEvent("on" + t, n)
        } else {
            e["on" + t] = n
        }
    },
    getTemplate: function(url, n, i, e) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open("GET", url, true);
        } else if (typeof XDomainRequest != "undefined") {
            xhr = new XDomainRequest();
            xhr.open("GET", url);
        } else {
            xhr = null;
        }
        xhr.onload = function() {
            var t = xhr.responseText;
            WIDGET.DOM.setInnerHTML(n, t);
            document.getElementById('multitest-code').value = code;
            i(e.buttons);
            i(e.selects);
            n.style.display = "block";
        };
        xhr.onerror = function() {
            console.log('Woops, there was an error making the request.');
        };

        xhr.send();
    },
    refreshHouse: function(url) {
        var e = document.getElementById("widget-city");
        var newCity = e.options[e.selectedIndex].value;
        var e = document.getElementById("widget-street");
        var newStreet = e.options[e.selectedIndex].value;
        params = "city_lat=" + newCity;
        params += "&street_lat=" + newStreet;
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open("GET", url, true);
        } else if (typeof XDomainRequest != "undefined") {
            xhr = new XDomainRequest();
            xhr.open("GET", url);
        } else {
            xhr = null;
        }
        xhr.onload = function() {
            var t = xhr.responseText;
            resultLocations = JSON.parse(t);
            selectHouse = document.getElementById('house');
            for (var i = 0, items_len = resultLocations['house'].length; i < items_len; i++) {
                var opt = document.createElement('option');
                opt.value = resultLocations['house'][i]['url'];
                opt.innerHTML = resultLocations['house'][i]['name'];
                selectHouse.appendChild(opt);
            }
        };
        xhr.onerror = function() {
            console.log('Woops, there was an error making the request.');
        };
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(params);
    },
    refreshStreet: function(url) {
        var e = document.getElementById("widget-city");
        var newCity = e.options[e.selectedIndex].value;
        params = "city_lat=" + newCity;
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open("GET", url, true);
        } else if (typeof XDomainRequest != "undefined") {
            xhr = new XDomainRequest();
            xhr.open("GET", url);
        } else {
            xhr = null;
        }
        xhr.onload = function() {
            var t = xhr.responseText;
            resultLocations = JSON.parse(t);
            selectStreet = document.getElementById('widget-street');
            for (var i = 0, items_len = resultLocations['street'].length; i < items_len; i++) {
                var opt = document.createElement('option');
                opt.value = resultLocations['street'][i]['id'];
                opt.innerHTML = resultLocations['street'][i]['name'];
                selectStreet.appendChild(opt);
            }
            selectHouse = document.getElementById('house');
            for (var i = 0, items_len = resultLocations['house'].length; i < items_len; i++) {
                var opt = document.createElement('option');
                opt.value = resultLocations['house'][i]['url'];
                opt.innerHTML = resultLocations['house'][i]['name'];
                selectHouse.appendChild(opt);
            }
        };
        xhr.onerror = function() {
            console.log('Woops, there was an error making the request.');
        };
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(params);
    },
    getLocations: function(url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open("GET", url, true);
        } else if (typeof XDomainRequest != "undefined") {
            xhr = new XDomainRequest();
            xhr.open("GET", url);
        } else {
            xhr = null;
        }
        xhr.onload = function() {
            var t = xhr.responseText;
            resultLocations = JSON.parse(t);

            selectCity = document.getElementById('widget-city');
            for (var i = 0, items_len = resultLocations['city'].length; i < items_len; i++) {
                var opt = document.createElement('option');
                opt.value = resultLocations['city'][i]['id'];
                if (i == 0) {
                    opt.selected = true;
                }
                opt.innerHTML = resultLocations['city'][i]['name'];
                selectCity.appendChild(opt);
            }

            selectStreet = document.getElementById('widget-street');
            for (var i = 0, items_len = resultLocations['street'].length; i < items_len; i++) {
                var opt = document.createElement('option');
                opt.value = resultLocations['street'][i]['id'];
                opt.innerHTML = resultLocations['street'][i]['name'];
                selectStreet.appendChild(opt);
            }
            selectHouse = document.getElementById('house');
            for (var i = 0, items_len = resultLocations['house'].length; i < items_len; i++) {
                var opt = document.createElement('option');
                opt.value = resultLocations['house'][i]['url'];
                opt.innerHTML = resultLocations['house'][i]['name'];
                selectHouse.appendChild(opt);
            }
        };
        xhr.onerror = function() {
            console.log('Woops, there was an error making the request.');
        };

        xhr.send();
    },
    removeListener: function(e, t, n) {
        if (WIDGET.Lang.isString(e)) {
            e = this.get(e)
        }
        if (e.removeEventListener) {
            e.removeEventListener(t, n, false)
        } else if (e.detachEvent) {
            e.detachEvent("on" + t, n)
        } else {
            e["on" + t] = function() {
                return true
            }
        }
    },
    purge: function(e) {
        var t = e.attributes,
            n, r, i;
        if (t) {
            r = t.length;
            for (n = 0; n < r; n += 1) {
                i = t[n].name;
                if (typeof e[i] === "function") {
                    e[i] = null
                }
            }
        }
        t = e.childNodes;
        if (t) {
            r = t.length;
            for (n = 0; n < r; n += 1) {
                WIDGET.DOM.purge(e.childNodes[n])
            }
        }
    },
    setInnerHTML: function(e, t) {
        if (!e || typeof t !== "string") {
            return null
        }(function(e) {
            var t = e.attributes,
                n, r, i, s;
            if (t) {
                r = t.length;
                for (n = 0; n < r; n += 1) {
                    i = t[n].name;
                    if (typeof e[i] === "function") {
                        e[i] = null
                    }
                }
            }
            t = e.childNodes;
            if (t) {
                r = t.length;
                for (n = 0; n < r; n += 1) {
                    s = e.childNodes[n];
                    arguments.callee(s);
                    WIDGET.DOM.purge(s)
                }
            }
        })(e);
        e.innerHTML = t.replace(/<script[^>]*>[\S\s]*?<\/script[^>]*>/ig, "");
        return e.firstChild
    }
};
if (typeof WIDGET == "undefined" || !WIDGET) {
    var WIDGET = {}
}

WIDGET.DOM.mainUrl = "http://multitest.ua/widget/";
WIDGET.DOM.apiUrl = "http://multitest.ua/api/address/";

WIDGET.Dialog = typeof WIDGET.Dialog != "undefined" && WIDGET.Dialog ? WIDGET.Dialog : function() {

    var n = document.getElementById("widget-multitest-inner");
    n.className = "dialog";
    n.style.display = "none";

    var r = function(e) {
        var t;
        var r = document.getElementById("widget-multitest");
        r = r.src;
        try {
            design = unescape(r).split("design=")[1].split("&")[0]
        } catch (s) {
            design = 0;
            console.log(s.name)
        }
        try {
            code = unescape(r).split("code=")[1].split("&")[0]
        } catch (s) {
            code = "";
            console.log(s.name)
        }
        WIDGET.DOM.getTemplate(WIDGET.DOM.mainUrl + "templates/" + design + ".html", n, i, e);
        var url = WIDGET.DOM.apiUrl + "city/?format=json";
        WIDGET.DOM.getLocations(url);
    };
    var i = function(e) {
        var t, n, r, i = WIDGET.Lang.isUndefined;
        if (WIDGET.Lang.isUndefined(e)) {
            return
        }
        n = e.length;
        for (t = 0; t < n; t++) {
            r = e[t];
            WIDGET.DOM.addListener(r.id, r.type, r.callback)
        }
    };
    return {
        result: function() {
            var house = document.getElementById("house");
            try {
                var url = house.options[house.selectedIndex].value;
                var url = "http://multitest.ua" + url;
                url = url + "?source_other=" + document.getElementById("multitest-code").value;
                window.open(url, "_blank");
            } catch(e) {
                console.log(e.name);
            }
        },
        show: function(e) {
            r(e)
        },
        hide: function() {
            n.style.display = "none"
        },
        updateStreet: function() {
            var city = document.getElementById("widget-city");
            city_id = city.options[city.selectedIndex].value;
            var url = WIDGET.DOM.apiUrl + "street/" + city_id + "/?format=json"
            WIDGET.DOM.refreshStreet(url);
        },
        updateHouse: function() {
            var street = document.getElementById("widget-street");
            street_id = street.options[street.selectedIndex].value;
            var url = WIDGET.DOM.apiUrl + "house/" + street_id + "/?format=json"
            WIDGET.DOM.refreshHouse(url);
        }
    }
}();
WIDGET.Dialog.show({
    buttons: [{
        id: "search-provider",
        type: "click",
        callback: function() {
            WIDGET.Dialog.result();
        }
    }],
    selects: [{
        id: 'widget-city',
        type: 'change',
        callback: function() {
            WIDGET.Dialog.updateStreet();
        }
    }, {
        id: 'widget-street',
        type: 'change',
        callback: function() {
            WIDGET.Dialog.updateHouse();
        }
    }],
})