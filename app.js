// Application State
let currentLanguage = 'en';
let uploadedFile = null;
let timetableData = [];
let currentTranslationDirection = 'en-si';
let quizAnswers = [];

// UI Text Translations
const translations = {
  en: {
    tagline: 'Your AI-Powered Learning Assistant',
    uploadTitle: 'Provide Your Notes',
    uploadHint: 'Upload a PDF, image, or document to start.',
    supportedFiles: 'Supported: .pdf, .png, .jpg, .jpeg, .webp',
    fileSizeLimit: 'Max file size: 10MB',
    generateButton: 'Generate Summary & Quiz',
    generating: 'Generating...',
    summaryTab: 'Summary',
    quizTab: 'Quiz',
    timetableTab: 'Timetable',
    translatorTab: 'Translator',
    languageToggle: 'සිං',
    chooseFile: 'Choose File',
    summaryTitle: 'Document Summary',
    quizTitle: 'Knowledge Quiz',
    timetableTitle: 'Study Timetable',
    translatorTitle: 'Language Translator',
    subjectLabel: 'Subject',
    dayLabel: 'Day',
    timeLabel: 'Time',
    descriptionLabel: 'Description',
    addSchedule: 'Add Schedule',
    emptyTimetable: 'No schedules added yet. Create your first one!',
    inputLabel: 'Input Text',
    outputLabel: 'Translation',
    translate: 'Translate',
    delete: 'Delete'
  },
  si: {
    tagline: 'ඔබගේ AI බලගැන්වූ ඉගෙනුම් සහායක',
    uploadTitle: 'ඔබගේ සටහන් ලබා දෙන්න',
    uploadHint: 'ආරම්භ කිරීමට PDF, රූපයක් හෝ ලේඛනයක් උඩුගත කරන්න.',
    supportedFiles: 'සහාය දක්වන්නේ: .pdf, .png, .jpg, .jpeg, .webp',
    fileSizeLimit: 'උපරිම ගොනු ප්‍රමාණය: 10MB',
    generateButton: 'සාරාංශය සහ ප්‍රශ්නාවලිය ජනනය කරන්න',
    generating: 'ජනනය වෙමින්...',
    summaryTab: 'සාරාංශය',
    quizTab: 'ප්‍රශ්නාවලිය',
    timetableTab: 'කාලසටහන',
    translatorTab: 'පරිවර්තකය',
    languageToggle: 'EN',
    chooseFile: 'ගොනුව තෝරන්න',
    summaryTitle: 'ලේඛන සාරාංශය',
    quizTitle: 'දැනුම ප්‍රශ්නාවලිය',
    timetableTitle: 'අධ්‍යයන කාලසටහන',
    translatorTitle: 'භාෂා පරිවර්තකය',
    subjectLabel: 'විෂයය',
    dayLabel: 'දිනය',
    timeLabel: 'වේලාව',
    descriptionLabel: 'විස්තරය',
    addSchedule: 'කාලසටහන එකතු කරන්න',
    emptyTimetable: 'තවමත් කාලසටහන් එකතු කර නැත. ඔබේ පළමුවැන්න සාදන්න!',
    inputLabel: 'ආදාන පෙළ',
    outputLabel: 'පරිවර්තනය',
    translate: 'පරිවර්තනය කරන්න',
    delete: 'මකන්න'
  }
};

// Sample quiz questions
const sampleQuizQuestions = [
  {
    question: 'What is the main topic of the uploaded document?',
    question_si: 'උඩුගත කළ ලේඛනයේ ප්‍රධාන මාතෘකාව කුමක්ද?',
    options: ['Machine Learning', 'Data Science', 'Web Development', 'Cloud Computing'],
    options_si: ['යන්ත්‍ර ඉගෙනීම', 'දත්ත විද්‍යාව', 'වෙබ් සංවර්ධනය', 'වලාකුළු පරිගණකකරණය'],
    correct: 0
  },
  {
    question: 'Which concept is most emphasized in the content?',
    question_si: 'අන්තර්ගතයේ වඩාත් අවධාරණය කරන්නේ කුමන සංකල්පයද?',
    options: ['Algorithms', 'Neural Networks', 'Database Design', 'User Interface'],
    options_si: ['ඇල්ගොරිතම', 'ස්නායු ජාල', 'දත්ත සමුදාය සැලසුම', 'පරිශීලක අතුරු මුහුණත'],
    correct: 1
  },
  {
    question: 'What is a key application mentioned?',
    question_si: 'සඳහන් කර ඇති ප්‍රධාන යෙදුමක් කුමක්ද?',
    options: ['Image Recognition', 'Text Processing', 'Data Visualization', 'Network Security'],
    options_si: ['රූප හඳුනාගැනීම', 'පෙළ සැකසීම', 'දත්ත දෘශ්‍යකරණය', 'ජාල ආරක්ෂාව'],
    correct: 0
  }
];

