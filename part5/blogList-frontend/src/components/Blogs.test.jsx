/* eslint-disable no-undef */
import {render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlog from './CreateBlog'

test('first test', () => {
  const blog = {
    title:'the test',
    author:'admin',
  }
  const { container } = render(<Blog blog={blog}/>)
  //I have 2 title in the page (hide/show)
  const div = container.querySelector('.blogDetails')
  expect(div).toHaveTextContent('the test')

})

test('ununauthenticated users see only blog info with no buttons', async()=>{
  const blog ={
    title:'ununauthenticated users test',
    author:'admin',
    likes:4,
    url:'admin-blogs.com'
  }

  render(<Blog blog={blog} loggedUser={null}/>)

  const element1 = screen.getByText('ununauthenticated users test',{exact:false})
  const element2 = screen.getByText('likes: 4',{exact:false})
  const element3 = screen.queryByRole('button',{name:'like'})
  expect(element1).toBeDefined()
  expect(element2).toBeDefined()
  expect(element3).toBeNull()

})

test('Authenticated users who are not the blog’s creator are shown only the like button', async () => {
  const blog = {
    title:'like button test',
    author:'admin',
    url: 'admin-blogs.com',
    likes:0,
    user:{
      id:'6a009d8da05bb09e7b417ad8',
      username:'admin'
    },
    id:'fakeblog1'
  }

  const mockUpdate = vi.fn()

  const loggedUser ={
    id:'6a009d862242731fb2d6883c',
    username:'member3'
  }
  render(<Blog
    blog={blog}
    updateBlogLikes={mockUpdate}
    loggedUser={loggedUser}
  />)

  const user = userEvent.setup()
  const likeButton = screen.getByText('like')
  await user.click(likeButton)

  const removeBtn = screen.queryByRole('button', {name:'remove'})

  expect(mockUpdate.mock.calls).toHaveLength(1)
  expect(removeBtn).toBeNull()
})

test('The blog’s creator is also shown the delete button', async () => {
  const blog = {
    title:'like button test',
    author:'admin',
    url: 'admin-blogs.com',
    likes:0,
    user:{
      id:'6a009d8da05bb09e7b417ad8',
      username:'admin'
    },
    id:'fakeblog1'
  }
  const loggedUser = {
    id:'6a009d8da05bb09e7b417ad8',
    username:'admin'
  }

  const mockUpdate = vi.fn()
  const mockDelete = vi.fn()
  //click ok on the confirm dialog
  window.confirm = vi.fn(() => true)

  render(<Blog
    blog={blog}
    updateBlogLikes={mockUpdate}
    removeBlog={mockDelete}
    loggedUser= {loggedUser}
  />)

  const user = userEvent.setup()
  const likeButton = screen.getByText('like')
  expect(likeButton).toBeInTheDocument()

  await user.click(likeButton)
  expect(mockUpdate.mock.calls).toHaveLength(1)

  const removeBtn = screen.queryByRole('button', {name:'remove'})
  expect(removeBtn).toBeInTheDocument()

  await user.click(removeBtn)
  expect(mockDelete.mock.calls).toHaveLength(1)
})

test('create new blog', async() => {
  const createNewBlog = vi.fn()
  const user = userEvent.setup()

  render(<CreateBlog createNewBlog={createNewBlog}/>)

  const title = screen.getByLabelText('title',{exact:false})
  const author = screen.getByLabelText('author',{exact:false})
  const url = screen.getByLabelText('url',{exact:false})
  const createBtn = screen.getByText('submit')
  await user.type(title,'create new blog')
  await user.type(author,'admin')
  await user.type(url,'admin-blogs.com')
  await user.click(createBtn)
  expect(createNewBlog.mock.calls).toHaveLength(1)
  expect(createNewBlog.mock.calls[0][0].title).toBe('create new blog')
  expect(createNewBlog.mock.calls[0][0].author).toBe('admin')
  expect(createNewBlog.mock.calls[0][0].url).toBe('admin-blogs.com')
  console.log('calls',createNewBlog.mock.calls)
})

