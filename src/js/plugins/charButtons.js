import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes'

const duration = 400

function filterByCharacter (character) {
    $('[wm-character]').each(function(i, e){
        const isTarget = $(this).attr('wm-character') === character
        || character === null
        if(isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })   
}

// Plugin
$.fn.charButtons = function () {
    const characters = new Set
    $('[wm-character').each(function(i, e) {
        characters.add($(e).attr('wm-character'))
    })

    const btns = Array.from(characters).map(character => {
        const btn = $('<button>').addClass(['btn', 'btn-info', 'ml-3']).html(character)
        btn.on('click', e => filterByCharacter(character))
        return btn
    })

    const btnAll = $('<button>')
    .addClass(['btn', 'btn-info', 'active', 'ml-3']).html('Todos')
    btnAll.on('click', e => filterByCharacter(null))
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function() {
    $('[wm-character-buttons').charButtons()
})