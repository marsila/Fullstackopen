import { test, expect } from '@playwright/test'
import { createBlog, loginWith } from './helper'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'test user',
        username: 'testUser',
        password: '1234'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'new user',
        username: 'newUser',
        password: 'newPass'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testUser', '1234')
      await expect(page.locator('h3').getByText(/test user logged in/i)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await await loginWith(page, 'testUser', 'wrongPass')
      await expect(page.getByText(/wrong credentials!/i)).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'testUser', '1234')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'e2e test blog', 'testUser', 'url.test')
      await expect(page.getByText('a new blog was created: e2e test blog, by testUser')).toBeVisible()
      await expect(page.getByText('e2e test blog').first()).toBeVisible()
    })

    test('ablog can be liked', async({page}) => {
      await createBlog(page, 'like a blog', 'testUser', 'url.test')
      const blogElement = page.locator('.blog').filter({ hasText: 'like a blog' })
      await blogElement.getByRole('button',{name:'view'}).click()
      const blogDetailsElement = page.locator('.blogDetails').filter({ hasText: 'like a blog' })
      await blogDetailsElement.getByRole('button',{name:'like'}).click()
      await expect(blogDetailsElement.getByText('likes: 1')).toBeVisible()
    })

    test('a creater of a blog can delete it', async({page}) => {
      const title = 'a blog to be deleted'
      await createBlog(page, title, 'testUser','url.test')
      page.on('dialog', async(dialog) => {
        if(dialog.type() === 'confirm'){
          await dialog.accept()
          //OR
          //await dialog.dismiss()
        }
      })
      const blogElement = page.locator('.blog').filter({ hasText: title })
      await blogElement.getByRole('button',{name:'view'}).click()
      const blogDetailsElement = page.locator('.blogDetails').filter({ hasText: title })
      await blogDetailsElement.getByRole('button',{name:'remove'}).click()
      await expect(page.getByText(/The blog was removed!/i)).toBeVisible()
      await expect(page.getByText(title)).not.toBeVisible()
    })

    test('only creater can see remove button', async({page}) => {
      const title = 'No remove buuton'
      await createBlog(page, title, 'testUser','url.test')
      await page.getByRole('button', {name: 'logout'}).click()
      await expect(page.getByText(/log in to application/i)).toBeVisible()
      await loginWith(page,'newUser','newPass')
      await expect(page.locator('h3').getByText(/new user logged in/i)).toBeVisible()
      const blogElement = page.locator('.blog').filter({ hasText: title })
      await blogElement.getByRole('button', {name:'view'}).click()
      await expect(page.locator('.blogDetails').filter({ hasText: title }).getByRole('button',{name:'remove'})).not.toBeVisible()
    })
  })
})