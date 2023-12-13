function url_add_param(url, key, value) {
    if (url.indexOf('?') === -1) {
        url += '?' + key + '=' + value;
    }
    else {
        url += '&' + key + '=' + value;
    }
    return url;
}
function url_remove_param(url, key) {
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {
        var prefix = encodeURIComponent(key) + '=';
        var pars = urlparts[1].split(/[&;]/g);
        for (var i = pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }
        url = urlparts[0] + '?' + pars.join('&');
    }
    return url;
}
function url_get_param(url, key) {
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {
        var prefix = encodeURIComponent(key) + '=';
        var pars = urlparts[1].split(/[&;]/g);
        for (var i = pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                return pars[i].split('=')[1];
            }
        }
    }
    return null;
}


