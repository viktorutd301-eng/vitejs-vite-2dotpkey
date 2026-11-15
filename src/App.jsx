import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen, CheckCircle2, Flame, HelpCircle, Award, Search, User,
  ShieldCheck, Upload, Plus, Trash2, Clock, Sparkles, MessageCircle,
  ThumbsUp, Send, FileText, ChevronRight, LogOut, RefreshCw, Mail, Star
} from 'lucide-react';

// ==========================================
// 1. DỮ LIỆU CHÂM NGÔN & DANH MỤC CỐ ĐỊNH
// ==========================================
const QUOTES = [
  { text: 'Học, học nữa, học mãi.', author: 'V.I. Lênin' },
  { text: 'Non sông Việt Nam có trở nên tươi đẹp hay không chính là nhờ một phần lớn ở công học tập của các em.', author: 'Chủ tịch Hồ Chí Minh' },
  { text: 'Hiền tài là nguyên khí của quốc gia.', author: 'Thân Nhân Trung' },
  { text: 'Đường đi khó, không khó vì ngăn sông cách núi, mà khó vì lòng người ngại núi e sông.', author: 'Nguyễn Bá Học' }
];

const GRADES = [
  { id: 6, label: 'Lớp 6', title: 'Khối Lớp 6 - Kết nối tri thức', desc: '24 Chương bài tập • 60 Đề thi GK & HK chuẩn cấu trúc' },
  { id: 7, label: 'Lớp 7', title: 'Khối Lớp 7 - Kết nối tri thức', desc: '24 Chương bài tập • 60 Đề thi GK & HK chuẩn cấu trúc' },
  { id: 8, label: 'Lớp 8', title: 'Khối Lớp 8 - Kết nối tri thức', desc: '24 Chương bài tập • 60 Đề thi GK & HK chuẩn cấu trúc' },
  { id: 9, label: 'Lớp 9', title: 'Khối Lớp 9 & Ôn Thi Vào 10', desc: '24 Chương bài tập • 60 Đề HK • 48 Đề Tuyển Sinh 10 các Sở' },
];

const SUBJECTS = [
  { id: 'math', name: 'Toán học', status: 'active', desc: 'Đại số, Hình học, Thống kê & Toán thực tế' },
  { id: 'science', name: 'Khoa học tự nhiên (KHTN)', status: 'active', desc: 'Vật lý, Hóa học, Sinh học tích hợp' },
  { id: 'english', name: 'Tiếng Anh (Global Success)', status: 'active', desc: 'Ngữ âm, Từ vựng, Ngữ pháp & Viết lại câu' },
  { id: 'literature', name: 'Ngữ văn', status: 'coming_soon', desc: 'Đọc hiểu văn bản & Nghị luận xã hội, văn học' },
  { id: 'history_geo', name: 'Lịch sử & Địa lý', status: 'coming_soon', desc: 'Lịch sử Việt Nam, Thế giới & Địa lý tự nhiên' },
  { id: 'informatics', name: 'Tin học', status: 'coming_soon', desc: 'Thuật toán, Scratch & Lập trình cơ bản' },
  { id: 'civics', name: 'Giáo dục công dân', status: 'coming_soon', desc: 'Kỹ năng sống & Pháp luật đại cương THCS' },
];

// ==========================================
// 2. HỆ THỐNG 96 CHƯƠNG HỌC (LỚP 6, 7, 8, 9 - KẾT NỐI TRI THỨC)
// ==========================================
const CHAPTER_TITLES = {
  6: {
    math: [
      'Chương I: Tập hợp các số tự nhiên', 'Chương II: Tính chia hết trong tập hợp các số tự nhiên',
      'Chương III: Số nguyên', 'Chương IV: Một số hình phẳng trong thực tiễn',
      'Chương V: Tính đối xứng của hình phẳng', 'Chương VI: Phân số',
      'Chương VII: Số thập phân', 'Chương VIII: Những hình hình học cơ bản'
    ],
    science: [
      'Chương I: Mở đầu về Khoa học tự nhiên', 'Chương II: Chất quanh ta',
      'Chương III: Một số vật liệu, nguyên liệu, nhiên liệu', 'Chương IV: Hỗn hợp & Tách chất',
      'Chương V: Tế bào - Đơn vị cơ sở của sự sống', 'Chương VI: Từ tế bào đến cơ thể',
      'Chương VII: Đa dạng thế giới sống', 'Chương VIII: Lực trong đời sống & Năng lượng'
    ],
    english: [
      'Unit 1: My New School', 'Unit 2: My House', 'Unit 3: My Friends',
      'Unit 4: My Neighbourhood', 'Unit 5: Natural Wonders of Viet Nam',
      'Unit 6: Our Tet Holiday', 'Unit 7: Television', 'Unit 8: Sports and Games'
    ]
  },
  7: {
    math: [
      'Chương I: Số hữu tỉ', 'Chương II: Số thực & Căn bậc hai số học',
      'Chương III: Góc và đường thẳng song song', 'Chương IV: Tam giác bằng nhau',
      'Chương V: Thu thập và biểu diễn dữ liệu', 'Chương VI: Tỉ lệ thức và đại lượng tỉ lệ',
      'Chương VII: Biểu thức đại số và đa thức một biến', 'Chương VIII: Tam giác cân & Đường đồng quy'
    ],
    science: [
      'Chương I: Nguyên tử & Sơ lược bảng tuần hoàn', 'Chương II: Phân tử & Liên kết hóa học',
      'Chương III: Tốc độ chuyển động', 'Chương IV: Âm thanh & Ánh sáng',
      'Chương V: Từ trường Trái Đất & Nam châm', 'Chương VI: Trao đổi chất và chuyển hóa năng lượng',
      'Chương VII: Cảm ứng ở sinh vật', 'Chương VIII: Sinh trưởng và sinh sản ở sinh vật'
    ],
    english: [
      'Unit 1: Hobbies', 'Unit 2: Healthy Living', 'Unit 3: Community Service',
      'Unit 4: Music and Arts', 'Unit 5: Food and Drink',
      'Unit 6: A Visit to a School', 'Unit 7: Traffic', 'Unit 8: Films'
    ]
  },
  8: {
    math: [
      'Chương I: Đa thức nhiều biến', 'Chương II: Hằng đẳng thức đáng nhớ và ứng dụng',
      'Chương III: Tứ giác (Hình thang cân, Hình bình hành, Hình chữ nhật, Hình thoi)', 'Chương IV: Định lí Thalès trong tam giác',
      'Chương V: Dữ liệu và biểu đồ', 'Chương VI: Phân thức đại số',
      'Chương VII: Phương trình bậc nhất và hàm số bậc nhất', 'Chương VIII: Tam giác đồng dạng & Hình đồng dạng'
    ],
    science: [
      'Chương I: Phản ứng hóa học & Mol', 'Chương II: Acid - Base - pH - Oxide - Muối',
      'Chương III: Khối lượng riêng và Áp suất', 'Chương IV: Tác dụng làm quay của lực & Đòn bẩy',
      'Chương V: Điện học (Dòng điện, Cường độ dòng điện, Hiệu điện thế)', 'Chương VI: Nhiệt học & Năng lượng nhiệt',
      'Chương VII: Sinh học cơ thể người', 'Chương VIII: Sinh thái học và Môi trường'
    ],
    english: [
      'Unit 1: Leisure Time', 'Unit 2: Life in the Countryside', 'Unit 3: Teenagers',
      'Unit 4: Ethnic Groups of Viet Nam', 'Unit 5: Our Customs and Traditions',
      'Unit 6: Lifestyles', 'Unit 7: Environmental Protection', 'Unit 8: Shopping'
    ]
  },
  9: {
    math: [
      'Chương I: Phương trình và hệ hai phương trình bậc nhất hai ẩn',
      'Chương II: Phương trình và bất phương trình bậc nhất một ẩn',
      'Chương III: Căn bậc hai và căn bậc ba',
      'Chương IV: Hệ thức lượng trong tam giác vuông',
      'Chương V: Đường tròn (Tiếp tuyến, Góc ở tâm, Góc nội tiếp)',
      'Chương VI: Hàm số y = ax² (a ≠ 0) và Phương trình bậc hai một ẩn (Định lí Vi-ét)',
      'Chương VII: Tần số và tần số tương đối - Xác suất thống kê',
      'Chương VIII: Đường tròn ngoại tiếp, Đường tròn nội tiếp & Hình học không gian (Trụ, Nón, Cầu)'
    ],
    science: [
      'Chương I: Năng lượng cơ học (Động năng, Thế năng, Công và Công suất)',
      'Chương II: Ánh sáng (Khúc xạ ánh sáng, Thấu kính hội tụ & phân kì)',
      'Chương III: Điện từ học (Định luật Ohm, Đoạn mạch nối tiếp, song song, Cảm ứng điện từ)',
      'Chương IV: Kim loại & Sự khác nhau giữa phi kim và kim loại',
      'Chương V: Hợp chất hữu cơ (Hydrocarbon, Ethylic alcohol, Acetic acid)',
      'Chương VI: Di truyền học Mendel & Nucleic Acid (DNA, RNA, Nhiễm sắc thể)',
      'Chương VII: Tiến hóa & Chọn lọc tự nhiên',
      'Chương VIII: Khai thác tài nguyên và Hóa học vỏ Trái Đất'
    ],
    english: [
      'Unit 1: Local Community', 'Unit 2: City Life', 'Unit 3: Healthy Living for Teens',
      'Unit 4: Remembering the Past', 'Unit 5: Our Experiences',
      'Unit 6: Vietnamese Lifestyle: Then and Now', 'Unit 7: Natural Wonders of the World', 'Unit 8: Tourism & World Englishes'
    ]
  }
};

