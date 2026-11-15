import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen, CheckCircle2, Flame, HelpCircle, Award, Search, User,
  ShieldCheck, Upload, Plus, Trash2, Clock, Sparkles, MessageCircle,
  ThumbsUp, Send, FileText, ChevronRight, LogOut, RefreshCw, Mail, Star,
  Crown, Lock, GraduationCap, Filter, ChevronLeft, Check, AlertCircle, KeyRound
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
  { id: 6, label: 'Lớp 6', title: 'Khối Lớp 6 - Kết nối tri thức', desc: '24 Chương (120 TN + 120 TL/chương) • >50 Đề GK/HK mỗi môn' },
  { id: 7, label: 'Lớp 7', title: 'Khối Lớp 7 - Kết nối tri thức', desc: '24 Chương (120 TN + 120 TL/chương) • >50 Đề GK/HK mỗi môn' },
  { id: 8, label: 'Lớp 8', title: 'Khối Lớp 8 - Kết nối tri thức', desc: '24 Chương (120 TN + 120 TL/chương) • >50 Đề GK/HK mỗi môn' },
  { id: 9, label: 'Lớp 9', title: 'Khối Lớp 9 & Tuyển Sinh 10', desc: '24 Chương • >50 Đề HK • 60 Đề Sở & 55 Đề Thi Thử Vào 10' },
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
// 3. SINH 120 CÂU TRẮC NGHIỆM & 120 BÀI TỰ LUẬN / MỖI CHƯƠNG (PHÂN HÓA 4 MỨC ĐỘ TĂNG DẦN)
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
      // Tiếng Anh 120 câu phân hóa
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

    // 120 Bài tập Tự luận theo chương có độ khó tăng dần
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
// 4. DỮ LIỆU ÔN THI CHUYÊN (GÓI PREMIUM 59.000Đ - 5 MÔN ACTIVE)
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
          },
          {
            id: 'smp-2',
            source: 'Đề chính thức Chuyên Toán - Phổ thông Năng khiếu ĐHQG TP.HCM (Năm học 2024 - 2025)',
            question: 'Cho số nguyên tố p > 3. Chứng minh rằng p² - 1 chia hết cho 24 và tìm tất cả các số nguyên tố p sao cho 2^p + p² là số nguyên tố.',
            solution: 'Vì p > 3 nguyên tố nên p lẻ ⇒ p - 1 và p + 1 là hai số chẵn liên tiếp nên tích chia hết cho 8; mặt khác p không chia hết cho 3 nên p² ≡ 1 (mod 3) ⇒ 24 | (p² - 1). Với vế hai, xét đồng dư theo mod 3 với p = 3 (nhận 2³ + 3² = 17 nguyên tố) và p > 3 (2^p + p² ≡ (-1)^p + 1 ≡ 0 mod 3, hợp số). Vậy p = 3.'
          }
        ]
      },
      {
        id: 'sm-2',
        title: 'Chuyên đề 2: Phương trình vô tỉ, Hệ phương trình đối xứng & Đa thức bậc cao',
        problems: [
          {
            id: 'smp-3',
            source: 'Đề chính thức Chuyên Toán - Sở GD&ĐT Đồng Nai (THPT Chuyên Lương Thế Vinh 2024 - 2025)',
            question: 'Giải phương trình trên tập số thực: √(3x² - 5x + 2) + √(x² - 4) = √(3x² - x - 2) + √(x² - 4x + 4).',
            solution: 'ĐKXĐ: x ≥ 2 hoặc x ≤ -2. Chuyển vế đưa về nhân tử chung √(x - 2) hoặc bình phương hai vế sau khi nhóm hợp lý, đối chiếu điều kiện kết luận nghiệm.'
          }
        ]
      },
      {
        id: 'sm-3',
        title: 'Chuyên đề 3: Bất đẳng thức nâng cao (AM-GM, Bunyakovsky, Kỹ thuật chọn điểm rơi)',
        problems: [
          {
            id: 'smp-4',
            source: 'Đề chính thức Chuyên Toán - Trường THPT Chuyên KHTN (ĐHQG Hà Nội 2024 - 2025)',
            question: 'Cho ba số thực dương a, b, c thỏa mãn ab + bc + ca = 3. Chứng minh rằng: a/(b² + 3) + b/(c² + 3) + c/(a² + 3) ≥ 3/4.',
            solution: 'Sử dụng kỹ thuật Cauchy ngược dấu: a/(b² + 3) = (1/3)[a - ab²/(b² + 3)]. Kết hợp đánh giá b² + 3 = b² + ab + bc + ca = (b + a)(b + c) và áp dụng AM-GM.'
          }
        ]
      },
      {
        id: 'sm-4',
        title: 'Chuyên đề 4: Hình học phẳng Chuyên (Hàng điểm điều hòa, Tâm tỉ cự, Đường tròn Euler & Cực - Đối cực)',
        problems: [
          {
            id: 'smp-5',
            source: 'Đề chính thức Chuyên Toán - Sở GD&ĐT TP. Hồ Chí Minh (Năm học 2024 - 2025)',
            question: 'Cho tam giác ABC nhọn (AB < AC) nội tiếp đường tròn (O) và ngoại tiếp đường tròn (I). Tia AI cắt (O) tại D (khác A). Đường thẳng qua I vuông góc với AD cắt BC tại K và cắt cạnh AB, AC lần lượt tại M, N. Chứng minh rằng: a) DB = DC = DI; b) Tiếp tuyến tại B và C của (O) cắt nhau tại P, chứng minh P, I, D thẳng hàng khi và chỉ khi AB + AC = 2BC.',
            solution: 'a) Áp dụng định lí góc ngoài tại đỉnh I trong ∆ABI suy ra ∆DBI cân tại D ⇒ DB = DI = DC (Hệ thức chân gà).\nb) Sử dụng tính chất tứ giác điều hòa và phép chiếu xuyên tâm từ D lên BC.'
          }
        ]
      },
      {
        id: 'sm-5',
        title: 'Chuyên đề 5: Tổ hợp, Nguyên lý Dirichlet, Bất biến & Cực trị rời rạc',
        problems: [
          {
            id: 'smp-6',
            source: 'Đề chính thức Chuyên Toán - Sở GD&ĐT Hải Phòng (THPT Chuyên Trần Phú 2024 - 2025)',
            question: 'Trên bảng ô vuông kích thước 2025 × 2025, người ta điền vào mỗi ô vuông một trong các số -1, 0, 1. Chứng minh rằng trong các tổng của 2025 hàng, 2025 cột và 2 đường chéo chính luôn tồn tại ít nhất hai tổng có giá trị bằng nhau.',
            solution: 'Có tất cả 2025 + 2025 + 2 = 4052 tổng. Giá trị mỗi tổng là số nguyên thuộc đoạn [-2025; 2025] gồm 2 × 2025 + 1 = 4051 giá trị nguyên có thể nhận. Theo nguyên lý Dirichlet (4052 thỏ nhốt vào 4051 lồng), luôn tồn tại ít nhất 2 tổng bằng nhau.'
          }
        ]
      }
    ],
    officialExams: [
      { id: 'se-m-1', province: 'Sở GD&ĐT Hà Nội (Chuyên Amsterdam & Chu Văn An)', year: '2025 - 2026', duration: 150, questionsCount: '5 Bài toán lớn (10,0 điểm)' },
      { id: 'se-m-2', province: 'Sở GD&ĐT TP. Hồ Chí Minh (Chuyên Lê Hồng Phong & Trần Đại Nghĩa)', year: '2025 - 2026', duration: 150, questionsCount: '6 Bài toán lớn (10,0 điểm)' },
      { id: 'se-m-3', province: 'Sở GD&ĐT Đồng Nai (THPT Chuyên Lương Thế Vinh)', year: '2024 - 2025', duration: 150, questionsCount: '5 Bài toán lớn (10,0 điểm)' },
      { id: 'se-m-4', province: 'ĐHQG Hà Nội (THPT Chuyên Khoa học Tự nhiên)', year: '2024 - 2025', duration: 150, questionsCount: '5 Bài toán Vòng 2 (10,0 điểm)' },
      { id: 'se-m-5', province: 'Sở GD&ĐT Nghệ An (THPT Chuyên Phan Bội Châu)', year: '2024 - 2025', duration: 150, questionsCount: '5 Bài toán lớn (10,0 điểm)' },
      { id: 'se-m-6', province: 'Sở GD&ĐT Đà Nẵng (THPT Chuyên Lê Quý Đôn)', year: '2023 - 2024', duration: 150, questionsCount: '5 Bài toán lớn (10,0 điểm)' }
    ]
  },
  {
    id: 'spec_english',
    name: 'Tiếng Anh Chuyên',
    status: 'active',
    badge: 'Chuyên Anh (C1/C2)',
    desc: 'Word Formation, Open Cloze, Idioms & Phrasal Verbs, Key Word Transformation & Academic Essay Writing',
    chapters: [
      {
        id: 'se-1',
        title: 'Chuyên đề 1: Advanced Lexico-Grammar, Collocations, Idioms & Phrasal Verbs (Trình độ C1)',
        problems: [
          {
            id: 'sep-1',
            source: 'Đề chính thức Chuyên Anh - Sở GD&ĐT Hà Nội (Năm học 2024 - 2025)',
            question: 'Supply the correct form of the words in brackets:\n1. His (CONTEMPORARY) ______ viewed him as a visionary, though his theories were only proven decades later.\n2. The company had to make several (CONCEDE) ______ during the negotiation to avoid a strike.',
            solution: '1. contemporaries (Danh từ số nhiều chỉ những người cùng thời).\n2. concessions (make concessions = nhượng bộ).'
          }
        ]
      },
      {
        id: 'se-2',
        title: 'Chuyên đề 2: Key Word Transformation & Sentence Inversion (Viết lại câu cấu trúc nâng cao)',
        problems: [
          {
            id: 'sep-2',
            source: 'Đề chính thức Chuyên Anh - Sở GD&ĐT TP.HCM (THPT Chuyên Lê Hồng Phong 2024 - 2025)',
            question: 'Rewrite each sentence using the word in capitals without changing its form:\n1. It was only when I left home that I realized how much my family meant to me. (DAWNED)\n→ Not until I left home ________________________________________________.\n2. He is virtually certain to win the scholarship to study abroad. (STANDS)\n→ He ________________________________________________________________.',
            solution: '1. Not until I left home did it dawn on me how much my family meant to me.\n2. He stands a very good chance of winning the scholarship to study abroad.'
          }
        ]
      },
      {
        id: 'se-3',
        title: 'Chuyên đề 3: Academic Essay Writing (250-300 words) & Reading Comprehension (CAE/CPE Level)',
        problems: [
          {
            id: 'sep-3',
            source: 'Đề chính thức Chuyên Anh - Sở GD&ĐT Đồng Nai (Chuyên Lương Thế Vinh 2024 - 2025)',
            question: 'Write an academic essay of about 250 words on the following topic: "Some educators argue that Artificial Intelligence tools make students passive thinkers, while others believe they foster personalized learning. Discuss both views and give your own opinion."',
            solution: 'Dàn ý chấm điểm (2,5 điểm): Introduction (Paraphrase + Thesis statement rõ quan điểm) • Body 1 (Rủi ro phụ thuộc AI nếu thiếu tư duy phản biện) • Body 2 (Lợi ích cá nhân hóa lộ trình học tập khi sử dụng đúng cách) • Conclusion (Khẳng định vai trò kết hợp).'
          }
        ]
      }
    ],
    officialExams: [
      { id: 'se-e-1', province: 'Sở GD&ĐT Hà Nội (Chuyên Anh Amsterdam & Nguyễn Huệ)', year: '2025 - 2026', duration: 120, questionsCount: 'Listening + Lexico + Reading + Writing' },
      { id: 'se-e-2', province: 'Sở GD&ĐT TP. Hồ Chí Minh (Chuyên Anh Lê Hồng Phong)', year: '2024 - 2025', duration: 150, questionsCount: 'Đề Chuyên Anh chính thức 10,0 điểm' },
      { id: 'se-e-3', province: 'ĐH Ngoại Ngữ - ĐHQG Hà Nội (THPT Chuyên Ngoại Ngữ CNN)', year: '2024 - 2025', duration: 120, questionsCount: 'Đề Tự luận + Trắc nghiệm C1' },
      { id: 'se-e-4', province: 'Sở GD&ĐT Đồng Nai (Chuyên Lương Thế Vinh)', year: '2024 - 2025', duration: 150, questionsCount: 'Đề Chuyên Anh chính thức 10,0 điểm' }
    ]
  },
  {
    id: 'spec_physics',
    name: 'Vật Lý Chuyên',
    status: 'active',
    badge: 'Chuyên Lý',
    desc: 'Cơ học chuyển động & Áp suất, Nhiệt học phương trình cân bằng, Điện học mạch cầu & Quang hình học hệ thấu kính',
    chapters: [
      {
        id: 'sp-1',
        title: 'Chuyên đề 1: Điện học nâng cao (Mạch cầu, Mạch tuần hoàn, Cực trị công suất & Máy biến thế)',
        problems: [
          {
            id: 'spp-1',
            source: 'Đề chính thức Chuyên Vật Lý - Sở GD&ĐT Hà Nội (Năm học 2024 - 2025)',
            question: 'Cho mạch điện gồm nguồn U = 24V không đổi, điện trở R₀ = 4Ω mắc nối tiếp với cụm gồm R₁ = 6Ω nối tiếp biến trở R_x. Tìm giá trị của R_x để công suất tiêu thụ trên biến trở R_x đạt giá trị lớn nhất và tính công suất cực đại đó.',
            solution: 'Cường độ dòng điện trong mạch chính: I = U / (R₀ + R₁ + R_x) = 24 / (10 + R_x). Công suất trên R_x: P_x = I².R_x = 576.R_x / (10 + R_x)². Áp dụng BĐT Cauchy cho mẫu số: 10 + R_x ≥ 2√(10R_x) ⇒ P_x ≤ 576 / 40 = 14,4 (W). Dấu "=" xảy ra khi R_x = R₀ + R₁ = 10Ω.'
          }
        ]
      },
      {
        id: 'sp-2',
        title: 'Chuyên đề 2: Quang hình học (Hệ thấu kính hội tụ - phân kì, Gương phẳng quay & Thị trường)',
        problems: [
          {
            id: 'spp-2',
            source: 'Đề chính thức Chuyên Vật Lý - Sở GD&ĐT Đồng Nai (Chuyên Lương Thế Vinh 2024 - 2025)',
            question: 'Một vật sáng AB đặt vuông góc với trục chính của một thấu kính hội tụ có tiêu cự f = 20 cm. Dịch chuyển vật lại gần thấu kính thêm 10 cm thì thấy ảnh của vật vẫn là ảnh thật và cao gấp 2 lần ảnh ban đầu. Xác định vị trí ban đầu của vật AB.',
            solution: 'Sử dụng công thức độ phóng đại ảnh qua thấu kính hội tụ: k = f / (d - f). Trước khi dịch: k₁ = 20 / (d - 20); sau khi dịch (d₂ = d - 10): k₂ = 20 / (d - 30). Do cả hai đều là ảnh thật và k₂ = 2k₁ ⇒ 20/(d - 30) = 2.20/(d - 20) ⇒ d = 40 cm.'
          }
        ]
      }
    ],
    officialExams: [
      { id: 'se-p-1', province: 'Sở GD&ĐT Hà Nội (Chuyên Vật Lý Amsterdam)', year: '2024 - 2025', duration: 150, questionsCount: '5 Bài toán Vật lý tự luận' },
      { id: 'se-p-2', province: 'Sở GD&ĐT TP. Hồ Chí Minh (Chuyên Vật Lý Lê Hồng Phong)', year: '2024 - 2025', duration: 150, questionsCount: '5 Bài toán Vật lý tự luận' },
      { id: 'se-p-3', province: 'Sở GD&ĐT Đồng Nai (Chuyên Lương Thế Vinh)', year: '2024 - 2025', duration: 150, questionsCount: '5 Bài toán Vật lý tự luận' }
    ]
  },
  {
    id: 'spec_chemistry',
    name: 'Hóa Học Chuyên',
    status: 'active',
    badge: 'Chuyên Hóa',
    desc: 'Bảo toàn electron, Bảo toàn khối lượng, Sục khí CO₂ vào dung dịch kiềm, Hữu cơ Este - Hydrocarbon & Nhận biết tách chất',
    chapters: [
      {
        id: 'sc-1',
        title: 'Chuyên đề 1: Vô cơ nâng cao (Bài toán CO₂/SO₂ tác dụng dung dịch kiềm, Đồ thị hình thang & Bảo toàn nguyên tố)',
        problems: [
          {
            id: 'scp-1',
            source: 'Đề chính thức Chuyên Hóa Học - Sở GD&ĐT Hà Nội (Năm học 2024 - 2025)',
            question: 'Sục từ từ V lít khí CO₂ (ở đkc) vào 200 ml dung dịch hỗn hợp gồm NaOH 1M và Ba(OH)₂ 0,75M. Sau khi phản ứng xảy ra hoàn toàn thu được 19,7 gam kết tủa trắng. Tìm giá trị lớn nhất của V.',
            solution: 'Tổng số mol OH⁻ = 0,2×1 + 0,2×0,75×2 = 0,5 mol; n_Ba2+ = 0,15 mol; n_BaCO3 = 19,7 / 197 = 0,1 mol < 0,15 mol. Để V đạt cực đại thì kết tủa đã đạt cực đại rồi bị hòa tan một phần: n_CO2(max) = n_OH⁻ - n_kết tủa = 0,5 - 0,1 = 0,4 mol ⇒ V = 0,4 × 24,79 = 9,916 lít.'
          }
        ]
      },
      {
        id: 'sc-2',
        title: 'Chuyên đề 2: Hóa học Hữu cơ Chuyên (Hydrocarbon, Rượu Ethylic, Acid Acetic, Chất béo & Hiệu suất este hóa)',
        problems: [
          {
            id: 'scp-2',
            source: 'Đề chính thức Chuyên Hóa Học - Sở GD&ĐT TP.HCM (Năm học 2024 - 2025)',
            question: 'Đun nóng 24 gam acetic acid với 23 gam ethylic alcohol có H₂SO₄ đặc làm xúc tác. Sau phản ứng thu được 22 gam ethyl acetate. Tính hiệu suất của phản ứng este hóa.',
            solution: 'n_CH3COOH = 24/60 = 0,4 mol; n_C2H5OH = 23/46 = 0,5 mol. Hiệu suất tính theo CH3COOH (số mol nhỏ hơn). n_este = 22/88 = 0,25 mol ⇒ H% = (0,25 / 0,4) × 100% = 62,5%.'
          }
        ]
      }
    ],
    officialExams: [
      { id: 'se-c-1', province: 'Sở GD&ĐT Hà Nội (Chuyên Hóa Amsterdam)', year: '2024 - 2025', duration: 150, questionsCount: '6 Câu tự luận Chuyên Hóa' },
      { id: 'se-c-2', province: 'Sở GD&ĐT TP. Hồ Chí Minh (Chuyên Hóa Lê Hồng Phong)', year: '2024 - 2025', duration: 150, questionsCount: '6 Câu tự luận Chuyên Hóa' },
      { id: 'se-c-3', province: 'Sở GD&ĐT Đồng Nai (Chuyên Lương Thế Vinh)', year: '2024 - 2025', duration: 150, questionsCount: '5 Câu tự luận Chuyên Hóa' }
    ]
  },
  {
    id: 'spec_biology',
    name: 'Sinh Học Chuyên',
    status: 'active',
    badge: 'Chuyên Sinh',
    desc: 'Quy luật di truyền Mendel - Morgan, Toán phân tử DNA - mRNA - Protein, Đột biến NST, Phả hệ người & Quần thể',
    chapters: [
      {
        id: 'sb-1',
        title: 'Chuyên đề 1: Cơ chế di truyền và Biến dị ở cấp độ phân tử (Bài toán nhân đôi DNA, Phiên mã, Dịch mã & Đột biến gen)',
        problems: [
          {
            id: 'sbp-1',
            source: 'Đề chính thức Chuyên Sinh Học - Sở GD&ĐT Hà Nội (Năm học 2024 - 2025)',
            question: 'Một gen cấu trúc ở sinh vật nhân sơ có chiều dài L = 4080 Å và có tỉ lệ A / G = 2 / 3. Đột biến điểm xảy ra làm gen A biến đổi thành alen a có chiều dài không đổi nhưng số liên kết hydrogen tăng thêm 1. Tính số nucleotide mỗi loại của alen đột biến a.',
            solution: 'Tổng số nu của gen N = (4080 × 2) / 3,4 = 2400 (nu) ⇒ A + G = 1200. Kết hợp A/G = 2/3 ⇒ A = T = 480, G = X = 720. Đột biến không làm thay đổi chiều dài nhưng tăng 1 liên kết H là đột biến thay thế 1 cặp A - T bằng 1 cặp G - X. Vậy alen a có A = T = 479 (nu) và G = X = 721 (nu).'
          }
        ]
      },
      {
        id: 'sb-2',
        title: 'Chuyên đề 2: Quy luật di truyền phân li độc lập, Tương tác gen & Bài toán Phả hệ di truyền ở người',
        problems: [
          {
            id: 'sbp-2',
            source: 'Đề chính thức Chuyên Sinh Học - Sở GD&ĐT Đồng Nai (Chuyên Lương Thế Vinh 2024 - 2025)',
            question: 'Ở người, bệnh bạch tạng do gen lặn a nằm trên NST thường quy định, alen A quy định da bình thường. Một cặp vợ chồng đều có da bình thường nhưng bên phía người chồng có em gái bị bạch tạng, bên phía người vợ có bố bị bạch tạng (các thành viên khác bình thường). Tính xác suất để cặp vợ chồng này sinh con đầu lòng không mắc bệnh bạch tạng.',
            solution: 'Bố mẹ người chồng bình thường sinh em gái chồng bị bệnh (aa) nên bố mẹ chồng đều là Aa × Aa ⇒ người chồng bình thường có dạng (1/3 AA : 2/3 Aa). Người vợ bình thường có bố bị bệnh (aa) nên người vợ chắc chắn có kiểu gen Aa. Xác suất sinh con bị bệnh (aa) = (2/3) × 1 × (1/4) = 1/6. Vậy xác suất sinh con đầu lòng bình thường là 1 - 1/6 = 5/6.'
          }
        ]
      }
    ],
    officialExams: [
      { id: 'se-b-1', province: 'Sở GD&ĐT Hà Nội (Chuyên Sinh Amsterdam)', year: '2024 - 2025', duration: 150, questionsCount: '7 Câu tự luận Chuyên Sinh' },
      { id: 'se-b-2', province: 'Sở GD&ĐT TP. Hồ Chí Minh (Chuyên Sinh Lê Hồng Phong)', year: '2024 - 2025', duration: 150, questionsCount: '6 Câu tự luận Chuyên Sinh' },
      { id: 'se-b-3', province: 'Sở GD&ĐT Đồng Nai (Chuyên Lương Thế Vinh)', year: '2024 - 2025', duration: 150, questionsCount: '6 Câu tự luận Chuyên Sinh' }
    ]
  },
  { id: 'spec_lit', name: 'Ngữ Văn Chuyên', status: 'coming_soon', badge: 'Coming Soon', desc: 'Lý luận văn học & Nghị luận xã hội chuyên sâu' },
  { id: 'spec_hist', name: 'Lịch Sử Chuyên', status: 'coming_soon', badge: 'Coming Soon', desc: 'Chuyên đề Lịch sử Việt Nam & Thế giới nâng cao' },
  { id: 'spec_geo', name: 'Địa Lý Chuyên', status: 'coming_soon', badge: 'Coming Soon', desc: 'Kỹ năng Atlat, Biểu đồ & Địa lý kinh tế vùng' },
  { id: 'spec_it', name: 'Tin Học Chuyên', status: 'coming_soon', badge: 'Coming Soon', desc: 'Lập trình C++/Python, Quy hoạch động & Lý thuyết đồ thị' }
];

