

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