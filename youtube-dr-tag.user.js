// ==UserScript==
// @name         YouTube Dr. Tag
// @namespace    einarsnow
// @version      1.3
// @author       einarsnow
// @description  Tag user in YouTube live chat by click
// @updateURL    https://github.com/einarsnow/youtube-dr-tag/raw/main/youtube-dr-tag.user.js
// @downloadURL  https://github.com/einarsnow/youtube-dr-tag/raw/main/youtube-dr-tag.user.js
// @supportURL   https://github.com/einarsnow/youtube-dr-tag
// @match        https://www.youtube.com/live_chat*
// @grant        GM.addStyle
// ==/UserScript==

GM.addStyle(`
    #author-name {
        cursor: pointer;
    }
    #author-name:hover {
        text-decoration: underline;
    }
`)

const chat = document.querySelector("#chat")
function clickHandler(e) {
    if (e.target.id != "author-name") return

    e.preventDefault()
    e.stopImmediatePropagation()
    e.stopPropagation()

    let input = document.querySelector("#input[contenteditable]")

    let username = e.target.innerText.trim()
    if (!username.startsWith("@")) {
        username = `@${username}`
    }

    if (input.innerText.length == 0) {
      input.innerText = `${username}`
    } else {
      input.innerText = `${input.innerText}\xa0${username}`
      input.innerText = input.innerText.replaceAll("\xa0\xa0@", "\xa0@")
    }
    input.dispatchEvent(new Event("input"))

    const range = document.createRange()
    range.setStart(input, 1)
    range.collapse(true)
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)

    input.focus()
    document.execCommand("insertText", false, " ")
}

document.addEventListener("click", clickHandler, true)