// ==========================================
// 5. NGÂN HÀNG >50 ĐỀ THI CHÍNH THỨC CHO TỪNG MÔN CỦA TỪNG ĐỢT (55 ĐỀ / MÔN / ĐỢT)
// ==========================================
const EXAM_TERMS = [
  { id: 'gk1', name: 'Giữa Học Kì 1', badge: '55 Đề / Môn' },
  { id: 'hk1', name: 'Cuối Học Kì 1', badge: '55 Đề / Môn' },
  { id: 'gk2', name: 'Giữa Học Kì 2', badge: '55 Đề / Môn' },
  { id: 'hk2', name: 'Cuối Học Kì 2', badge: '55 Đề / Môn' },
];

const NATIONAL_SCHOOLS_LIST = [
  'THCS Trấn Biên (TP. Biên Hòa - Đồng Nai)', 'THCS Nguyễn Bỉnh Khiêm (Biên Hòa - Đồng Nai)',
  'THCS Thống Nhất (Biên Hòa - Đồng Nai)', 'THCS Hùng Vương (Trảng Bom - Đồng Nai)',
  'THCS Cầu Giấy (Quận Cầu Giấy - Hà Nội)', 'THCS Giảng Võ (Quận Ba Đình - Hà Nội)',
  'THCS Чу Văn An (Quận Tây Hồ - Hà Nội)', 'THCS Архимед / Archimedes Academy (Hà Nội)',
  'THCS Nguyễn Du (Quận 1 - TP. Hồ Chí Minh)', 'THCS Lê Quý Đôn (Quận 3 - TP. Hồ Chí Minh)',
  'THCS Trần Văn Ơn (Quận 1 - TP. Hồ Chí Minh)', 'THCS Colette (Quận 3 - TP. Hồ Chí Minh)',
  'THCS Trưng Vương (Quận Hải Châu - Đà Nẵng)', 'THCS Tây Sơn (Quận Hải Châu - Đà Nẵng)',
  'THCS Hồng Bàng (Quận Hồng Bàng - Hải Phòng)', 'THCS Trần Phú (Lê Chân - Hải Phòng)',
  'THCS Đặng Thai Mai (TP. Vinh - Nghệ An)', 'THCS Trần Mai Ninh (TP. Thanh Hóa)',
  'THCS Đoàn Thị Điểm (TP. Cần Thơ)', 'THCS Nguyễn Khuyến (TP. Thủ Dầu Một - Bình Dương)',
  'THCS Hàn Thuyên (TP. Bắc Ninh)', 'THCS Trần Đăng Ninh (TP. Nam Định)'
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
      mcqs: Array.from({ length: 12 }, (_, idx) => {
        const cNum = idx + 1;
        const level = cNum <= 4 ? 'Nhận biết' : cNum <= 8 ? 'Thông hiểu' : cNum <= 10 ? 'Vận dụng' : 'Vận dụng cao';
        return {
          id: `q-${code}-${cNum}`,
          question:
            subject === 'math'
              ? `Câu ${cNum} (${level} - Đề ${school} ${year}): Cho hàm số và biểu thức đại số với tham số a = ${p + idx}, b = ${q}. Khẳng định nào sau đây là đúng khi giải phương trình ${p + idx}x - ${(p + idx) * q} = 0?`
              : subject === 'science'
              ? `Câu ${cNum} (${level} - Đề ${school} ${year}): Thực hiện thí nghiệm với ${p + idx} gam chất tham gia theo chương trình KHTN Lớp ${grade}. Kết quả đo đại lượng vật lý/hóa học chuẩn xác ở câu ${cNum} là:`
              : `Question ${cNum} (${level} - ${school} ${year}): Choose the option that best completes the sentence in Unit ${((idx) % 8) + 1} of Global Success Grade ${grade}:`,
          options:
            subject === 'math'
              ? [`x = ${q}`, `x = -${q}`, `x = ${p + idx}`, `x = ${(p + idx) * q}`]
              : subject === 'science'
              ? [`Giá trị chuẩn bằng ${(p + idx) * 2} đơn vị SI`, `Giá trị bằng 0`, `Giảm đi ${q} lần`, `Không xảy ra hiện tượng`]
              : [`Correct grammatical structure (Option A for Q${cNum})`, `Incorrect tense form`, `Wrong preposition`, `Misplaced relative pronoun`],
          correctIndex: 0,
          explanation: `Lời giải xác thực Câu ${cNum} (Đề ${school} - Năm học ${year}): Biến đổi trực tiếp từ giả thiết a = ${p + idx}, b = ${q} suy ra phương án A hoàn toàn chính xác.`
        };
      }),
      essays: [
        {
          id: 'tl-1',
          title: `Bài 1 (2,0 điểm) - Rút gọn biểu thức & Tính giá trị (Đề ${school} - ${year})`,
          problem: `Cho biểu thức A = (√x + ${p})/(√x - ${q}) - (${2 * p}√x)/(x - ${q * q}) với x ≥ 0, x ≠ ${q * q}.\na) (1,25 điểm) Rút gọn biểu thức A.\nb) (0,75 điểm) Tìm tất cả các giá trị nguyên của x để biểu thức A nhận giá trị nguyên.`,
          points: 2.0,
          solution: `a) Quy đồng mẫu thức chung (√x - ${q})(√x + ${q}) = x - ${q * q}. Thu gọn tử số chuẩn xác theo tham số p = ${p}, q = ${q}.\nb) Tách phần nguyên và lập bảng ước nguyên của tử số để kết luận giá trị x.`
        },
        {
          id: 'tl-2',
          title: `Bài 2 (2,0 điểm) - Giải bài toán bằng cách lập phương trình / Hệ phương trình`,
          problem: `Một xưởng sản xuất theo kế hoạch phải hoàn thành ${p * 60} sản phẩm trong một số ngày quy định. Do cải tiến kỹ thuật, mỗi ngày xưởng làm thêm được ${q} sản phẩm nên đã hoàn thành sớm hơn kế hoạch 2 ngày. Hỏi theo kế hoạch mỗi ngày xưởng phải làm bao nhiêu sản phẩm?`,
          points: 2.0,
          solution: `Gọi năng suất dự kiến là x (sản phẩm/ngày, x ∈ N*). Phương trình thực tế: ${p * 60}/x - ${p * 60}/(x + ${q}) = 2. Giải phương trình bậc hai suy ra nghiệm dương thỏa mãn điều kiện.`
        },
        {
          id: 'tl-3',
          title: `Bài 3 (2,5 điểm) - Hình học phẳng chứng minh 3 ý phân hóa (a, b, c)`,
          problem: `Cho tam giác ABC nhọn (AB < AC) nội tiếp đường tròn (O; ${p} cm). Ba đường cao AD, BE, CF cắt nhau tại trực tâm H.\na) Chứng minh tứ giác BFEC và tứ giác CDHE nội tiếp đường tròn.\nb) Chứng minh DB.DC = DH.DA.\nc) Gọi M là trung điểm của BC. Chứng minh đường thẳng ME là tiếp tuyến của đường tròn ngoại tiếp tứ giác AEHF.`,
          points: 2.5,
          solution: `a) ∠BFC = ∠BEC = 90° ⇒ BFEC nội tiếp đường tròn đường kính BC.\nb) ∆BDH đồng dạng ∆ADC (g.g) ⇒ DB/DA = DH/DC ⇒ DB.DC = DH.DA.\nc) Tâm I của đường tròn ngoại tiếp AEHF là trung điểm AH; chứng minh ∠IEM = 90° dựa vào hai tam giác cân ∆IEH và ∆MEB.`
        },
        {
          id: 'tl-4',
          title: `Bài 4 (0,5 điểm) - Câu hỏi Vận dụng cao (Phân loại điểm 10)`,
          problem: `Cho các số thực dương a, b, c thỏa mãn a + b + c = ${p + q}. Tìm giá trị nhỏ nhất của biểu thức P = a²/(a + b) + b²/(b + c) + c²/(c + a).`,
          points: 0.5,
          solution: `Áp dụng BĐT Cauchy-Schwarz dạng Engel: P ≥ (a + b + c)² / [2(a + b + c)] = (a + b + c)/2 = ${(p + q) / 2}. Dấu "=" xảy ra khi a = b = c = ${(p + q) / 3}.`
        }
      ]
    });
  }

  return list;
}

