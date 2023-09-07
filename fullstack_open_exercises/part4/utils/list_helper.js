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
    // eslint-disable-next-line lodash/prefer-lodash-method
    const blogAuthors = blogs.map((blog) => blog.author)
    const frequency = _.maxBy(
        _.map(_.groupBy(blogAuthors), (author) => ({
            author: author[0],
            blogs: author.length,
        })),
        'blogs',
    );
    console.log(frequency);
    return frequency
}

export default {
    totalLikes,
    favoriteBlog,
    mostBlogs,
}