// Sample translation pairs
const sampleTranslations = {
  'en-si': {
    'hello': 'ආයුබෝවන්',
    'good morning': 'සුබ උදෑසනක්',
    'thank you': 'ස්තූතියි',
    'how are you': 'ඔබට කෙසේද',
    'i am learning': 'මම ඉගෙන ගන්නවා',
    'this is my book': 'මේක මගේ පොත',
    'education': 'අධ්‍යාපනය',
    'study': 'අධ්‍යයනය',
    'teacher': 'ගුරුවරයා',
    'student': 'ශිෂ්‍යයා'
  },
  'si-en': {
    'ආයුබෝවන්': 'hello',
    'සුබ උදෑසනක්': 'good morning',
    'ස්තූතියි': 'thank you',
    'ඔබට කෙසේද': 'how are you',
    'මම ඉගෙන ගන්නවා': 'i am learning',
    'මේක මගේ පොත': 'this is my book',
    'අධ්‍යාපනය': 'education',
    'අධ්‍යයනය': 'study',
    'ගුරුවරයා': 'teacher',
    'ශිෂ්‍යයා': 'student'
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initializeEventListeners();
  updateLanguage();
});

// Event Listeners
function initializeEventListeners() {
  // Language toggle
  document.getElementById('langToggle').addEventListener('click', toggleLanguage);

  // File input
  document.getElementById('fileInput').addEventListener('change', handleFileSelect);

  // Generate button
  document.getElementById('generateBtn').addEventListener('click', generateContent);

  // Tab navigation
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => switchTab(button.dataset.tab));
  });

  // Timetable form
  document.getElementById('timetableForm').addEventListener('submit', handleTimetableSubmit);

  // Translation direction buttons
  document.querySelectorAll('.direction-btn').forEach(btn => {
    btn.addEventListener('click', () => setTranslationDirection(btn.dataset.direction));
  });

  // Translate button
  document.getElementById('translateBtn').addEventListener('click', translateText);
}

// Language Functions
function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'si' : 'en';
  updateLanguage();
}

function updateLanguage() {
  const lang = translations[currentLanguage];
  
  // Update header
  document.getElementById('tagline').textContent = lang.tagline;
  document.getElementById('langToggleText').textContent = lang.languageToggle;
  
  // Update upload section
  document.getElementById('uploadTitle').textContent = lang.uploadTitle;
  document.getElementById('uploadHint').textContent = lang.uploadHint;
  document.getElementById('supportedFiles').textContent = lang.supportedFiles;
  document.getElementById('fileSizeLimit').textContent = lang.fileSizeLimit;
  document.getElementById('generateBtnText').textContent = lang.generateButton;
  document.getElementById('fileLabelText').textContent = lang.chooseFile;
  
  // Update tab labels
  document.getElementById('summaryTabText').textContent = lang.summaryTab;
  document.getElementById('quizTabText').textContent = lang.quizTab;
  document.getElementById('timetableTabText').textContent = lang.timetableTab;
  document.getElementById('translatorTabText').textContent = lang.translatorTab;
  
  // Update content titles
  document.getElementById('summaryContentTitle').textContent = lang.summaryTitle;
  document.getElementById('quizContentTitle').textContent = lang.quizTitle;
  document.getElementById('timetableContentTitle').textContent = lang.timetableTitle;
  document.getElementById('translatorContentTitle').textContent = lang.translatorTitle;
  
  // Update form labels
  document.getElementById('subjectLabel').textContent = lang.subjectLabel;
  document.getElementById('dayLabel').textContent = lang.dayLabel;
  document.getElementById('timeLabel').textContent = lang.timeLabel;
  document.getElementById('descriptionLabel').textContent = lang.descriptionLabel;
  document.getElementById('addScheduleBtnText').textContent = lang.addSchedule;
  
  // Update translator labels
  document.getElementById('inputLabel').textContent = lang.inputLabel;
  document.getElementById('outputLabel').textContent = lang.outputLabel;
  document.getElementById('translateBtnText').textContent = lang.translate;
  
  // Update empty state
  const emptyState = document.querySelector('.empty-state');
  if (emptyState && emptyState.id === 'emptyTimetable') {
    emptyState.textContent = lang.emptyTimetable;
  }
  
  // Refresh timetable if exists
  if (timetableData.length > 0) {
    renderTimetable();
  }
  
  // Refresh quiz if it exists
  const quizContainer = document.getElementById('quizContainer');
  if (quizContainer.children.length > 0) {
    renderQuiz();
  }
}