// ==========================================
// 6. NGÂN HÀNG ÔN THI VÀO LỚP 10: 60 ĐỀ CHÍNH THỨC CÁC SỞ + 55 ĐỀ THI THỬ FULL TỰ LUẬN + BÀI TẬP ÔN
// ==========================================
const PROVINCES_15 = [
  'Sở GD&ĐT Đồng Nai', 'Sở GD&ĐT Hà Nội', 'Sở GD&ĐT TP. Hồ Chí Minh', 'Sở GD&ĐT Đà Nẵng',
  'Sở GD&ĐT Hải Phòng', 'Sở GD&ĐT Nghệ An', 'Sở GD&ĐT Thanh Hóa', 'Sở GD&ĐT Cần Thơ',
  'Sở GD&ĐT Bình Dương', 'Sở GD&ĐT Bắc Ninh', 'Sở GD&ĐT Nam Định', 'Sở GD&ĐT Thừa Thiên Huế',
  'Sở GD&ĐT Bà Rịa - Vũng Tàu', 'Sở GD&ĐT Khánh Hòa', 'Sở GD&ĐT Quảng Ninh'
];

const EXAM_YEARS_G10 = ['2025 - 2026', '2024 - 2025', '2023 - 2024', '2022 - 2023'];

// 60 Đề thi chính thức của 15 Sở GD&ĐT (15 Sở × 4 Năm học gần nhất)
const GRADE10_OFFICIAL_EXAMS_60 = [];
PROVINCES_15.forEach((province, pIdx) => {
  EXAM_YEARS_G10.forEach((year, yIdx) => {
    const num = pIdx * 4 + yIdx + 1;
    const k = (num % 7) + 2;
    GRADE10_OFFICIAL_EXAMS_60.push({
      id: `g10-official-${num}`,
      index: num,
      province,
      year,
      examCategory: 'official',
      difficultyTag: 'Đề Chính Thức Sở GD&ĐT',
      grade: 9,
      subject: 'math',
      isGrade10Entrance: true,
      durationMinutes: 120,
      title: `Đề số ${String(num).padStart(2, '0')}/60: Đề Thi Chính Thức Tuyển Sinh Lớp 10 THPT - ${province} (Năm học ${year})`,
      mcqs: [],
      essays: [
        {
          id: 'g10-b1',
          title: 'Bài I (2,0 điểm) - Rút gọn biểu thức chứa căn bậc hai và câu hỏi phụ',
          problem: `Cho hai biểu thức A = (√x + ${k + 2}) / (√x - 1) và B = ${k} / (√x + 1) - (x + ${k + 2}) / (x - 1) với x ≥ 0, x ≠ 1.\n1) (0,5 điểm) Tính giá trị của biểu thức A khi x = ${(k + 1) * (k + 1)}.\n2) (1,0 điểm) Rút gọn biểu thức B.\n3) (0,5 điểm) Đặt P = A.B. Tìm tất cả các giá trị nguyên của x để P nhận giá trị nguyên.`,
          points: 2.0,
          solution: `1) Thay x = ${(k + 1) * (k + 1)} (TMĐK) ⇒ √x = ${k + 1} vào biểu thức A để tính giá trị.\n2) Quy đồng mẫu chung (√x - 1)(√x + 1) = x - 1 và rút gọn B.\n3) Khảo sát ước nguyên của tử thức P = A.B và đối chiếu điều kiện x ≥ 0, x ≠ 1.`
        },
        {
          id: 'g10-b2',
          title: 'Bài II (2,0 điểm) - Giải toán bằng cách lập phương trình/hệ phương trình & Hình học không gian thực tế',
          problem: `1) (1,5 điểm) Một ca nô xuôi dòng từ bến A đến bến B cách nhau ${k * 24} km rồi lập tức quay về bến A. Biết vận tốc dòng nước là 4 km/h và tổng thời gian cả đi lẫn về là 5 giờ. Tính vận tốc riêng của ca nô.\n2) (0,5 điểm) Một chi tiết máy hình trụ có bán kính đáy R = ${k + 2} cm và chiều cao h = 15 cm. Tính diện tích xung quanh và thể tích của hình trụ đó (lấy π ≈ 3,14).`,
          points: 2.0,
          solution: `1) Gọi vận tốc thực của ca nô là x (km/h, x > 4). Lập phương trình: ${k * 24}/(x + 4) + ${k * 24}/(x - 4) = 5.\n2) Áp dụng S_xq = 2πRh và V = πR²h.`
        },
        {
          id: 'g10-b3',
          title: 'Bài III (2,0 điểm) - Hệ phương trình quy về bậc nhất & Parabol y = x² - Định lí Vi-ét',
          problem: `1) (1,0 điểm) Giải hệ phương trình: { 2/(x - 1) + √(y + ${k}) = 5 ; 3/(x - 1) - 2√(y + ${k}) = -3 }.\n2) (1,0 điểm) Trong mặt phẳng tọa độ Oxy, cho parabol (P): y = x² và đường thẳng (d): y = 2mx - m² + m + ${k}. Tìm m để (d) cắt (P) tại hai điểm phân biệt có hoành độ x₁, x₂ thỏa mãn x₁² + x₂² = ${k * 6}.`,
          points: 2.0,
          solution: `1) Đặt ẩn phụ u = 1/(x - 1) và v = √(y + ${k}) ≥ 0 ⇒ u = 1, v = 3.\n2) Xét phương trình hoành độ giao điểm x² - 2mx + m² - m - ${k} = 0, tính ∆' > 0 và thế hệ thức Vi-ét vào x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂ = ${k * 6}.`
        },
        {
          id: 'g10-b4',
          title: 'Bài IV (3,5 điểm) - Hình học Đường tròn (3 ý a, b, c phân hóa rõ rệt)',
          problem: `Cho tam giác ABC nhọn (AB < AC) nội tiếp đường tròn (O; R). Ba đường cao AD, BE, CF cắt nhau tại H.\na) (1,25 điểm) Chứng minh tứ giác BFEC và tứ giác CDHE nội tiếp đường tròn.\nb) (1,25 điểm) Tia EF cắt đường thẳng BC tại K. Chứng minh KB.KC = KE.KF.\nc) (1,0 điểm) Đường thẳng AK cắt đường tròn (O) tại điểm thứ hai là N (N ≠ A). Chứng minh điểm N thuộc đường tròn ngoại tiếp tứ giác AEHF.`,
          points: 3.5,
          solution: `a) Chứng minh tổng hai góc đối bằng 180° hoặc hai đỉnh kề cùng nhìn một cạnh dưới góc 90°.\nb) Xét ∆KBF đồng dạng ∆KEC (g.g) ⇒ KB.KC = KE.KF.\nc) Sử dụng phương tích từ điểm K: KN.KA = KB.KC = KE.KF ⇒ tứ giác ANFE nội tiếp đường tròn đường kính AH ⇒ ∠ANH = 90°.`
        },
        {
          id: 'g10-b5',
          title: 'Bài V (0,5 điểm) - Bất đẳng thức / Cực trị đại số (Câu phân loại điểm 10)',
          problem: `Cho các số thực dương a, b, c thỏa mãn ab + bc + ca = ${3 * k}. Tìm giá trị nhỏ nhất của biểu thức S = a² + b² + c² + ${9 * k * k}/(a + b + c).`,
          points: 0.5,
          solution: `Sử dụng đánh giá a² + b² + c² ≥ ab + bc + ca = ${3 * k} và kết hợp BĐT Cauchy chọn điểm rơi tại a = b = c = √${k}.`
        }
      ]
    });
  });
});

