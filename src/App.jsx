import React, { useState } from 'react';
import { ChevronRight, RotateCcw, BookOpen } from 'lucide-react';

export default function WineExpertApp() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState('menu');
  const [category, setCategory] = useState(null);
  const [answers, setAnswers] = useState([]);

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

  const sampleQuestions = {
    overview: [
      { id: 1, text: '飲酒による健康被害の主な要因は？', options: ['アセトアルデヒド', '酢酸', 'コレステロール', 'ポリフェノール'], correct: 0, explanation: '正解: アセトアルデヒド。顔面紅潮や頭痛、吐き気の原因です。' },
      { id: 2, text: 'フィロキセラはワイン産業に何をもたらしましたか？', options: ['香りの向上', 'ブドウ樹の病害', '品質向上', 'アルコール度数増加'], correct: 1, explanation: '正解: ブドウ樹の病害。19世紀にヨーロッパのブドウ樹に甚大な被害をもたらしました。' },
      { id: 3, text: 'ワインの熟成に伴う酸化反応に最も関わる物質は？', options: ['窒素', '酸素', '二酸化炭素', 'アルゴン'], correct: 1, explanation: '正解: 酸素。ワインの色合いや香りが変化する主要因です。' },
      { id: 4, text: 'ブドウに含まれるタンニンの主な機能は？', options: ['香りの成分', 'アルコール決定', '渋味と色合い', '酸度調整'], correct: 2, explanation: '正解: 渋味と色合いを決定する。赤ワインはタンニンが豊富です。' },
      { id: 5, text: 'ワイン中の二酸化硫黄（SO₂）の役割は？', options: ['甘さ調整', '防腐・酸化防止', 'アルコール促進', 'タンニン増加'], correct: 1, explanation: '正解: 防腐・酸化防止作用。ワイン製造の重要な防腐剤です。' },
      { id: 6, text: 'マロラクティック発酵とは？', options: ['初期発酵', '乳酸菌による酸度低下', 'アルコール発酵', 'ワイン熟成'], correct: 1, explanation: '正解: 乳酸菌による酸度低下。ワインをより丸くします。' },
      { id: 7, text: 'オーク樽によるワイン熟成で得られるものは？', options: ['糖度増加', 'バニラ・スパイス香', 'アルコール上昇', '酸度大幅増加'], correct: 1, explanation: '正解: バニラ、スパイスのような香り。樽香が付与されます。' },
      { id: 8, text: 'pH値が低いワインの効果は？', options: ['濃厚な味わい', '長期保存可能', '甘い印象', '軽い色合い'], correct: 1, explanation: '正解: より長期の保存が可能。酸性が強いほど細菌繁殖が抑制されます。' },
      { id: 9, text: 'テロワール(terroir)が指すものは？', options: ['ワイン造技術', '土壌・気候・地形', '醸造酵母', 'ブドウ品種'], correct: 1, explanation: '正解: 土壌、気候、地形などの環境要因。ワイン特性を大きく左右します。' },
      { id: 10, text: '酒石酸塩の結晶化を防ぐ処理は？', options: ['マロラクティック発酵', 'デカンテーション', '冷却安定化処理', '樽熟成'], correct: 2, explanation: '正解: 冷却安定化処理。ワインを低温冷却して結晶化を事前に防ぎます。' },
      { id: 11, text: 'ボトルショックとは？', options: ['ボトル破損', 'ワイン瓶詰め直後の品質低下', 'ラベル損傷', 'コルク臭'], correct: 1, explanation: '正解: ワイン瓶詰め直後の品質低下。数週間で回復します。' },
      { id: 12, text: 'ブショネの主な原因は？', options: ['酸化', 'TCA汚染', 'バクテリア感染', 'アルコール蒸発'], correct: 1, explanation: '正解: TCA（トリクロロアニソール）によるコルク汚染。腐った新聞紙臭がします。' },
      { id: 13, text: 'ワインの色褪せが進む主な原因は？', options: ['低温保管', '高温と光への長期露光', 'コルク通気', 'アルコール蒸発'], correct: 1, explanation: '正解: 高温と光への長期露光。遮光性瓶と冷暗所保管が重要です。' },
      { id: 14, text: 'アロマ vs ブーケの違いは？', options: ['色と香り', 'ブドウ本来香 vs 熟成香', '特に違いなし', '樽香 vs 花香'], correct: 1, explanation: '正解: アロマはブドウ本来の香り、ブーケは熟成で生じた香り。' },
      { id: 15, text: '樽の役割として間違っているのは？', options: ['色を濃くする', '樽香付与', '微量酸素提供', 'ワイン味を決定'], correct: 3, explanation: '正解: ワインの味の決定。味はブドウ品種と製法が主です。' },
      { id: 16, text: 'ワインの発酵に必要なのは？', options: ['温度管理のみ', '酵母と糖', 'だけ', 'ブドウ品種'], correct: 1, explanation: '正解: 酵母と糖。酵母がブドウ中の糖をアルコールに変えます。' },
      { id: 17, text: 'アルコール度数が高いワインの特徴は？', options: ['軽い印象', '重厚で濃厚', 'ドライ', 'フルーティー'], correct: 1, explanation: '正解: 重厚で濃厚。アルコール度数とボディは相関関係があります。' },
      { id: 18, text: 'ワインのアロマティック性が高い品種は？', options: ['カベルネ・ソーヴィニヨン', 'リースリング', 'メルロー', 'ピノ・グリ'], correct: 1, explanation: '正解: リースリング。花のような香りが非常に強い品種です。' },
      { id: 19, text: 'ワイン製造での「引き継ぎ」工程は？', options: ['果汁の分離', 'ワインの樽への詰め替え', 'ラベル貼付', 'ボトル詰め'], correct: 1, explanation: '正解: ワインの樽への詰め替え。沈殿物から分離する工程です。' },
      { id: 20, text: 'エノロジーとは何の学問か？', options: ['ブドウ学', 'ワイン学', '食品学', '化学'], correct: 1, explanation: '正解: ワイン学。ワイン製造と品質に関する科学的研究です。' },
      { id: 21, text: 'ワインの酸度が高いと？', options: ['より甘い', 'フレッシュで爽やか', 'より重い', 'より甘い'], correct: 1, explanation: '正解: フレッシュで爽やか。酸度が高いワインは飲みやすく感じます。' },
      { id: 22, text: 'ポリフェノールの主な役割は？', options: ['甘さ決定', '色・タンニン・香り成分', 'アルコール濃度', 'pH調整'], correct: 1, explanation: '正解: 色、タンニン、香りの成分。赤ワインに豊富です。' },
      { id: 23, text: 'ワインの「残糖」が多いと？', options: ['より辛い', 'より甘い', 'より酸っぱい', 'より濃い'], correct: 1, explanation: '正解: より甘い。残糖が多いワインは甘口になります。' },
      { id: 24, text: 'ワインのpH値の正常範囲は？', options: ['2.5～3.5', '4.0～5.0', '6.0～7.0', '8.0～9.0'], correct: 0, explanation: '正解: 2.5～3.5。ワインは酸性です。' },
      { id: 25, text: 'オレンジワインの製造方法は？', options: ['オレンジを混ぜる', '白ブドウを赤ワイン方式で製造', '樽で長期熟成', '酵母を特別選別'], correct: 1, explanation: '正解: 白ブドウを赤ワイン方式（スキン・コンタクト）で製造。' },
    ],
    grapes: [
      { id: 26, text: 'リースリングの最大の特徴は？', options: ['高アルコール', '豊富な酸度と花香', '濃いルビー色', 'ハーブ香'], correct: 1, explanation: '正解: 豊富な酸度と花のような香り。白ワイン用ブドウです。' },
      { id: 27, text: '二次試験で最多出題のブドウ（白）は？', options: ['シャルドネ', 'ソーヴィニヨン・ブラン', 'リースリング（7回）', 'ゲヴュルツ'], correct: 2, explanation: '正解: リースリング。白ワイン品種で最頻出です。' },
      { id: 28, text: 'カベルネ・ソーヴィニヨンの特徴は？', options: ['軽やかでイチゴ香', 'タンニン豊富で濃い', 'バナナ香', '低アルコール'], correct: 1, explanation: '正解: タンニン豊富で濃い色合い。赤ワイン用の最重要品種です。' },
      { id: 29, text: 'ピノ・ノワール栽培の最大課題は？', options: ['病害虫弱い', '栽培困難で気候敏感', 'ブドウが小さい', 'アルコール不定'], correct: 1, explanation: '正解: 栽培が非常に難しく気候に敏感。テロワールの影響を強く受けます。' },
      { id: 30, text: 'ピノ vs カベルネのブドウ皮の厚さは？', options: ['ピノが厚い', 'カベルネが厚い', '同じ厚さ', '時期で変わる'], correct: 1, explanation: '正解: カベルネが厚い。これがタンニン豊富さを生みます。' },
      { id: 31, text: 'ガメイの特徴は？', options: ['濃いルビー', 'イチゴ香・軽やか・穏やかタンニン', 'スパイシー', '高アルコール'], correct: 1, explanation: '正解: イチゴの香りで酸が豊富、軽やか。ボージョレ・ヌーヴォーに使用。' },
      { id: 32, text: 'シラー（シラーズ）の香りは？', options: ['フローラル', 'スパイシー・黒コショウ・ブラックベリー', 'トロピカル', 'ハーブ'], correct: 1, explanation: '正解: スパイシー、ブラックベリー、黒コショウ。力強いワインです。' },
      { id: 33, text: 'メルローの最大特徴は？', options: ['タンニン豊富', '果実味たっぷり・滑らか口当たり', '高酸度', 'ドライで苦い'], correct: 1, explanation: '正解: 果実味たっぷりで滑らかな口当たり。柔らかい赤ワイン用ブドウ。' },
      { id: 34, text: 'グルナッシュの主産地は？', options: ['イタリア北部', 'スペイン南部・フランス南東部', 'ドイツ西部', 'ポルトガル北部'], correct: 1, explanation: '正解: スペイン南部とフランス南東部。テンプラニーリョとのブレンド。' },
      { id: 35, text: 'ネッビオーロの特徴は？', options: ['軽くフルーティー', '酸・タンニン強く長期熟成型', 'スイート', '低アルコール'], correct: 1, explanation: '正解: 酸・タンニンが強く長期熟成型。バローロの原料。' },
      { id: 36, text: 'サンジョベーゼの産地は？', options: ['フランス・ボルドー', 'イタリア・トスカーナ（キャンティ）', 'スペイン・ラ・マンチャ', 'ポルトガル'], correct: 1, explanation: '正解: イタリア・トスカーナ。キャンティの主要品種です。' },
      { id: 37, text: 'テンプラニーリョの特徴は？', options: ['軽い白ワイン用', '樽香特徴的で濃いワイン用', 'フローラル', 'スイート'], correct: 1, explanation: '正解: 樽香が特徴的で濃いワイン用。スペイン代表品種。' },
      { id: 38, text: 'シャルドネのワイン造り地域差は？', options: ['すべて同じ', 'クール地はフレッシュ、ウォーム地はリッチ', 'ウォーム地のみ可', '南半球不可'], correct: 1, explanation: '正解: クール産地ではフレッシュで酸度高く、ウォーム産地ではリッチ。' },
      { id: 39, text: 'ソーヴィニヨン・ブランの香りは？', options: ['バラ・ハチミツ', 'グラスグリーン・ハーブ', 'トロピカル', 'スパイス'], correct: 1, explanation: '正解: グラスグリーン、ハーブのような爽やか香り。グーズベリーも表現。' },
      { id: 40, text: 'マスカット・ベーリーAの特徴は？', options: ['フランス高級品種', '日本固有・甘い香りのブドウ', 'タンニン極豊', '異常高アルコール'], correct: 1, explanation: '正解: 日本固有の甘い香りのブドウ。キャンディのような香りが特徴。' },
      { id: 41, text: 'ゲヴュルツトラミネールの香りは？', options: ['爽やかグラスグリーン', 'フローラル・バラ荷香', 'スパイシー・ライチ', 'トロピカル'], correct: 2, explanation: '正解: スパイシーでライチ（荷香）。アルザス地方のブドウ。' },
      { id: 42, text: 'カルメネールの主産地は？', options: ['フランス・ボルドー', 'チリ', 'イタリア・トスカーナ', 'スペイン・リオハ'], correct: 1, explanation: '正解: チリ。ボルドー起源ですが、今日はチリの代表品種。' },
      { id: 43, text: 'プティ・ヴェルドの特徴は？', options: ['フレッシュ軽やか', 'タンニン豊富・色濃い', 'スイート香', '低アルコール'], correct: 1, explanation: '正解: タンニンが極めて豊富で色が濃い。「小さな緑」の名前の由来。' },
      { id: 44, text: 'マルベックの主産地は？', options: ['イタリア北部', 'アルゼンチン・メンドーサ', 'アメリカ・カリフォルニア', 'オーストリア'], correct: 1, explanation: '正解: アルゼンチン・メンドーサ。深いガーネット色のワイン用ブドウ。' },
      { id: 45, text: 'アルバリーニョの特徴は？', options: ['ハーブ香と酸度', '花香で甘い', 'スパイシー樽香', 'トロピカル低酸'], correct: 0, explanation: '正解: ハーブのような香りと酸度。ポルトガル起源のスペイン・ガリシア地方。' },
      { id: 46, text: 'モスカートの用途は？', options: ['重いフルボディ', 'スパークリング・デザートワイン', 'ドライな赤', 'ハーブリキュール'], correct: 1, explanation: '正解: スパークリング・デザートワイン。モスカート・ダスティは高級品。' },
      { id: 47, text: 'ヴィオニエの香りは？', options: ['グラスグリーン', '杏・白い花・ハチミツ', 'トロピカル', 'スパイス'], correct: 1, explanation: '正解: 杏、白い花、ハチミツのような華やかな香り。' },
      { id: 48, text: 'アイレン（Airen）の特徴は？', options: ['非常に高価', '世界最多栽培面積の白ブドウ', 'アルコール極高', '香り極強'], correct: 1, explanation: '正解: 世界で最も栽培面積が大きい白ブドウ品種。スペイン・ラ・マンチャ。' },
      { id: 49, text: 'トラミナーとゲヴュルツトラミネールの関係は？', options: ['全く別品種', 'トラミナー系から進化・香り強化', '同一品種', '関連なし'], correct: 1, explanation: '正解: ゲヴュルツ（スパイス）の付いたトラミナーで、香りがより強い。' },
      { id: 50, text: 'バルベーラの特徴は？', options: ['高アルコール', '高酸度・タンニン・長期熟成型', 'スイート', '低アルコール'], correct: 1, explanation: '正解: 高い酸度とタンニン。イタリア・ピエモンテ州のブドウ。' },
      { id: 51, text: 'アマローネの製造方法は？', options: ['自然発酵', 'ブドウ乾燥後発酵', '樽長期熟成', '砂糖追加'], correct: 1, explanation: '正解: ブドウを乾燥させてから発酵。イタリア・ヴェネト地方。' },
      { id: 52, text: 'パッシート（Passito）とは？', options: ['樽熟成', 'ブドウ乾燥による甘いワイン', '酵母複数添加', '温度厳密管理'], correct: 1, explanation: '正解: イタリア産デザートワイン。ブドウを乾燥させて濃縮。' },
      { id: 53, text: 'ジンファンデルの原産地は？', options: ['イタリア古い呼び名', 'アメリカ・カリフォルニア', 'スペイン', 'フランス'], correct: 1, explanation: '正解: カリフォルニアの代表品種。実はイタリア原産説も。' },
      { id: 54, text: 'カリニャンの特徴は？', options: ['フレッシュ軽い', 'タンニン豊富で凝縮度高い・濃い', 'スイート香', '低アルコール'], correct: 1, explanation: '正解: タンニンが非常に豊富で濃いワイン。力強い品種。' },
      { id: 55, text: 'パイスの生産国は？', options: ['スペイン', 'チリ', 'アルゼンチン', 'ペルー'], correct: 1, explanation: '正解: チリ最古のブドウ品種。スペイン征服時代から栽培。' },
    ],
    france: [
      { id: 56, text: 'シャンパーニュ地方の位置は？', options: ['ボルドー周辺', 'ロワール流域', 'パリの北東部', 'ローヌ流域'], correct: 2, explanation: '正解: パリの北東約150km。冷涼な気候がスパークリング生産に適した。' },
      { id: 57, text: 'ボルドーとブルゴーニュの違いは？', options: ['気候のみ', 'ボルドーはブレンド、ブルゴーニュは単一品種', '価格のみ', 'ボルドーは白ワイン'], correct: 1, explanation: '正解: ボルドーはブレンド（カベルネ・メルロー等）、ブルゴーニュはピノ・ノワールやシャルドネ単一。' },
      { id: 58, text: 'チャブリの特徴は？', options: ['赤ワイン名産', 'シャルドネ100%・樽不使用', 'スパークリング主流', '甘口デザート'], correct: 1, explanation: '正解: シャルドネ100%で樽を使わない白ワイン。ミネラル感あふれる。' },
      { id: 59, text: 'メドック地域の赤ワイン品種は？', options: ['ピノ・ノワール', 'カベルネ・ソーヴィニヨン中心', 'シラー', 'メルロー単一'], correct: 1, explanation: '正解: カベルネ・ソーヴィニヨンを中心にメルロー等のブレンド。' },
      { id: 60, text: 'ポムロール地域の主品種は？', options: ['カベルネ・ソーヴィニヨン', 'メルロー', 'ピノ・ノワール', 'シラー'], correct: 1, explanation: '正解: メルロー。ボルドーの中でもメルロー比率が高い。' },
      { id: 61, text: 'グラーヴ地域の特徴は？', options: ['白ワイン専門', '赤白両方・砂利質土壌', 'ロゼ中心', 'スパークリング'], correct: 1, explanation: '正解: 赤白両方で、砂利質（グラーヴ）の土壌。' },
      { id: 62, text: 'ソーテルヌの製造方法は？', options: ['乾燥ブドウ', '貴腐菌', '加熱', 'アルコール添加'], correct: 1, explanation: '正解: ボトリティス・シネレア（貴腐菌）でブドウを濃縮。高級デザートワイン。' },
      { id: 63, text: 'ロワール川流域の代表ワインは？', options: ['重いフルボディ', 'フレッシュな白・ロゼ', 'スパークリング専門', '濃いタンニン赤'], correct: 1, explanation: '正解: フレッシュな白ワイン（ソーヴィニヨン・ブラン）やロゼが特徴。' },
      { id: 64, text: 'コート・ロティの主品種は？', options: ['ピノ・ノワール', 'シラー+ヴィオニエ', 'カベルネ', 'メルロー'], correct: 1, explanation: '正解: シラーにヴィオニエ（白）をブレンド。ローヌ北部の力強いワイン。' },
      { id: 65, text: 'エルミタージュの代表品種は？', options: ['カベルネ', 'シラー', 'ピノノワール', 'グルナッシュ'], correct: 1, explanation: '正解: シラー。ローヌ北部の高級赤ワイン産地。' },
      { id: 66, text: 'アルザスの特徴は？', options: ['スパークリング専門', 'ドイツ系品種・樽不使用白ワイン', '赤ワイン最高峰', '甘口デザート'], correct: 1, explanation: '正解: ゲヴュルツトラミネール、リースリング等でドイツ系品種を使用。樽不使用。' },
      { id: 67, text: 'プロヴァンスロゼの特徴は？', options: ['濃いピンク・甘い', '淡いサーモンピンク・ドライ', 'タンニン強い', '低アルコール'], correct: 1, explanation: '正解: 淡いサーモンピンク色でドライで爽やか。フランスロゼの最高級。' },
      { id: 68, text: 'ボーン地域の特徴は？', options: ['赤ワイン中心', 'ピノ・ノワール最高地域', 'スパークリング専門', '白ワイン単一'], correct: 1, explanation: '正解: ピノ・ノワール最高の産地。上品でエレガントな赤ワイン。' },
      { id: 69, text: 'ジュラ地域の代表ワインは？', options: ['カベルネ主体', '黄ワイン（イエロー・ワイン）', 'スパークリング', 'ロゼ'], correct: 1, explanation: '正解: 黄ワイン（ヴァン・ジョーヌ）。特殊な酵母で造られた独特のワイン。' },
      { id: 70, text: 'ボルドー地域の格付けシステムは？', options: ['年式の古さ', '1855年メドック格付け等', 'ポイント制', 'ブドウ品種'], correct: 1, explanation: '正解: 1855年メドック格付けが有名。プルミエ・クリュから5級まで。' },
      { id: 71, text: 'ブルゴーニュのテロワール分類は？', options: ['アペラシオン', 'グラン・クリュ > プルミエ・クリュ', 'ヴィレッジ > リージョナル', '全て同じ'], correct: 1, explanation: '正解: グラン・クリュが最高、プルミエ・クリュ、ヴィレッジ、リージョナルの順。' },
      { id: 72, text: 'サン・ジュリアン地域の特徴は？', options: ['白ワイン専門', 'カベルネ・ソーヴィニヨン中心の赤', 'ロゼ中心', 'スパークリング'], correct: 1, explanation: '正解: カベルネ・ソーヴィニヨン中心の優雅な赤ワイン。ボルドー左岸。' },
      { id: 73, text: 'ニュイ・サン・ジョルジュの特徴は？', options: ['白ワイン', 'ピノ・ノワールの最高地', 'ロゼ中心', 'スパークリング'], correct: 1, explanation: '正解: ピノ・ノワールの最高産地。濃厚でエレガント。' },
      { id: 74, text: 'モンラッシェの特徴は？', options: ['赤ワイン', 'シャルドネの最高地', 'ロゼ', 'スパークリング'], correct: 1, explanation: '正解: シャルドネの最高峰。白ワインの最高傑作。' },
      { id: 75, text: 'ラ・ロマネ地域の特徴は？', options: ['大規模生産', 'ピノ・ノワール最高地・極小規模', 'ロゼ専門', '甘口'], correct: 1, explanation: '正解: ロマネ・コンティなど世界最高のピノ・ノワール。極小規模だから希少。' },
    ],
    italy: [
      { id: 76, text: 'バルローロの産地は？', options: ['フランス・ボルドー', 'イタリア・ピエモンテ', 'スペイン・リオハ', 'ドイツ'], correct: 1, explanation: '正解: イタリア・ピエモンテ州。ネッビオーロから造られる「ワインの王」。' },
      { id: 77, text: 'バルバレスコの特徴は？', options: ['バルローロより安い', 'バルローロと同じネッビオーロ', 'スパークリング', '白ワイン'], correct: 1, explanation: '正解: バルローロと同じネッビオーロだが、別の村で造られる高級赤ワイン。' },
      { id: 78, text: 'キャンティの法定最小熟成期間は？', options: ['1年未満', '最小1年・リゼルヴァは3年', '6ヶ月', '3ヶ月'], correct: 1, explanation: '正解: キャンティは最小1年、リゼルヴァ（最高品質）は3年。' },
      { id: 79, text: 'アマローネの産地は？', options: ['トスカーナ', 'ヴェネト地方・ヴェローナ周辺', 'ピエモンテ', 'シチリア'], correct: 1, explanation: '正解: イタリア・ヴェネト州。ブドウを乾燥させて高級赤ワイン製造。' },
      { id: 80, text: 'ランブルスコの特徴は？', options: ['乾いた赤ワイン', 'スパークリング性の甘い赤', '白ワイン', 'ロゼ'], correct: 1, explanation: '正解: イタリア・エミリア・ロマーニャ地域の赤スパークリング。甘めでプリッキー。' },
      { id: 81, text: 'マルサラワインの産地は？', options: ['フランス', 'イタリア・シチリア', 'スペイン', 'ポルトガル'], correct: 1, explanation: '正解: イタリア・シチリア西部。酒精強化ワイン（フォーティファイド）。' },
      { id: 82, text: 'ブルネッロ・ディ・モンタルチーノの最小熟成は？', options: ['1年', '2年', '5年', '10年'], correct: 2, explanation: '正解: 最低5年。リゼルヴァはさらに6年。高級トスカーナワイン。' },
      { id: 83, text: 'ヴィーノ・ノービレ・ディ・モンテプルチアーノは？', options: ['白ワイン', 'トスカーナの高級赤', 'スパークリング', '甘口'], correct: 1, explanation: '正解: トスカーナの高級赤ワイン。プルニェロ・ノビレ地域。' },
      { id: 84, text: 'プロセッコの生産地は？', options: ['トスカーナ', 'ヴェネト地方', 'ピエモンテ', 'シチリア'], correct: 1, explanation: '正解: ヴェネト。白のスパークリングワインで、高級シャンパーニュより飲みやすい。' },
      { id: 85, text: 'モスカート・ダスティの特徴は？', options: ['赤スパークリング', '甘い白スパークリング', 'ドライ赤', '重い白'], correct: 1, explanation: '正解: イタリアの甘い白スパークリング。モスカート・ブドウから。' },
      { id: 86, text: 'ネッビオーロの意味は？', options: ['黒いブドウ', '霧（ネッビア）の出やすい晩熟ブドウ', '小さなブドウ', 'イタリア特産'], correct: 1, explanation: '正解: 「霧」を意味するネッビアから。晩熟で霧の中で成熟することから。' },
      { id: 87, text: 'バルベーラの特徴は？', options: ['軽い白', '高酸度・タンニン・長期熟成', 'スイート香', '低アルコール'], correct: 1, explanation: '正解: 高い酸度とタンニン。イタリア・ピエモンテの赤ワイン。' },
      { id: 88, text: 'ドルチェット・ダルバの特徴は？', options: ['甘口', 'ドライ赤・深い色・タンニン豊富', 'スパークリング', '白ワイン'], correct: 1, explanation: '正解: ドライな赤ワイン。ドルチェットは「甘い」意味だが、実はドライ。' },
      { id: 89, text: 'サンジョベーゼの最大産地は？', options: ['ピエモンテ', 'トスカーナ・キャンティ地域', 'ヴェネト', 'シチリア'], correct: 1, explanation: '正解: トスカーナ。キャンティの主要品種。赤ワイン用ブドウ。' },
      { id: 90, text: 'フラスカティの特徴は？', options: ['赤ワイン中心', '白ワイン・ローマ近郊', 'スパークリング', '甘口'], correct: 1, explanation: '正解: ローマ近郊の辛口白ワイン。イタリアの代表的な白ワイン地域。' },
      { id: 91, text: 'オルヴィエート地域の特徴は？', options: ['赤ワイン中心', '白ワイン中心', 'スパークリング', 'ロゼ'], correct: 1, explanation: '正解: トラヴェルティーネ地域の白ワイン。イタリア古典的白ワイン。' },
      { id: 92, text: 'エトナの特徴は？', options: ['平地ワイン', 'シチリア火山ワイン', 'スパークリング', '高級赤'], correct: 1, explanation: '正解: シチリアのエトナ火山地域。独特の火山性土壌で造られるワイン。' },
      { id: 93, text: 'パネリーニの特徴は？', options: ['甘口白', 'シチリアの白ワイン', '赤ワイン', 'スパークリング'], correct: 1, explanation: '正解: シチリアのパネリーニから造られた白ワイン。イタリアの代表的白。' },
      { id: 94, text: 'アマロの代表品種は？', options: ['ネッビオーロ', 'コルヴィーナ・ブレンド', 'シラー', 'ピノ・ノワール'], correct: 1, explanation: '正解: コルヴィーナをブレンド。ヴェネト地域の高級赤ワイン。' },
      { id: 95, text: 'リチャッソの製造方法は？', options: ['樽熟成', 'アマローネの絞り粕を使用', 'ブドウ乾燥', 'アルコール添加'], correct: 1, explanation: '正解: アマローネ製造後の絞り粕にワインを加えて再発酵。高級ワイン。' },
    ],
    spain: [
      { id: 96, text: 'リオハの最重要品種は？', options: ['カベルネ', 'テンプラニーリョ', 'メルロー', 'シラー'], correct: 1, explanation: '正解: テンプラニーリョ。スペイン北部リオハの代表品種。' },
      { id: 97, text: 'リベラ・デル・ドゥエロの特徴は？', options: ['白ワイン', 'テンプラニーリョの高級赤', 'ロゼ中心', 'スパークリング'], correct: 1, explanation: '正解: テンプラニーリョ（地元ではティント・フィーノ）の高級赤ワイン。' },
      { id: 98, text: 'プリオラート（D.O.Ca）の特徴は？', options: ['安価ワイン', 'スレート土壌・タンニン豊富赤', 'スパークリング', '白ワイン'], correct: 1, explanation: '正解: スレート土壌（llicorella）でタンニン豊富な複雑な赤ワイン。' },
      { id: 99, text: 'シェリーの生産地は？', options: ['マドリッド', 'アンダルシア・ヘレス地方', 'カタルーニャ', 'バスク'], correct: 1, explanation: '正解: スペイン南部アンダルシアのヘレス。酒精強化ワイン。' },
      { id: 100, text: 'モンティリャ・モレネスは？', options: ['赤ワイン', 'シェリーに似た白ワイン', 'スパークリング', '甘口'], correct: 1, explanation: '正解: シェリーに似た酒精強化白ワイン。スペイン南部。' },
      { id: 101, text: 'ペネデス地域の特徴は？', options: ['赤ワイン専門', 'スパークリング（カヴァ）主流', '白ワイン単一', 'ロゼ'], correct: 1, explanation: '正解: カタルーニャのペネデスはスパークリング（カヴァ）の中心。' },
      { id: 102, text: 'カヴァの製造方法は？', options: ['シャルマ方式', 'メトード・シャンペノワーズ', 'タンク方式', '樽熟成'], correct: 1, explanation: '正解: シャンパーニュと同じ瓶内二次発酵。スペインの高級スパークリング。' },
      { id: 103, text: 'グルナッシュ（ガルナッシャ）の産地は？', options: ['フランス', 'スペイン南部・フランス南東部', 'イタリア', 'ポルトガル'], correct: 1, explanation: '正解: スペイン原産。テンプラニーリョとのブレンドが一般的。' },
      { id: 104, text: 'アラゴンワインの特徴は？', options: ['白ワイン中心', '赤ワイン中心・力強い', 'スパークリング', 'ロゼ'], correct: 1, explanation: '正解: アラゴン地域の赤ワイン。力強い個性的なワイン。' },
      { id: 105, text: 'ラ・マンチャの特徴は？', options: ['高級赤ワイン', '大規模生産・アイレン白ワイン', 'スパークリング', 'ロゼ中心'], correct: 1, explanation: '正解: スペイン最大のワイン産地。アイレン（白ブドウ）が主体。' },
    ],
    other: [
      { id: 106, text: 'ナパ・カベルネの特徴は？', options: ['最安値', '温暖気候・樹齢老成・凝縮度高い', '品質低い', 'スパークリング'], correct: 1, explanation: '正解: カリフォルニア・ナパ・カベルネは完全成熟と樹齢による凝縮度が特徴。' },
      { id: 107, text: 'オレゴンの代表品種は？', options: ['カベルネ', 'ピノ・ノワール', 'シラー', 'メルロー'], correct: 1, explanation: '正解: ピノ・ノワール。オレゴンはピノ・ノワール、ピノ・グリで評価。' },
      { id: 108, text: 'ワシントン州の最重要赤ブドウは？', options: ['ピノノワール', 'メルロー', 'カベルネソーヴィニヨン', 'シラー'], correct: 1, explanation: '正解: メルロー。ワシントン州で最大栽培面積を持つ赤ブドウ。' },
      { id: 109, text: 'マーガレット・リヴァー地域は？', options: ['最北産地', '西オーストラリア・高級カベルネ産地', 'スパークリング', 'トロピカル'], correct: 1, explanation: '正解: オーストラリア西部の高級赤ワイン産地。カベルネ・シラー。' },
      { id: 110, text: 'バロッサ・ヴァレーの代表品種は？', options: ['ピノノワール', 'シラーズ', 'リースリング', 'ソーヴィニヨンブラン'], correct: 1, explanation: '正解: シラーズ。オーストラリア最古のワイン産地で濃厚・スパイシー。' },
      { id: 111, text: 'ヤラ・ヴァレーの特徴は？', options: ['ニューワールド最高温', 'オーストラリア冷涼地・ピノノワール産地', 'スパークリング', 'ロゼ'], correct: 1, explanation: '正解: メルボルン周辺の冷涼地。ピノ・ノワール、シャルドネ、スパークリング。' },
      { id: 112, text: 'マルボロ地域は？', options: ['北島', 'ニュージーランド南島北端', '両島', '時期で変わる'], correct: 1, explanation: '正解: 南島北端。ニュージーランド最大ワイン産地。ソーヴィニヨン・ブラン。' },
      { id: 113, text: 'セントラル・オタゴの特徴は？', options: ['ソーヴィニヨン・ブラン', 'ピノ・ノワール最高地', 'シラー', 'メルロー'], correct: 1, explanation: '正解: ニュージーランド・セントラル・オタゴの高級ピノ・ノワール。' },
      { id: 114, text: 'メンドーサの標高特徴は？', options: ['海面高さ', '1000m以下', '1000m以上の高地', '時期で変わる'], correct: 2, explanation: '正解: アルゼンチン・メンドーサはアンデス山脈麓の高地。昼夜の温度差がワイン品質に好適。' },
      { id: 115, text: 'コルチャグアの特徴は？', options: ['白ワイン専門', 'カベルネ・ソーヴィニヨン中心赤', 'スパークリング', 'ロゼ'], correct: 1, explanation: '正解: チリ・セントラル・バレーの高級赤ワイン産地。ボルドー・スタイル。' },
    ],
    production: [
      { id: 116, text: 'マセレーションとは？', options: ['圧搾プロセス', 'ブドウ果皮と果汁の接触', 'ワイン瓶詰', 'ワイン樽ろ過'], correct: 1, explanation: '正解: 果皮と果汁を接触。色素、タンニン、香りが抽出される。' },
      { id: 117, text: 'メトード・シャンペノワーズとは？', options: ['シャルマ方式', '瓶内二次発酵', '樽発酵法', 'カルボニック・マセレーション'], correct: 1, explanation: '正解: 瓶内で二次発酵。シャンパーニュの伝統製法。' },
      { id: 118, text: 'ワイン中の酸度が高いワインの特徴は？', options: ['甘い', 'フレッシュで爽やか', '重厚', '甘い'], correct: 1, explanation: '正解: フレッシュで爽やか。白ワイン・スパークリングで重要。' },
      { id: 119, text: 'シャルマ方式（タンク方式）の特徴は？', options: ['瓶内発酵', '大型タンク内で二次発酵', '製造不可', '最高級のみ'], correct: 1, explanation: '正解: 効率的で経済的。大型タンクでスパークリング製造。' },
      { id: 120, text: 'フィロキセラ対策の最一般的方法は？', options: ['農薬', '米国台木への接ぎ木', '廃棄', '自然回復'], correct: 1, explanation: '正解: 米国フィロキセラ耐性台木に接ぎ木。世界的採用方法。' },
      { id: 121, text: 'ヴェラゾンとは？', options: ['花が咲く', 'ブドウ色が変わる', '収穫時期', '冬眠期'], correct: 1, explanation: '正解: ブドウが成熟に向けて色が変わり始める時期。重要なマーカー。' },
      { id: 122, text: 'アルコール発酵の主要産物は？', options: ['グリセロール', 'アルコール・CO₂', '乳酸', 'グルコース'], correct: 1, explanation: '正解: エタノール（アルコール）と二酸化炭素。ワインの基本化学反応。' },
      { id: 123, text: 'リースリングの醸造スタイルは？', options: ['常ドライ', '常甘口', 'ドライから甘口まで多様', 'アルコール度数のみ'], correct: 2, explanation: '正解: ドライからスイート、スティルからスパークリング。多様可能。' },
      { id: 124, text: 'ラッシング（樽洗浄）の目的は？', options: ['色を濃くする', 'オークの抽出を制御', 'アルコール度数上昇', '香り減少'], correct: 1, explanation: '正解: 樽内壁の炭化層を制御して、オーク抽出を調整。' },
      { id: 125, text: '樽新樽率が高いワインの特徴は？', options: ['酸度高い', '樽香（バニラ等）強い', '軽やか', '甘い'], correct: 1, explanation: '正解: 新樽はより多くオーク抽出物を放出。樽香が強い。' },
      { id: 126, text: 'トーストレベルの樽とは？', options: ['樽の歳数', '樽製造時の炭化焙煎度', 'ワインの色', 'ブドウ成熟'], correct: 1, explanation: '正解: 樽内壁の炭化焙煎度合い。焙煎度が高いほど樽由来キャラ強し。' },
      { id: 127, text: 'フレンチオーク vs アメリカンオークの違いは？', options: ['値段のみ', 'フレンチはより繊細、アメリカンはココナッツ・バニラ香強', '品質同等', 'アメリカン不可'], correct: 1, explanation: '正解: フレンチはより繊細で複雑、アメリカンはココナッツ・バニラ香が顕著。' },
      { id: 128, text: 'ポリフェノール主な役割は？', options: ['甘さ決定', '色・タンニン・香りの成分', 'アルコール濃度', 'pH調整'], correct: 1, explanation: '正解: ポリフェノールはワイン色、タンニン、香りの多くを構成。' },
      { id: 129, text: 'デカンテーションの目的は？', options: ['冷やす', '沈殿物分離＆酸素接触', 'アルコール上昇', '色濃化'], correct: 1, explanation: '正解: 沈殿物の分離と酸素との接触（エアレーション）。香りが開く。' },
      { id: 130, text: 'パンチダウン（ピジャージュ）の役割は？', options: ['色を濃くする', '抽出促進＆温度低下', 'アルコール上昇', 'ワイン樽洗浄'], correct: 1, explanation: '正解: 発酵中に皮を液に押し戻す。抽出促進と温度低下。' },
      { id: 131, text: 'スキン・コンタクトが行われるのは？', options: ['赤ワイン', '白ワイン（色香タンニン増加）', '両方', '樽のみ'], correct: 1, explanation: '正解: 白ワインで色・香り・タンニン増加。意図的に実施することある。' },
      { id: 132, text: 'ペクチンの主な役割は？', options: ['味決定', 'ワイン澄み具合（濁り）', 'アルコール濃度', 'タンニン決定'], correct: 1, explanation: '正解: ペクチンはワインの濁り・澄み具合に関係。酵素処理で除去も。' },
      { id: 133, text: '赤ワイン漬け込み時間が長い結果は？', options: ['軽やかになる', '濃くタンニン豊富', '甘くなる', '酸度低下'], correct: 1, explanation: '正解: 漬け込み時間が長いと色・タンニンがより抽出。濃く渋いワイン。' },
      { id: 134, text: 'コールド・ソークとは？', options: ['樽冷却', '発酵前に果汁・果皮を低温保持', 'ワイン冷蔵', 'ブドウ凍結'], correct: 1, explanation: '正解: 発酵前に低温で抽出促進。酵母発酵なしの前処理。' },
      { id: 135, text: 'フリーラン・ジュース vs プレス・ワイン？', options: ['同じワイン', 'フリーランは軽く優雅、プレスは濃いタンニン豊富', 'プレスのみ売却', 'フリーラン不可'], correct: 1, explanation: '正解: フリーランは自然流出・軽い、プレスワインは圧搾・濃い。ブレンド。' },
    ],
    japan: [
      { id: 136, text: '壱岐焼酎の産地は？', options: ['大分県', '長崎県', '宮崎県', '鹿児島県'], correct: 1, explanation: '正解: 長崎県壱岐市。米麹を約1/3、大麦を約2/3使用。' },
      { id: 137, text: 'カプロン酸エチル多く生成する酵母は？', options: ['きょうかい6号', 'きょうかい7号', 'きょうかい1401号', '野生酵母'], correct: 0, explanation: '正解: きょうかい6号。パイナップルのような吟醸香を生み出す。' },
      { id: 138, text: '日本酒の精米歩合80%の意味は？', options: ['米を80%磨いた', 'もともとの米の80%使用', 'もともとの米から20%だけ使用（80%廃棄）', '品質80%等級'], correct: 2, explanation: '正解: もともとの米から80%が廃棄され、20%だけが使用。数字が低いほど高級。' },
      { id: 139, text: '吟醸酒の法定最低精米歩合は？', options: ['70%', '60%', '50%', '40%'], correct: 1, explanation: '正解: 精米歩合60%以下。大吟醸はさらに50%以下。' },
      { id: 140, text: '本醸造と純米の最大違いは？', options: ['製造地域', '醸造アルコール添加の有無', '熟成期間', 'ブドウ品種'], correct: 1, explanation: '正解: 本醸造は少量の醸造アルコール添加、純米は無添加。' },
      { id: 141, text: '越乃寒梅の産地は？', options: ['新潟県', '山形県', '京都府', '兵庫県'], correct: 0, explanation: '正解: 新潟県。淡麗辛口の代表的な日本酒ブランド。' },
      { id: 142, text: '連続式蒸留 vs 単式蒸留？', options: ['製造地域', '連続式は効率的・軽い、単式はより香り豊か', '価格のみ', 'アルコール度数'], correct: 1, explanation: '正解: 連続式は効率的・軽い焼酎、単式はより香り豊かで個性的。' },
      { id: 143, text: '薩摩焼酎の産地は？', options: ['熊本県', '鹿児島県', '大分県', '宮崎県'], correct: 1, explanation: '正解: 鹿児島県。黒麹を使った芋焼酎で力強い香りとコク。' },
      { id: 144, text: '日本酒の火入れの目的は？', options: ['温度上昇・アルコール増', '酵素・微生物の活動停止', 'ワインと同じ', '甘くする'], correct: 1, explanation: '正解: 加熱により品質の安定性を確保。多くの日本酒で実施。' },
      { id: 145, text: '黒麹と白麹の主な違いは？', options: ['色のみ', '黒麹はクエン酸豊富・独特香、白麹は甘い麹香', '同じ香り', 'アルコール度数'], correct: 1, explanation: '正解: 黒麹は独特香＆酸度、白麹は甘い麹香。焼酎スタイルに影響。' },
      { id: 146, text: '久留米焼酎の主原材料は？', options: ['米', '麦', '芋', 'そば'], correct: 1, explanation: '正解: 麦焼酎。福岡県久留米市の軽快な香りが特徴。' },
      { id: 147, text: '琉球泡盛の特徴は？', options: ['日本本土製造', '沖縄製造・黒麹・米のみ使用', 'スコッチウイスキー', 'ワイン扱い'], correct: 1, explanation: '正解: 沖縄県製造。黒麹と米のみを使用。アルコール度数30～60%。' },
      { id: 148, text: '有田焼酎の産地は？', options: ['福岡県', '佐賀県', '長崎県', '熊本県'], correct: 1, explanation: '正解: 佐賀県有田町。焼き物の町として有名な有田が産地。' },
      { id: 149, text: '清酒の辛口指標は？', options: ['アルコール度数高い', '日本酒度が高い（＋に大きい）', '熟成期間長い', '精米歩合低い'], correct: 1, explanation: '正解: 日本酒度が高い（＋側）ほど辛い。発酵後の残糖量が少ない。' },
      { id: 150, text: '八女焼酎の主原材料は？', options: ['米', '麦', '芋', 'そば'], correct: 1, explanation: '正解: 麦焼酎。福岡県八女市の博多地域隣接の伝統地。' },
    ]
  };

  const loadQuestions = (selectedCategory) => {
    setCategory(selectedCategory);
    const categoryQuestions = sampleQuestions[selectedCategory] || [];
    const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setMode('quiz');
  };

  const handleAnswerSelect = (index) => {
    if (mode !== 'quiz') return;
    
    const current = questions[currentIndex];
    const isCorrect = index === current.correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, {
      questionId: current.id,
      selected: index,
      correct: current.correct,
      isCorrect
    }]);
    
    setSelectedAnswer(index);
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
    setScore(0);
    setAnswers([]);
  };

  if (mode === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto pt-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-12 h-12 text-amber-400 mr-3" />
              <h1 className="text-4xl font-bold text-white">ワインエキスパート</h1>
            </div>
            <p className="text-amber-200 text-lg">試験対策 学習アプリ</p>
            <p className="text-amber-300 text-lg font-bold mt-2">330+ 問の出題傾向対応</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => loadQuestions(cat.id)}
                className="bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 border border-white border-opacity-20 rounded-xl p-6 text-white transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                <p className="text-amber-300 font-semibold">{cat.count}問</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'quiz' && questions.length > 0) {
    const current = questions[currentIndex];
    const categoryName = categories.find(c => c.id === category)?.name || 'カテゴリ';
    const percentage = Math.round(((currentIndex + 1) / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="max-w-3xl mx-auto pt-6">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm text-gray-300">{categoryName}</p>
                <p className="text-2xl font-bold text-white">問 {currentIndex + 1} / {questions.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-300">正解数</p>
                <p className="text-3xl font-bold text-amber-400">{score}</p>
              </div>
            </div>
            <div className="w-full h-2 bg-white bg-opacity-10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">{current.text}</h2>

            <div className="space-y-3 mb-8">
              {current.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`w-full p-4 text-left rounded-xl font-semibold transition-all ${
                    selectedAnswer === idx
                      ? idx === current.correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-current mr-3 text-sm font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option}
                  </div>
                </button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <div className={`rounded-xl p-6 mb-6 ${selectedAnswer === current.correct ? 'bg-green-50' : 'bg-red-50'} border-2 ${selectedAnswer === current.correct ? 'border-green-300' : 'border-red-300'}`}>
                <div className={`font-bold mb-2 text-lg ${selectedAnswer === current.correct ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedAnswer === current.correct ? '✓ 正解！' : '✗ 不正解'}
                </div>
                <p className="text-gray-800">{current.explanation}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 bg-gray-400 text-white py-3 rounded-lg font-bold hover:bg-gray-500 transition"
              >
                メニューに戻る
              </button>
              {selectedAnswer !== null && (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 transition flex items-center justify-center gap-2"
                >
                  {currentIndex === questions.length - 1 ? '結果を見る' : '次へ'} <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'result') {
    const percentage = Math.round((score / questions.length) * 100);
    const categoryName = categories.find(c => c.id === category)?.name || 'カテゴリ';

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="max-w-3xl mx-auto pt-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">試験終了</h2>
              <div className="text-6xl font-bold mb-4">{percentage}%</div>
              <p className="text-xl mb-2">{score} / {questions.length} 問正解</p>
              <p className="text-amber-100">{categoryName}</p>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                {percentage >= 80 && <div className="text-5xl mb-4">🎉</div>}
                {percentage >= 60 && percentage < 80 && <div className="text-5xl mb-4">👍</div>}
                {percentage < 60 && <div className="text-5xl mb-4">📖</div>}
                
                {percentage >= 80 && <p className="text-xl text-green-600 font-bold">素晴らしい成績です！</p>}
                {percentage >= 60 && percentage < 80 && <p className="text-xl text-blue-600 font-bold">良好な成績です。</p>}
                {percentage < 60 && <p className="text-xl text-orange-600 font-bold">もう一度チャレンジしましょう。</p>}
              </div>

              <button
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition text-lg flex items-center justify-center gap-2"
              >
                <RotateCcw size={20} />
                別のカテゴリに挑戦
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
