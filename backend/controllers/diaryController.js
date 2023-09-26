const asyncHandler = require('express-async-handler') // Add express async handler for async requests

const Diary = require('../models/diaryModel')

// @desc    Get diary entries
// @route   GET /api/diary
// @access  public ==> later private for all GET/POST/PUT/DELETE requests --> after authentification, login, signup is added)
const getDiaryEntries = asyncHandler(async (req, res) => {
    const diaryEntries = await Diary.find({})
    res.status(200).json({ diaryEntries })
})

// @desc    Set diary entry
// @route   POST /api/diary
// @access  public
const setDiaryEntry = asyncHandler(async (req, res) => {
    if (!req.body.diaryText) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const diaryEntry = await Diary.create({
        diaryText: req.body.diaryText,
        textHidden: false,
        inputHidden: true
    })

    res.status(200).json(diaryEntry)
})

// @desc    Update diary entry
// @route   PUT /api/diary/:id
// @access  public
const updateDiaryEntry = asyncHandler(async (req, res) => {
    const diaryEntry = await Diary.findById(req.params.id)

    if(!diaryEntry) {
        res.status(400)
        throw new Error('Diary entry not found')
    }

    const updatedDiaryEntry = await Diary.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedDiaryEntry)
})

// @desc    Delete diary entry
// @route   DELETE /api/diary/:id
// @access  public
const deleteDiaryEntry = asyncHandler(async (req, res) => {
    const diaryEntry = await Diary.findById(req.params.id)
  
    if (!diaryEntry) {
      res.status(400)
      throw new Error('Diary entry not found')
    }
  
    diaryEntry.deleteOne()
  
    res.status(200).json({ id: req.params.id })
  })

module.exports = {
    getDiaryEntries,
    setDiaryEntry,
    updateDiaryEntry,
    deleteDiaryEntry
}