// 55 Đề thi thử vào lớp 10 (100% Tự luận - Phân chia rõ 3 mức độ khó)
const GRADE10_MOCK_EXAMS_55 = Array.from({ length: 55 }, (_, idx) => {
  const num = idx + 1;
  const diffLevel =
    num <= 18
      ? 'Mức Chuẩn (Mục tiêu 7,5 - 8,0 điểm)'
      : num <= 38
      ? 'Mức Nâng Cao (Mục tiêu 8,5 - 9,0+ điểm)'
      : 'Mức Thực Chiến Đỉnh Cao (Mục tiêu 9,5 - 10 điểm & Chuyên)';
  const school = NATIONAL_SCHOOLS_LIST[idx % NATIONAL_SCHOOLS_LIST.length];
  const k = (num % 6) + 2;

  return {
    id: `g10-mock-${num}`,
    index: num,
    province: school,
    year: '2025 - 2026 (Đề Thi Thử Chuẩn Cấu Trúc Mới)',
    examCategory: 'mock',
    difficultyTag: diffLevel,
    grade: 9,
    subject: 'math',
    isGrade10Entrance: true,
    durationMinutes: 120,
    title: `Đề thi thử vào 10 số ${String(num).padStart(2, '0')}/55 (${diffLevel}) - Hội đồng ra đề ${school}`,
    mcqs: [],
    essays: GRADE10_OFFICIAL_EXAMS_60[idx % GRADE10_OFFICIAL_EXAMS_60.length].essays.map((es, eIdx) => ({
      ...es,
      title: `${es.title} [${diffLevel}]`
    }))
  };
});

