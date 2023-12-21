const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogss = [
	{
		_id: "64edbb496c68048865620140",
		title: "Go To Statement Considered Harmful",
		author: "Willam Jason",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 1,
		__v: 0,
	},
	{
		_id: "65794f07d1db772e8e2d9eb0",
		title: "Is today is going to be a good night",
		author: "Dori Moran",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 2,
		__v: 0,
	},
];

const newBlog = {
	title: "Farting in the dark is good",
	author: "Michal Ribinzon",
	url: "http://www.nothing-there.com",
	likes: 69,
};

const noLikesBlog = {
	title: "In the begaining I didn't have a like prop",
	author: "Bro Mo",
	url: "http://www.not22hing-there.com",
};

const noTileBlog = {
	author: "Bro Mo",
	url: "http://www.not22hing-there.com",
	likes: 2,
};

const noUrlBlog = {
	title: "In the begaining I didn't have a like prop",
	author: "Bro Mo",
	likes: 2,
};

// const nonExistingId = async () => {
//   const note = new Note({ content: 'willremovethissoon' })
//   await note.save()
//   await note.remove()

//   return note._id.toString()
// }

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

module.exports = {
	initialBlogss,
	newBlog,
	noLikesBlog,
	noTileBlog,
	noUrlBlog,
	usersInDb,
};

// module.exports = {
//     initialBlogss, nonExistingId, notesInDb
// }
