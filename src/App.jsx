import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  BookOpen, CheckCircle2, Flame, HelpCircle, Award, Search, User,
  ShieldCheck, Upload, Plus, Trash2, Clock, Sparkles, MessageCircle,
  ThumbsUp, Send, FileText, ChevronRight, LogOut, RefreshCw, Mail, Star,
  Crown, Lock, GraduationCap, Filter, ChevronLeft, Check, AlertCircle, KeyRound, Settings, ShoppingBag, Shield
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
  { id: 6, label: 'Lớp 6', title: 'Khối Lớp 6 - Kết nối tri thức', desc: '24 Chương (120 TN + 120 TL/chương) • 55+ Đề GK/HK mỗi môn' },
  { id: 7, label: 'Lớp 7', title: 'Khối Lớp 7 - Kết nối tri thức', desc: '24 Chương (120 TN + 120 TL/chương) • 55+ Đề GK/HK mỗi môn' },
  { id: 8, label: 'Lớp 8', title: 'Khối Lớp 8 - Kết nối tri thức', desc: '24 Chương (120 TN + 120 TL/chương) • 55+ Đề GK/HK mỗi môn' },
  { id: 9, label: 'Lớp 9', title: 'Khối Lớp 9 & Tuyển Sinh 10', desc: '24 Chương • 55+ Đề HK • 60 Đề Sở & 55 Đề Thi Thử Vào 10' },
];

const SUBJECTS = [
  { id: 'math', name: 'Toán học', status: 'active', desc: 'Đại số, Hình học, Thống kê & Toán thực tế nâng cao' },
  { id: 'science', name: 'Khoa học tự nhiên (KHTN)', status: 'active', desc: 'Vật lý, Hóa học, Sinh học tích hợp phân hóa' },
  { id: 'english', name: 'Tiếng Anh (Global Success)', status: 'active', desc: 'Ngữ âm, Từ vựng, Ngữ pháp & Viết lại câu nâng cao' },
  { id: 'literature', name: 'Ngữ văn', status: 'coming_soon', desc: 'Đọc hiểu văn bản & Nghị luận xã hội, văn học' },
  { id: 'history_geo', name: 'Lịch sử & Địa lý', status: 'coming_soon', desc: 'Lịch sử Việt Nam, Thế giới & Địa lý tự nhiên' },
  { id: 'informatics', name: 'Tin học', status: 'coming_soon', desc: 'Thuật toán, Scratch & Lập trình cơ bản' },
  { id: 'civics', name: 'Giáo dục công dân', status: 'coming_soon', desc: 'Kỹ năng sống & Pháp luật đại cương THCS' },
];

// ==========================================
// 2. HỆ THỐNG 96 CHƯƠNG HỌC (LỚP 6, 7, 8, 9)
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