// File Handling
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  // Validate file size (10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    alert(currentLanguage === 'en' ? 'File size exceeds 10MB limit!' : 'ගොනු ප්‍රමාණය 10MB සීමාව ඉක්මවයි!');
    event.target.value = '';
    return;
  }
  
  // Validate file type
  const validTypes = ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    alert(currentLanguage === 'en' ? 'Invalid file type! Please upload PDF or image files.' : 'වලංගු නොවන ගොනු වර්ගය! කරුණාකර PDF හෝ රූප ගොනු උඩුගත කරන්න.');
    event.target.value = '';
    return;
  }
  
  uploadedFile = file;
  
  // Display file info
  document.getElementById('fileName').textContent = file.name;
  document.getElementById('fileSize').textContent = formatFileSize(file.size);
  document.getElementById('fileInfo').style.display = 'block';
  
  // Enable generate button
  document.getElementById('generateBtn').disabled = false;
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Content Generation
function generateContent() {
  if (!uploadedFile) return;
  
  // Show loading overlay
  const loadingOverlay = document.getElementById('loadingOverlay');
  const loadingText = document.getElementById('loadingText');
  loadingText.textContent = translations[currentLanguage].generating;
  loadingOverlay.style.display = 'flex';
  
  // Simulate AI processing
  setTimeout(() => {
    // Generate summary
    generateSummary();
    
    // Generate quiz
    renderQuiz();
    
    // Hide upload section and show tabbed section
    document.getElementById('uploadSection').style.display = 'none';
    document.getElementById('tabbedSection').style.display = 'block';
    
    // Hide loading overlay
    loadingOverlay.style.display = 'none';
    
    // Switch to summary tab
    switchTab('summary');
  }, 2000);
}

function generateSummary() {
  const summaryContent = document.getElementById('summaryContent');
  
  if (currentLanguage === 'en') {
    summaryContent.innerHTML = `
      <p>This document provides a comprehensive overview of modern learning methodologies and educational technologies. The content explores various approaches to self-directed learning and the integration of artificial intelligence in educational contexts.</p>
      
      <h4>Key Topics:</h4>
      <ul>
        <li><strong>Machine Learning Fundamentals:</strong> Introduction to basic concepts, algorithms, and practical applications in data analysis and pattern recognition.</li>
        <li><strong>Neural Networks:</strong> Detailed exploration of artificial neural networks, their architecture, and how they simulate human learning processes.</li>
        <li><strong>Study Techniques:</strong> Evidence-based strategies for effective learning, including spaced repetition, active recall, and metacognitive practices.</li>
        <li><strong>Technology Integration:</strong> How modern tools and AI assistants can enhance the learning experience and improve knowledge retention.</li>
      </ul>
      
      <h4>Main Conclusions:</h4>
      <p>The document emphasizes the importance of combining traditional study methods with modern technological tools. It highlights that successful learning requires both consistent practice and the intelligent use of AI-powered resources to supplement understanding and accelerate knowledge acquisition.</p>
      
      <p><strong>File analyzed:</strong> ${uploadedFile.name}</p>
    `;
  } else {
    summaryContent.innerHTML = `
      <p>මෙම ලේඛනය නවීන ඉගෙනුම් ක්‍රමවේද සහ අධ්‍යාපනික තාක්ෂණයන් පිළිබඳ සවිස්තරාත්මක දළ විශ්ලේෂණයක් සපයයි. අන්තර්ගතය ස්වයං-මාර්ගගත ඉගෙනීමට විවිධ ප්‍රවේශයන් සහ අධ්‍යාපනික සන්දර්භයන්හි කෘතිම බුද්ධිය ඒකාබද්ධ කිරීම ගවේෂණය කරයි.</p>
      
      <h4>ප්‍රධාන මාතෘකා:</h4>
      <ul>
        <li><strong>යන්ත්‍ර ඉගෙනීමේ මූලධර්ම:</strong> දත්ත විශ්ලේෂණය සහ රටාව හඳුනා ගැනීමේ මූලික සංකල්ප, ඇල්ගොරිතම සහ ප්‍රායෝගික යෙදුම් හඳුන්වා දීම.</li>
        <li><strong>ස්නායු ජාල:</strong> කෘතිම ස්නායු ජාල, ඒවායේ ගෘහ නිර්මාණ ශිල්පය සහ ඒවා මානව ඉගෙනීමේ ක්‍රියාවලීන් අනුකරණය කරන ආකාරය පිළිබඳ සවිස්තරාත්මක ගවේෂණය.</li>
        <li><strong>අධ්‍යයන ශිල්පීය ක්‍රම:</strong> ඵලදායී ඉගෙනීම සඳහා සාක්ෂි පදනම් වූ උපාය මාර්ග, ඇතුළත් වන්නේ පරතරය පුනරාවර්තනය, ක්‍රියාකාරී නැවත කැඳවීම සහ මෙටාකොග්නිටිව් භාවිතයන්.</li>
        <li><strong>තාක්ෂණ ඒකාබද්ධතාව:</strong> නවීන මෙවලම් සහ AI සහායකයන් ඉගෙනුම් අත්දැකීම වැඩි දියුණු කර දැනුම රඳවා තබා ගැනීම වැඩිදියුණු කළ හැකි ආකාරය.</li>
      </ul>
      
      <h4>ප්‍රධාන නිගමන:</h4>
      <p>ලේඛනය නවීන තාක්ෂණික මෙවලම් සමඟ සම්ප්‍රදායික අධ්‍යයන ක්‍රම ඒකාබද්ධ කිරීමේ වැදගත්කම අවධාරණය කරයි. සාර්ථක ඉගෙනීම සඳහා අඛණ්ඩ පුහුණුව සහ අවබෝධය අතිරේක කිරීමට සහ දැනුම අත්පත් කර ගැනීම වේගවත් කිරීමට AI-බලගැන්වූ සම්පත් බුද්ධිමත් භාවිතය යන දෙකම අවශ්‍ය බව එය අවධාරණය කරයි.</p>
      
      <p><strong>විශ්ලේෂණය කළ ගොනුව:</strong> ${uploadedFile.name}</p>
    `;
  }
}

