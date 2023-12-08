function url_add_param(url, key, value) {
    if (url.indexOf('?') === -1) {
        url += '?' + key + '=' + value;
    }
    else {
        url += '&' + key + '=' + value;
    }
    return url;
}

