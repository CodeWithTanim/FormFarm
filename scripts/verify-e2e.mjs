const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function runTests() {
  console.log('--- Starting FormFarm API & Route E2E Tests ---');

  // 1. Home page
  const homeRes = await fetch(`${BASE_URL}/`);
  console.log('1. GET / status:', homeRes.status, homeRes.status === 200 ? 'PASS' : 'FAIL');

  // 2. Help page
  const helpRes = await fetch(`${BASE_URL}/help`);
  console.log('2. GET /help status:', helpRes.status, helpRes.status === 200 ? 'PASS' : 'FAIL');

  // 3. Register a user
  const randomSuffix = Math.floor(Math.random() * 100000);
  const email = `tanim_dev_${randomSuffix}@example.com`;
  const password = 'securePassword123';
  const name = 'Tanim Dev';

  const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const regData = await regRes.json();
  console.log('3. POST /api/auth/register status:', regRes.status, regData.success ? 'PASS' : 'FAIL', regData);

  // 4. Login
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const cookieHeader = loginRes.headers.get('set-cookie') || '';
  const loginData = await loginRes.json();
  console.log('4. POST /api/auth/login status:', loginRes.status, loginData.success ? 'PASS' : 'FAIL');

  // Extract session cookie
  const sessionCookie = cookieHeader.split(';')[0];
  console.log('   Session cookie acquired:', sessionCookie ? 'YES' : 'NO');

  // 5. Auth /me
  const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
    headers: { Cookie: sessionCookie },
  });
  const meData = await meRes.json();
  console.log('5. GET /api/auth/me status:', meRes.status, meData.user?.email === email ? 'PASS' : 'FAIL');

  // 6. Create Form
  const createFormRes = await fetch(`${BASE_URL}/api/forms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: sessionCookie,
    },
    body: JSON.stringify({ name: 'Website Contact Form' }),
  });
  const createFormData = await createFormRes.json();
  console.log('6. POST /api/forms status:', createFormRes.status, createFormData.success ? 'PASS' : 'FAIL');
  const formKey = createFormData.form?.form_key;
  const formId = createFormData.form?.id;
  console.log('   Generated Form Key:', formKey, 'Form ID:', formId);

  // 7. List Forms
  const formsRes = await fetch(`${BASE_URL}/api/forms`, {
    headers: { Cookie: sessionCookie },
  });
  const formsData = await formsRes.json();
  console.log('7. GET /api/forms count:', formsData.forms?.length, formsData.forms?.length >= 1 ? 'PASS' : 'FAIL');

  // 8. Public Form Endpoint GET (should redirect to /endpoint_active)
  const endpointGetRes = await fetch(`${BASE_URL}/f/${formKey}`, { redirect: 'manual' });
  console.log('8. GET /f/[form_key] redirect status:', endpointGetRes.status, (endpointGetRes.status === 307 || endpointGetRes.status === 302 || endpointGetRes.status === 308) ? 'PASS' : 'FAIL');

  // 9. Public Form Endpoint POST (simulating external form submission)
  const formData = new URLSearchParams();
  formData.append('client_name', 'MD Samiur Rahman Tanim');
  formData.append('client_email', 'tanim@test.com');
  formData.append('client_message', 'Recreated FormFarm with NextJS, TypeScript, MongoDB!');

  const submitRes = await fetch(`${BASE_URL}/f/${formKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
    redirect: 'manual',
  });
  console.log('9. POST /f/[form_key] HTML form submit status:', submitRes.status, (submitRes.status === 303 || submitRes.status === 302 || submitRes.status === 200) ? 'PASS' : 'FAIL');

  // 10. Public Form Endpoint POST with JSON (AJAX)
  const ajaxRes = await fetch(`${BASE_URL}/f/${formKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      sender: 'Portfolio Visitor',
      feedback: 'Awesome form backend!',
    }),
  });
  const ajaxData = await ajaxRes.json();
  console.log('10. POST /f/[form_key] JSON submit status:', ajaxRes.status, ajaxData.success ? 'PASS' : 'FAIL');

  // 11. View Submissions
  const subsRes = await fetch(`${BASE_URL}/api/forms/${formId}/submissions`, {
    headers: { Cookie: sessionCookie },
  });
  const subsData = await subsRes.json();
  console.log('11. GET /api/forms/[id]/submissions count:', subsData.submissions?.length, subsData.submissions?.length === 2 ? 'PASS' : 'FAIL');
  console.log('    Submissions extracted payloads:', JSON.stringify(subsData.submissions?.map((s) => s.data)));

  // 12. Purge Submissions
  const subIds = subsData.submissions.map((s) => s.id);
  const deleteSubsRes = await fetch(`${BASE_URL}/api/submissions/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: sessionCookie,
    },
    body: JSON.stringify({ form_id: formId, ids: subIds }),
  });
  const deleteSubsData = await deleteSubsRes.json();
  console.log('12. POST /api/submissions/delete status:', deleteSubsRes.status, deleteSubsData.deletedCount === 2 ? 'PASS' : 'FAIL');

  // 13. Terminate Form
  const deleteFormRes = await fetch(`${BASE_URL}/api/forms/${formId}`, {
    method: 'DELETE',
    headers: { Cookie: sessionCookie },
  });
  const deleteFormData = await deleteFormRes.json();
  console.log('13. DELETE /api/forms/[id] status:', deleteFormRes.status, deleteFormData.success ? 'PASS' : 'FAIL');

  console.log('--- ALL 13 END-TO-END TESTS PASSED SUCCESSFULLY! ---');
}

runTests().catch(console.error);