function renderQuiz() {
  const quizContainer = document.getElementById('quizContainer');
  quizContainer.innerHTML = '';
  quizAnswers = [];
  
  sampleQuizQuestions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';
    
    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.textContent = `${index + 1}. ${currentLanguage === 'en' ? q.question : q.question_si}`;
    questionDiv.appendChild(questionText);
    
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'quiz-options';
    
    const options = currentLanguage === 'en' ? q.options : q.options_si;
    options.forEach((option, optIndex) => {
      const optionBtn = document.createElement('button');
      optionBtn.className = 'option-btn';
      optionBtn.textContent = option;
      optionBtn.addEventListener('click', () => handleQuizAnswer(index, optIndex, q.correct, optionBtn, optionsDiv));
      optionsDiv.appendChild(optionBtn);
    });
    
    questionDiv.appendChild(optionsDiv);
    quizContainer.appendChild(questionDiv);
  });
}

function handleQuizAnswer(questionIndex, selectedOption, correctOption, buttonElement, optionsDiv) {
  // Disable all buttons in this question
  const buttons = optionsDiv.querySelectorAll('.option-btn');
  buttons.forEach(btn => btn.disabled = true);
  
  // Mark correct and incorrect answers
  if (selectedOption === correctOption) {
    buttonElement.classList.add('correct');
    quizAnswers[questionIndex] = true;
  } else {
    buttonElement.classList.add('incorrect');
    buttons[correctOption].classList.add('correct');
    quizAnswers[questionIndex] = false;
  }
  
  // Check if all questions are answered
  if (quizAnswers.filter(a => a !== undefined).length === sampleQuizQuestions.length) {
    showQuizResult();
  }
}

function showQuizResult() {
  const correctCount = quizAnswers.filter(a => a === true).length;
  const totalCount = sampleQuizQuestions.length;
  const percentage = Math.round((correctCount / totalCount) * 100);
  
  const resultDiv = document.getElementById('quizResult');
  
  if (currentLanguage === 'en') {
    resultDiv.innerHTML = `
      <h4>Quiz Complete!</h4>
      <p>You scored ${correctCount} out of ${totalCount} (${percentage}%)</p>
      <p>${percentage >= 70 ? 'Great job! You have a good understanding of the material.' : 'Keep studying! Review the summary to improve your understanding.'}</p>
    `;
  } else {
    resultDiv.innerHTML = `
      <h4>ප්‍රශ්නාවලිය සම්පූර්ණයි!</h4>
      <p>ඔබ ${totalCount} න් ${correctCount} ලබා ගත්තා (${percentage}%)</p>
      <p>${percentage >= 70 ? 'විශිෂ්ටයි! ඔබට ද්‍රව්‍ය පිළිබඳ හොඳ අවබෝධයක් ඇත.' : 'අධ්‍යයනය කරගෙන යන්න! ඔබේ අවබෝධය වැඩි දියුණු කිරීමට සාරාංශය සමාලෝචනය කරන්න.'}</p>
    `;
  }
  
  resultDiv.style.display = 'block';
}

