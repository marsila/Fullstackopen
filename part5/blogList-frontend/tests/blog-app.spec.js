import { test, expect} from '@playwright/test'

test.describe('Blog app', ()=> {
  test.beforeEach(async({page, request})=> {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data : {
        name : 'test user',
        username : 'testUser',
        password : '1234'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async({page})=> {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel(/username/i).fill('testUser')
      await page.getByLabel(/password/i).fill('1234')
      await page.getByRole('button', {name: 'login'}).click()
      await expect(page.locator('h3').getByText(/test user logged in/i)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel(/username/i).fill('testUser')
      await page.getByLabel(/password/i).fill('wrongPass')
      await page.getByRole('button',{name:'login'}).click()
      await expect(page.getByText(/wrong credentials!/i)).toBeVisible()
    })
  })
})