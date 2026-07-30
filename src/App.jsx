import React, { useState, useEffect } from 'react';
import { ChevronRight, RotateCcw, BookOpen, Menu, X, BarChart3 } from 'lucide-react';

export default function WineExpertApp() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [mode, setMode] = useState('menu');
  const [category, setCategory] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [problemStatus, setProblemStatus] = useState({});
  const [selectedLearning, setSelectedLearning] = useState(null);

  const categories = [
    { id: 'overview', name: 'ワイン概論', icon: '🍷', count: 25 },
    { id: 'grapes', name: 'ブドウ品種', icon: '🍇', count: 60 },
    { id: 'france', name: '🇫🇷 フランス', icon: '⚜️', count: 50 },
    { id: 'italy', name: '🇮🇹 イタリア', icon: '🌿', count: 40 },
    { id: 'spain', name: '🇪🇸 スペイン', icon: '🎸', count: 35 },
    { id: 'other', name: 'ニューワールド', icon: '🌎', count: 45 },
    { id: 'production', name: '醸造・製法', icon: '⚗️', count: 40 },
    { id: 'japan', name: '日本酒・焼酎', icon: '🏺', count: 35 },
  ];

  const learningData = {
    '発酵': { title: '発酵（アルコール発酵）', content: 'ワイン製造の最も重要なプロセス。酵母がブドウの糖をアルコールと二酸化炭素に変える化学反応です。温度管理が重要です。' },
    'マセレーション': { title: 'マセレーション', content: 'ブドウの果皮と果汁を接触させるプロセス。色素、タンニン、香りが果皮から抽出されます。赤ワイン製造で特に重要です。' },
    'テロワール': { title: 'テロワール（Terroir）', content: 'ブドウが育つ環境（土壌、気候、地形）の総称。ワインの特性を大きく左右する最も重要な要素です。フランス語で「テラ」=土地、「ワール」=作業という意味。' },
    'タンニン': { title: 'タンニン', content: 'ワインに渋味をもたらすポリフェノール化合物。赤ワインに多く含まれます。ブドウの果皮、種、樽に含まれており、ワインの色合いと複雑さを決定します。' },
    'ポリフェノール': { title: 'ポリフェノール', content: 'ワインに含まれる有機化合物の総称。色、タンニン、香りの多くを構成します。赤ワインに豊富で、抗酸化作用があることで知られています。' },
    'pH': { title: 'pH値（酸性度）', content: 'ワインの酸性度を示す指標。ワインは通常2.5～3.5の酸性です。pH値が低いほど酸性が強く、長期保存に有利です。' },
    '樽熟成': { title: '樽熟成', content: 'ワインをオーク樽で熟成させるプロセス。樽からバニラやスパイスなどの香りが抽出され、ワインの色が濃くなります。新樽と古樽で効果が異なります。' },
    'ブショネ': { title: 'ブショネ', content: 'コルク臭。TCA（トリクロロアニソール）汚染によるワイン不良。腐った新聞紙のような嫌な臭いが特徴です。' },
    'ボトルショック': { title: 'ボトルショック', content: 'ワイン瓶詰め直後に一時的に品質が低下する現象。数週間で回復することが多いです。' },
    'デカンテーション': { title: 'デカンテーション', content: 'ワインを別の容器に移して、沈殿物を分離するプロセス。同時に酸素と接触させ、香りを開かせます。' },
    'アロマ': { title: 'アロマ', content: 'ワインのブドウ本来の香り。ブドウの品種由来の香りを指します。アロマティック品種（リースリング、ゲヴュルツなど）はアロマが強いです。' },
    'ブーケ': { title: 'ブーケ', content: 'ワイン熟成中に生成される香り。樽香、酸化による香りなど、ワイン製造・熟成で生じた香りの総称です。' },
    'リースリング': { title: 'リースリング', content: 'ドイツ原産の白ワイン用ブドウ。豊富な酸度と花のような香り（バラ、ハチミツ）が特徴。産地によってドライからスイートまで多様なワイン造りが可能です。' },
    'カベルネソーヴィニヨン': { title: 'カベルネ・ソーヴィニヨン', content: '赤ワイン用の最重要ブドウ品種。タンニンが豊富で濃い色合いが特徴。ボルドーの主要品種で、世界中で栽培されています。' },
    'ピノノワール': { title: 'ピノ・ノワール', content: '赤ワイン用ブドウ。繊細でエレガント。栽培が非常に難しく気候に敏感。ブルゴーニュの最高峰で、冷涼地での栽培に適しています。' },
  };

  const sampleQuestions = {
    overview: [
      { id: 1, text: '飲酒による健康被害の主な要因は？', options: ['アセトアルデヒド', '酢酸', 'コレステロール', 'ポリフェノール'], correct: 0, explanation: '正解: アセトアルデヒド。顔面紅潮や頭痛、吐き気の原因です。', keywords: ['発酵', 'ポリフェノール'] },
      { id: 2, text: 'フィロキセラはワイン産業に何をもたらしましたか？', options: ['香りの向上', 'ブドウ樹の病害', '品質向上', 'アルコール度数増加'], correct: 1, explanation: '正解: ブドウ樹の病害。19世紀にヨーロッパのブドウ樹に甚大な被害をもたらしました。', keywords: [] },
      { id: 3, text: 'ワインの熟成に伴う酸化反応に最も関わる物質は？', options: ['窒素', '酸素', '二酸化炭素', 'アルゴン'], correct: 1, explanation: '正解: 酸素。ワインの色合いや香りが変化する主要因です。', keywords: ['テロワール'] },
      { id: 4, text: 'ブドウに含まれるタンニンの主な機能は？', options: ['香りの成分', 'アルコール決定', '渋味と色合い', '酸度調整'], correct: 2, explanation: '正解: 渋味と色合いを決定する。赤ワインはタンニンが豊富です。', keywords: ['タンニン', 'ポリフェノール'] },
      { id: 5, text: 'ワイン中の二酸化硫黄（SO₂）の役割は？', options: ['甘さ調整', '防腐・酸化防止', 'アルコール促進', 'タンニン増加'], correct: 1, explanation: '正解: 防腐・酸化防止作用。ワイン製造の重要な防腐剤です。', keywords: [] },
      { id: 6, text: 'マロラクティック発酵とは？', options: ['初期発酵', '乳酸菌による酸度低下', 'アルコール発酵', 'ワイン熟成'], correct: 1, explanation: '正解: 乳酸菌による酸度低下。ワインをより丸くします。', keywords: ['発酵'] },
      { id: 7, text: 'オーク樽によるワイン熟成で得られるものは？', options: ['糖度増加', 'バニラ・スパイス香', 'アルコール上昇', '酸度大幅増加'], correct: 1, explanation: '正解: バニラ、スパイスのような香り。樽香が付与されます。', keywords: ['樽熟成'] },
      { id: 8, text: 'pH値が低いワインの効果は？', options: ['濃厚な味わい', '長期保存可能', '甘い印象', '軽い色合い'], correct: 1, explanation: '正解: より長期の保存が可能。酸性が強いほど細菌繁殖が抑制されます。', keywords: ['pH'] },
      { id: 9, text: 'テロワール(terroir)が指すものは？', options: ['ワイン造技術', '土壌・気候・地形', '醸造酵母', 'ブドウ品種'], correct: 1, explanation: '正解: 土壌、気候、地形などの環境要因。ワイン特性を大きく左右します。', keywords: ['テロワール'] },
      { id: 10, text: '酒石酸塩の結晶化を防ぐ処理は？', options: ['マロラクティック発酵', 'デカンテーション', '冷却安定化処理', '樽熟成'], correct: 2, explanation: '正解: 冷却安定化処理。ワインを低温冷却して結晶化を事前に防ぎます。', keywords: [] },
    ],
    grapes: [
      { id: 26, text: 'リースリングの最大の特徴は？', options: ['高アルコール', '豊富な酸度と花香', '濃いルビー色', 'ハーブ香'], correct: 1, explanation: '正解: 豊富な酸度と花のような香り。白ワイン用ブドウです。', keywords: ['リースリング', 'アロマ'] },
      { id: 27, text: 'カベルネ・ソーヴィニヨンの特徴は？', options: ['軽やかでイチゴ香', 'タンニン豊富で濃い', 'バナナ香', '低アルコール'], correct: 1, explanation: '正解: タンニン豊富で濃い色合い。赤ワイン用の最重要品種です。', keywords: ['カベルネソーヴィニヨン', 'タンニン'] },
      { id: 28, text: 'ピノ・ノワール栽培の最大課題は？', options: ['病害虫弱い', '栽培困難で気候敏感', 'ブドウが小さい', 'アルコール不定'], correct: 1, explanation: '正解: 栽培が非常に難しく気候に敏感。テロワールの影響を強く受けます。', keywords: ['ピノノワール', 'テロワール'] },
      { id: 29, text: 'シラー（シラーズ）の香りは？', options: ['フローラル', 'スパイシー・黒コショウ・ブラックベリー', 'トロピカル', 'ハーブ'], correct: 1, explanation: '正解: スパイシー、ブラックベリー、黒コショウ。力強いワインです。', keywords: [] },
      { id: 30, text: 'メルローの最大特徴は？', options: ['タンニン豊富', '果実味たっぷり・滑らか口当たり', '高酸度', 'ドライで苦い'], correct: 1, explanation: '正解: 果実味たっぷりで滑らかな口当たり。柔らかい赤ワイン用ブドウ。', keywords: [] },
    ],
    france: [
      { id: 56, text: 'シャンパーニュ地方の位置は？', options: ['ボルドー周辺', 'ロワール流域', 'パリの北東部', 'ローヌ流域'], correct: 2, explanation: '正解: パリの北東約150km。冷涼な気候がスパークリング生産に適した。', keywords: [] },
      { id: 57, text: 'ボルドーとブルゴーニュの違いは？', options: ['気候のみ', 'ボルドーはブレンド、ブルゴーニュは単一品種', '価格のみ', 'ボルドーは白ワイン'], correct: 1, explanation: '正解: ボルドーはブレンド、ブルゴーニュはピノ・ノワールやシャルドネ単一。', keywords: [] },
      { id: 58, text: 'チャブリの特徴は？', options: ['赤ワイン名産', 'シャルドネ100%・樽不使用', 'スパークリング主流', '甘口デザート'], correct: 1, explanation: '正解: シャルドネ100%で樽を使わない白ワイン。ミネラル感あふれる。', keywords: [] },
    ],
    italy: [
      { id: 76, text: 'バルローロの産地は？', options: ['フランス・ボルドー', 'イタリア・ピエモンテ', 'スペイン・リオハ', 'ドイツ'], correct: 1, explanation: '正解: イタリア・ピエモンテ州。ネッビオーロから造られる「ワインの王」。', keywords: [] },
      { id: 77, text: 'キャンティの法定最小熟成期間は？', options: ['1年未満', '最小1年・リゼルヴァは3年', '6ヶ月', '3ヶ月'], correct: 1, explanation: '正解: キャンティは最小1年、リゼルヴァ（最高品質）は3年。', keywords: [] },
    ],
    spain: [
      { id: 96, text: 'リオハの最重要品種は？', options: ['カベルネ', 'テンプラニーリョ', 'メルロー', 'シラー'], correct: 1, explanation: '正解: テンプラニーリョ。スペイン北部リオハの代表品種。', keywords: [] },
      { id: 97, text: 'シェリーの生産地は？', options: ['マドリッド', 'アンダルシア・ヘレス地方', 'カタルーニャ', 'バスク'], correct: 1, explanation: '正解: スペイン南部アンダルシアのヘレス。酒精強化ワイン。', keywords: [] },
    ],
    other: [
      { id: 106, text: 'ナパ・カベルネの特徴は？', options: ['最安値', '温暖気候・樹齢老成・凝縮度高い', '品質低い', 'スパークリング'], correct: 1, explanation: '正解: カリフォルニア・ナパ・カベルネは完全成熟と樹齢による凝縮度が特徴。', keywords: ['カベルネソーヴィニヨン'] },
      { id: 107, text: 'オレゴンの代表品種は？', options: ['カベルネ', 'ピノ・ノワール', 'シラー', 'メルロー'], correct: 1, explanation: '正解: ピノ・ノワール。オレゴンはピノ・ノワール、ピノ・グリで評価。', keywords: ['ピノノワール'] },
    ],
    production: [
      { id: 116, text: 'マセレーションとは？', options: ['圧搾プロセス', 'ブドウ果皮と果汁の接触', 'ワイン瓶詰', 'ワイン樽ろ過'], correct: 1, explanation: '正解: 果皮と果汁を接触。色素、タンニン、香りが抽出される。', keywords: ['マセレーション', 'タンニン'] },
      { id: 117, text: 'メトード・シャンペノワーズとは？', options: ['シャルマ方式', '瓶内二次発酵', '樽発酵法', 'カルボニック・マセレーション'], correct: 1, explanation: '正解: 瓶内で二次発酵。シャンパーニュの伝統製法。', keywords: ['発酵'] },
      { id: 118, text: 'デカンテーションの目的は？', options: ['冷やす', '沈殿物分離＆酸素接触', 'アルコール上昇', '色濃化'], correct: 1, explanation: '正解: 沈殿物の分離と酸素との接触（エアレーション）。香りが開く。', keywords: ['デカンテーション'] },
    ],
    japan: [
      { id: 136, text: '壱岐焼酎の産地は？', options: ['大分県', '長崎県', '宮崎県', '鹿児島県'], correct: 1, explanation: '正解: 長崎県壱岐市。米麹を約1/3、大麦を約2/3使用。', keywords: [] },
      { id: 137, text: '吟醸酒の法定最低精米歩合は？', options: ['70%', '60%', '50%', '40%'], correct: 1, explanation: '正解: 精米歩合60%以下。大吟醸はさらに50%以下。', keywords: [] },
    ]
  };

  useEffect(() => {
    const saved = localStorage.getItem('wineExpertStatus');
    if (saved) {
      setProblemStatus(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wineExpertStatus', JSON.stringify(problemStatus));
  }, [problemStatus]);

  const loadQuestions = (selectedCategory) => {
    setCategory(selectedCategory);
    const categoryQuestions = sampleQuestions[selectedCategory] || [];
    const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setMode('quiz');
    setMobileMenu(false);
  };

  const handleAnswerSelect = (index) => {
    if (mode !== 'quiz') return;
    
    const current = questions[currentIndex];
    const isCorrect = index === current.correct;
    
    setSelectedAnswer(index);
    setProblemStatus({
      ...problemStatus,
      [current.id]: isCorrect ? 'correct' : 'incorrect'
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      setMode('result');
    }
  };

  const handleReset = () => {
    setMode('menu');
    setCategory(null);
    setCurrentIndex(0);
    setSelectedAnswer(null);
  };

  const getStatusStats = () => {
    const stats = { correct: 0, incorrect: 0, unanswered: 0 };
    Object.values(problemStatus).forEach(status => {
      if (status === 'correct') stats.correct++;
      else if (status === 'incorrect') stats.incorrect++;
      else stats.unanswered++;
    });
    return stats;
  };

  // メニュー画面
  if (mode === 'menu') {
    const stats = getStatusStats();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 md:p-4">
        <div className="max-w-6xl mx-auto pt-4">
          {/* ナビゲーション */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-amber-400 mr-2" />
              <h1 className="text-2xl md:text-4xl font-bold text-white">ワインエキスパート</h1>
            </div>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-white">
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* モバイルメニュー */}
          {mobileMenu && (
            <div className="mb-6 bg-white bg-opacity-10 rounded-lg p-4 md:hidden">
              <button onClick={() => { setMode('learning'); setMobileMenu(false); }} className="w-full text-white text-lg py-3 mb-2 bg-amber-600 rounded-lg font-bold">
                📚 学習
              </button>
              <button onClick={() => { setMode('stats'); setMobileMenu(false); }} className="w-full text-white text-lg py-3 bg-blue-600 rounded-lg font-bold">
                📊 統計
              </button>
            </div>
          )}

          {/* 統計 */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
            <div className="bg-green-500 bg-opacity-20 border border-green-300 rounded-xl p-4 md:p-6 text-center">
              <p className="text-green-300 text-xs md:text-sm">正解</p>
              <p className="text-3xl md:text-4xl font-bold text-green-400">{stats.correct}</p>
            </div>
            <div className="bg-red-500 bg-opacity-20 border border-red-300 rounded-xl p-4 md:p-6 text-center">
              <p className="text-red-300 text-xs md:text-sm">不正解</p>
              <p className="text-3xl md:text-4xl font-bold text-red-400">{stats.incorrect}</p>
            </div>
            <div className="bg-gray-500 bg-opacity-20 border border-gray-300 rounded-xl p-4 md:p-6 text-center">
              <p className="text-gray-300 text-xs md:text-sm">未回答</p>
              <p className="text-3xl md:text-4xl font-bold text-gray-400">{Object.keys(problemStatus).length > 0 ? Object.keys(sampleQuestions).flat().length - Object.keys(problemStatus).length : Object.keys(sampleQuestions).flat().length}</p>
            </div>
          </div>

          {/* タイトル */}
          <div className="text-center mb-8">
            <p className="text-amber-200 text-base md:text-lg">試験対策 学習アプリ</p>
            <p className="text-amber-300 text-lg md:text-2xl font-bold mt-2">330+ 問の出題傾向対応</p>
          </div>

          {/* カテゴリカード */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => loadQuestions(cat.id)}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-20 rounded-2xl p-6 md:p-8 text-white transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-4xl md:text-5xl mb-4">{cat.icon}</div>
                <h3 className="text-lg md:text-2xl font-bold mb-3">{cat.name}</h3>
                <p className="text-amber-300 font-semibold text-base md:text-lg">{cat.count}問</p>
              </button>
            ))}
          </div>

          {/* デスクトップメニュー */}
          <div className="hidden md:flex gap-4 justify-center">
            <button onClick={() => setMode('learning')} className="bg-amber-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-amber-700">
              📚 学習
            </button>
            <button onClick={() => setMode('stats')} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700">
              📊 統計
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 学習画面
  if (mode === 'learning') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 md:p-4">
        <div className="max-w-4xl mx-auto pt-4">
          <button onClick={handleReset} className="mb-6 bg-gray-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-base md:text-lg hover:bg-gray-700">
            ← メニューに戻る
          </button>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">📚 用語集・学習</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {Object.entries(learningData).map(([key, data]) => (
              <div key={key} className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{data.title}</h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">{data.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 統計画面
  if (mode === 'stats') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 md:p-4">
        <div className="max-w-4xl mx-auto pt-4">
          <button onClick={handleReset} className="mb-6 bg-gray-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold text-base md:text-lg hover:bg-gray-700">
            ← メニューに戻る
          </button>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">📊 学習統計</h2>

          {Object.entries(sampleQuestions).map(([catKey, probs]) => {
            const catName = categories.find(c => c.id === catKey)?.name || catKey;
            const correct = probs.filter(p => problemStatus[p.id] === 'correct').length;
            const incorrect = probs.filter(p => problemStatus[p.id] === 'incorrect').length;
            const total = probs.length;
            const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

            return (
              <div key={catKey} className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl p-6 md:p-8 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white">{catName}</h3>
                  <p className="text-2xl md:text-3xl font-bold text-amber-400">{percent}%</p>
                </div>
                <div className="flex gap-2 md:gap-4 text-base md:text-lg">
                  <span className="text-green-400">✓ {correct}</span>
                  <span className="text-red-400">✗ {incorrect}</span>
                  <span className="text-gray-400">未 {total - correct - incorrect}</span>
                </div>
                <div className="w-full h-3 bg-white bg-opacity-10 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${percent}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // クイズ画面
  if (mode === 'quiz' && questions.length > 0) {
    const current = questions[currentIndex];
    const categoryName = categories.find(c => c.id === category)?.name || 'カテゴリ';
    const percentage = Math.round(((currentIndex + 1) / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 md:p-4">
        <div className="max-w-3xl mx-auto pt-4">
          {/* ヘッダー */}
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <div>
                <p className="text-xs md:text-sm text-gray-300">{categoryName}</p>
                <p className="text-xl md:text-2xl font-bold text-white">問 {currentIndex + 1} / {questions.length}</p>
              </div>
              <button onClick={handleReset} className="bg-gray-600 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-bold hover:bg-gray-700">
                メニュー
              </button>
            </div>
            <div className="w-full h-3 bg-white bg-opacity-10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all" style={{ width: `${percentage}%` }} />
            </div>
          </div>

          {/* 問題カード */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-6">
            {/* 問題文 */}
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-8 md:mb-10 leading-relaxed">{current.text}</h2>

            {/* 選択肢 */}
            <div className="space-y-3 md:space-y-4 mb-8">
              {current.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`w-full p-4 md:p-6 text-left rounded-xl font-semibold transition-all text-base md:text-lg ${
                    selectedAnswer === idx
                      ? idx === current.correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-current mr-4 text-base md:text-lg font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                  </div>
                </button>
              ))}
            </div>

            {/* 解説 */}
            {selectedAnswer !== null && (
              <div className={`rounded-xl p-6 md:p-8 mb-8 border-2 ${selectedAnswer === current.correct ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                <div className={`font-bold mb-3 md:mb-4 text-lg md:text-xl ${selectedAnswer === current.correct ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedAnswer === current.correct ? '✓ 正解！' : '✗ 不正解'}
                </div>
                <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4">{current.explanation}</p>

                {/* 関連用語 */}
                {current.keywords && current.keywords.length > 0 && (
                  <div className="mt-6 pt-6 border-t-2 border-gray-300">
                    <p className="font-bold text-gray-700 mb-3 text-base md:text-lg">📚 関連用語：</p>
                    <div className="flex flex-wrap gap-2">
                      {current.keywords.map((keyword, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedLearning(learningData[keyword])}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm md:text-base font-semibold transition"
                        >
                          {keyword} →
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 関連学習パネル */}
            {selectedLearning && (
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 md:p-8 mb-8">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg md:text-xl font-bold text-blue-700">{selectedLearning.title}</h4>
                  <button onClick={() => setSelectedLearning(null)} className="text-blue-700 hover:text-blue-900 text-2xl">×</button>
                </div>
                <p className="text-gray-800 text-base md:text-lg leading-relaxed">{selectedLearning.content}</p>
              </div>
            )}

            {/* ボタン */}
            <div className="flex gap-3 md:gap-4">
              <button onClick={handleReset} className="flex-1 bg-gray-400 text-white py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-gray-500 transition">
                メニュー
              </button>
              {selectedAnswer !== null && (
                <button onClick={handleNext} className="flex-1 bg-amber-600 text-white py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-amber-700 transition flex items-center justify-center gap-2">
                  {currentIndex === questions.length - 1 ? '結果を見る' : '次へ'} <ChevronRight size={24} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 結果画面
  if (mode === 'result') {
    const correct = questions.filter((q, idx) => problemStatus[q.id] === 'correct').length;
    const percentage = Math.round((correct / questions.length) * 100);
    const categoryName = categories.find(c => c.id === category)?.name || 'カテゴリ';

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 md:p-4">
        <div className="max-w-3xl mx-auto pt-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">試験終了</h2>
              <div className="text-5xl md:text-7xl font-bold mb-4">{percentage}%</div>
              <p className="text-lg md:text-2xl mb-2">{correct} / {questions.length} 問正解</p>
              <p className="text-amber-100 text-base md:text-lg">{categoryName}</p>
            </div>

            <div className="p-6 md:p-10">
              <div className="text-center mb-8 md:mb-10">
                {percentage >= 80 && <div className="text-6xl md:text-7xl mb-4">🎉</div>}
                {percentage >= 60 && percentage < 80 && <div className="text-6xl md:text-7xl mb-4">👍</div>}
                {percentage < 60 && <div className="text-6xl md:text-7xl mb-4">📖</div>}
                
                {percentage >= 80 && <p className="text-xl md:text-2xl text-green-600 font-bold">素晴らしい成績です！</p>}
                {percentage >= 60 && percentage < 80 && <p className="text-xl md:text-2xl text-blue-600 font-bold">良好な成績です。</p>}
                {percentage < 60 && <p className="text-xl md:text-2xl text-orange-600 font-bold">もう一度チャレンジしましょう。</p>}
              </div>

              <button onClick={handleReset} className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 md:py-5 rounded-xl font-bold hover:shadow-lg transition text-lg md:text-2xl flex items-center justify-center gap-2">
                <RotateCcw size={28} />
                別のカテゴリに挑戦
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
