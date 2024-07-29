document.getElementById('add-note').addEventListener('click', addNote);

function addNote() {
    const noteText = document.getElementById('note-text').value;
    if (noteText.trim() === '') return;

    const note = document.createElement('div');
    note.className = 'note';

    const textarea = document.createElement('textarea');
    textarea.value = noteText;
    textarea.addEventListener('input', saveNotes);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', () => {
        note.remove();
        saveNotes();
    });

    note.appendChild(textarea);
    note.appendChild(deleteBtn);

    document.getElementById('notes-list').appendChild(note);

    document.getElementById('note-text').value = '';

    saveNotes();
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note textarea').forEach(textarea => {
        notes.push(textarea.value);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.forEach(noteText => {
        const note = document.createElement('div');
        note.className = 'note';

        const textarea = document.createElement('textarea');
        textarea.value = noteText;
        textarea.addEventListener('input', saveNotes);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', () => {
            note.remove();
            saveNotes();
        });

        note.appendChild(textarea);
        note.appendChild(deleteBtn);

        document.getElementById('notes-list').appendChild(note);
    });
}

document.addEventListener('DOMContentLoaded', loadNotes);
