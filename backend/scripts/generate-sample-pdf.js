import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, '..', 'samples', 'sample-resume.pdf');

const lines = [
  'John Doe',
  'Email: john.doe@email.com | Phone: +91 9876543210',
  'LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe',
  '',
  'SUMMARY',
  'Full Stack Developer experienced in JavaScript, React, Node.js, MongoDB, and Express.js.',
  '',
  'TECHNICAL SKILLS',
  'JavaScript, React, Node.js, Express, MongoDB, Git, Docker, Tailwind CSS, REST APIs',
  '',
  'PROJECTS',
  'Built a MERN stack placement tracker using React and Node.js. Improved API response time by 35%.',
  'Developed REST APIs with Express and integrated MongoDB for data storage.',
  '',
  'EXPERIENCE',
  'Software Developer Intern at TechCorp. Developed REST APIs, integrated MongoDB, and deployed with Docker.',
  '',
  'EDUCATION',
  'B.Tech Computer Science, ABC University, 2024',
  '',
  'CERTIFICATIONS',
  'MongoDB Node.js Developer Path, AWS Cloud Practitioner',
];

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const doc = new PDFDocument();
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

doc.fontSize(11);
lines.forEach((line) => {
  doc.text(line);
});

doc.end();

stream.on('finish', () => {
  console.log(`Sample PDF created at ${outputPath}`);
});
