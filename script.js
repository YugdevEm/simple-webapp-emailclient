
let sentMails = JSON.parse(localStorage.getItem('sentMails')) || [];
let draftMails = JSON.parse(localStorage.getItem('draftMails')) || [];

function showSentMails() {
    let sentMailsList = document.getElementById('sent-mails-list');
    sentMailsList.innerHTML = '';

    if (sentMails.length === 0) {
        document.getElementById('no-sent-mails').style.display = 'block';
    } else {
        document.getElementById('no-sent-mails').style.display = 'none';
        sentMails.forEach((mail, index) => {
            sentMailsList.innerHTML += `<div>${index + 1}. ${mail.from} - ${mail.to} - ${mail.message}</div><br>`;
        });
    }
}

function showDraftMails() {
    let draftMailsList = document.getElementById('draft-mails-list');
    draftMailsList.innerHTML = '';

    if (draftMails.length === 0) {
        document.getElementById('no-draft-mails').style.display = 'block';
    } else {
        document.getElementById('no-draft-mails').style.display = 'none';
        draftMails.forEach((mail, index) => {
            draftMailsList.innerHTML += `<div class="draft-item">${mail.from} - ${mail.to} - ${mail.message} <div class="button-container"><button class="edit-button" onclick="editDraft(${index})">Edit</button> <button class="send-button" onclick="sendDraft(${index})">Send</button></div></div>`;
        });
    }
}

function saveDraft() {
    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    let message = document.getElementById('message').value;

    draftMails.push({from, to, message});
    localStorage.setItem('draftMails', JSON.stringify(draftMails));

    window.location.href = 'drafts.html';
}

function sendMail() {
    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    let message = document.getElementById('message').value;

    sentMails.push({from, to, message});
    localStorage.setItem('sentMails', JSON.stringify(sentMails));

    window.location.href = 'index.html';
}

function editDraft(index) {
    let mail = draftMails[index];
    localStorage.setItem('editDraftIndex', index);
    localStorage.setItem('editDraft', JSON.stringify(mail)); 
    window.location.href = 'edit.html';
}

function saveEditedDraft() {
    let index = localStorage.getItem('editDraftIndex');
    let from = document.getElementById('edit-from').value;
    let to = document.getElementById('edit-to').value;
    let message = document.getElementById('edit-message').value;

    draftMails[index] = {from, to, message};
    localStorage.setItem('draftMails', JSON.stringify(draftMails));

    window.location.href = 'drafts.html';
}

function sendEditedMail() {
    let index = localStorage.getItem('editDraftIndex');
    let from = document.getElementById('edit-from').value;
    let to = document.getElementById('edit-to').value;
    let message = document.getElementById('edit-message').value;

    draftMails[index] = { from, to, message };
    localStorage.setItem('draftMails', JSON.stringify(draftMails));

    sentMails.push({ from, to, message });
    localStorage.setItem('sentMails', JSON.stringify(sentMails));

    draftMails.splice(index, 1);
    localStorage.setItem('draftMails', JSON.stringify(draftMails));

    window.location.href = 'index.html';
}


function sendDraft(index) {
    let { from, to, message } = draftMails[index];

    sentMails.push({ from, to, message });
    localStorage.setItem('sentMails', JSON.stringify(sentMails));

    draftMails.splice(index, 1);
    localStorage.setItem('draftMails', JSON.stringify(draftMails));

    window.location.href = 'index.html';
}

function populateEditFields() {
    let editDraft = JSON.parse(localStorage.getItem('editDraft'));
    if (editDraft) {
        document.getElementById('edit-from').value = editDraft.from;
        document.getElementById('edit-to').value = editDraft.to;
        document.getElementById('edit-message').value = editDraft.message;
    }
}

window.onload = function() {
    if (location.href.endsWith('index.html')) {
        showSentMails();
    } 
    else if (location.href.endsWith('drafts.html')) {
        showDraftMails();
    } else if (location.href.endsWith('edit.html')) {
        let index = localStorage.getItem('editDraftIndex');
        editDraft(index);
    }
}
