const loginWith = async (page, username, password) => {
  await page.getByLabel(/username/i).fill(username)
  await page.getByLabel(/password/i).fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async(page, title, author, url) => {
  await page.getByRole('button',{name:/create new blog/i}).click()
  await page.getByLabel(/title/i).fill(title)
  await page.getByLabel(/author/i).fill(author)
  await page.getByLabel(/url/i).fill(url)
  await page.getByRole('button',{name:'submit'}).click()
}

export {loginWith, createBlog}