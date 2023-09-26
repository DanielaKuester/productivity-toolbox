const express = require('express')
const router = express.Router()
const { getDiaryEntries, setDiaryEntry, updateDiaryEntry, deleteDiaryEntry } = require('../controllers/diaryController')

router.route('/').get(getDiaryEntries).post(setDiaryEntry);
router.route('/:id').delete(deleteDiaryEntry).put(updateDiaryEntry);

module.exports = router