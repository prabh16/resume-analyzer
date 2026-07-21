import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import FormData from 'form-data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'http://localhost:5000/api';
const SAMPLE_PDF_PATH = path.join(__dirname, 'samples', 'sample-resume.pdf');

const runTests = async () => {
  if (!fs.existsSync(SAMPLE_PDF_PATH)) {
    throw new Error('Sample PDF missing. Run: node scripts/generate-sample-pdf.js');
  }

  const uniqueEmail = `testuser_${Date.now()}@example.com`;
  let token = '';
  let analysisId = '';

  console.log('1. Registering user...');
  const registerRes = await axios.post(`${API_URL}/auth/register`, {
    name: 'Test User',
    email: uniqueEmail,
    password: 'password123',
  });
  token = registerRes.data.data.token;
  console.log('   Registration OK');

  const authHeaders = { Authorization: `Bearer ${token}` };

  console.log('2. Logging in...');
  const loginRes = await axios.post(`${API_URL}/auth/login`, {
    email: uniqueEmail,
    password: 'password123',
  });
  token = loginRes.data.data.token;
  console.log('   Login OK');

  console.log('3. Uploading PDF resume...');
  const formData = new FormData();
  formData.append('resume', fs.createReadStream(SAMPLE_PDF_PATH), {
    filename: 'sample-resume.pdf',
    contentType: 'application/pdf',
  });

  await axios.post(`${API_URL}/resumes/upload`, formData, {
    headers: { ...formData.getHeaders(), Authorization: `Bearer ${token}` },
  });
  console.log('   Upload OK');

  console.log('4. Running analysis...');
  const jobDescription = `
    We are hiring a Full Stack Developer with strong skills in JavaScript, React, Node.js, Express,
    MongoDB, REST APIs, Git, and Docker. The candidate should have project experience, measurable
    achievements, internships or work experience, education details, and relevant certifications.
    Responsibilities include building scalable web applications, optimizing API performance, and
    collaborating with cross-functional teams.
  `;

  const analysisRes = await axios.post(
    `${API_URL}/analyses`,
    {
      jobTitle: 'Full Stack Developer',
      companyName: 'TechCorp',
      jobDescription,
    },
    { headers: authHeaders }
  );

  analysisId = analysisRes.data.data.analysis._id;
  const score = analysisRes.data.data.analysis.overallScore;
  console.log(`   Analysis OK (score: ${score})`);

  console.log('5. Fetching analysis history...');
  const historyRes = await axios.get(`${API_URL}/analyses`, { headers: authHeaders });
  console.log(`   History count: ${historyRes.data.data.analyses.length}`);

  console.log('6. Opening full report...');
  const reportRes = await axios.get(`${API_URL}/analyses/${analysisId}`, { headers: authHeaders });
  console.log(`   Report score: ${reportRes.data.data.analysis.overallScore}`);

  console.log('7. Deleting analysis...');
  await axios.delete(`${API_URL}/analyses/${analysisId}`, { headers: authHeaders });
  console.log('   Delete OK');

  console.log('\nAll tests passed successfully.');
};

runTests().catch((error) => {
  console.error('\nTest failed:', error.response?.data || error.message);
  process.exit(1);
});
