const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    test('when list is empty ,no blogs', () => {
        const result = listHelper.favoriteBlog([])
        assert.strictEqual(result, null)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);
        console.log("From test: ", result);
        assert.deepStrictEqual(result, {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })


    const listWithMoreBlogs = [
        {
            "title": "My first blog",
            "author": "Anna Morch",
            "url": "http://localhost:3003",
            "likes": 3,
            "id": "69afe37fca75e5621bb0c78d"
        },
        {
            "title": "this is a second update for the  blog",
            "author": "Marta Scott",
            "url": "http://localhost:3003",
            "likes": 6,
            "id": "69b188c83743fdb143b22d1d"
        },
        {
            "title": "this is a second blog",
            "author": "Liana Maria",
            "url": "http://localhost:3003",
            "likes": 0,
            "id": "69b2850a4446e908b0c5215b"
        }
    ]

    test('lists with more than one blog', () => {
        const result = listHelper.favoriteBlog(listWithMoreBlogs)
        assert.deepStrictEqual(result, {
            title: "this is a second update for the  blog",
            author: "Marta Scott",
            likes: 6
        })
    })
})