// Hàm sinh kho câu hỏi Trắc nghiệm + Tự luận theo từng Chương (96 Chương)
function generateChapterExercises(grade, subject, chapterIndex, chapterTitle) {
  const diffLevels = ['Nhận biết', 'Thông hiểu', 'Vận dụng', 'Vận dụng cao'];
  if (subject === 'math') {
    return {
      mcqs: [
        {
          id: `mcq-${grade}-math-${chapterIndex}-1`,
          difficulty: diffLevels[0],
          question: `[${chapterTitle}] Cho phương trình 2x - y = 5. Cặp số (x; y) nào sau đây là nghiệm của phương trình?`,
          options: ['(3; 1)', '(2; 1)', '(1; 3)', '(0; 5)'],
          correctIndex: 0,
          explanation: 'Thay x = 3, y = 1 vào vế trái: 2(3) - 1 = 5 (đúng bằng vế phải). Vậy (3; 1) là nghiệm.'
        },
        {
          id: `mcq-${grade}-math-${chapterIndex}-2`,
          difficulty: diffLevels[1],
          question: `[${chapterTitle}] Điều kiện xác định của biểu thức P = √(2x - 6) + 1/(x - 5) là:`,
          options: ['x ≥ 3 và x ≠ 5', 'x > 3', 'x ≥ 3', 'x ≠ 5'],
          correctIndex: 0,
          explanation: 'Biểu thức dưới dấu căn không âm (2x - 6 ≥ 0 ⇔ x ≥ 3) và mẫu thức khác 0 (x - 5 ≠ 0 ⇔ x ≠ 5).'
        },
        {
          id: `mcq-${grade}-math-${chapterIndex}-3`,
          difficulty: diffLevels[2],
          question: `[${chapterTitle}] Biết phương trình x² - 5x + m = 0 có một nghiệm x₁ = 2. Nghiệm còn lại x₂ và giá trị của m là:`,
          options: ['x₂ = 3; m = 6', 'x₂ = -3; m = -6', 'x₂ = 3; m = 5', 'x₂ = 2; m = 4'],
          correctIndex: 0,
          explanation: 'Theo hệ thức Vi-ét: x₁ + x₂ = 5 ⇒ 2 + x₂ = 5 ⇒ x₂ = 3. Khi đó m = x₁.x₂ = 2.3 = 6.'
        },
        {
          id: `mcq-${grade}-math-${chapterIndex}-4`,
          difficulty: diffLevels[3],
          question: `[${chapterTitle}] Cho hai số thực dương a, b thỏa mãn a + b = 4. Giá trị nhỏ nhất của biểu thức S = a² + b² + 18/(ab) bằng:`,
          options: ['12,5', '10', '14', '16'],
          correctIndex: 0,
          explanation: 'Áp dụng BĐT AM-GM: ab ≤ (a+b)²/4 = 4 và a² + b² ≥ (a+b)²/2 = 8. S đạt GTNN bằng 8 + 18/4 = 12,5 khi a = b = 2.'
        }
      ],
      essays: [
        {
          id: `essay-${grade}-math-${chapterIndex}-1`,
          difficulty: 'Vận dụng',
          points: 2.5,
          problem: `Bài 1 (${chapterTitle}): Cho biểu thức A = (√x / (√x - 2) + 4 / (x - 2√x)) : ((√x + 2) / √x) với x > 0, x ≠ 4.\na) Rút gọn biểu thức A.\nb) Tìm tất cả các giá trị nguyên của x để A nhận giá trị nguyên.`,
          rubric: [
            'a) (1,5 điểm): Quy đồng mẫu thức trong ngoặc: x - 2√x = √x(√x - 2). Rút gọn tử thức (x + 4) hoặc biến đổi chuẩn xác ra A = (√x + 2) / (√x - 2) : ((√x + 2)/√x) = √x / (√x - 2).',
            'b) (1,0 điểm): Ta có A = 1 + 2/(√x - 2). Để A ∈ Z thì (√x - 2) ∈ Ư(2) = {-2; -1; 1; 2}. Đối chiếu x > 0, x ≠ 4 tìm được x ∈ {1; 9; 16}.'
          ]
        },
        {
          id: `essay-${grade}-math-${chapterIndex}-2`,
          difficulty: 'Vận dụng cao',
          points: 3.0,
          problem: `Bài 2 (${chapterTitle}): Cho đường tròn (O; R) và điểm M nằm ngoài đường tròn sao cho OM = 2R. Kẻ hai tiếp tuyến MA, MB với (O) (A, B là hai tiếp điểm).\na) Chứng minh tứ giác MAOB nội tiếp đường tròn.\nb) Tính diện tích tứ giác MAOB theo R.`,
          rubric: [
            'a) (1,5 điểm): Do MA, MB là tiếp tuyến nên ∠MAO = 90°, ∠MBO = 90° ⇒ ∠MAO + ∠MBO = 180°. Vậy tứ giác MAOB nội tiếp đường tròn đường kính MO.',
            'b) (1,5 điểm): Áp dụng định lí Pythagore trong ∆MAO vuông tại A: MA = √(OM² - OA²) = R√3. Diện tích S_MAOB = 2.S_MAO = OA.MA = R²√3 (đvdt).'
          ]
        }
      ]
    };
  }

  if (subject === 'science') {
    return {
      mcqs: [
        {
          id: `mcq-${grade}-sci-${chapterIndex}-1`,
          difficulty: diffLevels[0],
          question: `[${chapterTitle}] Đặt hiệu điện thế U = 12V vào hai đầu điện trở R = 6Ω thì cường độ dòng điện chạy qua điện trở là:`,
          options: ['2 A', '0,5 A', '72 A', '6 A'],
          correctIndex: 0,
          explanation: 'Theo định luật Ohm: I = U / R = 12 / 6 = 2 (A).'
        },
        {
          id: `mcq-${grade}-sci-${chapterIndex}-2`,
          difficulty: diffLevels[1],
          question: `[${chapterTitle}] Kim loại nào sau đây tác dụng mạnh với dung dịch HCl giải phóng khí Hydrogen nhưng KHÔNG tác dụng với dung dịch CuSO₄ tạo đồng kim loại?`,
          options: ['Natri (Na)', 'Sắt (Fe)', 'Kẽm (Zn)', 'Nhôm (Al)'],
          correctIndex: 0,
          explanation: 'Na tác dụng ngay với nước trong dung dịch tạo NaOH và H₂, sau đó NaOH tạo kết tủa Cu(OH)₂ chứ không đẩy Cu kim loại.'
        },
        {
          id: `mcq-${grade}-sci-${chapterIndex}-3`,
          difficulty: diffLevels[2],
          question: `[${chapterTitle}] Hòa tan hoàn toàn 5,6 gam sắt (Fe) vào dung dịch HCl dư. Thể tích khí H₂ thu được ở đkc (25°C, 1 bar) là:`,
          options: ['2,479 lít', '2,24 lít', '4,958 lít', '1,2395 lít'],
          correctIndex: 0,
          explanation: 'n_Fe = 5,6 / 56 = 0,1 mol. PT: Fe + 2HCl → FeCl₂ + H₂↑ ⇒ n_H2 = 0,1 mol ⇒ V = 0,1 × 24,79 = 2,479 lít.'
        },
        {
          id: `mcq-${grade}-sci-${chapterIndex}-4`,
          difficulty: diffLevels[3],
          question: `[${chapterTitle}] Ở đậu Hà Lan, allele A quy định hạt vàng trội hoàn toàn so với allele a quy định hạt xanh. Phép lai Aa × Aa cho tỉ lệ kiểu hình ở F₁ là:`,
          options: ['3 hạt vàng : 1 hạt xanh', '1 hạt vàng : 1 hạt xanh', '100% hạt vàng', '1 : 2 : 1'],
          correctIndex: 0,
          explanation: 'Aa × Aa → 1AA : 2Aa : 1aa (3 trội hạt vàng : 1 lặn hạt xanh).'
        }
      ],
      essays: [
        {
          id: `essay-${grade}-sci-${chapterIndex}-1`,
          difficulty: 'Vận dụng',
          points: 2.5,
          problem: `Bài 1 (${chapterTitle}): Cho 11,2 gam hỗn hợp X gồm Cu và Fe tác dụng vừa đủ với dung dịch H₂SO₄ loãng dư, sau phản ứng thu được 2,479 lít khí H₂ (ở đkc) và chất rắn không tan.\na) Viết phương trình hóa học xảy ra.\nb) Tính phần trăm khối lượng của mỗi kim loại trong hỗn hợp X.`,
          rubric: [
            'a) (1,0 điểm): Chỉ có Fe phản ứng với H₂SO₄ loãng: Fe + H₂SO₄ → FeSO₄ + H₂↑. Cu đứng sau H nên không phản ứng.',
            'b) (1,5 điểm): n_H2 = 2,479 / 24,79 = 0,1 mol ⇒ n_Fe = 0,1 mol ⇒ m_Fe = 5,6g (50%) và m_Cu = 11,2 - 5,6 = 5,6g (50%).'
          ]
        }
      ]
    };
  }

  return {
    mcqs: [
      {
        id: `mcq-${grade}-eng-${chapterIndex}-1`,
        difficulty: diffLevels[0],
        question: `[${chapterTitle}] Choose the correct answer: If we ______ more trees in our neighbourhood, the air will be much cleaner.`,
        options: ['plant', 'planted', 'will plant', 'would plant'],
        correctIndex: 0,
        explanation: 'Câu điều kiện loại 1 (First Conditional): If + S + V(hiện tại đơn), S + will + V-inf.'
      },
      {
        id: `mcq-${grade}-eng-${chapterIndex}-2`,
        difficulty: diffLevels[1],
        question: `[${chapterTitle}] Choose the best option: The artisan ______ made this conical hat comes from Chuong Village.`,
        options: ['who', 'which', 'whose', 'where'],
        correctIndex: 0,
        explanation: 'Đại từ quan hệ "who" làm chủ ngữ thay thế cho danh từ chỉ người "The artisan".'
      },
      {
        id: `mcq-${grade}-eng-${chapterIndex}-3`,
        difficulty: diffLevels[2],
        question: `[${chapterTitle}] Choose the correct answer: Minh wishes he ______ speak English as fluently as a native speaker.`,
        options: ['could', 'can', 'will', 'may'],
        correctIndex: 0,
        explanation: 'Cấu trúc câu ước ở hiện tại: S + wish(es) + S + V2/ed / could + V-inf.'
      },
      {
        id: `mcq-${grade}-eng-${chapterIndex}-4`,
        difficulty: diffLevels[3],
        question: `[${chapterTitle}] Mark the closest meaning: Carrying out traditional craft villages helps preserve our cultural heritage.`,
        options: ['maintaining', 'cancelling', 'ignoring', 'forgetting'],
        correctIndex: 0,
        explanation: 'Preserve / carry on традиционный nghề truyền thống tương đương với maintain (duy trì, bảo tồn).'
      }
    ],
    essays: [
      {
        id: `essay-${grade}-eng-${chapterIndex}-1`,
        difficulty: 'Vận dụng',
        points: 2.0,
        problem: `Bài 1 (${chapterTitle} - Sentence Transformation): Viết lại các câu sau sao cho nghĩa không đổi:\n1. "Where are you going to spend your summer holiday?" Lan asked me.\n2. Although the traffic was heavy, we arrived at the exam room on time.`,
        rubric: [
          '1. (1,0 điểm): Lan asked me where I was going to spend my summer holiday. (Lùi thì trong câu tường thuật Wh-question).',
          '2. (1,0 điểm): In spite of / Despite the heavy traffic, we arrived at the exam room on time.'
        ]
      }
    ]
  };
}

