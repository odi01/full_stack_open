const Blog = require('../models/blog')

const initialBlogss = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Willam Jason',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1,
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Dori Moran',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0,
    },
]

// const nonExistingId = async () => {
//   const note = new Note({ content: 'willremovethissoon' })
//   await note.save()
//   await note.remove()

//   return note._id.toString()
// }

// const notesInDb = async () => {
//   const notes = await Note.find({})
//   return notes.map(note => note.toJSON())
// }

module.exports = {
    initialBlogss
}

// module.exports = {
//     initialBlogss, nonExistingId, notesInDb
// }