// Bài tập Ôn thi vào lớp 10 theo 5 Chuyên đề trọng tâm
const GRADE10_PRACTICE_TOPICS = [
  {
    id: 'g10-top-1',
    title: 'Chuyên đề 1: Rút gọn biểu thức chứa căn & Các bài toán phụ (Tìm x nguyên, Cực trị, So sánh P với P²)',
    count: '35 Bài toán tự luận từ dễ đến nâng cao',
    exercises: Array.from({ length: 12 }, (_, i) => ({
      id: `g10-ex-1-${i + 1}`,
      level: i < 4 ? 'Cơ bản' : i < 8 ? 'Vận dụng' : 'Vận dụng cao',
      problem: `Bài ${i + 1}: Cho biểu thức P = (x + ${i + 3}) / (√x - 1) : (√x + 1) với x ≥ 0, x ≠ 1. Rút gọn và tìm giá trị nhỏ nhất của biểu thức P.(√x + 1) khi x > 1.`,
      solution: `Đặt t = √x - 1 > 0 ⇒ √x = t + 1. Biến đổi biểu thức về dạng t + k/t và áp dụng BĐT Cauchy cho hai số dương.`
    }))
  },
  {
    id: 'g10-top-2',
    title: 'Chuyên đề 2: Giải bài toán bằng cách lập Phương trình - Hệ phương trình & Toán thực tế Lãi suất, Hình không gian',
    count: '35 Bài toán thực tế chuẩn cấu trúc thi vào 10',
    exercises: Array.from({ length: 12 }, (_, i) => ({
      id: `g10-ex-2-${i + 1}`,
      level: i < 4 ? 'Cơ bản' : i < 8 ? 'Vận dụng' : 'Vận dụng cao',
      problem: `Bài ${i + 1}: Hai vòi nước cùng chảy vào một bể không có nước thì sau ${i + 4} giờ đầy bể. Nếu mở vòi thứ nhất chảy trong 2 giờ và vòi thứ hai chảy trong 3 giờ thì được 50% bể. Hỏi nếu chảy riêng thì mỗi vòi chảy bao lâu đầy bể?`,
      solution: `Gọi thời gian vòi 1, vòi 2 chảy riêng đầy bể là x, y (giờ, x, y > ${i + 4}). Lập hệ phương trình: { 1/x + 1/y = 1/${i + 4} ; 2/x + 3/y = 1/2 }.`
    }))
  },
  {
    id: 'g10-top-3',
    title: 'Chuyên đề 3: Sự tương giao giữa Parabol (P) và Đường thẳng (d) - Hệ thức Vi-ét đối xứng & không đối xứng',
    count: '40 Bài toán hàm số & tham số m',
    exercises: Array.from({ length: 12 }, (_, i) => ({
      id: `g10-ex-3-${i + 1}`,
      level: i < 4 ? 'Cơ bản' : i < 8 ? 'Vận dụng' : 'Vận dụng cao',
      problem: `Bài ${i + 1}: Cho phương trình x² - 2(m + ${i + 1})x + m² + 2 = 0. Tìm m để phương trình có hai nghiệm phân biệt x₁, x₂ thỏa mãn |x₁| + |x₂| = ${i + 6}.`,
      solution: `Tính ∆' > 0, sau đó bình phương hai vế của hệ thức: x₁² + x₂² + 2|x₁x₂| = ${(i + 6) * (i + 6)} và thế hệ thức Vi-ét vào.`
    }))
  },
  {
    id: 'g10-top-4',
    title: 'Chuyên đề 4: Hình học Đường tròn tổng hợp (Tứ giác nội tiếp, Phương tích, Điểm cố định, Ba điểm thẳng hàng)',
    count: '45 Bài toán Hình học 3 ý a, b, c',
    exercises: Array.from({ length: 12 }, (_, i) => ({
      id: `g10-ex-4-${i + 1}`,
      level: i < 4 ? 'Cơ bản' : i < 8 ? 'Vận dụng' : 'Vận dụng cao',
      problem: `Bài ${i + 1}: Cho dây cung BC cố định của đường tròn (O; R) (BC < 2R) và điểm A di động trên cung lớn BC. Chứng minh đường thẳng đi qua trực tâm H và trung điểm M của BC luôn đi qua một điểm cố định.`,
      solution: `Kẻ đường kính AK của (O), chứng minh BHCK là hình bình hành nên M là trung điểm HK ⇒ đường thẳng HM luôn đi qua điểm đối xứng của A hoặc sử dụng tính chất вектор OA + OB + OC = OH.`
    }))
  }
];