// ==========================================
// 3. NGÂN HÀNG 240 ĐỀ THI ĐỊNH KỲ (60 ĐỀ / ĐỢT × 4 ĐỢT: GK1, HK1, GK2, HK2)
// ==========================================
const EXAM_TERMS = [
  { id: 'gk1', name: 'Giữa Học Kì 1', badge: '60 Đề chuẩn' },
  { id: 'hk1', name: 'Cuối Học Kì 1', badge: '60 Đề chuẩn' },
  { id: 'gk2', name: 'Giữa Học Kì 2', badge: '60 Đề chuẩn' },
  { id: 'hk2', name: 'Cuối Học Kì 2', badge: '60 Đề chuẩn' },
];

const SCHOOLS_SAMPLE = [
  'THCS Trấn Biên (Đồng Nai)', 'THCS Nguyễn Bỉnh Khiêm (Đồng Nai)', 'THCS Cầu Giấy (Hà Nội)',
  'THCS Nguyễn Du (TP.HCM)', 'THCS Trưng Vương (Đà Nẵng)'
];

const PERIODIC_EXAMS_240 = [];
EXAM_TERMS.forEach((term) => {
  [6, 7, 8, 9].forEach((grade) => {
    ['math', 'science', 'english'].forEach((subject) => {
      for (let code = 1; code <= 5; code++) {
        const school = SCHOOLS_SAMPLE[(code - 1) % SCHOOLS_SAMPLE.length];
        const subjName = subject === 'math' ? 'Toán học' : subject === 'science' ? 'KHTN' : 'Tiếng Anh';
        PERIODIC_EXAMS_240.push({
          id: `exam-${term.id}-g${grade}-${subject}-${code}`,
          termId: term.id,
          termName: term.name,
          grade,
          subject,
          codeNumber: `Mã đề ${grade}0${code}`,
          title: `Đề thi ${term.name} ${subjName} Lớp ${grade} - Đề số 0${code} (${school})`,
          durationMinutes: 90,
          isGrade10Entrance: false,
          mcqs: Array.from({ length: 12 }, (_, idx) => ({
            id: `q-${ idx + 1 }`,
            question: `Câu ${idx + 1} (${idx < 4 ? 'Nhận biết' : idx < 8 ? 'Thông hiểu' : idx < 10 ? 'Vận dụng' : 'Vận dụng cao'}): Trong đề thi ${term.name} môn ${subjName} Lớp ${grade} (Mã đề ${grade}0${code}), khẳng định nào dưới đây là đúng đối với nội dung kiến thức trọng tâm câu số ${idx + 1}?`,
            options: [
              idx % 2 === 0
                ? 'Phương án A: Biểu thức thỏa mãn điều kiện xác định và nhận giá trị chuẩn theo định lí'
                : 'Phương án A: Giá trị biến thiên tỉ lệ nghịch với đại lượng chuẩn',
              idx % 2 === 1
                ? 'Phương án B: Kết quả tính toán bằng 2,5 đơn vị chuẩn theo công thức sách Kết nối tri thức'
                : 'Phương án B: Không tồn tại nghiệm thực thỏa mãn hệ thức',
              'Phương án C: Chỉ đúng khi tham số m nhận giá trị nguyên âm',
              'Phương án D: Tập nghiệm của phương trình là tập rỗng'
            ],
            correctIndex: idx % 2,
            explanation: `Giải thích chi tiết Câu ${idx + 1}: Áp dụng kiến thức chuẩn chương trình Kết nối tri thức Lớp ${grade}, biến đổi tương đương ta xác định được đáp án đúng là ${idx % 2 === 0 ? 'A' : 'B'}.`
          })),
          essays: [
            {
              id: 'tl-1',
              title: 'Bài 1 (2,0 điểm) - Biểu thức & Tính toán cơ bản',
              problem: `a) (1,0 điểm) Thực hiện phép tính và rút gọn biểu thức đại số P = (√x + 1)/(√x - 1) - (√x - 1)/(√x + 1) với x ≥ 0, x ≠ 1.\nb) (1,0 điểm) Tìm giá trị của x để P = 2.`,
              points: 2.0,
              solution: 'a) Quy đồng mẫu chung (√x - 1)(√x + 1) = x - 1, thu gọn tử số được 4√x. Vậy P = 4√x / (x - 1).\nb) Giải phương trình 4√x / (x - 1) = 2 ⇔ x - 2√x - 1 = 0 ⇒ √x = 1 + √2 ⇒ x = 3 + 2√2 (thỏa mãn ĐKXĐ).'
            },
            {
              id: 'tl-2',
              title: 'Bài 2 (2,0 điểm) - Giải bài toán bằng cách lập phương trình / Hệ phương trình',
              problem: `Một tổ sản xuất theo kế hoạch phải làm 360 sản phẩm trong một thời gian nhất định. Khi thực hiện, mỗi ngày tổ làm vượt mức 6 sản phẩm nên đã hoàn thành sớm hơn kế hoạch 2 ngày. Hỏi theo kế hoạch mỗi ngày tổ phải làm bao nhiêu sản phẩm?`,
              points: 2.0,
              solution: 'Gọi số sản phẩm mỗi ngày theo kế hoạch là x (x ∈ N*). Thời gian dự định: 360/x (ngày), thực tế: 360/(x+6) (ngày). Ta có PT: 360/x - 360/(x+6) = 2 ⇒ x² + 6x - 1080 = 0 ⇒ x = 30 (TM). Vậy theo kế hoạch mỗi ngày làm 30 sản phẩm.'
            },
            {
              id: 'tl-3',
              title: 'Bài 3 (2,5 điểm) - Hình học phẳng chứng minh 3 ý a, b, c',
              problem: `Cho tam giác ABC nhọn (AB < AC) nội tiếp đường tròn (O; R). Hai đường cao BD và CE cắt nhau tại trực tâm H.\na) Chứng minh bốn điểm B, E, D, C cùng thuộc một đường tròn.\nb) Chứng minh AE.AB = AD.AC.\nc) Gọi M là trung điểm của BC. Chứng minh AH = 2OM.`,
              points: 2.5,
              solution: 'a) ∠BEC = ∠BDC = 90° nên E, D cùng nhìn BC dưới góc vuông ⇒ B, E, D, C cùng thuộc đường tròn đường kính BC.\nb) Xét ∆ABD và ∆ACE đồng dạng (g.g) ⇒ AD/AE = AB/AC ⇒ AE.AB = AD.AC.\nc) Kẻ đường kính AK của (O), chứng minh BHCK là hình bình hành nên M là trung điểm HK, suy ra OM là đường trung bình của ∆AHK ⇒ AH = 2OM.'
            },
            {
              id: 'tl-4',
              title: 'Bài 4 (0,5 điểm) - Câu hỏi Vận dụng cao (Điểm 10)',
              problem: `Cho các số thực dương x, y, z thỏa mãn x + y + z = 3. Tìm giá trị nhỏ nhất của biểu thức Q = x²/(x + 2y²) + y²/(y + 2z²) + z²/(z + 2x²).`,
              points: 0.5,
              solution: 'Sử dụng kỹ thuật Cô-si ngược dấu: x²/(x + 2y²) = x - 2xy²/(x + 2y²). Áp dụng AM-GM cho mẫu số x + y² + y² ≥ 3∛(xy⁴), suy ra Q ≥ 1. Dấu "=" xảy ra khi x = y = z = 1.'
            }
          ]
        });
      }
    });
  });
});

// ==========================================
// 4. NGÂN HÀNG 48 ĐỀ THI TUYỂN SINH LỚP 10 (100% TỰ LUẬN - 12 SỞ GD&ĐT × 4 NĂM HỌC)
// ==========================================
const PROVINCES_12 = [
  'Sở GD&ĐT Đồng Nai', 'Sở GD&ĐT Hà Nội', 'Sở GD&ĐT TP. Hồ Chí Minh', 'Sở GD&ĐT Đà Nẵng',
  'Sở GD&ĐT Hải Phòng', 'Sở GD&ĐT Nghệ An', 'Sở GD&ĐT Thanh Hóa', 'Sở GD&ĐT Cần Thơ',
  'Sở GD&ĐT Bình Dương', 'Sở GD&ĐT Bắc Ninh', 'Sở GD&ĐT Nam Định', 'Sở GD&ĐT Thừa Thiên Huế'
];

const EXAM_YEARS = ['2025 - 2026 (Đề cấu trúc mới)', '2024 - 2025', '2023 - 2024', '2022 - 2023'];

