const _ = require('lodash')

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0){
        return null
    }
    const favorite = blogs.reduce((prev, curr) => {
        return (prev.likes > curr.likes) ? prev : curr
    })
    return {
        title:favorite.title,
        author:favorite.author,
        likes:favorite.likes 
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;

    //using lodash library : countBy, map , maxBy
    const authorCounts = _.countBy(blogs, 'author')
    //_.countBy returns an object

    //convert the objsct into array using _.map
    const authorsArray = _.map(authorCounts,(count, name)=> ({
        author:name,
        blogs:count
    }))

    return _.maxBy(authorsArray,'blogs')

}

const mostLikes = (blogs) => {
    if(blogs.length === 0) return null;

    const authorCounts = blogs.reduce((acc,blog)=>{
        const author = blog.author;
        const likes = blog.likes
        acc[author] = (acc[author] || 0) + likes;

        return acc
    },{})

    const authorsArray = _.map(authorCounts,(likes, name)=> ({
        author:name,
        likes:likes
    }))

    return _.maxBy(authorsArray,'likes')
} 

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}