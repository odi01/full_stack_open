const _ = require('lodash')

const totalLikes = (blogs) => {
    let total = 0

    for (let index = 0; index < blogs.length; index++) {
        const blog = blogs[index];
        total += blog.likes
    }
    return total
}

const favoriteBlog = (blogs) => {
    let mostLikeBlog = null

    for (let index = 0; index < blogs.length; index++) {
        const blog = blogs[index];

        if (!mostLikeBlog) {
            mostLikeBlog = blog
        }

        if (blog.likes > mostLikeBlog.likes) {
            mostLikeBlog = blog
        }
    }

    if (mostLikeBlog) {
        return {
            title: mostLikeBlog.title,
            author: mostLikeBlog.author,
            likes: mostLikeBlog.likes,
        }
    }

    return {
        title: null,
        author: null,
        likes: null,
    }
}

const mostBlogs = (blogs) => {
    const blogAuthors = blogs.map((blog) => blog.author)
    const frequency = _.maxBy(
        _.map(_.groupBy(blogAuthors), (author) => ({
            author: author[0],
            blogs: author.length,
        })),
        'blogs',
    );
    return frequency
}

const mostLikes = (blogs) => {
	let authorLikesObj = blogs.reduce((op, { author, likes }) => {
		op[author] = op[author] || 0;
		op[author] += likes;
		return op;
	}, {});

	const mostLikedAuthor = Object.keys(authorLikesObj).reduce((a, b) =>
		authorLikesObj[a] > authorLikesObj[b] ? a : b
	);

	return {
		author: mostLikedAuthor,
		blogs: authorLikesObj[mostLikedAuthor],
	};
};

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
