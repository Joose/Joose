
function js2dom(tagName, js) {
    var ele = document.createElement(tagName);
    Joose.O.each(js, function (value, namePara) {
        var name = namePara.replace(/\d+$/, "")
        if(name == "_text") {
            var text = document.createTextNode(value);
            ele.appendChild(text)
        } else {
            var type = typeof value;
            if(type == "object") {
                ele.appendChild(js2dom(name, value))
            }
            else if(type == "function") {
                ele[name] = value
            }
            else {
                ele[name] = ""+value
            }
        }
    })
    return ele
}
