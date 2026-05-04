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

test('hide and show butten', async()=>{
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
  screen.debug(button)
  await user.click(button)
  const element1 = screen.getByText('admin.blogs.com',{exact:false})
  const element2 = screen.getByText('likes: 4',{exact:false})
  expect(element1,element2).toBeDefined()

})