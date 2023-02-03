const { test, expect } = require('@playwright/test');

test("@API-test > get all users", async ({ request }) => {
    const _response = await request.get(`/api/users?page=2`);
    expect(_response.ok()).toBeTruthy();
    expect(_response.status()).toBe(200);
    expect(await _response.text()).toContain('{"id":10,"email":"byron.fields@reqres.in","first_name":"Byron","last_name":"Fields","avatar":"https://reqres.in/img/faces/10-image.jpg"}');
});

test("@API-test > create new user", async ({ request }) => {
    const _response = await request.post(`/api/users`, {
        data: {
            name: 'nikola',
            job: 'playwright',
        }
    });
    expect(_response.ok()).toBeTruthy();
    expect(_response.status()).toBe(201);
    expect(await _response.text()).toContain('"name":"nikola"' || '"job":"playwright"' || '"id":');
});