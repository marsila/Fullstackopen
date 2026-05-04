import {render,screen} from '@testing-library/react'
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