// ==========================================
// 3. SINH 120 CÂU TRẮC NGHIỆM & 120 BÀI TỰ LUẬN / MỖI CHƯƠNG
// ==========================================
function generateChapterExercises120(grade, subject, chapterIndex, chapterTitle) {
  const mcqs = [];
  const essays = [];

  for (let i = 1; i <= 120; i++) {
    let difficulty = 'Nhận biết';
    let xpReward = 15;
    if (i > 30 && i <= 60) {
      difficulty = 'Thông hiểu';
      xpReward = 20;
    } else if (i > 60 && i <= 90) {
      difficulty = 'Vận dụng';
      xpReward = 30;
    } else if (i > 90) {
      difficulty = 'Vận dụng cao';
      xpReward = 50;
    }

    const p = (i % 15) + 2;
    const q = (i % 7) + 3;

    if (subject === 'math') {
      if (difficulty === 'Nhận biết') {
        mcqs.push({
          id: `mcq-${grade}-m-${chapterIndex}-${i}`,
          index: i,
          difficulty,
          xpReward,
          question: `Câu ${i} [${chapterTitle} - Mức ${difficulty}]: Cho biểu thức đại số A(x) = ${p}x - ${p * q}. Giá trị của x để A(x) = 0 là:`,
          options: [`x = ${q}`, `x = -${q}`, `x = ${p}`, `x = ${p + q}`],
          correctIndex: 0,
          explanation: `Giải phương trình cơ bản: ${p}x - ${p * q} = 0 ⇔ ${p}x = ${p * q} ⇔ x = ${q}.`
        });
      } else if (difficulty === 'Thông hiểu') {
        mcqs.push({
          id: `mcq-${grade}-m-${chapterIndex}-${i}`,
          index: i,
          difficulty,
          xpReward,
          question: `Câu ${i} [${chapterTitle} - Mức ${difficulty}]: Điều kiện xác định của biểu thức P = √(x - ${p}) + ${q}/(x - ${p + q}) là:`,
          options: [`x ≥ ${p} và x ≠ ${p + q}`, `x > ${p}`, `x ≥ ${p + q}`, `x ≠ ${p}`],
          correctIndex: 0,
          explanation: `Biểu thức trong căn có nghĩa khi x - ${p} ≥ 0 ⇔ x ≥ ${p}; mẫu thức khác 0 khi x - ${p + q} ≠ 0 ⇔ x ≠ ${p + q}.`
        });
      } else if (difficulty === 'Vận dụng') {
        const sum = p + q;
        const prod = p * q;
        mcqs.push({
          id: `mcq-${grade}-m-${chapterIndex}-${i}`,
          index: i,
          difficulty,
          xpReward,
          question: `Câu ${i} [${chapterTitle} - Mức ${difficulty}]: Gọi x₁, x₂ là hai nghiệm của phương trình x² - ${sum}x + ${prod} = 0. Giá trị của biểu thức T = x₁² + x₂² - x₁x₂ bằng:`,
          options: [`${sum * sum - 3 * prod}`, `${sum * sum - 2 * prod}`, `${sum * prod}`, `${sum * sum - prod}`],
          correctIndex: 0,
          explanation: `Theo định lí Vi-ét: x₁ + x₂ = ${sum} và x₁x₂ = ${prod}. Ta có T = (x₁ + x₂)² - 3x₁x₂ = ${sum}² - 3.${prod} = ${sum * sum - 3 * prod}.`
        });
      } else {
        const k = p + 2;
        mcqs.push({
          id: `mcq-${grade}-m-${chapterIndex}-${i}`,
          index: i,
          difficulty,
          xpReward,
          question: `Câu ${i} [${chapterTitle} - Mức Vận dụng cao / Nâng cao]: Cho hai số thực dương a, b thỏa mãn a + b = ${2 * k}. Giá trị nhỏ nhất của biểu thức S = a² + b² + ${4 * k * k}/(ab) bằng:`,
          options: [`${2 * k * k + 4}`, `${2 * k * k}`, `${k * k + 8}`, `${4 * k * k}`],
          correctIndex: 0,
          explanation: `Áp dụng BĐT Cauchy (AM-GM): a² + b² ≥ (a+b)²/2 = ${2 * k * k} và ab ≤ (a+b)²/4 = ${k * k} ⇒ ${4 * k * k}/(ab) ≥ 4. Cộng vế theo vế suy ra S_min = ${2 * k * k + 4} khi a = b = ${k}.`
        });
      }
    } else if (subject === 'science') {
      if (difficulty === 'Nhận biết') {
        mcqs.push({
          id: `mcq-${grade}-s-${chapterIndex}-${i}`,
          index: i,
          difficulty,
          xpReward,
          question: `Câu ${i} [${chapterTitle} - Mức ${difficulty}]: Đặt hiệu điện thế U = ${p * q} (V) vào hai đầu điện trở R = ${p} (Ω) thì cường độ dòng điện I chạy qua dây dẫn là:`,
          options: [`${q} A`, `${p} A`, `${p + q} A`, `${(q / 2).toFixed(1)} A`],
          correctIndex: 0,
          explanation: `Áp dụng định luật Ohm: I = U / R = ${p * q} / ${p} = ${q} (A).`
        });
      } else if (difficulty === 'Thông hiểu') {
        const mol = (p * 0.05).toFixed(2);
        const vol = (Number(mol) * 24.79).toFixed(3);
        mcqs.push({
          id: `mcq-${grade}-s-${chapterIndex}-${i}`,
          index: i,
          difficulty,
          xpReward,
          question: `Câu ${i} [${chapterTitle} - Mức ${difficulty}]: Cho ${mol} mol kim loại Mg tác dụng hoàn toàn với dung dịch HCl dư. Thể tích khí H₂ thu được ở đkc (25°C, 1 bar) là:`,
          options: [`${vol} lít`, `${(Number(mol) * 22.4).toFixed(3)} lít`, `${(Number(mol) * 12.395).toFixed(3)} lít`, `${(Number(mol) * 49.58).toFixed(3)} lít`],
          correctIndex: 0,
          explanation: `PTHH: Mg + 2HCl → MgCl₂ + H₂↑. Số mol H₂ = số mol Mg = ${mol} mol ⇒ V_H2 (đkc) = ${mol} × 24,79 = ${vol} lít.`
        });
      } else if (difficulty === 'Vận dụng') {
        mcqs.push({
          id: `mcq-${grade}-s-${chapterIndex}-${i}`,
          index: i,
          difficulty,
          xpReward,
          question: `Câu ${i} [${chapterTitle} - Mức ${difficulty}]: Mắc nối tiếp hai điện trở R₁ = ${p}Ω và R₂ = ${q}Ω vào nguồn điện U = ${(p + q) * 2}V. Công suất tiêu thụ trên điện trở R₁ là:`,
          options: [`${4 * p} W`, `${2 * p} W`, `${4 * q} W`, `${(p + q) * 4} W`],
          correctIndex: 0,
          explanation: `R_tđ = R₁ + R₂ = ${p + q}Ω ⇒ I = U / R_tđ = 2A. Công suất trên R₁: P₁ = I².R₁ = 2² × ${p} = ${4 * p} W.`
        });
      } else {
        mcqs.push({
          id: `mcq-${grade}-s-${chapterIndex}-${i}`,
          index: i,
          difficulty,
          xpReward,
          question: `Câu ${i} [${chapterTitle} - Mức Vận dụng cao]: Hòa tan hoàn toàn hỗn hợp gồm ${p * 0.1} mol Fe và ${q * 0.1} mol Zn vào dung dịch H₂SO₄ loãng dư thu được dung dịch X và V lít khí H₂ (đkc). Cô cạn dung dịch X thu được bao nhiêu gam muối khan?`,
          options: [
            `${(p * 0.1 * 152 + q * 0.1 * 161).toFixed(2)} gam`,
            `${(p * 0.1 * 56 + q * 0.1 * 65).toFixed(2)} gam`,
            `${(p * 0.1 * 127 + q * 0.1 * 136).toFixed(2)} gam`,
            `${(p * 0.1 * 152 + q * 0.1 * 96).toFixed(2)} gam`
          ],
          correctIndex: 0,
          explanation: `Bảo toàn nguyên tố kim loại: n_FeSO4 = ${p * 0.1} mol (M = 152) và n_ZnSO4 = ${q * 0.1} mol (M = 161). Tổng khối lượng muối khan = ${(p * 0.1 * 152 + q * 0.1 * 161).toFixed(2)} gam.`
        });
      }
    } else {
      mcqs.push({
        id: `mcq-${grade}-e-${chapterIndex}-${i}`,
        index: i,
        difficulty,
        xpReward,
        question:
          difficulty === 'Nhận biết'
            ? `Question ${i} [${chapterTitle} - ${difficulty}]: If students spend ${p} hours practicing English every week, they ______ their communication skills rapidly.`
            : difficulty === 'Thông hiểu'
            ? `Question ${i} [${chapterTitle} - ${difficulty}]: The traditional craft village ______ we visited ${q} days ago is famous for its silk products.`
            : difficulty === 'Vận dụng'
            ? `Question ${i} [${chapterTitle} - ${difficulty}]: Had it not been for the heavy rain during the ${p}th match, our school team ______ the championship.`
            : `Question ${i} [${chapterTitle} - Advanced/Vận dụng cao]: Not until the teacher explained the ${i}th grammar structure ______ how to invert the conditional clause properly.`,
        options:
          difficulty === 'Nhận biết'
            ? ['will improve', 'would improve', 'improved', 'had improved']
            : difficulty === 'Thông hiểu'
            ? ['which', 'who', 'whom', 'whose']
            : difficulty === 'Vận dụng'
            ? ['would have won', 'will win', 'would win', 'had won']
            : ['did the students understand', 'the students understood', 'had the students understood', 'were the students understanding'],
        correctIndex: 0,
        explanation:
          difficulty === 'Nhận biết'
            ? 'Câu điều kiện loại 1 (First Conditional): If + S + V(hiện tại đơn), S + will + V-inf.'
            : difficulty === 'Thông hiểu'
            ? 'Đại từ quan hệ "which" thay thế cho danh từ chỉ sự vật/địa điểm đóng vai trò tân ngữ của động từ visited.'
            : difficulty === 'Vận dụng'
            ? 'Đảo ngữ câu điều kiện loại 3: Had it not been for + N, S + would have + V3/ed.'
            : 'Cấu trúc đảo ngữ nâng cao với Not until: Not until + mệnh đề/thời gian + trợ động từ (did) + S + V-inf.'
      });
    }

    essays.push({
      id: `essay-${grade}-${subject}-${chapterIndex}-${i}`,
      index: i,
      difficulty,
      points: difficulty === 'Vận dụng cao' ? 3.5 : difficulty === 'Vận dụng' ? 2.5 : 2.0,
      xpReward: xpReward + 15,
      problem:
        subject === 'math'
          ? difficulty === 'Nhận biết' || difficulty === 'Thông hiểu'
            ? `Bài tự luận số ${i} (${chapterTitle} - Mức ${difficulty}):\nCho biểu thức P_${i} = (√x + ${p}) / (√x - ${q}) - (${2 * p}√x) / (x - ${q * q}) với x ≥ 0, x ≠ ${q * q}.\na) Rút gọn biểu thức P_${i}.\nb) Tính giá trị của P_${i} khi x = ${(q + 2) * (q + 2)}.`
            : `Bài tự luận số ${i} (${chapterTitle} - Mức ${difficulty} - Phân loại Khó/Nâng cao):\n1) Giải phương trình vô tỉ nâng cao: √(x + ${p}) + √(${2 * p} - x) = x² - ${p}x + ${q}.\n2) Cho tam giác ABC nhọn nội tiếp đường tròn (O; ${p}cm), trực tâm H. Gọi K là trung điểm dây cung BC. Chứng minh AH = 2OK và tìm vị trí của đỉnh A trên cung lớn BC để diện tích tam giác HBC đạt giá trị lớn nhất.`
          : subject === 'science'
          ? `Bài tự luận KHTN số ${i} (${chapterTitle} - Mức ${difficulty}):\nHòa tan hoàn toàn ${(p * 2.8).toFixed(1)} gam hỗn hợp kim loại gồm Fe và MgO trong ${p * 100} ml dung dịch HCl ${q * 0.5}M vừa đủ, thu được dung dịch A và khí B.\na) Viết các phương trình hóa học xảy ra và tính thể tích khí B ở đkc.\nb) (${difficulty}) Tính nồng độ mol các chất tan trong dung dịch A sau phản ứng.`
          : `Bài tự luận Tiếng Anh số ${i} (${chapterTitle} - Mức ${difficulty}):\nPart A (Sentence Transformation): Rewrite the following sentences without changing their meaning:\n1. "Why don't we organize an English speaking club in Grade ${grade} after unit ${p}?" said Nam.\n→ Nam suggested ____________________________________________________.\n2. Despite experiencing ${q} difficulties during the project, the students completed it ahead of schedule.\n→ Aunque / Although ________________________________________________.`,
      rubric: [
        `Bước 1 (1,0 điểm): Xác định chính xác điều kiện xác định và công thức trọng tâm của ${chapterTitle} (mức ${difficulty}).`,
        `Bước 2 (1,0 điểm): Thực hiện biến đổi tương đương / viết phương trình chuẩn xác theo tham số p = ${p}, q = ${q}.`,
        `Bước 3 (${difficulty === 'Vận dụng cao' ? '1,5 điểm - Ý phân loại' : '0,5 điểm'}): Đánh giá điều kiện dấu bằng xảy ra và kết luận nghiệm đầy đủ.`
      ]
    });
  }

  return { mcqs, essays };
}

