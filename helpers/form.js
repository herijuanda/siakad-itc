module.exports.input = (name, req = null, value = null, type = 'text', name_func = null,  classes = null, attribute = null) => {

    if(req)
        req    = '<span classes="req">*</span>';

    if(value)
        value  = 'value="'+value+'"';

    if(!name_func)
        name_func = 'myform';

    if (name.indexOf(' as ') > -1) {
        arr_name   = name.split(' as ');
        name       = arr_name[0];
        label      = arr_name[1].replace('_', ' ').toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase());
    } else {
        label      = name.replace('_', ' ').toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase());
    }

    let result =  ''+
        '<label id="label_'+name+'">'+label+''+req+'</label>'+
        '<input id="input_'+name+'" placeholder="Masukkan '+label+' ..." type="'+type+'" name="'+name_func+'['+name+']" class="form-control '+(classes || '')+'" '+value+' '+(req ? 'required' : '')+' '+(attribute || '')+'/>';
    return result;
};

module.exports.input_hide = (name, value) => {
    return '<input id="hidden_'+name+'" ;type="hidden" name="myform['+name+']" value="'+value+'" />';
}

module.exports.select = (name, req = null, option = array(), value = array(), name_func = null, classes = null, attribute = null) => {

    if(req)
        req    = '<span class="req">*</span>';

    if(!name_func)
        name_func = 'myform';

    if (name.indexOf(' as ') > -1) {
        arr_name   = name.split(' as ');
        name       = arr_name[0];
        label      = arr_name[1].replace('_', ' ').toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase());
    } else {
        label      = name.replace('_', ' ').toLowerCase().replace(/(?<= )[^\s]|^./g, a=>a.toUpperCase());
    }

    let result = ''+
        '<label for="'+name+'" class="uk-form-label">'+label+req+'</label>'+
        '<select name="'+name_func+'['+name+']" id="select_'+name+'" '+(!req ? '' : 'required')+' class="form-control js-states select '+classes+'" '+attribute+' >';

    if(value && value.constructor === Array){
        if(!empty(value['key']))
            result += '<option selected="selected" value="'+value['key']+'">'+value['value']+'</option>';
        else
            result += '<option value="">Pilih '+label+' ...</option>';
    } else {
        result += '<option value="">Pilih '+label+' ...</option>';
    }

    option.forEach(function(v) {
        result += '<option value="'+v?.id+'">'+v?.name+'</option>';
    });

    result += '</select>';

    return result;
}