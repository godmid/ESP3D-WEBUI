var language = 'en';

var language_list = [
    ['de', 'Deutsch', 'germantrans'],
    ['en', 'English', 'englishtrans'],
    ['es', 'Espa&ntilde;ol', 'spanishtrans'],
    ['fr', 'Fran&ccedil;ais', 'frenchtrans'],
    ['it', 'Italiano', 'italiantrans'],
    ['pl', 'Polski', 'polishtrans'],
    ['ptbr', 'Português-Br', 'ptbrtrans'],
    ['ru', 'Русский', 'russiantrans'],
    ['uk', 'Українська', 'ukrtrans'],
];

//removeIf(production)
var translated_list = [];
//endRemoveIf(production)

function build_language_list(id_item) {
    var content = "<select class='form-control'  id='" + id_item + "' onchange='translate_text(this.value)'>\n";
    for (var lang_i = 0; lang_i < language_list.length; lang_i++) {
        content += "<option value='" + language_list[lang_i][0] + "'";
        if (language_list[lang_i][0] == language) content += " selected";
        content += ">" + language_list[lang_i][1] + "</option>\n";
    }
    content += "</select>\n";
    return content;
}

function translate_text(lang) {
    var currenttrans = {};
    var translated_content = "";
    language = lang;
    for (var lang_i = 0; lang_i < language_list.length; lang_i++) {
        if (language_list[lang_i][0] == lang) {
            currenttrans = eval(language_list[lang_i][2]);
        }
    }
    var All = document.getElementsByTagName('*');
    for (var i = 0; i < All.length; i++) {
        if (All[i].hasAttribute('translate')) {
            var content = "";
            if (!All[i].hasAttribute('english_content')) {
                content = All[i].innerHTML;
                content.trim();
                All[i].setAttribute('english_content', content);
                //removeIf(production)        
                var item = {
                    content: content
                };
                translated_list.push(item);
                //endRemoveIf(production)
            }
            content = All[i].getAttribute('english_content');
            translated_content = translate_text_item(content);

            All[i].innerHTML = translated_content;
        }
        //add support for placeholder attribut
        if (All[i].hasAttribute('translateph') && All[i].hasAttribute('placeholder')) {
            var content = "";
            if (!All[i].hasAttribute('english_content')) {
                content = All[i].getAttribute('placeholder');
                content.trim();
                //removeIf(production) 
                var item = {
                    content: content
                };
                translated_list.push(item);
                //endRemoveIf(production)
                All[i].setAttribute('english_content', content);
            }
            content = All[i].getAttribute('english_content');

            translated_content = decode_entitie(translate_text_item(content));
            All[i].setAttribute('placeholder', translated_content)
        }
    }
};

function translate_text_item(item_text, withtag) {
    var currenttrans = {};
    var translated_content;
    var with_tag = false;
    if (typeof withtag != "undefined") with_tag = withtag;
    for (var lang_i = 0; lang_i < language_list.length; lang_i++) {
        if (language_list[lang_i][0] == language) {
            currenttrans = eval(language_list[lang_i][2]);
        }
    }
    translated_content = currenttrans[item_text];
    if (typeof translated_content === 'undefined') translated_content = item_text;
    if (with_tag) {
        var translated_content_tmp = "<span english_content=\"" + item_text + "\" translate>" + translated_content + "</span>";
        translated_content = translated_content_tmp;
    }
    return translated_content;
}