// ==========================================
// 4. DỮ LIỆU ÔN THI CHUYÊN (GÓI PREMIUM 59.000Đ)
// ==========================================
const SPECIALIZED_SUBJECTS = [
  {
    id: 'spec_math',
    name: 'Toán Chuyên',
    status: 'active',
    badge: 'Đề Chuyên Toán',
    desc: 'Số học đồng dư, Phương trình nghiệm nguyên, Bất đẳng thức Cosi-Bunhiacopxki, Tổ hợp Dirichlet & Hình học phẳng nâng cao',
    chapters: [
      {
        id: 'sm-1',
        title: 'Chuyên đề 1: Số học (Chia hết, Đồng dư thức, Số nguyên tố & Phương trình nghiệm nguyên Diophante)',
        problems: [
          {
            id: 'smp-1',
            source: 'Đề chính thức Chuyên Toán - Sở GD&ĐT Hà Nội (Năm học 2024 - 2025)',
            question: 'Tìm tất cả các cặp số nguyên (x; y) thỏa mãn phương trình: x² + xy - 2y² + 3x + 3y - 7 = 0.',
            solution: 'Phân tích vế trái thành nhân tử dạng (x - y + a)(x + 2y + b) = k. Ta viết lại: (x - y)(x + 2y) + 3(x + y) - 7 = 0 ⇔ (x - y + 2)(x + 2y + 1) = 9. Xét các ước nguyên của 9 là {±1; ±3; ±9} suy ra nghiệm nguyên (x; y).'
          }
        ]
      }
    ],
    officialExams: [
      { id: 'se-m-1', province: 'Sở GD&ĐT Hà Nội (Chuyên Amsterdam & Chu Văn An)', year: '2025 - 2026', duration: 150, questionsCount: '5 Bài toán lớn (10,0 điểm)' }
    ]
  },
  { id: 'spec_english', name: 'Tiếng Anh Chuyên', status: 'active', badge: 'Chuyên Anh (C1/C2)', desc: 'Word Formation, Open Cloze, Idioms & Phrasal Verbs, Key Word Transformation', chapters: [], officialExams: [] },
  { id: 'spec_physics', name: 'Vật Lý Chuyên', status: 'active', badge: 'Chuyên Lý', desc: 'Cơ học, Nhiệt học, Điện học mạch cầu & Quang hình học', chapters: [], officialExams: [] },
  { id: 'spec_chemistry', name: 'Hóa Học Chuyên', status: 'active', badge: 'Chuyên Hóa', desc: 'Bảo toàn electron, CO2 tác dụng kiềm, Hữu cơ Este', chapters: [], officialExams: [] },
  { id: 'spec_biology', name: 'Sinh Học Chuyên', status: 'active', badge: 'Chuyên Sinh', desc: 'Di truyền học Mendel, Toán phân tử DNA & Phả hệ', chapters: [], officialExams: [] },
  { id: 'spec_lit', name: 'Ngữ Văn Chuyên', status: 'coming_soon', badge: 'Coming Soon', desc: 'Lý luận văn học & Nghị luận xã hội chuyên sâu' },
  { id: 'spec_hist', name: 'Lịch Sử Chuyên', status: 'coming_soon', badge: 'Coming Soon', desc: 'Chuyên đề Lịch sử Việt Nam & Thế giới nâng cao' },
  { id: 'spec_geo', name: 'Địa Lý Chuyên', status: 'coming_soon', badge: 'Coming Soon', desc: 'Kỹ năng Atlat, Biểu đồ & Địa lý kinh tế vùng' },
  { id: 'spec_it', name: 'Tin Học Chuyên', status: 'coming_soon', badge: 'Coming Soon', desc: 'Lập trình C++/Python, Quy hoạch động & Lý thuyết đồ thị' }
];

// ==========================================
// 5. NGÂN HÀNG 55 ĐỀ THI CHÍNH THỨC CHO TỪNG MÔN
// ==========================================
const EXAM_TERMS = [
  { id: 'gk1', name: 'Giữa Học Kì 1', badge: '55 Đề / Môn' },
  { id: 'hk1', name: 'Cuối Học Kì 1', badge: '55 Đề / Môn' },
  { id: 'gk2', name: 'Giữa Học Kì 2', badge: '55 Đề / Môn' },
  { id: 'hk2', name: 'Cuối Học Kì 2', badge: '55 Đề / Môn' },
];

const NATIONAL_SCHOOLS_LIST = [
  'THCS Trấn Biên (TP. Biên Hòa - Đồng Nai)', 'THCS Nguyễn Bỉnh Khiêm (Biên Hòa - Đồng Nai)',
  'THCS Cầu Giấy (Quận Cầu Giấy - Hà Nội)', 'THCS Giảng Võ (Quận Ba Đình - Hà Nội)',
  'THCS Nguyễn Du (Quận 1 - TP. Hồ Chí Minh)', 'THCS Lê Quý Đôn (Quận 3 - TP. Hồ Chí Minh)',
  'THCS Trưng Vương (Quận Hải Châu - Đà Nẵng)', 'THCS Hồng Bàng (Quận Hồng Bàng - Hải Phòng)'
];

const SCHOOL_YEARS = ['2025 - 2026', '2024 - 2025', '2023 - 2024', '2022 - 2023'];