const GRADE10_EXAMS_48 = [];
PROVINCES_12.forEach((province, pIdx) => {
  EXAM_YEARS.forEach((year, yIdx) => {
    GRADE10_EXAMS_48.push({
      id: `g10-${pIdx}-${yIdx}`,
      province,
      year,
      grade: 9,
      subject: 'math',
      isGrade10Entrance: true, // 100% Tự luận, không có trắc nghiệm
      durationMinutes: 120,
      title: `Đề thi chính thức Tuyển sinh vào Lớp 10 THPT - ${province} (Năm học ${year})`,
      mcqs: [], // Tuyệt đối không có trắc nghiệm theo đúng thực tế đề thi cấp 3
      essays: [
        {
          id: 'g10-b1',
          title: 'Bài I (2,0 điểm) - Rút gọn biểu thức chứa căn bậc hai và các bài toán phụ',
          problem: `Cho hai biểu thức A = (√x + 4) / (√x - 1) và B = 3 / (√x + 1) - (x + 5) / (x - 1) với x ≥ 0, x ≠ 1.\n1) (0,5 điểm) Tính giá trị của biểu thức A khi x = 9.\n2) (1,0 điểm) Chứng minh B = 2 / (1 - √x).\n3) (0,5 điểm) Đặt P = A.B. Tìm tất cả các giá trị của x để P ≤ -1.`,
          points: 2.0,
          solution: `1) Thay x = 9 (TMĐK) vào A: A = (√9 + 4)/(√9 - 1) = 7/2.\n2) B = [3(√x - 1) - (x + 5)] / [(√x - 1)(√x + 1)] = (-x + 3√x - 8)... thu gọn chuẩn xác về 2/(1 - √x).\n3) P = A.B = -2(√x + 4)/(√x - 1)². Giải bất phương trình kết hợp ĐKXĐ x ≥ 0, x ≠ 1.`
        },
        {
          id: 'g10-b2',
          title: 'Bài II (2,0 điểm) - Giải bài toán bằng cách lập phương trình/hệ phương trình & Toán thực tế',
          problem: `1) (1,5 điểm) Một ca nô xuôi dòng từ bến A đến bến B dài 48 km rồi lập tức ngược dòng từ bến B về bến A. Biết vận tốc dòng nước là 4 km/h và tổng thời gian cả đi lẫn về là 5 giờ. Tính vận tốc riêng của ca nô khi nước yên lặng.\n2) (0,5 điểm) Một hộp sữa hình trụ có bán kính đáy R = 4 cm và chiều cao h = 12 cm. Tính thể tích lượng sữa bên trong hộp (lấy π ≈ 3,14).`,
          points: 2.0,
          solution: `1) Gọi vận tốc thực của ca nô là x (km/h, x > 4). Vận tốc xuôi dòng: x + 4, ngược dòng: x - 4. Phương trình: 48/(x + 4) + 48/(x - 4) = 5 ⇔ 5x² - 96x - 80 = 0 ⇒ x = 20 (nhận). Vậy vận tốc riêng của ca nô là 20 km/h.\n2) Thể tích hình trụ: V = π.R².h ≈ 3,14 × 4² × 12 = 602,88 (cm³).`
        },
        {
          id: 'g10-b3',
          title: 'Bài III (2,0 điểm) - Hệ phương trình & Hàm số Parabol y = x² - Định lí Vi-ét',
          problem: `1) (1,0 điểm) Giải hệ phương trình: { 2/(x - 1) + √(y + 2) = 4 ; 1/(x - 1) - 2√(y + 2) = -3 }.\n2) (1,0 điểm) Trong mặt phẳng tọa độ Oxy, cho parabol (P): y = x² và đường thẳng (d): y = 2mx - m² + m + 1. Tìm m để (d) cắt (P) tại hai điểm phân biệt có hoành độ x₁, x₂ thỏa mãn x₁² + x₂² = 10.`,
          points: 2.0,
          solution: `1) Điều kiện: x ≠ 1, y ≥ -2. Đặt u = 1/(x - 1), v = √(y + 2) ≥ 0. Giải hệ tìm được u = 1, v = 2 ⇒ x = 2, y = 2 (TMĐK).\n2) Phương trình hoành độ giao điểm: x² - 2mx + m² - m - 1 = 0. ∆' = m + 1 > 0 ⇔ m > -1. Theo Vi-ét: x₁ + x₂ = 2m, x₁x₂ = m² - m - 1. Thay vào (x₁ + x₂)² - 2x₁x₂ = 10 ⇒ 2m² + 2m - 12 = 0 ⇒ m = 2 (nhận) hoặc m = -3 (loại).`
        },
        {
          id: 'g10-b4',
          title: 'Bài IV (3,5 điểm) - Hình học Đường tròn (3 ý a, b, c phân hóa)',
          problem: `Cho tam giác ABC nhọn (AB < AC) nội tiếp đường tròn (O). Các đường cao AD, BE, CF cắt nhau tại H.\na) (1,25 điểm) Chứng minh tứ giác BFEC và tứ giác CDHE nội tiếp đường tròn.\nb) (1,25 điểm) Đường thẳng EF cắt đường thẳng BC tại K. Chứng minh KB.KC = KE.KF.\nc) (1,0 điểm) Tia AD cắt đường tròn (O) tại điểm thứ hai là M (M ≠ A). Chứng minh điểm H và điểm M đối xứng với nhau qua đường thẳng BC.`,
          points: 3.5,
          solution: `a) ∠BFC = ∠BEC = 90° ⇒ tứ giác BFEC nội tiếp đường tròn đường kính BC. ∠HDC + ∠HEC = 90° + 90° = 180° ⇒ tứ giác CDHE nội tiếp đường tròn đường kính HC.\nb) Xét ∆KBF và ∆KEC đồng dạng (g.g) vì có ∠K chung và ∠KFB = ∠KCE (cùng bù với ∠BFE) ⇒ KB/KE = KF/KC ⇒ KB.KC = KE.KF.\nc) Chứng minh ∠CBD = ∠CBM (cùng bằng ∠CAM do cùng chắn cung CM và góc có cạnh tương ứng vuông góc), suy ra BC vừa là đường cao vừa là phân giác trong ∆HBM ⇒ ∆HBM cân tại B ⇒ D là trung điểm HM.`
        },
        {
          id: 'g10-b5',
          title: 'Bài V (0,5 điểm) - Bất đẳng thức / Giá trị lớn nhất - nhỏ nhất (Câu phân loại điểm 10)',
          problem: `Cho hai số thực dương a, b thỏa mãn a + b ≤ 2. Tìm giá trị nhỏ nhất của biểu thức P = 1/(a² + b²) + 2/(ab) + 4ab.`,
          points: 0.5,
          solution: `Tách P = [1/(a² + b²) + 1/(2ab)] + [4ab + 1/(ab)] + 1/(2ab). Áp dụng BĐT 1/x + 1/y ≥ 4/(x+y) và AM-GM với ab ≤ (a+b)²/4 ≤ 1, ta tìm được GTNN của P bằng 13/2 khi a = b = 1.`
        }
      ]
    });
  });
});

// ==========================================
// 5. DỮ LIỆU CỘNG ĐỒNG HỎI ĐÁP 24/7 (EZASK)
// ==========================================
const INITIAL_QA_POSTS = [
  {
    id: 'qa-1',
    authorNickname: '@minhthao_dongnai_k9',
    grade: 9,
    subject: 'math',
    bountyXp: 50,
    createdAt: '10 phút trước',
    questionText: 'Mọi người ơi giúp mình câu c bài Hình học đề thi thử Sở Đồng Nai với ạ: Chứng minh đường thẳng nối tâm đường tròn nội tiếp và ngoại tiếp đi qua điểm cố định khi A di chuyển trên cung lớn BC?',
    imageAttachment: null,
    answers: [
      {
        id: 'ans-1',
        responderNickname: '@giaosu_toan9',
        content: 'Bạn gọi I là tâm đường tròn nội tiếp ∆ABC, tia AI cắt (O) tại điểm chính giữa cung BC không chứa A là điểm L cố định. Sau đó áp dụng hệ thức Euler hoặc tính chất LI = LB = LC (định lí chân gà) là suy ra ngay điểm cố định L nhé!',
        upvotes: 14,
        isBestAnswer: true,
        time: '4 phút trước'
      }
    ]
  },
  {
    id: 'qa-2',
    authorNickname: '@linh_english_2k12',
    grade: 9,
    subject: 'english',
    bountyXp: 30,
    createdAt: '25 phút trước',
    questionText: 'Cho mình hỏi trong chương trình Tiếng Anh 9 Global Success, phân biệt "used to + V" và "be/get used to + V-ing" trong bài viết lại câu như thế nào để không bị nhầm ạ?',
    imageAttachment: null,
    answers: [
      {
        id: 'ans-2',
        responderNickname: '@ielts_fighter_thcs',
        content: 'Mẹo nhớ cực nhanh: "used to + V nguyên mẫu" là ĐÃ TỪNG làm gì trong quá khứ (bây giờ không còn nữa). Còn "be/get used to + V-ing / Noun" là QUEN VỚI việc gì ở hiện tại (bằng với be accustomed to + V-ing).',
        upvotes: 9,
        isBestAnswer: false,
        time: '12 phút trước'
      }
    ]
  }
];

// ==========================================
// 6. COMPONENT AVATAR HỌC SINH VIỆT NAM (KHÔNG BỊ CHE MẶT)
// ==========================================
function StudentAvatarBadge({ config, customPhoto, streakDays, size = 'md', onClick }) {
  const boxSize = size === 'lg' ? 'w-28 h-28' : 'w-11 h-11';
  return (
    <div
      onClick={onClick}
      className="inline-flex flex-col items-center cursor-pointer group select-none"
      title="Nhấn để mở Xưởng Nhân Vật & Chuỗi Học Tập"
    >
      {/* Khung hình Avatar độc lập - Không đặt chữ đè lên mặt */}
      <div
        className={`${boxSize} rounded-2xl overflow-hidden border-2 border-blue-500 shadow-xs transition-transform duration-150 group-hover:scale-105 active:scale-95 flex items-center justify-center ${
          config.bgTheme === 'class'
            ? 'bg-sky-100'
            : config.bgTheme === 'khuevancac'
            ? 'bg-amber-100'
            : 'bg-rose-100'
        }`}
      >
        {customPhoto ? (
          <img src={customPhoto} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Bảng xanh lớp học Việt Nam phía sau */}
            <rect x="12" y="10" width="76" height="32" rx="4" fill="#0f766e" opacity="0.22" />
            {/* Áo đồng phục học sinh */}
            {config.outfit === 'uniform_scarf' && (
              <>
                <path d="M20 98 L30 66 L70 66 L80 98 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                {/* Khăn quàng đỏ Đội viên THCS */}
                <path d="M35 66 L50 84 L65 66 Z" fill="#ef4444" />
                <path d="M46 78 L42 96 L50 92 L58 96 L54 78 Z" fill="#dc2626" />
              </>
            )}
            {config.outfit === 'aodai' && (
              <>
                <path d="M20 98 L30 66 L70 66 L80 98 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
                <path d="M42 66 L50 76 L58 66" fill="none" stroke="#3b82f6" strokeWidth="2" />
              </>
            )}
            {config.outfit === 'jacket' && (
              <>
                <path d="M18 98 L28 65 L72 65 L82 98 Z" fill="#1d4ed8" />
                <path d="M42 65 L50 98 L58 65 Z" fill="#ffffff" />
              </>
            )}
            {/* Khuôn mặt */}
            <circle cx="50" cy="44" r="20" fill="#fde68a" />
            {/* Kiểu tóc */}
            {config.hair === 'boy_neat' ? (
              <path d="M30 42 C30 22, 70 22, 70 42 C65 30, 35 30, 30 42 Z" fill="#1e293b" />
            ) : (
              <>
                <path d="M28 45 C28 20, 72 20, 72 45 C66 30, 34 30, 28 45 Z" fill="#0f172a" />
                <circle cx="27" cy="48" r="6" fill="#0f172a" />
                <circle cx="73" cy="48" r="6" fill="#0f172a" />
              </>
            )}
            {/* Mắt và Nụ cười */}
            <circle cx="43" cy="44" r="2.3" fill="#0f172a" />
            <circle cx="57" cy="44" r="2.3" fill="#0f172a" />
            <path d="M43 52 Q50 58 57 52" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
            {/* Kính cận tri thức */}
            {config.glasses && (
              <g stroke="#1d4ed8" strokeWidth="1.8" fill="none">
                <rect x="36" y="39" width="12" height="9" rx="2" />
                <rect x="52" y="39" width="12" height="9" rx="2" />
                <line x1="48" y1="43" x2="52" y2="43" />
              </g>
            )}
          </svg>
        )}
      </div>

      {/* Nhãn Chuỗi ngày học nằm TÁCH BIỆT bên dưới khung Avatar để không che mặt */}
      <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500 text-white text-[10px] font-extrabold leading-none whitespace-nowrap shadow-xs">
        <Flame className="w-3 h-3 fill-white" />
        {streakDays} ngày
      </span>
    </div>
  );
}

