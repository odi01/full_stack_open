const dummy = (blogs) => 1

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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}