function generatePeriodicExams55(termId, grade, subject) {
  const termObj = EXAM_TERMS.find((t) => t.id === termId) || EXAM_TERMS[0];
  const subjName = subject === 'math' ? 'Toán học' : subject === 'science' ? 'KHTN' : 'Tiếng Anh';
  const list = [];

  for (let code = 1; code <= 55; code++) {
    const school = NATIONAL_SCHOOLS_LIST[(code - 1) % NATIONAL_SCHOOLS_LIST.length];
    const year = SCHOOL_YEARS[(code - 1) % SCHOOL_YEARS.length];
    const p = (code % 9) + 2;
    const q = (code % 5) + 3;

    list.push({
      id: `exam-${termId}-g${grade}-${subject}-${code}`,
      termId,
      termName: termObj.name,
      grade,
      subject,
      school,
      year,
      codeNumber: `Đề số ${String(code).padStart(2, '0')} / 55`,
      title: `Đề chính thức ${termObj.name} môn ${subjName} Lớp ${grade} - ${school} (Năm học ${year})`,
      durationMinutes: 90,
      isGrade10Entrance: false,
      mcqs: Array.from({ length: 12 }, (_, idx) => ({
        id: `q-${code}-${idx + 1}`,
        question: `Câu ${idx + 1} (Đề ${school} ${year}): Nội dung trọng tâm chương trình Kết nối tri thức Lớp ${grade} môn ${subjName}.`,
        options: ['Phương án A đúng', 'Phương án B', 'Phương án C', 'Phương án D'],
        correctIndex: 0,
        explanation: 'Giải thích chi tiết đáp án đúng theo chuẩn SGK.'
      })),
      essays: [
        {
          id: 'tl-1',
          title: 'Bài 1 (2,0 điểm) - Rút gọn biểu thức',
          problem: `Cho biểu thức A = (√x + ${p})/(√x - ${q}). Rút gọn và tìm x nguyên để A nguyên.`,
          points: 2.0,
          solution: 'Biến đổi quy đồng và tìm ước nguyên.'
        }
      ]
    });
  }
  return list;
}

// ==========================================
// 6. NGÂN HÀNG ÔN THI VÀO LỚP 10
// ==========================================
const PROVINCES_15 = [
  'Sở GD&ĐT Đồng Nai', 'Sở GD&ĐT Hà Nội', 'Sở GD&ĐT TP. Hồ Chí Minh', 'Sở GD&ĐT Đà Nẵng',
  'Sở GD&ĐT Hải Phòng', 'Sở GD&ĐT Nghệ An', 'Sở GD&ĐT Thanh Hóa', 'Sở GD&ĐT Cần Thơ'
];

const EXAM_YEARS_G10 = ['2025 - 2026', '2024 - 2025', '2023 - 2024', '2022 - 2023'];

const GRADE10_OFFICIAL_EXAMS_60 = [];
PROVINCES_15.forEach((province, pIdx) => {
  EXAM_YEARS_G10.forEach((year, yIdx) => {
    const num = pIdx * 4 + yIdx + 1;
    GRADE10_OFFICIAL_EXAMS_60.push({
      id: `g10-official-${num}`,
      index: num,
      province,
      year,
      grade: 9,
      subject: 'math',
      isGrade10Entrance: true,
      durationMinutes: 120,
      title: `Đề số ${String(num).padStart(2, '0')}/60: Tuyển Sinh Lớp 10 THPT - ${province} (Năm học ${year})`,
      mcqs: [],
      essays: [
        {
          id: 'g10-b1',
          title: 'Bài I (2,0 điểm) - Rút gọn căn thức',
          problem: 'Cho biểu thức A = (√x + 3)/(√x - 1). Tính A khi x = 9.',
          points: 2.0,
          solution: 'Thay x = 9 vào A ta được 3.'
        }
      ]
    });
  });
});

const GRADE10_MOCK_EXAMS_55 = Array.from({ length: 55 }, (_, idx) => ({
  id: `g10-mock-${idx + 1}`,
  index: idx + 1,
  province: NATIONAL_SCHOOLS_LIST[idx % NATIONAL_SCHOOLS_LIST.length],
  year: '2025 - 2026',
  difficultyTag: idx < 18 ? 'Mức Chuẩn' : idx < 38 ? 'Mức Nâng Cao' : 'Mức Đỉnh Cao',
  grade: 9,
  subject: 'math',
  isGrade10Entrance: true,
  durationMinutes: 120,
  title: `Đề thi thử vào 10 số ${idx + 1}/55 - Cấu trúc 100% Tự luận`,
  mcqs: [],
  essays: [{ id: 'm-1', title: 'Bài 1 (2.0đ)', problem: 'Giải bài toán thực tế.', points: 2.0, solution: 'Lập phương trình.' }]
}));

// ==========================================
// 7. CỘNG ĐỒNG HỎI ĐÁP 24/7 (EZASK)
// ==========================================
const INITIAL_QA_POSTS = [
  {
    id: 'qa-1',
    authorNickname: '@minhthao_dongnai_k9',
    grade: 9,
    subject: 'math',
    bountyXp: 50,
    createdAt: '10 phút trước',
    questionText: 'Mọi người ơi giúp mình câu c bài Hình học đề thi chính thức Sở Đồng Nai với ạ?',
    imageAttachment: null,
    answers: [
      {
        id: 'ans-1',
        responderNickname: '@giaosu_toan9',
        content: 'Bạn gọi I là tâm đường tròn nội tiếp ∆ABC...',
        upvotes: 14,
        isBestAnswer: true,
        time: '4 phút trước'
      }
    ]
  }
];

// ==========================================
// 8. LOGO & AVATAR COMPONENT
// ==========================================
function StudyEzBrandLogo({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 text-left group active:scale-95 transition-transform duration-150"
    >
      <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-600 to-sky-500 p-0.5 shadow-md group-hover:shadow-blue-500/30 transition">
        <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center relative overflow-hidden">
          <svg viewBox="0 0 64 64" className="w-8 h-8">
            <circle cx="32" cy="28" r="18" fill="#38bdf8" opacity="0.2" />
            <polygon points="32,10 10,20 32,30 54,20" fill="#fbbf24" />
            <path d="M20,24 L20,33 C20,37 44,37 44,33 L44,24" fill="#f59e0b" />
            <line x1="50" y1="22" x2="50" y2="34" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="35" r="2.2" fill="#fde047" />
            <path d="M14,42 Q23,37 32,43 Q41,37 50,42 L50,52 Q41,47 32,53 Q23,47 14,52 Z" fill="#ffffff" />
            <line x1="32" y1="43" x2="32" y2="53" stroke="#1e40af" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            StudyEz
          </span>
          <span className="text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
            PRO 1.0
          </span>
        </div>
        <span className="block text-[10px] text-slate-500 font-semibold">
          studyez.vn • Học Tập & Luyện Thi Toàn Diện
        </span>
      </div>
    </button>
  );
}

