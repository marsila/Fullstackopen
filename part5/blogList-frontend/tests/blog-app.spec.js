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
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await await loginWith(page, 'testUser', '1234')
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
  })
})