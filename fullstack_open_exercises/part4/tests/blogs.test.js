const listHelper = require('../utils/list_helper')

const listWithoutBlog = []

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
    },
]

const listWithMutipleBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Willam Jason',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 6,
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Willam Jason',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 3,
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Willam Jason',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 8,
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
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'June Flask',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0,
    },
]

// test('dummy returns one', () => {
//     const blogs = []

//     const result = listHelper.dummy(blogs)
//     expect(result).toBe(1)
// })

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(listWithoutBlog)
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithMutipleBlogs)
        expect(result).toBe(11)
    })
})

describe('most liked blog', () => {
    test('of empty list of blogs the most like is zero', () => {
        const result = listHelper.favoriteBlog(listWithoutBlog)
        expect(result.likes).toEqual(null)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result.likes).toEqual(5)
    })

    test('get the most liked blog from blogs list', () => {
        const result = listHelper.favoriteBlog(listWithMutipleBlogs)
        expect(result.likes).toEqual(6)
    })
})

test('most blogs author', () => {
    const result = listHelper.mostBlogs(listWithMutipleBlogs)
    const expRes = {
        author: 'Willam Jason',
        blogs: 3,
    }
    expect(result).toEqual(expRes)
})
