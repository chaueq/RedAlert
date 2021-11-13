function getQueryValues() {
    var result = [], tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        result[tmp[0]] = decodeURIComponent(tmp[1]);
    }
    return result;
}

function stripDomainFromURL(url) {
  return url.split("/")[2].split("?")[0].toLowerCase().replace(RegExp("^www\\."), '');
}
