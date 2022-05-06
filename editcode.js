$(function () {
    divs = document.getElementsByClassName('dynamic-code-block');
    for (var i = 0; i < divs.length; i++) {
        new Generate().init(divs[i]);
    }
}());

/**
 * Turns regular text inside div blocks to dynamic if they contain variables inside { }
 * Automatically generates input fields
 * Usage below
 *   <div id='dynamic-code-block'>
 *     first line with variable { myVariable } here
 *     second line with foo { foo } here
 *     third line with item { item } here
 *     ip { myvariable } again in last line 
 *   </div>
 */
function Generate() {
    const map = new Map();
    var textElement; //original text to be turned to variable aware text
    this.init = function (divElement) {
        textElement = divElement.firstElementChild;
        if (textElement === null) { console.log('No textElement: ' + textElement); return;}
        map.set('codeText', textElement.innerHTML);
        varArr = getVarsFromCurlyBraces(); //array including only variable strings
        generateInputFields(varArr, divElement);
    }
    /**
     * Create unique array of variables inside curly braces { }
     * @returns array of variables
     */
    function getVarsFromCurlyBraces() {
        var found = [], rxp = /{([^}]+)}/g, str = textElement.innerHTML, curMatch;
        while (curMatch = rxp.exec(str)) {
            found.push(curMatch[1]);
        }
        var uniqueItems = found.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
        return uniqueItems;
    }
    /**
     * Generate input fields     
     * @param {*} arr array containing variables
     * @param {*} theDiv div block to be modified
     */
    function generateInputFields(arr, theDiv) {
        arr.forEach(function (value) {
            value = value.trim();
            const x = document.createElement('input');
            x.setAttribute('type', 'text');
            x.setAttribute('placeholder', value);
            x.setAttribute('name', value);
            x.addEventListener('keyup', function () { replaceAll(value, this.value.trim()); });
            const title = document.createTextNode(value);
            map.set(value, value);
            var br = document.createElement('br');
            theDiv.insertBefore(br, theDiv.firstChild);
            theDiv.insertBefore(x, theDiv.firstChild);
            br = document.createElement('br');
            theDiv.insertBefore(br, theDiv.firstChild);
            theDiv.insertBefore(title, theDiv.firstChild);
        });
    }
    /**
     * Replace variables. This is called every time user changes the input text.     
     * @param {*} value original variable text 
     * @param {*} modifiedValue the modified text
     */
    function replaceAll(value, modifiedValue) {
        map.set(value, modifiedValue);
        var tmpText = map.get('codeText');
        map.forEach(function (value, key) {            
            if (value !== '' && key !== value) {
                var replace = '{ ' + key + ' }';
                var re = new RegExp(replace, 'g');
                tmpText = tmpText.replace(re, value);
            }
        });
        textElement.innerHTML = tmpText;
    }
}