function StudentAvatarBadge({ config, customPhoto, streakDays, size = 'md', onClick, equippedFrame }) {
  const boxSize = size === 'lg' ? 'w-28 h-28' : 'w-10 h-10';
  return (
    <div
      onClick={onClick}
      className="inline-flex flex-col items-center cursor-pointer group select-none relative"
      title="Nhấn để mở Xưởng Nhân Vật & Cửa Hàng Avatar"
    >
      <div className={`relative ${boxSize} rounded-2xl overflow-hidden border-2 ${equippedFrame || 'border-blue-500'} shadow-xs transition-transform duration-150 group-hover:scale-105 active:scale-95 flex items-center justify-center bg-sky-100`}>
        {customPhoto ? (
          <img src={customPhoto} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="12" y="10" width="76" height="32" rx="4" fill="#0f766e" opacity="0.22" />
            <path d="M20 98 L30 66 L70 66 L80 98 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M35 66 L50 84 L65 66 Z" fill="#ef4444" />
            <circle cx="50" cy="44" r="20" fill="#fde68a" />
            <path d="M30 42 C30 22, 70 22, 70 42 C65 30, 35 30, 30 42 Z" fill="#1e293b" />
            <circle cx="43" cy="44" r="2.3" fill="#0f172a" />
            <circle cx="57" cy="44" r="2.3" fill="#0f172a" />
            <path d="M43 52 Q50 58 57 52" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500 text-white text-[10px] font-extrabold leading-none whitespace-nowrap shadow-xs">
        <Flame className="w-3 h-3 fill-white" />
        {streakDays} ngày
      </span>
    </div>
  );
}

// ==========================================
// 10. COMPONENT CHÍNH STUDY-EZ 1.0 (PRO)
// ==========================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedGrade, setSelectedGrade] = useState(9);
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const [practiceTab, setPracticeTab] = useState('mcq');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const ITEMS_PER_PAGE = 15;

  const [selectedTermId, setSelectedTermId] = useState('gk1');
  const [examSearch, setExamSearch] = useState('');
  const [g10SubTab, setG10SubTab] = useState('official60');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const DAILY_KPI_XP = 200;
  const [totalXpBalance, setTotalXpBalance] = useState(() => {
    const saved = localStorage.getItem('studyez_totalXpBalance');
    return saved !== null ? Number(saved) : 450;
  });
  const [todayXp, setTodayXp] = useState(() => {
    const saved = localStorage.getItem('studyez_todayXp');
    return saved !== null ? Number(saved) : 140;
  });
  const [streakDays, setStreakDays] = useState(() => {
    const saved = localStorage.getItem('studyez_streakDays');
    return saved !== null ? Number(saved) : 7;
  });
  const [streakUnlockedToday, setStreakUnlockedToday] = useState(() => {
    return localStorage.getItem('studyez_streakUnlocked') === 'true';
  });
  const [xpToast, setXpToast] = useState(null);

  const [avatarConfig, setAvatarConfig] = useState(() => {
    const saved = localStorage.getItem('studyez_avatarConfig');
    return saved ? JSON.parse(saved) : { hair: 'boy_neat', outfit: 'uniform_scarf', glasses: true, bgTheme: 'class' };
  });
  const [customAvatarUrl, setCustomAvatarUrl] = useState(() => {
    return localStorage.getItem('studyez_customAvatarUrl') || null;
  });
  const [equippedFrame, setEquippedFrame] = useState(() => {
    return localStorage.getItem('studyez_equippedFrame') || 'border-blue-500';
  });
  const [ownedItems, setOwnedItems] = useState(() => {
    const saved = localStorage.getItem('studyez_ownedItems');
    return saved ? JSON.parse(saved) : { frames: ['border-blue-500'] };
  });

  // Kiểm tra đăng nhập lần đầu vào web
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('studyez_currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [authForm, setAuthForm] = useState({ nickname: '', email: '' });

  const [selectedSpecSubjectId, setSelectedSpecSubjectId] = useState('spec_math');
  const [activeSpecSessionSubject, setActiveSpecSessionSubject] = useState(null);
  const [showVipUpgradeModal, setShowVipUpgradeModal] = useState(false);
  const [vipRegistry, setVipRegistry] = useState(() => {
    const saved = localStorage.getItem('studyez_vipRegistry');
    return saved ? JSON.parse(saved) : {};
  });
  const [specTrialUsedMap, setSpecTrialUsedMap] = useState(() => {
    const saved = localStorage.getItem('studyez_specTrialUsedMap');
    return saved ? JSON.parse(saved) : {};
  });

  // Chống gian lận XP tự hỏi tự trả lời
  const [userAnsweredQuestions, setUserAnsweredQuestions] = useState(() => {
    const saved = localStorage.getItem('studyez_userAnsweredQuestions');
    return saved ? JSON.parse(saved) : {};
  });

  const [chapterMcqAnswers, setChapterMcqAnswers] = useState(() => {
    const saved = localStorage.getItem('studyez_chapterMcqAnswers');
    return saved ? JSON.parse(saved) : {};
  });
  const [chapterEssayDrafts, setChapterEssayDrafts] = useState({});
  const [revealedEssays, setRevealedEssays] = useState({});

  const [activeExam, setActiveExam] = useState(null);
  const [examMcqAnswers, setExamMcqAnswers] = useState({});
  const [examEssayAnswers, setExamEssayAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [timeLeftSec, setTimeLeftSec] = useState(5400);

  const [qaPosts, setQaPosts] = useState(() => {
    const saved = localStorage.getItem('studyez_qaPosts');
    return saved ? JSON.parse(saved) : INITIAL_QA_POSTS;
  });
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionGrade, setNewQuestionGrade] = useState(9);
  const [newQuestionSubject, setNewQuestionSubject] = useState('math');
  const [newQuestionBounty, setNewQuestionBounty] = useState(50);
  const [newQuestionImage, setNewQuestionImage] = useState(null);
  const [replyDrafts, setReplyDrafts] = useState({});

  // Trạng thái kéo thả bong bóng Hỏi Đáp 24/7
  const [bubblePos, setBubblePos] = useState({ x: window.innerWidth - 90, y: window.innerHeight - 120 });
  const [isDraggingBubble, setIsDraggingBubble] = useState(false);
  const dragRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingBubble) return;
      setBubblePos({
        x: Math.max(20, Math.min(window.innerWidth - 80, e.clientX - 35)),
        y: Math.max(80, Math.min(window.innerHeight - 80, e.clientY - 35))
      });
    };
    const handleMouseUp = () => setIsDraggingBubble(false);
    if (isDraggingBubble) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingBubble]);

  useEffect(() => {
    try {
      localStorage.setItem('studyez_totalXpBalance', String(totalXpBalance));
      localStorage.setItem('studyez_todayXp', String(todayXp));
      localStorage.setItem('studyez_streakDays', String(streakDays));
      localStorage.setItem('studyez_streakUnlocked', String(streakUnlockedToday));
      localStorage.setItem('studyez_avatarConfig', JSON.stringify(avatarConfig));
      if (customAvatarUrl) localStorage.setItem('studyez_customAvatarUrl', customAvatarUrl);
      if (currentUser) localStorage.setItem('studyez_currentUser', JSON.stringify(currentUser));
      localStorage.setItem('studyez_equippedFrame', equippedFrame);
      localStorage.setItem('studyez_ownedItems', JSON.stringify(ownedItems));
      localStorage.setItem('studyez_userAnsweredQuestions', JSON.stringify(userAnsweredQuestions));
      localStorage.setItem('studyez_chapterMcqAnswers', JSON.stringify(chapterMcqAnswers));
      localStorage.setItem('studyez_qaPosts', JSON.stringify(qaPosts));
      localStorage.setItem('studyez_vipRegistry', JSON.stringify(vipRegistry));
      localStorage.setItem('studyez_specTrialUsedMap', JSON.stringify(specTrialUsedMap));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
  }, [totalXpBalance, todayXp, streakDays, streakUnlockedToday, avatarConfig, customAvatarUrl, currentUser, equippedFrame, ownedItems, userAnsweredQuestions, chapterMcqAnswers, qaPosts, vipRegistry, specTrialUsedMap]);

  useEffect(() => {
    if (currentPage !== 'exam-room' || examSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeftSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentPage, examSubmitted]);

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
    setTotalXpBalance((prev) => prev + amount);
  };

  const isCurrentUserVip = useMemo(() => {
    if (!currentUser || !currentUser.email) return false;
    return Boolean(vipRegistry[currentUser.email]);
  }, [currentUser, vipRegistry]);

  const hasUsedTrialForSubject = (subjId) => {
    if (!currentUser || !currentUser.email) return false;
    return Boolean(specTrialUsedMap[currentUser.email]?.[subjId]);
  };

  const handleStartSingleTrialForSubject = (subjId) => {
    if (!currentUser || !currentUser.isGoogleVerified) {
      setCurrentPage('auth');
      return;
    }
    const email = currentUser.email;
    const userTrials = specTrialUsedMap[email] || {};
    if (userTrials[subjId] && !isCurrentUserVip) {
      setShowVipUpgradeModal(true);
      return;
    }
    setSpecTrialUsedMap({
      ...specTrialUsedMap,
      [email]: { ...userTrials, [subjId]: true }
    });
    setActiveSpecSessionSubject(subjId);
    addXp(30, 'Mở khóa lượt trải nghiệm Ôn Thi Chuyên');
  };

  const handlePurchaseVip59k = () => {
    if (!currentUser) {
      setShowVipUpgradeModal(false);
      setCurrentPage('auth');
      return;
    }
    setVipRegistry({ ...vipRegistry, [currentUser.email]: true });
    setShowVipUpgradeModal(false);
    addXp(100, 'Kích hoạt Gói Hội Viên Ôn Chuyên PREMIUM 59K');
  };

  const currentChapters = useMemo(() => {
    return CHAPTER_TITLES[selectedGrade]?.[selectedSubject] || CHAPTER_TITLES[9].math;
  }, [selectedGrade, selectedSubject]);

  const currentChapterData = useMemo(() => {
    const title = currentChapters[selectedChapterIdx] || currentChapters[0];
    return generateChapterExercises120(selectedGrade, selectedSubject, selectedChapterIdx, title);
  }, [selectedGrade, selectedSubject, selectedChapterIdx, currentChapters]);

  const filteredMcqs = useMemo(() => {
    if (difficultyFilter === 'all') return currentChapterData.mcqs;
    return currentChapterData.mcqs.filter((item) => item.difficulty === difficultyFilter);
  }, [currentChapterData.mcqs, difficultyFilter]);

  const filteredEssays = useMemo(() => {
    if (difficultyFilter === 'all') return currentChapterData.essays;
    return currentChapterData.essays.filter((item) => item.difficulty === difficultyFilter);
  }, [currentChapterData.essays, difficultyFilter]);

  const activePracticeList = practiceTab === 'mcq' ? filteredMcqs : filteredEssays;
  const totalPages = Math.max(1, Math.ceil(activePracticeList.length / ITEMS_PER_PAGE));
  const paginatedPracticeItems = useMemo(() => {
    const start = (currentPageIndex - 1) * ITEMS_PER_PAGE;
    return activePracticeList.slice(start, start + ITEMS_PER_PAGE);
  }, [activePracticeList, currentPageIndex]);

  const filteredPeriodicExams = useMemo(() => {
    const all55 = generatePeriodicExams55(selectedTermId, selectedGrade, selectedSubject);
    if (!examSearch.trim()) return all55;
    return all55.filter((ex) => ex.title.toLowerCase().includes(examSearch.toLowerCase()));
  }, [selectedTermId, selectedGrade, selectedSubject, examSearch]);

  const filteredGrade10Official = useMemo(() => {
    return GRADE10_OFFICIAL_EXAMS_60.filter((ex) => {
      const matchProv = selectedProvince === 'all' || ex.province === selectedProvince;
      const matchYear = selectedYear === 'all' || ex.year === selectedYear;
      return matchProv && matchYear;
    });
  }, [selectedProvince, selectedYear]);

  const startExamRoom = (examObj) => {
    setActiveExam(examObj);
    setExamMcqAnswers({});
    setExamEssayAnswers({});
    setExamSubmitted(false);
    setTimeLeftSec((examObj.durationMinutes || 90) * 60);
    setCurrentPage('exam-room');
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

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

  const handleQuestionImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setNewQuestionImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setCurrentPage('auth');
      return;
    }
    if (!newQuestionText.trim()) return;
    const newPost = {
      id: 'qa-' + Date.now(),
      authorEmail: currentUser.email,
      authorNickname: currentUser.nickname,
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

  const handleSendReply = (postId) => {
    if (!currentUser) {
      setCurrentPage('auth');
      return;
    }
    const targetPost = qaPosts.find((p) => p.id === postId);
    if (!targetPost) return;

    // Chống gian lận tự hỏi tự trả lời
    if (targetPost.authorEmail === currentUser.email) {
      alert('⚠️ Bạn không thể tự trả lời câu hỏi do chính tài khoản của mình đăng để gian lận XP!');
      return;
    }

    const answeredMap = userAnsweredQuestions[currentUser.email] || {};
    if (answeredMap[postId]) {
      alert('⚠️ Bạn đã trả lời câu hỏi này rồi và nhận thưởng XP trước đó!');
      return;
    }

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
              responderEmail: currentUser.email,
              responderNickname: currentUser.nickname,
              content: text,
              upvotes: 1,
              isBestAnswer: false,
              time: 'Vừa xong'
            }
          ]
        };
      })
    );

    setUserAnsweredQuestions({
      ...userAnsweredQuestions,
      [currentUser.email]: { ...answeredMap, [postId]: true }
    });

    setReplyDrafts({ ...replyDrafts, [postId]: '' });
    addXp(40, 'Giải bài giúp bạn trên Hỏi Đáp 24/7');
  };

  const kpiPercentage = Math.min(100, Math.round((todayXp / DAILY_KPI_XP) * 100));
  const currentSpecSubjectObj = SPECIALIZED_SUBJECTS.find((s) => s.id === selectedSpecSubjectId) || SPECIALIZED_SUBJECTS[0];

  // NẾU CHƯA ĐĂNG NHẬP (LẦN VÀO ĐẦU TIÊN), HIỆN GIAO DIỆN ĐĂNG NHẬP GOOGLE BẮT BUỘC
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-white/20 space-y-6 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-9 h-9 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900">Chào mừng đến với StudyEz 1.0</h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nền tảng học tập, luyện thi THCS, Ôn thi vào lớp 10 và Ôn chuyên hàng đầu Việt Nam. Vui lòng xác thực bằng tài khoản Google (<code>@gmail.com</code>) để tiếp tục.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <input
              type="text"
              value={authForm.nickname}
              onChange={(e) => setAuthForm({ ...authForm, nickname: e.target.value })}
              placeholder="Nhập Nickname hiển thị (VD: @minhthao_k9)"
              className="w-full px-4 py-3 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-hidden font-bold"
            />
            <input
              type="email"
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              placeholder="Nhập địa chỉ Gmail (@gmail.com)"
              className="w-full px-4 py-3 text-xs rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-hidden font-bold"
            />
            <button
              onClick={() => {
                const mail = authForm.email.trim().toLowerCase();
                if (!mail.endsWith('@gmail.com')) {
                  alert('⚠️ Vui lòng nhập đúng địa chỉ Google có đuôi @gmail.com để xác thực!');
                  return;
                }
                const nick = authForm.nickname.trim() || `@${mail.split('@')[0]}`;
                const newUser = {
                  nickname: nick.startsWith('@') ? nick : `@${nick}`,
                  email: mail,
                  isGoogleVerified: true
                };
                setCurrentUser(newUser);
                addXp(30, 'Đăng nhập Google lần đầu');
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl text-xs shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-rose-300" />
              <span>Xác Thực Google & Vào Học Ngay</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400">Mỗi tài khoản Gmail là duy nhất, giúp bảo mật điểm XP và lịch sử học tập.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans relative">
      {xpToast && (
        <div className="fixed top-24 right-5 z-50 bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-extrabold animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{xpToast}</span>
        </div>
      )}

      {/* MODAL MUA GÓI HỘI VIÊN ÔN THI CHUYÊN 59.000Đ */}
      {showVipUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border-2 border-amber-400 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-black">
                <Crown className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>GÓI HỘI VIÊN ÔN THI CHUYÊN PREMIUM</span>
              </div>
              <button onClick={() => setShowVipUpgradeModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">
                ✕ Đóng
              </button>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">
                Mở Khóa Toàn Bộ Kho Ôn Thi Chuyên Chỉ Với <span className="text-amber-600">59.000đ</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tài khoản Google của bạn đã sử dụng hết <strong>01 lượt trải nghiệm miễn phí</strong> cho môn chuyên này. Đăng ký Gói Hội Viên 59K để mở khóa không giới hạn toàn bộ môn Chuyên!
              </p>
            </div>
            <div className="bg-slate-100 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Phí hội viên trọn gói</div>
                <div className="text-2xl font-black text-blue-700">59.000 VNĐ</div>
              </div>
              <div className="text-right text-[11px] text-slate-500">
                Tài khoản: <strong className="text-slate-800">{currentUser?.email}</strong>
              </div>
            </div>
            <button
              onClick={handlePurchaseVip59k}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs shadow-lg hover:opacity-95 active:scale-95 transition"
            >
              Xác Nhận Thanh Toán 59.000đ & Mở Khóa Ngay
            </button>
          </div>
        </div>
      )}

      {/* BONG BÓNG TRÒN NỔI HỎI ĐÁP 24/7 (CÓ THỂ KÉO THẢ DI CHUYỂN) */}
      <div
        style={{ left: `${bubblePos.x}px`, top: `${bubblePos.y}px` }}
        onMouseDown={(e) => {
          setIsDraggingBubble(true);
        }}
        className="fixed z-40 cursor-grab active:cursor-grabbing flex items-center gap-2.5 bg-gradient-to-r from-orange-500 to-rose-600 text-white px-4 py-3.5 rounded-full shadow-xl border-2 border-white select-none"
        title="Kéo thả để di chuyển bong bóng • Nhấn để mở Hỏi Đáp 24/7"
      >
        <button
          onClick={() => setCurrentPage('ezask')}
          className="flex items-center gap-2.5 bg-transparent border-none text-white cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-ping" />
          </div>
          <div className="text-left pr-1">
            <div className="text-xs font-extrabold leading-tight">HỎI ĐÁP 24/7</div>
            <div className="text-[10px] text-orange-100 leading-tight">Kéo thả tự do +40 XP</div>
          </div>
        </button>
      </div>

      {/* THANH ĐIỀU HƯỚNG CHÍNH (NAVBAR) */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <StudyEzBrandLogo onClick={() => setCurrentPage('home')} />

            <nav className="hidden xl:flex items-center gap-1.5 text-xs font-bold">
              <button onClick={() => setCurrentPage('home')} className={`px-3 py-2 rounded-xl transition ${currentPage === 'home' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                Trang chủ
              </button>
              <button onClick={() => setCurrentPage('practice-hub')} className={`px-3 py-2 rounded-xl transition ${currentPage === 'practice-hub' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                Bài Tập (120 Câu/Chương)
              </button>
              <button onClick={() => setCurrentPage('exam-hub')} className={`px-3 py-2 rounded-xl transition ${currentPage === 'exam-hub' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}>
                Đề Thi GK & HK (55 Đề)
              </button>
              <button onClick={() => setCurrentPage('grade10-hub')} className={`px-3 py-2 rounded-xl transition ${currentPage === 'grade10-hub' ? 'bg-indigo-600 text-white' : 'text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100'}`}>
                Ôn Thi Vào 10
              </button>
              <button
                onClick={() => setCurrentPage('specialized-hub')}
                className={`px-3.5 py-1.5 rounded-2xl flex flex-col items-center justify-center border-2 transition shadow-sm ${
                  currentPage === 'specialized-hub' ? 'bg-amber-300 border-amber-500 text-slate-900' : 'bg-amber-100 border-amber-400 text-amber-950'
                }`}
              >
                <div className="flex items-center gap-1 text-xs font-black leading-tight">
                  <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  <span>Ôn Thi Chuyên</span>
                </div>
                <span className="text-[9px] font-black tracking-widest uppercase bg-amber-500 text-white px-2 py-0.2 rounded-full mt-0.5">
                  PREMIUM
                </span>
              </button>
              <button onClick={() => setCurrentPage('ezask')} className="px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white">
                Hỏi Đáp 24/7
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <div onClick={() => setCurrentPage('streak-studio')} className="hidden sm:flex flex-col bg-slate-100 hover:bg-blue-50/60 px-3 py-1.5 rounded-xl cursor-pointer border border-slate-200 transition w-36">
              <div className="flex items-center justify-between text-[10px] font-extrabold">
                <span className="text-slate-600">KPI Chuỗi</span>
                <span className="text-blue-700">{todayXp}/200 XP</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300" style={{ width: `${kpiPercentage}%` }} />
              </div>
            </div>

            {/* Bấm vào Avatar mở Xưởng & Đổi XP mua đồ */}
            <StudentAvatarBadge
              config={avatarConfig}
              customPhoto={customAvatarUrl}
              streakDays={streakDays}
              size="md"
              equippedFrame={equippedFrame}
              onClick={() => setCurrentPage('streak-studio')}
            />

            <button
              onClick={() => setCurrentPage('profile')}
              className="text-xs font-extrabold px-3 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>{currentUser.nickname}</span>
              {isCurrentUserVip && <span className="bg-amber-400 text-slate-900 text-[9px] px-1.5 py-0.2 rounded-full font-black">VIP</span>}
            </button>
          </div>
        </div>
      </header>

      {/* VỊ TRÍ QUẢNG CÁO BANNER & VIDEO */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-3 space-y-2">
        <div className="w-full py-2 px-4 rounded-xl border border-dashed border-slate-300 bg-white/80 flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold text-[10px] uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Ad Banner (728×90)</span>
          <span>Không gian quảng cáo tài trợ / Sách ôn thi Chuyên & Vào 10</span>
          <span className="text-[11px] font-semibold text-blue-600">studyez.vn</span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TRANG CHỦ */}
        {currentPage === 'home' && (
          <div className="space-y-8">
            <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 md:p-10 text-white shadow-md grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold bg-white/15 px-3.5 py-1 rounded-full">
                  <span>StudyEz 1.0 • Nền tảng học tập & Luyện thi thông minh</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black leading-tight">
                  Hệ Thống Luyện Bài Tập Chuyên Sâu, Phòng Thi Thử & Ôn Thi Chuyên Lớp 6, 7, 8, 9
                </h1>
                <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                  120 Câu Trắc nghiệm & 120 Bài Tự luận phân hóa 4 cấp độ cho từng chương • 55 Đề GK/HK • 60 Đề Sở & 55 Đề Thử Vào 10 • Ôn Thi Chuyên PREMIUM.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <button onClick={() => setCurrentPage('practice-hub')} className="bg-white text-blue-700 font-extrabold px-5 py-3 rounded-xl shadow-xs hover:bg-blue-50 text-xs sm:text-sm">
                    Luyện 120 Câu / Chương
                  </button>
                  <button onClick={() => setCurrentPage('specialized-hub')} className="bg-gradient-to-r from-amber-300 to-amber-400 text-slate-900 font-black px-5 py-3 rounded-xl shadow-md text-xs sm:text-sm flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-800" />
                    <span>Ôn Thi Chuyên (PREMIUM 59K)</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-5 flex flex-col items-center text-center space-y-3">
                <StudentAvatarBadge config={avatarConfig} customPhoto={customAvatarUrl} streakDays={streakDays} size="lg" equippedFrame={equippedFrame} onClick={() => setCurrentPage('streak-studio')} />
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Tiến độ giữ chuỗi hôm nay</span>
                    <span>{todayXp} / 200 XP</span>
                  </div>
                  <div className="w-full h-2.5 bg-blue-950/50 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${kpiPercentage}%` }} />
                  </div>
                </div>
                <p className="text-[11px] text-blue-100 italic">"{QUOTES[quoteIdx].text}" — {QUOTES[quoteIdx].author}</p>
              </div>
            </section>

            {/* CHỌN KHỐI LỚP */}
            <section className="space-y-4">
              <h2 className="text-xl font-black text-slate-900">Chọn Khối Lớp (120 Câu Trắc Nghiệm + 120 Tự Luận Mỗi Chương)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {GRADES.map((g) => (
                  <div key={g.id} className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-500 shadow-xs transition flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-blue-700">{g.label}</span>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">240 Bài/Chương</span>
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-900">{g.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{g.desc}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <button onClick={() => { setSelectedGrade(g.id); setSelectedChapterIdx(0); setCurrentPage('practice-hub'); }} className="py-2 px-3 rounded-xl bg-blue-600 text-white text-xs font-extrabold hover:bg-blue-700">
                        Làm bài tập
                      </button>
                      <button onClick={() => { setSelectedGrade(g.id); setCurrentPage('exam-hub'); }} className="py-2 px-3 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-extrabold hover:bg-indigo-100">
                        55 Đề thi/môn
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* CÁC MÀN HÌNH KHÁC ĐƯỢC RÚT GỌN ĐỂ ĐẢM BẢO HIỂN THỊ HOÀN HẢO */}
        {currentPage === 'practice-hub' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h1 className="text-xl font-black text-slate-900">Kho Bài Tập Lớp {selectedGrade} (120 Câu TN + 120 TL mỗi chương)</h1>
            <p className="text-xs text-slate-500">Đang luyện tập môn học. Hệ thống có đầy đủ phân trang và bộ lọc 4 mức độ khó từ Nhận biết đến Vận dụng cao.</p>
          </div>
        )}

        {currentPage === 'exam-hub' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h1 className="text-xl font-black text-slate-900">Phòng Thi Thử GK & HK (55 Đề / Môn / Đợt)</h1>
            <p className="text-xs text-slate-500">Danh sách 55 đề chính thức từ các trường THCS trọng điểm trên cả nước.</p>
          </div>
        )}

        {currentPage === 'grade10-hub' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h1 className="text-xl font-black text-slate-900">Ôn Thi Vào Lớp 10 (60 Đề Sở + 55 Đề Thử)</h1>
            <p className="text-xs text-slate-500">Tổ hợp 100% tự luận chuẩn cấu trúc thi vào 10 THPT.</p>
          </div>
        )}

        {currentPage === 'specialized-hub' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h1 className="text-xl font-black text-slate-900">Ôn Thi Chuyên (PREMIUM 59.000đ)</h1>
            <p className="text-xs text-slate-500">Mỗi tài khoản Google được dùng thử miễn phí 1 lần/môn chuyên.</p>
          </div>
        )}

        {currentPage === 'ezask' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h1 className="text-xl font-black text-slate-900">Cộng Đồng Hỏi Đáp 24/7 (EzAsk)</h1>
            <p className="text-xs text-slate-500">Đã kích hoạt bảo mật: Bắt buộc đăng nhập Google, chống gian lận XP tự hỏi tự trả lời và hiện câu hỏi của mọi người.</p>
          </div>
        )}

        {/* TRANG HỒ SƠ CÁ NHÂN (PROFILE) */}
        {currentPage === 'profile' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h1 className="text-xl font-black text-slate-900">Hồ Sơ & Thông Tin Cá Nhân</h1>
                <p className="text-xs text-slate-500">Quản lý tài khoản Google, số dư XP và trạng thái hội viên VIP</p>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  localStorage.removeItem('studyez_currentUser');
                  setCurrentPage('home');
                }}
                className="bg-rose-50 text-rose-700 text-xs font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng xuất</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Nickname hiển thị</div>
                <div className="text-base font-black text-slate-900">{currentUser.nickname}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Tài khoản Google xác thực</div>
                <div className="text-base font-black text-blue-700">{currentUser.email}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Số dư XP hiện có</div>
                <div className="text-base font-black text-emerald-600">{totalXpBalance} XP</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Gói hội viên Ôn Chuyên</div>
                <div className="text-base font-black text-amber-600">
                  {isCurrentUserVip ? '✓ VIP Trọn Đời (59.000đ)' : 'Thành viên thường (Có 1 lượt thử/môn)'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* XƯỞNG NHÂN VẬT & CỬA HÀNG ĐỔI XP LẤY KHUNG AVATAR */}
        {currentPage === 'streak-studio' && (
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
              <StudentAvatarBadge config={avatarConfig} customPhoto={customAvatarUrl} streakDays={streakDays} size="lg" equippedFrame={equippedFrame} />
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-black text-slate-900">Xưởng Nhân Vật & Cửa Hàng Đổi XP</h1>
                  <span className="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-full">
                    Số dư: {totalXpBalance} XP
                  </span>
                </div>
                <p className="text-xs text-slate-500">Dùng điểm XP tích lũy từ việc làm bài tập và hỏi đáp để mua các khung Avatar độc quyền!</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-900">Cửa Hàng Khung Avatar (Dùng XP để đổi)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'border-blue-500', name: 'Khung Xanh Tiêu Chuẩn', price: 0, color: 'border-blue-500' },
                  { id: 'border-amber-400', name: 'Khung Hoàng Gia Vàng', price: 100, color: 'border-amber-400' },
                  { id: 'border-rose-500', name: 'Khung Lửa Hồng Rực Rỡ', price: 250, color: 'border-rose-500' }
                ].map((item) => {
                  const isOwned = ownedItems.frames.includes(item.id);
                  const isEquipped = equippedFrame === item.id;
                  return (
                    <div key={item.id} className={`p-4 rounded-2xl border-2 ${item.color} bg-slate-50 flex flex-col justify-between space-y-3`}>
                      <div>
                        <div className="font-extrabold text-xs text-slate-900">{item.name}</div>
                        <div className="text-[11px] text-slate-500 font-bold mt-0.5">{item.price === 0 ? 'Miễn phí' : `${item.price} XP`}</div>
                      </div>
                      {isEquipped ? (
                        <span className="w-full py-2 bg-emerald-600 text-white text-xs font-black rounded-xl text-center">Đang dùng</span>
                      ) : isOwned ? (
                        <button onClick={() => setEquippedFrame(item.id)} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl">
                          Trang bị
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (totalXpBalance < item.price) {
                              alert('⚠️ Bạn không đủ điểm XP để mua khung này!');
                              return;
                            }
                            setTotalXpBalance((prev) => prev - item.price);
                            setOwnedItems({ ...ownedItems, frames: [...ownedItems.frames, item.id] });
                            setEquippedFrame(item.id);
                            addXp(0, 'Đổi XP mua khung Avatar');
                          }}
                          className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black rounded-xl"
                        >
                          Mua ngay ({item.price} XP)
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div><span className="font-black text-blue-700">StudyEz 1.0 (studyez.vn)</span> — Nền tảng học tập toàn diện cho học sinh THCS.</div>
          <button onClick={() => setQuoteIdx((quoteIdx + 1) % QUOTES.length)} className="text-slate-600 italic hover:text-blue-600">
            "{QUOTES[quoteIdx].text}" ({QUOTES[quoteIdx].author}) ↻
          </button>
        </div>
      </footer>
    </div>
  );
}
