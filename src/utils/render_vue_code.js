import guid from "./random_str";

function getSource(source, type) {
    const regex = new RegExp(`<${type}[^>]*>`);
    let openingTag = source.match(regex);
    if (!openingTag) return '';
    else openingTag = openingTag[0];
    return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
}

function splitCode(sourceCode) {
    const script = getSource(sourceCode, 'script').replace(/export default/, 'return ');
    const style = getSource(sourceCode, 'style');
    const template = '<div id="app">' + getSource(sourceCode, 'template') + '</div>';

    return {
        js: script,
        css: style,
        html: template
    }
}

export default function renderCode(sourceCode) {
    var splitCode = splitCode(sourceCode);
    if (splitCode.html !== '' && splitCode.js !== '') {
        const parseStrToFunc = new Function(splitCode.js)();
        parseStrToFunc.template = splitCode.html;
        const Component = Vue.extend(parseStrToFunc);
        var renderObj = {
            component: new Component().$mount(),
        }
        if (this.css !== '') {
            const style = document.createElement('style');
            style.type = 'text/css';
            style.id = guid();
            style.innerHTML = splitCode.css;
            // document.getElementsByTagName('head')[0].appendChild(style);
            renderObj.style = style;
        }

        return renderObj;
    }
}