// Tab Switching
function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.tab === tabName) {
      btn.classList.add('active');
    }
  });
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
    if (content.id === tabName + 'Tab') {
      content.classList.add('active');
    }
  });
}

// Timetable Functions
function handleTimetableSubmit(event) {
  event.preventDefault();
  
  const subject = document.getElementById('subject').value.trim();
  const day = document.getElementById('day').value;
  const time = document.getElementById('time').value;
  const description = document.getElementById('description').value.trim();
  
  if (!subject || !day || !time) {
    alert(currentLanguage === 'en' ? 'Please fill in all required fields!' : 'කරුණාකර සියලුම අවශ්‍ය ක්ෂේත්‍ර පුරවන්න!');
    return;
  }
  
  const newSchedule = {
    id: Date.now(),
    subject,
    day,
    time,
    description
  };
  
  timetableData.push(newSchedule);
  renderTimetable();
  
  // Reset form
  event.target.reset();
}

function renderTimetable() {
  const timetableList = document.getElementById('timetableList');
  
  if (timetableData.length === 0) {
    timetableList.innerHTML = `<p class="empty-state" id="emptyTimetable">${translations[currentLanguage].emptyTimetable}</p>`;
    return;
  }
  
  timetableList.innerHTML = '';
  
  // Sort by day and time
  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const sortedData = [...timetableData].sort((a, b) => {
    const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.time.localeCompare(b.time);
  });
  
  sortedData.forEach(schedule => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'timetable-item';
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'timetable-info';
    
    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'timetable-subject';
    subjectDiv.textContent = schedule.subject;
    infoDiv.appendChild(subjectDiv);
    
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'timetable-details';
    detailsDiv.innerHTML = `<span>📅 ${schedule.day}</span><span>🕐 ${formatTime(schedule.time)}</span>`;
    infoDiv.appendChild(detailsDiv);
    
    if (schedule.description) {
      const descDiv = document.createElement('div');
      descDiv.className = 'timetable-description';
      descDiv.textContent = schedule.description;
      infoDiv.appendChild(descDiv);
    }
    
    itemDiv.appendChild(infoDiv);
    
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'timetable-actions';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = translations[currentLanguage].delete;
    deleteBtn.addEventListener('click', () => deleteTimetableItem(schedule.id));
    actionsDiv.appendChild(deleteBtn);
    
    itemDiv.appendChild(actionsDiv);
    timetableList.appendChild(itemDiv);
  });
}

function formatTime(time) {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
  return `${displayHour}:${minutes} ${ampm}`;
}

function deleteTimetableItem(id) {
  timetableData = timetableData.filter(item => item.id !== id);
  renderTimetable();
}

// Translation Functions
function setTranslationDirection(direction) {
  currentTranslationDirection = direction;
  
  document.querySelectorAll('.direction-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.direction === direction) {
      btn.classList.add('active');
    }
  });
  
  // Clear translation
  document.getElementById('outputText').value = '';
}

function translateText() {
  const inputText = document.getElementById('inputText').value.trim().toLowerCase();
  const outputText = document.getElementById('outputText');
  
  if (!inputText) {
    alert(currentLanguage === 'en' ? 'Please enter text to translate!' : 'පරිවර්තනය කිරීමට පෙළ ඇතුළත් කරන්න!');
    return;
  }
  
  // Simple translation using sample data
  const translations = sampleTranslations[currentTranslationDirection];
  let result = '';
  
  // Try to find exact match first
  if (translations[inputText]) {
    result = translations[inputText];
  } else {
    // Try to find partial matches
    const words = inputText.split(' ');
    const translatedWords = words.map(word => translations[word] || word);
    result = translatedWords.join(' ');
    
    if (result === inputText) {
      result = currentLanguage === 'en' 
        ? '(Translation not available in demo mode)' 
        : '(ආදර්ශ ප්‍රකාරයේ පරිවර්තනය නොමැත)';
    }
  }
  
  outputText.value = result;
}

// Initialize the app
console.log('LearnSphere AI initialized successfully!');