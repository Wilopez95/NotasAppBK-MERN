const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.getNotes = async(req,res)=>{
    const notes = await Note.find();
    res.json(notes)
}


notesCtrl.postNotes = async(req,res)=> {
    const {title,content,date,author}=req.body;
    const newNote = new Note({
        title,
        content,
        date,
        author
    })
    await newNote.save();
    res.json({message: 'Note saved'})
}

notesCtrl.getNote = async(req,res)=> {
    const note = await Note.findById(req.params.id);
    res.json(note)
}

notesCtrl.updateNote = async(req,res)=> {
    const {title,content,author,date} = req.body;
    await Note.findOneAndUpdate({_id: req.params.id}, {
        title,
        author,
        date,
        content
       
    });
    res.json({message: 'Note update'})
}

notesCtrl.deleteNote = async(req,res)=> {
    await Note.findByIdAndDelete(req.params.id);
    res.json({message: 'Note delete'})
}


module.exports = notesCtrl;