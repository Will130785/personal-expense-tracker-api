const login = require('./controllers/auth/index')

test('Returns Hello', () => {
  expect.assertions(1)
  return login.login().then(data => {
    expect(data).toEqual('Hello')
  })
})

// test('Test test', () => {
//   expect(true).toBe(true)
// })