// ==========================================
// 7. COMPONENT CHÍNH STUDY-EZ 1.0
// ==========================================
export default function App() {
  // Điều hướng các màn hình chính
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'practice-hub' | 'exam-hub' | 'grade10-hub' | 'ezask' | 'streak-studio' | 'exam-room' | 'auth' | 'profile' | 'admin'

  // Bộ lọc Chương trình học
  const [selectedGrade, setSelectedGrade] = useState(9);
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const [practiceTab, setPracticeTab] = useState('mcq'); // 'mcq' | 'essay'

  // Bộ lọc Kỳ thi Định kỳ & Tuyển sinh 10
  const [selectedTermId, setSelectedTermId] = useState('gk1');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [examSearch, setExamSearch] = useState('');

  // Hệ thống Giữ Chuỗi (Streak) & KPI 200 XP / ngày
  const DAILY_KPI_XP = 200;
  const [todayXp, setTodayXp] = useState(140);
  const [streakDays, setStreakDays] = useState(7);
  const [streakUnlockedToday, setStreakUnlockedToday] = useState(false);
  const [xpToast, setXpToast] = useState(null);

  // Cấu hình Avatar Học sinh Việt Nam & Ảnh tải từ máy
  const [avatarConfig, setAvatarConfig] = useState({
    hair: 'boy_neat',
    outfit: 'uniform_scarf',
    glasses: true,
    bgTheme: 'class'
  });
  const [customAvatarUrl, setCustomAvatarUrl] = useState(null);

  // Tài khoản Nickname & Đăng nhập Gmail
  const [currentUser, setCurrentUser] = useState({
    nickname: '@minhthao_studyez_k9',
    email: 'minhthao.dongnai@gmail.com',
    role: 'student',
    solvedCount: 28,
    savedExamIds: []
  });
  const [authForm, setAuthForm] = useState({ nickname: '', email: '', password: '', isAdmin: false });
  const [showGmailModal, setShowGmailModal] = useState(false);

  // Trạng thái làm bài tập Chương
  const [chapterMcqAnswers, setChapterMcqAnswers] = useState({});
  const [chapterEssayDrafts, setChapterEssayDrafts] = useState({});
  const [revealedEssays, setRevealedEssays] = useState({});

  // Trạng thái Phòng thi (Exam Room)
  const [activeExam, setActiveExam] = useState(null);
  const [examMcqAnswers, setExamMcqAnswers] = useState({});
  const [examEssayAnswers, setExamEssayAnswers] = useState({});
  const [examSelfScores, setExamSelfScores] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [timeLeftSec, setTimeLeftSec] = useState(5400);

  // Trạng thái Cộng đồng Hỏi Đáp 24/7 (EzAsk)
  const [qaPosts, setQaPosts] = useState(INITIAL_QA_POSTS);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionGrade, setNewQuestionGrade] = useState(9);
  const [newQuestionSubject, setNewQuestionSubject] = useState('math');
  const [newQuestionBounty, setNewQuestionBounty] = useState(50);
  const [newQuestionImage, setNewQuestionImage] = useState(null);
  const [replyDrafts, setReplyDrafts] = useState({});

  // Câu châm ngôn ngẫu nhiên ở chân trang & hộp chuỗi
  const [quoteIdx, setQuoteIdx] = useState(0);

  // Đồng hồ đếm ngược khi vào Phòng thi
  useEffect(() => {
    if (currentPage !== 'exam-room' || examSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeftSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentPage, examSubmitted]);

  // Hàm cộng XP và kiểm tra hoàn thành KPI 200 XP giữ chuỗi
  const addXp = (amount, reason) => {
    setTodayXp((prev) => {
      const next = prev + amount;
      if (next >= DAILY_KPI_XP && !streakUnlockedToday) {
        setStreakDays((s) => s + 1);
        setStreakUnlockedToday(true);
        setXpToast(`🎉 Đạt đủ KPI 200 XP! Chuỗi ngày học tăng lên ${streakDays + 1} ngày!`);
      } else {
        setXpToast(`+${amount} XP (${reason})`);
      }
      setTimeout(() => setXpToast(null), 3500);
      return next;
    });
  };

  // Xử lý tải ảnh đại diện từ thiết bị
  const handleAvatarFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCustomAvatarUrl(reader.result);
      addXp(20, 'Cập nhật ảnh đại diện');
    };
    reader.readAsDataURL(file);
  };

  // Xử lý tải ảnh đính kèm câu hỏi Hỏi Đáp 24/7
  const handleQuestionImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setNewQuestionImage(reader.result);
    reader.readAsDataURL(file);
  };

  // Danh sách chương hiện tại theo Khối + Môn
  const currentChapters = useMemo(() => {
    return CHAPTER_TITLES[selectedGrade]?.[selectedSubject] || CHAPTER_TITLES[9].math;
  }, [selectedGrade, selectedSubject]);

  // Bài tập của chương đang chọn
  const currentChapterData = useMemo(() => {
    const title = currentChapters[selectedChapterIdx] || currentChapters[0];
    return generateChapterExercises(selectedGrade, selectedSubject, selectedChapterIdx, title);
  }, [selectedGrade, selectedSubject, selectedChapterIdx, currentChapters]);

  // Danh sách đề thi định kỳ đã lọc
  const filteredPeriodicExams = useMemo(() => {
    return PERIODIC_EXAMS_240.filter((ex) => {
      const matchTerm = ex.termId === selectedTermId;
      const matchGrade = ex.grade === selectedGrade;
      const matchSubj = ex.subject === selectedSubject;
      const matchSearch =
        examSearch.trim() === '' || ex.title.toLowerCase().includes(examSearch.toLowerCase());
      return matchTerm && matchGrade && matchSubj && matchSearch;
    });
  }, [selectedTermId, selectedGrade, selectedSubject, examSearch]);

  // Danh sách 48 đề thi Tuyển sinh lớp 10 đã lọc
  const filteredGrade10Exams = useMemo(() => {
    return GRADE10_EXAMS_48.filter((ex) => {
      const matchProv = selectedProvince === 'all' || ex.province === selectedProvince;
      const matchYear = selectedYear === 'all' || ex.year === selectedYear;
      return matchProv && matchYear;
    });
  }, [selectedProvince, selectedYear]);

  // Bắt đầu làm đề thi
  const startExamRoom = (examObj) => {
    setActiveExam(examObj);
    setExamMcqAnswers({});
    setExamEssayAnswers({});
    setExamSelfScores({});
    setExamSubmitted(false);
    setTimeLeftSec((examObj.durationMinutes || 90) * 60);
    setCurrentPage('exam-room');
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Đăng câu hỏi mới lên Hỏi Đáp 24/7
  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    const newPost = {
      id: 'qa-' + Date.now(),
      authorNickname: currentUser ? currentUser.nickname : '@hocsinh_thcs',
      grade: newQuestionGrade,
      subject: newQuestionSubject,
      bountyXp: Number(newQuestionBounty),
      createdAt: 'Vừa xong',
      questionText: newQuestionText,
      imageAttachment: newQuestionImage,
      answers: []
    };
    setQaPosts([newPost, ...qaPosts]);
    setNewQuestionText('');
    setNewQuestionImage(null);
    addXp(15, 'Đăng câu hỏi Hỏi Đáp 24/7');
  };

  // Gửi câu trả lời trên Hỏi Đáp 24/7
  const handleSendReply = (postId) => {
    const text = replyDrafts[postId];
    if (!text || !text.trim()) return;
    setQaPosts(
      qaPosts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          answers: [
            ...post.answers,
            {
              id: 'ans-' + Date.now(),
              responderNickname: currentUser ? currentUser.nickname : '@ban_hoc_tot',
              content: text,
              upvotes: 1,
              isBestAnswer: false,
              time: 'Vừa xong'
            }
          ]
        };
      })
    );
    setReplyDrafts({ ...replyDrafts, [postId]: '' });
    addXp(40, 'Giải bài giúp bạn trên Hỏi Đáp 24/7');
  };

  const kpiPercentage = Math.min(100, Math.round((todayXp / DAILY_KPI_XP) * 100));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* Thông báo cộng XP nổi */}
      {xpToast && (
        <div className="fixed top-20 right-5 z-50 bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-extrabold animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{xpToast}</span>
        </div>
      )}

      {/* ========================================== */}
      {/* BONG BÓNG TRÒN NỔI HỎI ĐÁP 24/7 Ở GÓC MÀN HÌNH */}
      {/* ========================================== */}
      <button
        onClick={() => setCurrentPage('ezask')}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-gradient-to-r from-orange-500 to-rose-600 text-white px-4 py-3.5 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-150 border-2 border-white"
        title="Mở Hỏi Đáp 24/7"
      >
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
          <MessageCircle className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-ping" />
        </div>
        <div className="text-left pr-1">
          <div className="text-xs font-extrabold leading-tight">HỎI ĐÁP 24/7</div>
          <div className="text-[10px] text-orange-100 leading-tight">Đăng bài & Giải bài +40 XP</div>
        </div>
      </button>

      {/* ========================================== */}
      {/* THANH ĐIỀU HƯỚNG CHÍNH (NAVBAR) */}
      {/* ========================================== */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          {/* Logo StudyEz 1.0 */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 text-left group active:scale-95 transition-transform duration-150"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-xs">
                Ez
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-blue-700">StudyEz</span>
                  <span className="text-[10px] font-extrabold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    1.0
                  </span>
                </div>
                <span className="block text-[10px] text-slate-400 font-medium">studyez.vn • Kết nối tri thức</span>
              </div>
            </button>

            {/* Menu điều hướng */}
            <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-3 py-2 rounded-xl active:scale-95 transition-all duration-150 ${
                  currentPage === 'home' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => setCurrentPage('practice-hub')}
                className={`px-3 py-2 rounded-xl active:scale-95 transition-all duration-150 ${
                  currentPage === 'practice-hub' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Bài Tập 96 Chương (6-9)
              </button>
              <button
                onClick={() => setCurrentPage('exam-hub')}
                className={`px-3 py-2 rounded-xl active:scale-95 transition-all duration-150 ${
                  currentPage === 'exam-hub' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                240 Đề Thi GK & HK
              </button>
              <button
                onClick={() => setCurrentPage('grade10-hub')}
                className={`px-3 py-2 rounded-xl active:scale-95 transition-all duration-150 ${
                  currentPage === 'grade10-hub'
                    ? 'bg-indigo-600 text-white'
                    : 'text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100'
                }`}
              >
                Ôn Thi Vào 10 (48 Đề Sở)
              </button>

              {/* Nút Hỏi Đáp 24/7 nổi bật ngay trên Thanh công cụ */}
              <button
                onClick={() => setCurrentPage('ezask')}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all duration-150 shadow-xs ${
                  currentPage === 'ezask'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:opacity-95'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Hỏi Đáp 24/7</span>
                <span className="text-[9px] bg-white text-orange-600 px-1.5 py-0.2 rounded-full font-black">
                  LIVE
                </span>
              </button>
            </nav>
          </div>

          {/* Khu vực KPI 200 XP + Avatar Không Bị Che Mặt + Nickname */}
          <div className="flex items-center gap-3">
            {/* Thanh KPI 200 XP giữ chuỗi */}
            <div
              onClick={() => setCurrentPage('streak-studio')}
              className="hidden sm:flex flex-col bg-slate-100 hover:bg-blue-50/60 px-3 py-1.5 rounded-xl cursor-pointer border border-slate-200 transition w-44"
            >
              <div className="flex items-center justify-between text-[10px] font-extrabold">
                <span className="text-slate-600">KPI Giữ Chuỗi</span>
                <span className="text-blue-700">
                  {todayXp}/{DAILY_KPI_XP} XP
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300"
                  style={{ width: `${kpiPercentage}%` }}
                />
              </div>
            </div>

            {/* Avatar Học sinh Việt Nam & Chuỗi (Đã tách huy hiệu xuống dưới để không che mặt) */}
            <StudentAvatarBadge
              config={avatarConfig}
              customPhoto={customAvatarUrl}
              streakDays={streakDays}
              size="md"
              onClick={() => setCurrentPage('streak-studio')}
            />

            {/* Tài khoản Nickname */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage('profile')}
                  className="text-xs font-extrabold px-3 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 active:scale-95 transition"
                >
                  {currentUser.nickname}
                </button>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => setCurrentPage('admin')}
                    className="text-xs font-bold px-2.5 py-2 rounded-xl bg-slate-800 text-white"
                  >
                    Admin
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage('auth')}
                className="text-xs font-extrabold bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* VỊ TRÍ QUẢNG CÁO TOP LEADERBOARD (728x90) */}
      {/* ========================================== */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        <div className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-300 bg-white/80 flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold text-[10px] uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
            Vị trí Quảng cáo (Ad Slot 728×90)
          </span>
          <span>Không gian dành cho Google AdSense hoặc Banner Sách tham khảo Shopee Affiliate</span>
          <span className="text-[11px] font-semibold text-blue-600">studyez.vn</span>
        </div>
      </div>

      {/* ========================================== */}
      {/* NỘI DUNG CHÍNH CỦA WEBSITE */}
      {/* ========================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ------------------------------------------ */}
        {/* MÀN HÌNH 1: TRANG CHỦ (HOME) */}
        {/* ------------------------------------------ */}
        {currentPage === 'home' && (
          <div className="space-y-8">
            {/* Hero Banner */}
            <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 md:p-10 text-white shadow-md grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold bg-white/15 px-3.5 py-1 rounded-full">
                  <span>Chương trình Kết nối tri thức với cuộc sống (GDPT 2018)</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black leading-tight">
                  Nền tảng Luyện Bài Tập, Phòng Thi Thử & Hỏi Đáp 24/7 cho Học sinh Lớp 6, 7, 8, 9
                </h1>
                <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                  96 Chương bài tập Trắc nghiệm & Tự luận • 240 Đề thi Giữa kì & Học kì chuẩn ma trận • 48 Đề thi Tuyển sinh vào lớp 10 (100% Tự luận) từ 12 Sở GD&ĐT tỉnh/thành phố.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <button
                    onClick={() => setCurrentPage('practice-hub')}
                    className="bg-white text-blue-700 font-extrabold px-5 py-3 rounded-xl shadow-xs hover:bg-blue-50 active:scale-95 transition-all duration-150 text-sm"
                  >
                    Làm Bài Tập Theo Chương
                  </button>
                  <button
                    onClick={() => setCurrentPage('grade10-hub')}
                    className="bg-amber-400 text-slate-900 font-extrabold px-5 py-3 rounded-xl shadow-xs hover:bg-amber-300 active:scale-95 transition-all duration-150 text-sm"
                  >
                    Đề Thi Vào Lớp 10 (100% Tự Luận)
                  </button>
                  <button
                    onClick={() => setCurrentPage('ezask')}
                    className="bg-orange-500 text-white font-extrabold px-5 py-3 rounded-xl shadow-xs hover:bg-orange-600 active:scale-95 transition-all duration-150 text-sm flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Hỏi Đáp 24/7</span>
                  </button>
                </div>
              </div>

              {/* Thẻ Nhân vật Giữ Chuỗi & KPI 200 XP trên Banner */}
              <div className="lg:col-span-4 bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-5 flex flex-col items-center text-center space-y-3">
                <StudentAvatarBadge
                  config={avatarConfig}
                  customPhoto={customAvatarUrl}
                  streakDays={streakDays}
                  size="lg"
                  onClick={() => setCurrentPage('streak-studio')}
                />
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Tiến độ giữ chuỗi hôm nay</span>
                    <span>{todayXp} / 200 XP</span>
                  </div>
                  <div className="w-full h-2.5 bg-blue-950/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 transition-all duration-300"
                      style={{ width: `${kpiPercentage}%` }}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-blue-100 italic">
                  "{QUOTES[quoteIdx].text}" — {QUOTES[quoteIdx].author}
                </p>
                <button
                  onClick={() => setCurrentPage('streak-studio')}
                  className="w-full py-2 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-extrabold active:scale-95 transition"
                >
                  Tùy chỉnh Avatar & Tải ảnh từ máy
                </button>
              </div>
            </section>

            {/* Phân chia rõ ràng 4 Khối lớp 6, 7, 8, 9 */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900">
                  1. Chọn Khối Lớp (Bài tập chương & Đề thi riêng biệt từng khối)
                </h2>
                <span className="text-xs font-bold text-blue-600">Chuẩn Kết nối tri thức</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {GRADES.map((g) => (
                  <div
                    key={g.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-500 shadow-xs transition flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-blue-700">{g.label}</span>
                        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                          24 Chương • 60 Đề
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-900">{g.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{g.desc}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setSelectedGrade(g.id);
                          setSelectedChapterIdx(0);
                          setCurrentPage('practice-hub');
                        }}
                        className="py-2 px-3 rounded-xl bg-blue-600 text-white text-xs font-extrabold hover:bg-blue-700 active:scale-95 transition"
                      >
                        Làm bài tập
                      </button>
                      <button
                        onClick={() => {
                          setSelectedGrade(g.id);
                          setCurrentPage('exam-hub');
                        }}
                        className="py-2 px-3 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-extrabold hover:bg-indigo-100 active:scale-95 transition"
                      >
                        Đề thi thử
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Danh sách Môn học (3 môn Active + 4 môn Coming Soon) */}
            <section className="space-y-4">
              <h2 className="text-xl font-black text-slate-900">
                2. Các môn học trên StudyEz 1.0 & Lộ trình phát triển
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SUBJECTS.map((sub) => {
                  const isSoon = sub.status === 'coming_soon';
                  return (
                    <div
                      key={sub.id}
                      onClick={() => {
                        if (!isSoon) {
                          setSelectedSubject(sub.id);
                          setCurrentPage('practice-hub');
                        }
                      }}
                      className={`p-5 rounded-2xl border transition ${
                        isSoon
                          ? 'bg-slate-100/80 border-slate-200 opacity-75 cursor-not-allowed'
                          : 'bg-white border-slate-200 hover:border-blue-500 cursor-pointer active:scale-95'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-extrabold text-sm text-slate-900">{sub.name}</span>
                        {isSoon ? (
                          <span className="text-[10px] font-extrabold uppercase bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                            Coming Soon
                          </span>
                        ) : (
                          <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                            Đang mở
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{sub.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* ------------------------------------------ */}
        {/* MÀN HÌNH 2: KHO BÀI TẬP 96 CHƯƠNG (PRACTICE HUB) */}
        {/* ------------------------------------------ */}
        {currentPage === 'practice-hub' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Cột trái: Chọn Khối, Môn và 8 Chương cụ thể */}
            <aside className="lg:col-span-4 space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                <h2 className="text-base font-black text-slate-900">Chọn Khối & Môn Học</h2>
                <div className="grid grid-cols-4 gap-2">
                  {[6, 7, 8, 9].map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setSelectedGrade(g);
                        setSelectedChapterIdx(0);
                      }}
                      className={`py-2 rounded-xl text-xs font-extrabold active:scale-95 transition ${
                        selectedGrade === g
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Lớp {g}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {SUBJECTS.filter((s) => s.status === 'active').map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedSubject(s.id);
                        setSelectedChapterIdx(0);
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-extrabold active:scale-95 transition ${
                        selectedSubject === s.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {s.id === 'math' ? 'Toán học' : s.id === 'science' ? 'KHTN' : 'Tiếng Anh'}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="text-xs font-extrabold text-slate-500 uppercase">
                    Danh sách chương (Lớp {selectedGrade})
                  </div>
                  <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
                    {currentChapters.map((chapTitle, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedChapterIdx(idx)}
                        className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center justify-between gap-2 ${
                          selectedChapterIdx === idx
                            ? 'bg-blue-50 text-blue-700 border border-blue-300'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="line-clamp-2">{chapTitle}</span>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quảng cáo Sidebar 300x250 */}
              <div className="bg-white p-4 rounded-2xl border border-dashed border-slate-300 text-center space-y-1">
                <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                  Ad Slot 300×250 (Sidebar)
                </span>
                <p className="text-xs text-slate-400">Vị trí đặt banner khóa học / Sách ôn thi Lớp 10</p>
              </div>
            </aside>

            {/* Cột phải: Danh sách bài tập Trắc nghiệm & Tự luận của Chương */}
            <section className="lg:col-span-8 space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold text-blue-600">
                    Lớp {selectedGrade} • Kết nối tri thức
                  </span>
                  <h1 className="text-lg font-black text-slate-900 mt-0.5">
                    {currentChapters[selectedChapterIdx]}
                  </h1>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPracticeTab('mcq')}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold active:scale-95 transition ${
                      practiceTab === 'mcq'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Trắc nghiệm ({currentChapterData.mcqs.length} câu)
                  </button>
                  <button
                    onClick={() => setPracticeTab('essay')}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold active:scale-95 transition ${
                      practiceTab === 'essay'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Bài tập Tự luận ({currentChapterData.essays.length} bài)
                  </button>
                </div>
              </div>

              {/* Chế độ làm bài Trắc nghiệm */}
              {practiceTab === 'mcq' && (
                <div className="space-y-4">
                  {currentChapterData.mcqs.map((q, qIdx) => {
                    const chosen = chapterMcqAnswers[q.id];
                    const isAnswered = chosen !== undefined;
                    const isCorrect = chosen === q.correctIndex;
                    return (
                      <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                            Câu {qIdx + 1} • Mức độ: {q.difficulty}
                          </span>
                          <span className="text-xs font-bold text-emerald-600">+20 XP khi đúng</span>
                        </div>
                        <p className="font-bold text-slate-900 text-sm">{q.question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {q.options.map((opt, oIdx) => {
                            const selectedThis = chosen === oIdx;
                            return (
                              <button
                                key={oIdx}
                                onClick={() => {
                                  setChapterMcqAnswers({ ...chapterMcqAnswers, [q.id]: oIdx });
                                  if (oIdx === q.correctIndex && chosen === undefined) {
                                    addXp(20, `Giải đúng câu ${qIdx + 1}`);
                                  }
                                }}
                                className={`p-3 rounded-xl border text-left text-xs font-semibold active:scale-95 transition ${
                                  !isAnswered
                                    ? 'border-slate-200 hover:border-blue-400'
                                    : oIdx === q.correctIndex
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                                    : selectedThis
                                    ? 'border-rose-400 bg-rose-50 text-rose-900'
                                    : 'border-slate-200 opacity-60'
                                }`}
                              >
                                <span className="font-extrabold mr-1.5">
                                  {String.fromCharCode(65 + oIdx)}.
                                </span>
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {isAnswered && (
                          <div
                            className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                              isCorrect
                                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                                : 'bg-amber-50 border border-amber-200 text-amber-900'
                            }`}
                          >
                            <span className="font-extrabold">
                              {isCorrect ? '✓ Chính xác! ' : '✗ Chưa đúng. '}
                            </span>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Chế độ làm bài Tự luận */}
              {practiceTab === 'essay' && (
                <div className="space-y-4">
                  {currentChapterData.essays.map((es) => {
                    const isShown = revealedEssays[es.id];
                    return (
                      <div key={es.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md">
                            Tự luận • {es.difficulty} ({es.points} điểm)
                          </span>
                          <span className="text-xs font-bold text-emerald-600">+35 XP hoàn thành</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 whitespace-pre-line leading-relaxed">
                          {es.problem}
                        </p>
                        <textarea
                          rows={4}
                          value={chapterEssayDrafts[es.id] || ''}
                          onChange={(e) =>
                            setChapterEssayDrafts({ ...chapterEssayDrafts, [es.id]: e.target.value })
                          }
                          placeholder="Nhập lời giải tự luận hoặc các bước biến đổi chính của bạn vào đây..."
                          className="w-full p-3.5 rounded-xl border border-slate-300 text-xs focus:border-blue-600 focus:outline-hidden"
                        />
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => {
                              setRevealedEssays({ ...revealedEssays, [es.id]: !isShown });
                              if (!isShown) addXp(35, 'Hoàn thành bài tập Tự luận');
                            }}
                            className="bg-blue-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition"
                          >
                            {isShown ? 'Ẩn đáp án & thang điểm' : 'Đối chiếu lời giải & Nhận +35 XP'}
                          </button>
                        </div>
                        {isShown && (
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <div className="text-xs font-extrabold text-blue-700">
                              Hướng dẫn chấm & Thang điểm chi tiết:
                            </div>
                            {es.rubric.map((step, i) => (
                              <p key={i} className="text-xs text-slate-700 leading-relaxed">
                                • {step}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}

        {/* ------------------------------------------ */}
        {/* MÀN HÌNH 3: KHO 240 ĐỀ THI GIỮA KÌ & HỌC KÌ */}
        {/* ------------------------------------------ */}
        {currentPage === 'exam-hub' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold text-blue-600 uppercase">
                    Ngân hàng 240 Đề thi định kỳ (60 Đề / Đợt)
                  </span>
                  <h1 className="text-2xl font-black text-slate-900 mt-0.5">
                    Phòng Thi Thử Giữa Kì 1, Học Kì 1, Giữa Kì 2, Học Kì 2
                  </h1>
                </div>
                <input
                  type="text"
                  value={examSearch}
                  onChange={(e) => setExamSearch(e.target.value)}
                  placeholder="Tìm trường hoặc mã đề..."
                  className="px-3.5 py-2 text-xs rounded-xl border border-slate-300 w-60"
                />
              </div>

              {/* Chọn 4 đợt thi (Mỗi đợt 60 đề) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {EXAM_TERMS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTermId(t.id)}
                    className={`p-3.5 rounded-xl border text-left active:scale-95 transition ${
                      selectedTermId === t.id
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-200 bg-slate-50 hover:bg-white'
                    }`}
                  >
                    <div className="text-sm font-extrabold">{t.name}</div>
                    <div className="text-[11px] text-blue-600 font-bold mt-0.5">{t.badge}</div>
                  </button>
                ))}
              </div>

              {/* Chọn Khối & Môn */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                {[6, 7, 8, 9].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold ${
                      selectedGrade === g ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Lớp {g}
                  </button>
                ))}
                <span className="text-slate-300 mx-1">|</span>
                {SUBJECTS.filter((s) => s.status === 'active').map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSubject(s.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold ${
                      selectedSubject === s.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPeriodicExams.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md">
                        {ex.codeNumber}
                      </span>
                      <span className="text-slate-500 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {ex.durationMinutes} phút
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{ex.title}</h3>
                    <p className="text-xs text-slate-500">
                      Cấu trúc đủ: 12 câu Trắc nghiệm (3,0đ) + 4 bài Tự luận lớn (7,0đ)
                    </p>
                  </div>
                  <button
                    onClick={() => startExamRoom(ex)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-extrabold hover:bg-blue-700 active:scale-95 transition"
                  >
                    Vào Phòng Thi Ngay (+80 XP)
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------ */}
        {/* MÀN HÌNH 4: ÔN THI TUYỂN SINH LỚP 10 (48 ĐỀ SỞ - 100% TỰ LUẬN) */}
        {/* ------------------------------------------ */}
        {currentPage === 'grade10-hub' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white p-6 sm:p-8 rounded-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold bg-amber-400 text-slate-900 px-3 py-1 rounded-full">
                <span>Chuẩn Đề Thi Tuyển Sinh Cấp 3 (100% Tự Luận - Không Trắc Nghiệm)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">
                Ngân Hàng 48 Đề Thi Chính Thức Tuyển Sinh Vào Lớp 10 THPT Các Sở GD&ĐT
              </h1>
              <p className="text-xs sm:text-sm text-indigo-100 max-w-3xl leading-relaxed">
                Đầy đủ 5 bài toán lớn từ Bài I đến Bài V (Rút gọn căn thức, Toán thực tế/Lập phương trình, Hệ phương trình & Vi-ét, Hình học Đường tròn 3 ý a-b-c, và câu Bất đẳng thức điểm 10) của 12 Sở GD&ĐT qua các năm học.
              </p>

              {/* Bộ lọc 12 Sở GD&ĐT & Năm thi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-extrabold"
                >
                  <option value="all">Tất cả 12 Sở GD&ĐT Tỉnh / Thành phố (48 Đề)</option>
                  {PROVINCES_12.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-extrabold"
                >
                  <option value="all">Tất cả các năm học (2022 - 2026)</option>
                  {EXAM_YEARS.map((y) => (
                    <option key={y} value={y}>
                      Năm học {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGrade10Exams.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-500 transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-md">
                        {ex.province}
                      </span>
                      <span className="text-amber-700 bg-amber-50 font-extrabold px-2 py-0.5 rounded">
                        100% Tự luận
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900">{ex.title}</h3>
                    <p className="text-xs text-slate-500">
                      Cấu trúc: Bài I, Bài II, Bài III, Bài IV (Hình đường tròn), Bài V (Điểm 10) • 120 phút
                    </p>
                  </div>
                  <button
                    onClick={() => startExamRoom(ex)}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-extrabold hover:bg-indigo-700 active:scale-95 transition"
                  >
                    Mở Đề Thi Chính Thức & Lời Giải
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------ */}
        {/* MÀN HÌNH 5: PHÒNG THI THỰC TẾ (EXAM ROOM) */}
        {/* ------------------------------------------ */}
        {currentPage === 'exam-room' && activeExam && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 sticky top-20 z-20 flex flex-wrap items-center justify-between gap-4 shadow-xs">
              <div>
                <span className="text-xs font-extrabold text-blue-600">
                  {activeExam.isGrade10Entrance
                    ? 'ĐỀ THI CHÍNH THỨC TUYỂN SINH LỚP 10 (100% TỰ LUẬN)'
                    : 'PHÒNG THI ĐỊNH KỲ CHUẨN MA TRẬN'}
                </span>
                <h1 className="text-base font-black text-slate-900">{activeExam.title}</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 font-black text-sm flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimer(timeLeftSec)}</span>
                </div>
                {!examSubmitted ? (
                  <button
                    onClick={() => {
                      setExamSubmitted(true);
                      addXp(80, 'Hoàn thành Đề thi thử');
                    }}
                    className="bg-blue-600 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition"
                  >
                    Nộp Bài & Xem Đáp Án
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setCurrentPage(activeExam.isGrade10Entrance ? 'grade10-hub' : 'exam-hub')
                    }
                    className="bg-slate-800 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl"
                  >
                    Thoát phòng thi
                  </button>
                )}
              </div>
            </div>

            {/* PHẦN I: TRẮC NGHIỆM (CHỈ HIỂN THỊ CHO ĐỀ GIỮA KÌ / HỌC KÌ - ĐỀ CẤP 3 KHÔNG CÓ TRẮC NGHIỆM) */}
            {!activeExam.isGrade10Entrance && activeExam.mcqs.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-base font-black text-slate-900 bg-blue-50 p-3.5 rounded-xl border border-blue-200">
                  PHẦN I. TRẮC NGHIỆM KHÁCH QUAN (3,0 ĐIỂM - 12 CÂU HỎI)
                </h2>
                {activeExam.mcqs.map((q, idx) => (
                  <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                    <p className="text-sm font-bold text-slate-900">{q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          disabled={examSubmitted}
                          onClick={() => setExamMcqAnswers({ ...examMcqAnswers, [q.id]: oIdx })}
                          className={`p-3 rounded-xl border text-left text-xs font-semibold transition ${
                            examMcqAnswers[q.id] === oIdx
                              ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                              : 'border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {examSubmitted && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                        <span className="font-bold">Đáp án đúng: </span>
                        {q.options[q.correctIndex]} — {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* PHẦN TỰ LUẬN (ĐỀ CẤP 3 LÀ 10,0 ĐIỂM TỰ LUẬN TRỌN VẸN TỪ BÀI I ĐẾN BÀI V) */}
            <div className="space-y-4">
              <h2 className="text-base font-black text-slate-900 bg-indigo-50 p-3.5 rounded-xl border border-indigo-200">
                {activeExam.isGrade10Entrance
                  ? 'ĐỀ BÀI CHÍNH THỨC (100% TỰ LUẬN - THANG ĐIỂM 10,0 ĐIỂM)'
                  : 'PHẦN II. TỰ LUẬN (7,0 ĐIỂM)'}
              </h2>
              {activeExam.essays.map((es) => (
                <div key={es.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-indigo-700">{es.title}</h3>
                    <span className="text-xs font-bold text-slate-500">{es.points} điểm</span>
                  </div>
                  <p className="text-sm text-slate-900 font-semibold whitespace-pre-line leading-relaxed">
                    {es.problem}
                  </p>
                  <textarea
                    rows={4}
                    disabled={examSubmitted}
                    value={examEssayAnswers[es.id] || ''}
                    onChange={(e) =>
                      setExamEssayAnswers({ ...examEssayAnswers, [es.id]: e.target.value })
                    }
                    placeholder="Trình bày lời giải tự luận từng ý của bạn tại đây..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-xs"
                  />
                  {examSubmitted && (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
                      <div className="font-extrabold text-amber-900">
                        Đáp án & Biểu điểm chấm chính thức của Sở GD&ĐT:
                      </div>
                      <p className="text-slate-800 whitespace-pre-line leading-relaxed">
                        {es.solution}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------ */}
        {/* MÀN HÌNH 6: CỘNG ĐỒNG HỎI ĐÁP 24/7 (EZASK) */}
        {/* ------------------------------------------ */}
        {currentPage === 'ezask' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Cột trái: Form đăng câu hỏi mới */}
            <div className="lg:col-span-5">
              <form
                onSubmit={handleCreateQuestion}
                className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 sticky top-24"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-orange-500" />
                  <h2 className="text-lg font-black text-slate-900">Đăng Câu Hỏi Lên Hỏi Đáp 24/7</h2>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={newQuestionGrade}
                    onChange={(e) => setNewQuestionGrade(Number(e.target.value))}
                    className="p-2 rounded-xl border border-slate-300 text-xs font-bold"
                  >
                    {[6, 7, 8, 9].map((g) => (
                      <option key={g} value={g}>
                        Lớp {g}
                      </option>
                    ))}
                  </select>
                  <select
                    value={newQuestionSubject}
                    onChange={(e) => setNewQuestionSubject(e.target.value)}
                    className="p-2 rounded-xl border border-slate-300 text-xs font-bold"
                  >
                    <option value="math">Toán học</option>
                    <option value="science">KHTN</option>
                    <option value="english">Tiếng Anh</option>
                  </select>
                  <select
                    value={newQuestionBounty}
                    onChange={(e) => setNewQuestionBounty(Number(e.target.value))}
                    className="p-2 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 text-xs font-extrabold"
                  >
                    <option value={30}>Thưởng +30 XP</option>
                    <option value={50}>Thưởng +50 XP</option>
                    <option value={100}>Thưởng +100 XP</option>
                  </select>
                </div>

                <textarea
                  rows={4}
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="Nhập đề bài hoặc câu hỏi bạn đang thắc mắc..."
                  className="w-full p-3.5 rounded-xl border border-slate-300 text-xs"
                />

                {/* Tải ảnh chụp đề bài từ thiết bị */}
                <div className="flex items-center justify-between">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-xl hover:bg-blue-100">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Đính kèm ảnh đề bài</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleQuestionImageUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="submit"
                    className="bg-orange-500 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl hover:bg-orange-600 active:scale-95 transition"
                  >
                    Đăng câu hỏi ngay
                  </button>
                </div>
                {newQuestionImage && (
                  <img
                    src={newQuestionImage}
                    alt="Preview"
                    className="max-h-36 rounded-xl border border-slate-200"
                  />
                )}
              </form>
            </div>

            {/* Cột phải: Luồng câu hỏi trực tiếp */}
            <div className="lg:col-span-7 space-y-4">
              {qaPosts.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-extrabold text-blue-700">{post.authorNickname}</span>
                      <span className="text-slate-400">• {post.createdAt}</span>
                      <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">
                        Lớp {post.grade}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                      Thưởng +{post.bountyXp} XP
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    {post.questionText}
                  </p>
                  {post.imageAttachment && (
                    <img
                      src={post.imageAttachment}
                      alt="Đề bài"
                      className="max-h-60 rounded-xl border border-slate-200"
                    />
                  )}

                  {/* Danh sách lời giải */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    {post.answers.map((ans) => (
                      <div
                        key={ans.id}
                        className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                          ans.isBestAnswer
                            ? 'bg-emerald-50/70 border-emerald-300'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-slate-900">
                            {ans.responderNickname}
                          </span>
                          {ans.isBestAnswer && (
                            <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                              ✓ Lời giải chuẩn xác nhất
                            </span>
                          )}
                        </div>
                        <p className="text-slate-700 leading-relaxed">{ans.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Ô nhập lời giải nhận +40 XP */}
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={replyDrafts[post.id] || ''}
                      onChange={(e) =>
                        setReplyDrafts({ ...replyDrafts, [post.id]: e.target.value })
                      }
                      placeholder="Nhập lời giải của bạn để nhận ngay +40 XP..."
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                    />
                    <button
                      onClick={() => handleSendReply(post.id)}
                      className="bg-blue-600 text-white text-xs font-extrabold px-4 py-2 rounded-xl hover:bg-blue-700 active:scale-95 transition flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Gửi (+40 XP)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------ */}
        {/* MÀN HÌNH 7: XƯỞNG NHÂN VẬT & GIỮ CHUỖI KPI 200 XP */}
        {/* ------------------------------------------ */}
        {currentPage === 'streak-studio' && (
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
              <StudentAvatarBadge
                config={avatarConfig}
                customPhoto={customAvatarUrl}
                streakDays={streakDays}
                size="lg"
              />
              <div className="space-y-2 text-center sm:text-left flex-1">
                <h1 className="text-xl font-black text-slate-900">
                  Xưởng Nhân Vật Học Sinh & Giữ Chuỗi (KPI 200 XP/Ngày)
                </h1>
                <p className="text-xs text-slate-500">
                  Tích đủ 200 XP mỗi ngày từ làm bài tập, giải đề thi hoặc trả lời câu hỏi trên Hỏi Đáp 24/7 để duy trì chuỗi lửa học tập.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
                  <label className="cursor-pointer bg-blue-600 text-white text-xs font-extrabold px-4 py-2 rounded-xl hover:bg-blue-700 inline-flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Tải ảnh từ thiết bị làm Avatar</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileUpload}
                      className="hidden"
                    />
                  </label>
                  {customAvatarUrl && (
                    <button
                      onClick={() => setCustomAvatarUrl(null)}
                      className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-2 rounded-xl"
                    >
                      Dùng lại Nhân vật Học sinh Việt Nam
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Trang phục học sinh
                </label>
                <select
                  value={avatarConfig.outfit}
                  onChange={(e) => setAvatarConfig({ ...avatarConfig, outfit: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                >
                  <option value="uniform_scarf">Áo trắng + Khăn quàng đỏ</option>
                  <option value="aodai">Áo dài trắng Việt Nam</option>
                  <option value="jacket">Áo khoác đồng phục StudyEz</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Kiểu tóc
                </label>
                <select
                  value={avatarConfig.hair}
                  onChange={(e) => setAvatarConfig({ ...avatarConfig, hair: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                >
                  <option value="boy_neat">Tóc nam sinh gọn gàng</option>
                  <option value="girl_twintail">Tóc nữ sinh buộc hai bên</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Phụ kiện mắt kính
                </label>
                <button
                  onClick={() =>
                    setAvatarConfig({ ...avatarConfig, glasses: !avatarConfig.glasses })
                  }
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-slate-50"
                >
                  {avatarConfig.glasses ? 'Đang đeo Kính cận tri thức' : 'Không đeo kính'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------ */}
        {/* MÀN HÌNH 8: ĐĂNG NHẬP NICKNAME & GMAIL (@GMAIL.COM) */}
        {/* ------------------------------------------ */}
        {(currentPage === 'auth' || currentPage === 'profile') && (
          <div className="max-w-md mx-auto bg-white p-7 rounded-3xl border border-slate-200 space-y-5">
            <h1 className="text-xl font-black text-slate-900">
              Tài khoản Nickname & Đăng nhập Gmail
            </h1>

            {/* Nút Đăng nhập nhanh bằng Gmail */}
            <button
              onClick={() => setShowGmailModal(!showGmailModal)}
              className="w-full py-3 px-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 flex items-center justify-center gap-2.5 text-xs font-extrabold text-slate-800 active:scale-95 transition"
            >
              <Mail className="w-4 h-4 text-rose-500" />
              <span>Tiếp tục đăng nhập bằng Gmail (@gmail.com)</span>
            </button>

            {showGmailModal && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-extrabold text-slate-700">
                  Chọn tài khoản Google / Gmail của bạn:
                </div>
                {[
                  { nick: '@minhthao_studyez_k9', mail: 'minhthao.dongnai@gmail.com' },
                  { nick: '@hocsinh_lop9_kntt', mail: 'onthivao10.studyez@gmail.com' }
                ].map((acc) => (
                  <button
                    key={acc.mail}
                    onClick={() => {
                      setCurrentUser({
                        nickname: acc.nick,
                        email: acc.mail,
                        role: 'student',
                        solvedCount: 30,
                        savedExamIds: []
                      });
                      setShowGmailModal(false);
                      setCurrentPage('home');
                      addXp(20, 'Đăng nhập bằng Gmail');
                    }}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 text-left flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-extrabold text-slate-900">{acc.nick}</div>
                      <div className="text-slate-500">{acc.mail}</div>
                    </div>
                    <span className="text-blue-600 font-bold">Chọn →</span>
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nickname hiển thị trên bảng xếp hạng & Hỏi Đáp 24/7
                </label>
                <input
                  type="text"
                  value={authForm.nickname}
                  onChange={(e) => setAuthForm({ ...authForm, nickname: e.target.value })}
                  placeholder="@nickname_cua_ban"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Địa chỉ Gmail</label>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  placeholder="tenban@gmail.com"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>
              <button
                onClick={() => {
                  if (!authForm.nickname.trim()) return;
                  setCurrentUser({
                    nickname: authForm.nickname.startsWith('@')
                      ? authForm.nickname
                      : `@${authForm.nickname}`,
                    email: authForm.email || 'hocsinh@gmail.com',
                    role: authForm.isAdmin ? 'admin' : 'student',
                    solvedCount: 15,
                    savedExamIds: []
                  });
                  setCurrentPage('home');
                }}
                className="w-full bg-blue-600 text-white text-xs font-extrabold py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition"
              >
                Lưu Nickname & Cập nhật Hồ sơ
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ========================================== */}
      {/* CHÂN TRANG (FOOTER) KÈM CHÂM NGÔN HỌC TẬP */}
      {/* ========================================== */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-black text-blue-700">StudyEz 1.0 (studyez.vn)</span> — Luyện bài tập 96 chương, 240 Đề thi định kỳ, 48 Đề tuyển sinh vào lớp 10 & Hỏi đáp 24/7.
          </div>
          <button
            onClick={() => setQuoteIdx((quoteIdx + 1) % QUOTES.length)}
            className="text-slate-600 italic hover:text-blue-600"
          >
            "{QUOTES[quoteIdx].text}" ({QUOTES[quoteIdx].author}) ↻
          </button>
        </div>
      </footer>
    </div>
  );
}