import { useState } from "react";
import "./notes.css";

interface INote extends Object {
    id: string,
    text: string,
    selected: true | false
};

const stickyNotesMock: INote[] = [{
    id: "a0",
    text: "Sticky Note 0",
    selected: false
}, {
    id: "a1",
    text: "Sticky Note 1",
    selected: false
}, {
    id: "a3",
    text: "Sticky Note 2",
    selected: false
}, {
    id: "a4",
    text: "Sticky Note 3",
    selected: false
}];

const NotesHeader = () => {
    return (
        <header className="notes-list-header">
            <h2>Sticky Notes</h2>
            <input
                type="search"
                className="notes-list-header-input"
                placeholder="Research..."
            />
        </header>
    );
};

const NotesList = (props: { notes: INote[], onClick: (id: string) => void }): JSX.Element => {
    const { notes, onClick } = props;

    const handleClick = (id: string) => onClick(id);

    return (
        <div className="notes-list-container">
            <ul>{notes.map(({ id, text }) =>
                <li key={id} className="notes-list-item" onClick={() => handleClick(id)}>
                    <p className="notes-list-item-text">{text}</p>
                </li>)
            }</ul>
        </div>
    );
};

const NoteSelected = (props: { notes: INote[] }) => {
    const { notes } = props;
    const note = notes.filter(note => note.selected)[0];

    return (
        <div className="note">{note ?
            <div key={note.id} className="note-text">
                <textarea value={note.text}/>
            </div> : null
        }</div>
    );
};

const Notes = () => {
    const [notes, setNotes] = useState(stickyNotesMock);

    const SelectNote = (id: string) => {
        setNotes(notes => notes.map(note => {
            note.id === id
                ? note.selected = true
                : note.selected = false;

            return note;
        }));
    };

    const updateNote = (id: string, text: string) => {
        setNotes(notes => notes.map(note => {
            note.id === id
                ? note.text = text
                : null;

            return note;
        }));
    };

    return (
        <div className="notes">
            <div className="notes-list">
                <NotesHeader />
                <NotesList notes={notes} onClick={SelectNote} />
            </div>
            <NoteSelected notes={notes} onChange={updateNote} />
        </div >
    );
};

export default Notes;
