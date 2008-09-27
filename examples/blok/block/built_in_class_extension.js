

// html escape a string
String.prototype.html = function () {
    var string = new String(this);
    string = string.replace(/\&/g, "&amp;");
    string = string.replace(/\</g, "&lt;");
    string = string.replace(/\>/g, "&gt;");
    string = string.replace(/"/g,  "&quot;")
    string = string.replace(/'/g,  "&#39;");
    
    return string
}

// decode an html encoded string
String.prototype.decodeHtml = function () {
    var string = new String(this);
    
    string = string.replace(/&lt;/g, "<");
    string = string.replace(/&gt;/g, ">");
    string = string.replace(/&quot;/g,  "\"")
    string = string.replace(/&39;/g,  "'");
    string = string.replace(/&amp;/g, "&");
    
    return string
}