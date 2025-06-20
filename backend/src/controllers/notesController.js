export function getAllNotes(req, res) {
    res.status(200).send("You just fetched the notes")
};

export function createNote(req, res) {
    res.status(201).send("You just created a new note")
};

export function updateNote(req, res) {
    res.status(200).send(`You just updated the note with id ${req.params.id}`)
};

export function deleteNote(req, res) {
    res.status(200).send(`You just deleted the note with id ${req.params.id}`)
};