/* eslint-disable no-undef */
import {render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

test('view/hide details button', async()=>{
  const blog ={
    title:'button test',
    author:'admin',
    likes:4,
    url:'admin.blogs.com'
  }
  const mockHandler = vi.fn()
  render(<Blog blog={blog} toggleBlogDetails={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const element1 = screen.getByText('admin.blogs.com',{exact:false})
  const element2 = screen.getByText('likes: 4',{exact:false})
  expect(element1,element2).toBeDefined()

})

test('cliking like button twice, calling the click handler twice', async () => {
  const blog = {
    title:'like button test',
    author:'admin',
    url: 'admin.blogs.com',
    likes:0,
    user:{
      id:'69e0b618b4fc66a6a6d443d4',
      username:'admin'
    },
    id:'fakeblog1'
  }

  const mockHandler = vi.fn()
  render(<Blog
    blog={blog}
    updateBlogLikes={mockHandler}
    loggedUser='admin'
  />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

