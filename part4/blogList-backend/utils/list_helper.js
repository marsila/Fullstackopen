const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0){
        return 0
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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}