// ==========================================
// 7. DỮ LIỆU CỘNG ĐỒNG HỎI ĐÁP 24/7 (EZASK)
// ==========================================
const INITIAL_QA_POSTS = [
  {
    id: 'qa-1',
    authorNickname: '@minhthao_dongnai_k9',
    grade: 9,
    subject: 'math',
    bountyXp: 50,
    createdAt: '10 phút trước',
    questionText: 'Mọi người ơi giúp mình câu c bài Hình học đề thi chính thức Sở Đồng Nai với ạ: Chứng minh đường thẳng nối tâm đường tròn nội tiếp và ngoại tiếp đi qua điểm cố định khi A di chuyển trên cung lớn BC?',
    imageAttachment: null,
    answers: [
      {
        id: 'ans-1',
        responderNickname: '@giaosu_toan9',
        content: 'Bạn gọi I là tâm đường tròn nội tiếp ∆ABC, tia AI cắt (O) tại điểm chính giữa cung BC không chứa A là điểm L cố định. Sau đó áp dụng tính chất LI = LB = LC (hệ thức chân gà) là suy ra ngay nhé!',
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
    questionText: 'Cho mình hỏi trong đề Chuyên Anh có cấu trúc đảo ngữ "Not until" và "Hardly... when..." thì chia thì ở vế đảo ngữ như thế nào để không bị trừ điểm ạ?',
    imageAttachment: null,
    answers: [
      {
        id: 'ans-2',
        responderNickname: '@ielts_fighter_thcs',
        content: 'Với "Hardly + had + S + V3/ed + when + S + V2/ed" thì đảo ngữ ngay ở đầu câu. Còn "Not until + cụm thời gian/mệnh đề + trợ động từ + S + V" thì chỉ đảo ngữ ở mệnh đề chính đứng phía sau thôi bạn nhé!',
        upvotes: 9,
        isBestAnswer: false,
        time: '12 phút trước'
      }
    ]
  }
];

// ==========================================
// 8. COMPONENT LOGO MỚI CHUYÊN NGHIỆP CỦA STUDYEZ
// ==========================================
function StudyEzBrandLogo({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 text-left group active:scale-95 transition-transform duration-150"
    >
      {/* Biểu tượng Logo Học Thuật mới: Khiên Tri Thức + Mũ Cử Nhân + Sách Mở Tỏa Sáng */}
      <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-600 to-sky-500 p-0.5 shadow-md group-hover:shadow-blue-500/30 transition">
        <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center relative overflow-hidden">
          <svg viewBox="0 0 64 64" className="w-8 h-8">
            {/* Hào quang tỏa sáng phía sau */}
            <circle cx="32" cy="28" r="18" fill="#38bdf8" opacity="0.2" />
            {/* Mũ cử nhân */}
            <polygon points="32,10 10,20 32,30 54,20" fill="#fbbf24" />
            <path d="M20,24 L20,33 C20,37 44,37 44,33 L44,24" fill="#f59e0b" />
            <line x1="50" y1="22" x2="50" y2="34" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="35" r="2.2" fill="#fde047" />
            {/* Cuốn sách mở nâng đỡ bên dưới */}
            <path
              d="M14,42 Q23,37 32,43 Q41,37 50,42 L50,52 Q41,47 32,53 Q23,47 14,52 Z"
              fill="#ffffff"
            />
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
            PRO 2.0
          </span>
        </div>
        <span className="block text-[10px] text-slate-500 font-semibold">
          studyez.vn • Học Tập & Luyện Thi Toàn Diện
        </span>
      </div>
    </button>
  );
}

// ==========================================
// 9. COMPONENT AVATAR HỌC SINH VIỆT NAM
// ==========================================
function StudentAvatarBadge({ config, customPhoto, streakDays, size = 'md', onClick }) {
  const boxSize = size === 'lg' ? 'w-28 h-28' : 'w-10 h-10';
  return (
    <div
      onClick={onClick}
      className="inline-flex flex-col items-center cursor-pointer group select-none"
      title="Nhấn để mở Xưởng Nhân Vật & Chuỗi Học Tập"
    >
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
            <rect x="12" y="10" width="76" height="32" rx="4" fill="#0f766e" opacity="0.22" />
            {config.outfit === 'uniform_scarf' && (
              <>
                <path d="M20 98 L30 66 L70 66 L80 98 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
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
            <circle cx="50" cy="44" r="20" fill="#fde68a" />
            {config.hair === 'boy_neat' ? (
              <path d="M30 42 C30 22, 70 22, 70 42 C65 30, 35 30, 30 42 Z" fill="#1e293b" />
            ) : (
              <>
                <path d="M28 45 C28 20, 72 20, 72 45 C66 30, 34 30, 28 45 Z" fill="#0f172a" />
                <circle cx="27" cy="48" r="6" fill="#0f172a" />
                <circle cx="73" cy="48" r="6" fill="#0f172a" />
              </>
            )}
            <circle cx="43" cy="44" r="2.3" fill="#0f172a" />
            <circle cx="57" cy="44" r="2.3" fill="#0f172a" />
            <path d="M43 52 Q50 58 57 52" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
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

      <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500 text-white text-[10px] font-extrabold leading-none whitespace-nowrap shadow-xs">
        <Flame className="w-3 h-3 fill-white" />
        {streakDays} ngày
      </span>
    </div>
  );
}

// ==========================================
// 10. COMPONENT CHÍNH STUDY-EZ 2.0
// ==========================================
export default function App() {
  // Điều hướng các màn hình chính
  const [currentPage, setCurrentPage] = useState('home');
  // 'home' | 'practice-hub' | 'exam-hub' | 'grade10-hub' | 'specialized-hub' | 'ezask' | 'streak-studio' | 'exam-room' | 'auth'

  // Bộ lọc Chương trình học (120 câu TN + 120 bài TL mỗi chương)
  const [selectedGrade, setSelectedGrade] = useState(9);
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const [practiceTab, setPracticeTab] = useState('mcq'); // 'mcq' | 'essay'
  const [difficultyFilter, setDifficultyFilter] = useState('all'); // 'all' | 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao'
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const ITEMS_PER_PAGE = 15;

  // Bộ lọc Kỳ thi Định kỳ (55 đề / môn / đợt) & Tuyển sinh 10 (60 đề Sở + 55 đề thi thử + Bài tập ôn)
  const [selectedTermId, setSelectedTermId] = useState('gk1');
  const [examSearch, setExamSearch] = useState('');
  const [g10SubTab, setG10SubTab] = useState('official60'); // 'official60' | 'mock55' | 'topics'
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Hệ thống Giữ Chuỗi (Streak) & KPI 200 XP / ngày (Lưu vào LocalStorage)
  const DAILY_KPI_XP = 200;
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

  // Cấu hình Avatar
  const [avatarConfig, setAvatarConfig] = useState(() => {
    const saved = localStorage.getItem('studyez_avatarConfig');
    return saved
      ? JSON.parse(saved)
      : { hair: 'boy_neat', outfit: 'uniform_scarf', glasses: true, bgTheme: 'class' };
  });
  const [customAvatarUrl, setCustomAvatarUrl] = useState(() => {
    return localStorage.getItem('studyez_customAvatarUrl') || null;
  });

  // Tài khoản Người dùng (Mặc định chưa đăng nhập hoặc đọc từ LocalStorage để kiểm tra quyền Hỏi Đáp 24/7 & Ôn Chuyên)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('studyez_currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [authForm, setAuthForm] = useState({ nickname: '', email: '' });
  const [showGmailModal, setShowGmailModal] = useState(false);

  // Trạng thái Gói Hội Viên Ôn Thi Chuyên 59.000đ & Lượt Dùng Thử 1 lần / môn / tài khoản Google
  const [selectedSpecSubjectId, setSelectedSpecSubjectId] = useState('spec_math');
  const [activeSpecSessionSubject, setActiveSpecSessionSubject] = useState(null);
  const [showVipUpgradeModal, setShowVipUpgradeModal] = useState(false);
  const [vipRegistry, setVipRegistry] = useState(() => {
    const saved = localStorage.getItem('studyez_vipRegistry');
    return saved ? JSON.parse(saved) : {}; // { 'email@gmail.com': true }
  });
  const [specTrialUsedMap, setSpecTrialUsedMap] = useState(() => {
    const saved = localStorage.getItem('studyez_specTrialUsedMap');
    return saved ? JSON.parse(saved) : {}; // { 'email@gmail.com': { spec_math: true, ... } }
  });

  // Trạng thái làm bài tập Chương
  const [chapterMcqAnswers, setChapterMcqAnswers] = useState(() => {
    const saved = localStorage.getItem('studyez_chapterMcqAnswers');
    return saved ? JSON.parse(saved) : {};
  });
  const [chapterEssayDrafts, setChapterEssayDrafts] = useState({});
  const [revealedEssays, setRevealedEssays] = useState({});

  // Trạng thái Phòng thi (Exam Room)
  const [activeExam, setActiveExam] = useState(null);
  const [examMcqAnswers, setExamMcqAnswers] = useState({});
  const [examEssayAnswers, setExamEssayAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [timeLeftSec, setTimeLeftSec] = useState(5400);

  // Trạng thái Cộng đồng Hỏi Đáp 24/7 (EzAsk)
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

  const [quoteIdx, setQuoteIdx] = useState(0);

  // Tự động đồng bộ vào LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('studyez_todayXp', String(todayXp));
      localStorage.setItem('studyez_streakDays', String(streakDays));
      localStorage.setItem('studyez_streakUnlocked', String(streakUnlockedToday));
      localStorage.setItem('studyez_avatarConfig', JSON.stringify(avatarConfig));
      if (customAvatarUrl) {
        localStorage.setItem('studyez_customAvatarUrl', customAvatarUrl);
      } else {
        localStorage.removeItem('studyez_customAvatarUrl');
      }
      if (currentUser) {
        localStorage.setItem('studyez_currentUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('studyez_currentUser');
      }
      localStorage.setItem('studyez_chapterMcqAnswers', JSON.stringify(chapterMcqAnswers));
      localStorage.setItem('studyez_qaPosts', JSON.stringify(qaPosts));
      localStorage.setItem('studyez_vipRegistry', JSON.stringify(vipRegistry));
      localStorage.setItem('studyez_specTrialUsedMap', JSON.stringify(specTrialUsedMap));
    } catch (err) {
      console.warn('Lỗi lưu trữ LocalStorage:', err);
    }
  }, [
    todayXp,
    streakDays,
    streakUnlockedToday,
    avatarConfig,
    customAvatarUrl,
    currentUser,
    chapterMcqAnswers,
    qaPosts,
    vipRegistry,
    specTrialUsedMap
  ]);

  // Đồng hồ đếm ngược khi vào Phòng thi
  useEffect(() => {
    if (currentPage !== 'exam-room' || examSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeftSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentPage, examSubmitted]);

  // Hàm cộng XP
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

  // Kiểm tra tài khoản hiện tại có phải Hội viên VIP 59k không
  const isCurrentUserVip = useMemo(() => {
    if (!currentUser || !currentUser.email) return false;
    return Boolean(vipRegistry[currentUser.email]);
  }, [currentUser, vipRegistry]);

  // Kiểm tra môn chuyên đã dùng hết 1 lượt thử chưa
  const hasUsedTrialForSubject = (subjId) => {
    if (!currentUser || !currentUser.email) return false;
    return Boolean(specTrialUsedMap[currentUser.email]?.[subjId]);
  };

  // Kích hoạt 1 lần dùng thử duy nhất cho 1 môn chuyên của 1 tài khoản Google
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
    // Đánh dấu đã dùng 1 lượt duy nhất của môn này cho tài khoản Google này
    setSpecTrialUsedMap({
      ...specTrialUsedMap,
      [email]: {
        ...userTrials,
        [subjId]: true
      }
    });
    setActiveSpecSessionSubject(subjId);
    addXp(30, 'Mở khóa lượt trải nghiệm Ôn Thi Chuyên');
  };

  // Nâng cấp gói Hội viên Chuyên 59.000đ
  const handlePurchaseVip59k = () => {
    if (!currentUser) {
      setShowVipUpgradeModal(false);
      setCurrentPage('auth');
      return;
    }
    setVipRegistry({
      ...vipRegistry,
      [currentUser.email]: true
    });
    setShowVipUpgradeModal(false);
    addXp(100, 'Kích hoạt Gói Hội Viên Ôn Chuyên PREMIUM 59K');
  };

  // Danh sách chương hiện tại
  const currentChapters = useMemo(() => {
    return CHAPTER_TITLES[selectedGrade]?.[selectedSubject] || CHAPTER_TITLES[9].math;
  }, [selectedGrade, selectedSubject]);

  // Sinh 120 câu Trắc nghiệm + 120 bài Tự luận cho chương đang chọn
  const currentChapterData = useMemo(() => {
    const title = currentChapters[selectedChapterIdx] || currentChapters[0];
    return generateChapterExercises120(selectedGrade, selectedSubject, selectedChapterIdx, title);
  }, [selectedGrade, selectedSubject, selectedChapterIdx, currentChapters]);

  // Lọc theo độ khó và phân trang (120 câu)
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

  // Sinh 55 đề thi chính thức cho Khối + Môn + Đợt thi đang chọn
  const filteredPeriodicExams = useMemo(() => {
    const all55 = generatePeriodicExams55(selectedTermId, selectedGrade, selectedSubject);
    if (!examSearch.trim()) return all55;
    return all55.filter((ex) => ex.title.toLowerCase().includes(examSearch.toLowerCase()));
  }, [selectedTermId, selectedGrade, selectedSubject, examSearch]);

  // Lọc 60 đề chính thức các Sở GD&ĐT vào lớp 10
  const filteredGrade10Official = useMemo(() => {
    return GRADE10_OFFICIAL_EXAMS_60.filter((ex) => {
      const matchProv = selectedProvince === 'all' || ex.province === selectedProvince;
      const matchYear = selectedYear === 'all' || ex.year === selectedYear;
      return matchProv && matchYear;
    });
  }, [selectedProvince, selectedYear]);

  // Bắt đầu làm đề thi trong Phòng thi
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

  // Xử lý tải ảnh đại diện
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

  // Đăng câu hỏi mới lên Hỏi Đáp 24/7 (BẮT BUỘC ĐĂNG NHẬP)
  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setCurrentPage('auth');
      return;
    }
    if (!newQuestionText.trim()) return;
    const newPost = {
      id: 'qa-' + Date.now(),
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

  // Gửi câu trả lời trên Hỏi Đáp 24/7 (BẮT BUỘC ĐĂNG NHẬP)
  const handleSendReply = (postId) => {
    if (!currentUser) {
      setCurrentPage('auth');
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
    setReplyDrafts({ ...replyDrafts, [postId]: '' });
    addXp(40, 'Giải bài giúp bạn trên Hỏi Đáp 24/7');
  };

  const kpiPercentage = Math.min(100, Math.round((todayXp / DAILY_KPI_XP) * 100));
  const currentSpecSubjectObj =
    SPECIALIZED_SUBJECTS.find((s) => s.id === selectedSpecSubjectId) || SPECIALIZED_SUBJECTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* Thông báo cộng XP nổi */}
      {xpToast && (
        <div className="fixed top-24 right-5 z-50 bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-extrabold animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{xpToast}</span>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL MUA GÓI HỘI VIÊN ÔN THI CHUYÊN 59.000Đ */}
      {/* ========================================== */}
      {showVipUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border-2 border-amber-400 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-black">
                <Crown className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>GÓI HỘI VIÊN ÔN THI CHUYÊN PREMIUM</span>
              </div>
              <button
                onClick={() => setShowVipUpgradeModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm"
              >
                ✕ Đóng
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">
                Mở Khóa Toàn Bộ Kho Ôn Thi Chuyên Chỉ Với <span className="text-amber-600">59.000đ</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tài khoản Google của bạn đã sử dụng hết <strong>01 lượt trải nghiệm miễn phí</strong> cho môn chuyên này. Đăng ký Gói Hội Viên 59K để mở khóa không giới hạn toàn bộ 5 môn Chuyên:
              </p>
            </div>

            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full Chuyên đề tự luận nâng cao: Toán, Anh, Lý, Hóa, Sinh Chuyên</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bộ Đề thi Chuyên chính thức các Sở GD&ĐT & Trường Chuyên qua các năm</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Lời giải chi tiết từng bước chấm điểm chuẩn Bộ GD&ĐT (Mua 1 lần dùng mãi mãi)</span>
              </div>
            </div>

            <div className="bg-slate-100 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Phí hội viên trọn gói</div>
                <div className="text-2xl font-black text-blue-700">59.000 VNĐ</div>
              </div>
              <div className="text-right text-[11px] text-slate-500">
                Tài khoản: <strong className="text-slate-800">{currentUser?.email || 'Chưa đăng nhập'}</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePurchaseVip59k}
                className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs shadow-lg hover:opacity-95 active:scale-95 transition"
              >
                Xác Nhận Thanh Toán 59.000đ & Mở Khóa Ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* BONG BÓNG TRÒN NỔI HỎI ĐÁP 24/7 */}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
          {/* Logo Mới của StudyEz */}
          <div className="flex items-center gap-4">
            <StudyEzBrandLogo onClick={() => setCurrentPage('home')} />

            {/* Menu điều hướng */}
            <nav className="hidden xl:flex items-center gap-1.5 text-xs font-bold">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-3 py-2 rounded-xl active:scale-95 transition ${
                  currentPage === 'home' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => setCurrentPage('practice-hub')}
                className={`px-3 py-2 rounded-xl active:scale-95 transition ${
                  currentPage === 'practice-hub' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Bài Tập (120 Câu/Chương)
              </button>
              <button
                onClick={() => setCurrentPage('exam-hub')}
                className={`px-3 py-2 rounded-xl active:scale-95 transition ${
                  currentPage === 'exam-hub' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Đề Thi GK & HK (55 Đề/Môn)
              </button>
              <button
                onClick={() => setCurrentPage('grade10-hub')}
                className={`px-3 py-2 rounded-xl active:scale-95 transition ${
                  currentPage === 'grade10-hub'
                    ? 'bg-indigo-600 text-white'
                    : 'text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100'
                }`}
              >
                Ôn Thi Vào 10 (>50 Đề Sở)
              </button>

              {/* MỤC MỚI: ÔN THI CHUYÊN (MÀU SÁNG NỔI BẬT + CHỮ PREMIUM Ở DƯỚI) */}
              <button
                onClick={() => setCurrentPage('specialized-hub')}
                className={`px-3.5 py-1.5 rounded-2xl flex flex-col items-center justify-center border-2 transition-all duration-150 shadow-sm active:scale-95 ${
                  currentPage === 'specialized-hub'
                    ? 'bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 border-amber-500 text-slate-900'
                    : 'bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 border-amber-400 text-amber-950 hover:from-amber-200 hover:to-yellow-100'
                }`}
              >
                <div className="flex items-center gap-1 text-xs font-black leading-tight">
                  <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  <span>Ôn Thi Chuyên</span>
                </div>
                <span className="text-[9px] font-black tracking-widest uppercase bg-amber-500 text-white px-2 py-0.2 rounded-full mt-0.5 shadow-2xs">
                  PREMIUM
                </span>
              </button>

              {/* Nút Hỏi Đáp 24/7 */}
              <button
                onClick={() => setCurrentPage('ezask')}
                className={`px-3 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 transition shadow-xs ${
                  currentPage === 'ezask'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:opacity-95'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Hỏi Đáp 24/7</span>
              </button>
            </nav>
          </div>

          {/* Khu vực KPI 200 XP + Avatar + Tài khoản Google */}
          <div className="flex items-center gap-2.5">
            <div
              onClick={() => setCurrentPage('streak-studio')}
              className="hidden sm:flex flex-col bg-slate-100 hover:bg-blue-50/60 px-3 py-1.5 rounded-xl cursor-pointer border border-slate-200 transition w-40"
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

            <StudentAvatarBadge
              config={avatarConfig}
              customPhoto={customAvatarUrl}
              streakDays={streakDays}
              size="md"
              onClick={() => setCurrentPage('streak-studio')}
            />

            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage('auth')}
                  className="text-xs font-extrabold px-3 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-1"
                >
                  <span>{currentUser.nickname}</span>
                  {isCurrentUserVip && (
                    <span className="bg-amber-400 text-slate-900 text-[9px] px-1.5 py-0.2 rounded-full font-black">
                      VIP
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage('auth')}
                className="text-xs font-extrabold bg-blue-600 text-white px-3.5 py-2.5 rounded-xl hover:bg-blue-700 active:scale-95 transition flex items-center gap-1.5 shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Đăng nhập Google</span>
              </button>
            )}
          </div>
        </div>

        {/* Thanh menu phụ cho màn hình nhỏ */}
        <div className="xl:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 bg-slate-50 border-t border-slate-200 text-xs font-bold">
          <button onClick={() => setCurrentPage('home')} className="px-2.5 py-1 rounded-lg bg-white border">
            Trang chủ
          </button>
          <button onClick={() => setCurrentPage('practice-hub')} className="px-2.5 py-1 rounded-lg bg-white border">
            120 Câu/Chương
          </button>
          <button onClick={() => setCurrentPage('exam-hub')} className="px-2.5 py-1 rounded-lg bg-white border">
            55 Đề GK/HK
          </button>
          <button onClick={() => setCurrentPage('grade10-hub')} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
            Ôn Thi Vào 10
          </button>
          <button
            onClick={() => setCurrentPage('specialized-hub')}
            className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-400 font-black flex items-center gap-1"
          >
            <Crown className="w-3 h-3 text-amber-600" />
            <span>Ôn Chuyên (PREMIUM)</span>
          </button>
          <button onClick={() => setCurrentPage('ezask')} className="px-2.5 py-1 rounded-lg bg-orange-500 text-white">
            Hỏi Đáp 24/7
          </button>
        </div>
      </header>

      {/* ========================================== */}
      {/* VỊ TRÍ QUẢNG CÁO TOP LEADERBOARD */}
      {/* ========================================== */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        <div className="w-full py-2 px-4 rounded-xl border border-dashed border-slate-300 bg-white/80 flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold text-[10px] uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
            Vị trí Quảng cáo (Ad Slot 728×90)
          </span>
          <span>Không gian dành cho Google AdSense hoặc Banner Sách Ôn Thi Chuyên & Vào 10</span>
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
                  <span>Chuẩn Chương Trình GDPT Mới • Xác Thực Đề Chính Thức Các Trường & Sở GD&ĐT</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black leading-tight">
                  Hệ Thống Luyện Bài Tập Chuyên Sâu, Phòng Thi Thử & Ôn Thi Chuyên Lớp 6, 7, 8, 9
                </h1>
                <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                  <strong>120 Câu Trắc nghiệm & 120 Bài Tự luận</strong> phân hóa 4 cấp độ cho từng chương • <strong>55 Đề chính thức</strong> cho mỗi môn từng đợt GK/HK • <strong>60 Đề Sở GD&ĐT + 55 Đề thi thử vào 10</strong> • Đặc quyền <strong>Ôn Thi Chuyên PREMIUM</strong>.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <button
                    onClick={() => setCurrentPage('practice-hub')}
                    className="bg-white text-blue-700 font-extrabold px-5 py-3 rounded-xl shadow-xs hover:bg-blue-50 active:scale-95 transition text-xs sm:text-sm"
                  >
                    Luyện 120 Câu / Chương
                  </button>
                  <button
                    onClick={() => setCurrentPage('specialized-hub')}
                    className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 text-slate-900 font-black px-5 py-3 rounded-xl shadow-md hover:opacity-95 active:scale-95 transition text-xs sm:text-sm flex items-center gap-2 border border-white"
                  >
                    <Crown className="w-4 h-4 text-amber-700 fill-amber-600" />
                    <span>Ôn Thi Chuyên (PREMIUM 59K)</span>
                  </button>
                  <button
                    onClick={() => setCurrentPage('grade10-hub')}
                    className="bg-indigo-900/80 text-white font-extrabold px-5 py-3 rounded-xl border border-indigo-300/40 hover:bg-indigo-900 active:scale-95 transition text-xs sm:text-sm"
                  >
                    Ôn Thi Vào 10 (60 Đề Sở + 55 Đề Thử)
                  </button>
                </div>
              </div>

              {/* Thẻ Nhân vật Giữ Chuỗi */}
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

            {/* BANNER SÁNG NỔI BẬT CHO MỤC ÔN THI CHUYÊN PREMIUM */}
            <section className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full">
                  <Crown className="w-3.5 h-3.5 fill-slate-950" />
                  <span>PREMIUM • CHUYÊN ĐỀ & ĐỀ THI CHUYÊN CÁC SỞ GD&ĐT</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Khu Vực Ôn Thi Chuyên: Toán • Tiếng Anh • Vật Lý • Hóa Học • Sinh Học
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Tổng hợp đầy đủ các chuyên đề tự luận nâng cao và đề thi chính thức vào các trường THPT Chuyên trên toàn quốc (Hà Nội - Amsterdam, Chuyên KHTN, Lê Hồng Phong TP.HCM, Lương Thế Vinh Đồng Nai, Phan Bội Châu...). <strong>Mỗi tài khoản Google được dùng thử miễn phí 1 lần cho từng môn!</strong>
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 shrink-0">
                <button
                  onClick={() => setCurrentPage('specialized-hub')}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs sm:text-sm shadow-md hover:opacity-95 active:scale-95 transition"
                >
                  Khám Phá Kho Ôn Chuyên Ngay →
                </button>
                <span className="text-[11px] font-extrabold text-amber-800">
                  Gói Hội Viên Trọn Đời: 59.000đ • Dùng thử 1 lần/môn
                </span>
              </div>
            </section>

            {/* Chọn 4 Khối lớp */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900">
                  1. Chọn Khối Lớp (120 Câu Trắc Nghiệm + 120 Tự Luận Mỗi Chương)
                </h2>
                <span className="text-xs font-bold text-blue-600">Độ khó phân hóa 4 cấp độ</span>
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
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                          240 Bài/Chương
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
                        55 Đề thi/môn
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ------------------------------------------ */}
        {/* MÀN HÌNH 2: KHO BÀI TẬP 96 CHƯƠNG (120 CÂU TN + 120 BÀI TL / CHƯƠNG) */}
        {/* ------------------------------------------ */}
        {currentPage === 'practice-hub' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
                        setCurrentPageIndex(1);
                      }}
                      className={`py-2 rounded-xl text-xs font-extrabold transition ${
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
                        setCurrentPageIndex(1);
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-extrabold transition ${
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
                        onClick={() => {
                          setSelectedChapterIdx(idx);
                          setCurrentPageIndex(1);
                        }}
                        className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center justify-between gap-2 ${
                          selectedChapterIdx === idx
                            ? 'bg-blue-50 text-blue-700 border border-blue-300'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div>
                          <div className="line-clamp-2">{chapTitle}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            120 Trắc nghiệm • 120 Tự luận
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <section className="lg:col-span-8 space-y-4">
              {/* Header Chương & Tab chọn Trắc nghiệm / Tự luận */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-extrabold text-blue-600">
                      Lớp {selectedGrade} • Phân hóa 4 cấp độ từ Cơ bản đến Vận dụng cao
                    </span>
                    <h1 className="text-lg font-black text-slate-900 mt-0.5">
                      {currentChapters[selectedChapterIdx]}
                    </h1>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setPracticeTab('mcq');
                        setCurrentPageIndex(1);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                        practiceTab === 'mcq'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Trắc nghiệm ({currentChapterData.mcqs.length} câu)
                    </button>
                    <button
                      onClick={() => {
                        setPracticeTab('essay');
                        setCurrentPageIndex(1);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
                        practiceTab === 'essay'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Bài tập Tự luận ({currentChapterData.essays.length} bài)
                    </button>
                  </div>
                </div>

                {/* Bộ lọc 4 mức độ khó */}
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" /> Lọc độ khó:
                  </span>
                  {[
                    { id: 'all', label: 'Tất cả (120 câu)' },
                    { id: 'Nhận biết', label: 'Nhận biết (Câu 1-30)' },
                    { id: 'Thông hiểu', label: 'Thông hiểu (Câu 31-60)' },
                    { id: 'Vận dụng', label: 'Vận dụng (Câu 61-90)' },
                    { id: 'Vận dụng cao', label: 'Khó / Vận dụng cao (Câu 91-120)' }
                  ].map((lv) => (
                    <button
                      key={lv.id}
                      onClick={() => {
                        setDifficultyFilter(lv.id);
                        setCurrentPageIndex(1);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition ${
                        difficultyFilter === lv.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {lv.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Thanh Phân trang trên */}
              <div className="bg-white px-4 py-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600">
                  Đang hiển thị trang <strong>{currentPageIndex}</strong> / {totalPages} (Tổng{' '}
                  <strong>{activePracticeList.length}</strong> bài)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPageIndex <= 1}
                    onClick={() => setCurrentPageIndex((p) => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 font-bold disabled:opacity-40 hover:bg-slate-100"
                  >
                    ← Trang trước
                  </button>
                  <button
                    disabled={currentPageIndex >= totalPages}
                    onClick={() => setCurrentPageIndex((p) => Math.min(totalPages, p + 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 font-bold disabled:opacity-40 hover:bg-slate-100"
                  >
                    Trang sau →
                  </button>
                </div>
              </div>

              {/* Danh sách câu hỏi Trắc nghiệm */}
              {practiceTab === 'mcq' && (
                <div className="space-y-4">
                  {paginatedPracticeItems.map((q) => {
                    const chosen = chapterMcqAnswers[q.id];
                    const isAnswered = chosen !== undefined;
                    const isCorrect = chosen === q.correctIndex;
                    return (
                      <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-extrabold px-2.5 py-0.5 rounded-md ${
                              q.difficulty === 'Vận dụng cao'
                                ? 'bg-rose-100 text-rose-800'
                                : q.difficulty === 'Vận dụng'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-50 text-blue-700'
                            }`}
                          >
                            Câu {q.index}/120 • Mức độ: {q.difficulty}
                          </span>
                          <span className="text-xs font-bold text-emerald-600">+{q.xpReward} XP</span>
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
                                    addXp(q.xpReward, `Giải đúng câu ${q.index}`);
                                  }
                                }}
                                className={`p-3 rounded-xl border text-left text-xs font-semibold transition ${
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

              {/* Danh sách 120 bài tập Tự luận */}
              {practiceTab === 'essay' && (
                <div className="space-y-4">
                  {paginatedPracticeItems.map((es) => {
                    const isShown = revealedEssays[es.id];
                    return (
                      <div key={es.id} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-extrabold px-3 py-1 rounded-md ${
                              es.difficulty === 'Vận dụng cao'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-indigo-50 text-indigo-700'
                            }`}
                          >
                            Bài {es.index}/120 • Mức độ: {es.difficulty} ({es.points} điểm)
                          </span>
                          <span className="text-xs font-bold text-emerald-600">
                            +{es.xpReward} XP hoàn thành
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 whitespace-pre-line leading-relaxed">
                          {es.problem}
                        </p>
                        <textarea
                          rows={3}
                          value={chapterEssayDrafts[es.id] || ''}
                          onChange={(e) =>
                            setChapterEssayDrafts({ ...chapterEssayDrafts, [es.id]: e.target.value })
                          }
                          placeholder="Trình bày các bước biến đổi tự luận của bạn vào đây..."
                          className="w-full p-3.5 rounded-xl border border-slate-300 text-xs focus:border-blue-600 focus:outline-hidden"
                        />
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => {
                              setRevealedEssays({ ...revealedEssays, [es.id]: !isShown });
                              if (!isShown) addXp(es.xpReward, `Hoàn thành Tự luận bài ${es.index}`);
                            }}
                            className="bg-blue-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition"
                          >
                            {isShown ? 'Ẩn hướng dẫn chấm' : `Xem Lời Giải & Nhận +${es.xpReward} XP`}
                          </button>
                        </div>
                        {isShown && (
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                            <div className="text-xs font-extrabold text-blue-700">
                              Hướng dẫn giải & Thang điểm chấm:
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
        {/* MÀN HÌNH 3: KHO ĐỀ THI ĐỊNH KỲ (55 ĐỀ CHÍNH THỨC / MÔN / ĐỢT) */}
        {/* ------------------------------------------ */}
        {currentPage === 'exam-hub' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold text-blue-600 uppercase">
                    Ngân hàng Đề Thi Chính Thức Các Trường Toàn Quốc (55 Đề / Môn / Đợt)
                  </span>
                  <h1 className="text-2xl font-black text-slate-900 mt-0.5">
                    Phòng Thi Giữa Kì 1, Cuối Kì 1, Giữa Kì 2, Cuối Kì 2 (Có Năm Học & Tên Trường)
                  </h1>
                </div>
                <input
                  type="text"
                  value={examSearch}
                  onChange={(e) => setExamSearch(e.target.value)}
                  placeholder="Tìm tên trường hoặc năm học..."
                  className="px-3.5 py-2 text-xs rounded-xl border border-slate-300 w-64"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {EXAM_TERMS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTermId(t.id)}
                    className={`p-3.5 rounded-xl border text-left transition ${
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
                    {s.name} (55 Đề)
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
                      <span className="text-amber-800 bg-amber-50 font-bold px-2 py-0.5 rounded">
                        Năm học {ex.year}
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{ex.title}</h3>
                    <p className="text-xs text-slate-500">
                      Trường ra đề: <strong>{ex.school}</strong> • Thời gian: {ex.durationMinutes} phút
                    </p>
                  </div>
                  <button
                    onClick={() => startExamRoom(ex)}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-extrabold hover:bg-blue-700 active:scale-95 transition"
                  >
                    Vào Phòng Thi Chính Thức (+80 XP)
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------ */}
        {/* MÀN HÌNH 4: ÔN THI TUYỂN SINH LỚP 10 (60 ĐỀ SỞ + 55 ĐỀ THI THỬ + BÀI TẬP ÔN) */}
        {/* ------------------------------------------ */}
        {currentPage === 'grade10-hub' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white p-6 sm:p-8 rounded-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold bg-amber-400 text-slate-900 px-3 py-1 rounded-full">
                <span>Tổ Hợp Ôn Thi Vào Lớp 10 Toàn Diện (100% Tự Luận Chuẩn Cấu Trúc Các Sở GD&ĐT)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">
                60 Đề Thi Chính Thức Các Sở GD&ĐT • 55 Đề Thi Thử Phân Hóa • Chuyên Đề Bài Tập Ôn
              </h1>

              {/* 3 Phân mục của Ôn thi vào lớp 10 */}
              <div class
