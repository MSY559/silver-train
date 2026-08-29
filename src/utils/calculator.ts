export interface TestResult {
  mentalAge: number;
  actualAge: number;
  ageDifference: number;
  personalityType: string;
  personalityTitle: string;
  traits: string[];
  dimensions: {
    label: string;
    value: number;
  }[];
  strengths: string[];
  blindSpots: string[];
  dimensionAnalysis: {
    name: string;
    description: string;
    level: string;
  }[];
  matches: MatchRole[];
  advice: string;
  keywords: string[];
}

export interface MatchRole {
  name: string;
  avatar: string;
  description: string;
  matchRate: number;
}

export interface Answer {
  questionId: number;
  optionIndex: number;
  scores: Record<string, number>;
}

export function calculateMentalAge(answers: Answer[], actualAge: number): TestResult {
  const totalScores: Record<string, number> = {};

  answers.forEach((answer) => {
    for (const [key, value] of Object.entries(answer.scores)) {
      totalScores[key] = (totalScores[key] || 0) + value;
    }
  });

  const maxPossibleScore = 40 * 3;

  const avgExtroversion = totalScores.extroversion || 0;
  const avgIntroversion = totalScores.introversion || 0;
  const avgStability = totalScores.stability || 0;
  const avgNeuroticism = totalScores.neuroticism || 0;
  const avgConscientiousness = totalScores.conscientiousness || 0;
  const avgOpenness = totalScores.openness || 0;
  const avgCreativity = totalScores.creativity || 0;
  const avgReflectiveness = totalScores.reflectiveness || 0;
  const avgAgreeableness = totalScores.agreeableness || 0;
  const avgSpontaneity = totalScores.spontaneity || 0;
  const avgOptimism = totalScores.optimism || 0;

  const extroversionScore = Math.min(100, Math.round(((avgExtroversion / maxPossibleScore) * 100 + 50)));
  const introversionScore = Math.min(100, Math.round(((avgIntroversion / maxPossibleScore) * 100 + 30)));

  const extraScore = extroversionScore > introversionScore ? extroversionScore : 100 - introversionScore;
  const stabilityScore = Math.min(100, Math.round(((avgStability / maxPossibleScore) * 100 + 50)));
  const neuroScore = Math.min(100, Math.round(((avgNeuroticism / maxPossibleScore) * 100 + 30)));
  const calmScore = Math.max(0, 100 - neuroScore);
  const opennessScore = Math.min(100, Math.round(((avgOpenness + avgCreativity) / (maxPossibleScore * 2) * 100 + 45)));
  const conscientiousScore = Math.min(100, Math.round(((avgConscientiousness / maxPossibleScore) * 100 + 45)));
  const agreeablenessScore = Math.min(100, Math.round(((avgAgreeableness / maxPossibleScore) * 100 + 50)));
  const creativityScore = Math.min(100, Math.round(((avgCreativity / maxPossibleScore) * 100 + 40)));

  const mentalAgeBase =
    25 +
    (stabilityScore - 50) * 0.3 +
    (conscientiousScore - 50) * 0.25 +
    (calmScore - 50) * 0.2 +
    (avgReflectiveness / maxPossibleScore) * 15 -
    (avgSpontaneity / maxPossibleScore) * 10 +
    (avgOptimism / maxPossibleScore) * 5;

  const ageFactor = actualAge > 0 ? Math.max(0.5, Math.min(1.5, actualAge / 30)) : 1;
  let mentalAge = Math.round(mentalAgeBase * ageFactor);
  mentalAge = Math.max(16, Math.min(65, mentalAge));

  const ageDifference = mentalAge - actualAge;

  const dimensions = [
    { label: "外向性", value: extraScore },
    { label: "情绪稳定", value: stabilityScore },
    { label: "开放性", value: opennessScore },
    { label: "尽责性", value: conscientiousScore },
    { label: "宜人性", value: agreeablenessScore },
    { label: "创造力", value: creativityScore },
  ];

  const personalityInfo = determinePersonality(
    extraScore,
    stabilityScore,
    opennessScore,
    conscientiousScore,
    agreeablenessScore,
    creativityScore,
    mentalAge
  );

  const result: TestResult = {
    mentalAge,
    actualAge,
    ageDifference,
    personalityType: personalityInfo.type,
    personalityTitle: personalityInfo.title,
    traits: personalityInfo.traits,
    dimensions,
    strengths: personalityInfo.strengths,
    blindSpots: personalityInfo.blindSpots,
    dimensionAnalysis: dimensions.map((d) => ({
      name: d.label,
      description: getDimensionDescription(d.label, d.value),
      level: getLevelText(d.value),
    })),
    matches: generateMatches(extraScore, agreeablenessScore, stabilityScore, opennessScore),
    advice: generateAdvice(mentalAge, actualAge, personalityInfo.type),
    keywords: personalityInfo.keywords,
  };

  return result;
}

function getLevelText(value: number): string {
  if (value >= 70) return "高";
  if (value >= 50) return "中等偏上";
  if (value >= 30) return "中等偏下";
  return "较低";
}

function getDimensionDescription(label: string, value: number): string {
  const descs: Record<string, { high: string; low: string }> = {
    外向性: {
      high: "你善于社交，在人群中充满活力，能从互动中获取能量。",
      low: "你更倾向于独处或小范围交流，从内在世界中获取能量。",
    },
    情绪稳定: {
      high: "你情绪平和稳定，面对压力能保持冷静，不易被情绪左右。",
      low: "你的情绪容易波动，在压力下可能会感到焦虑或情绪化。",
    },
    开放性: {
      high: "你对新事物充满好奇，富有想象力，乐于接受新观念和体验。",
      low: "你更倾向于遵循传统和既定方式，对新事物持谨慎态度。",
    },
    尽责性: {
      high: "你自律、有条理，能坚持完成目标，做事可靠。",
      low: "你更灵活随性，但可能在规划和坚持性上有提升空间。",
    },
    宜人性: {
      high: "你友善、合作，善于理解他人，注重人际关系和谐。",
      low: "你更独立自主，在团队中可能更倾向于个人贡献。",
    },
    创造力: {
      high: "你富有想象力和创新精神，能从新角度看待事物。",
      low: "你更注重实际和传统方法，在执行层面表现出色。",
    },
  };

  const desc = descs[label];
  if (!desc) return "";
  return value >= 50 ? desc.high : desc.low;
}

function determinePersonality(
  extra: number,
  stable: number,
  open: number,
  conscient: number,
  agreeable: number,
  creative: number,
  mentalAge: number
): {
  type: string;
  title: string;
  traits: string[];
  strengths: string[];
  blindSpots: string[];
  keywords: string[];
} {
  const profiles = [
    {
      condition: () => mentalAge <= 25 && open >= 50 && creative >= 50,
      type: "explorer",
      title: "灵动好奇的探索者",
      traits: ["富有想象力", "充满好奇心", "热爱冒险", "富有创造力"],
      strengths: ["能从不同角度看问题", "勇于尝试新事物", "富有艺术气质"],
      blindSpots: ["可能缺乏专注力", "在执行细节上容易松懈", "情绪波动较大"],
      keywords: ["自由", "创意", "热情", "探索"],
    },
    {
      condition: () => mentalAge >= 40 && conscient >= 55 && stable >= 50,
      type: "pillar",
      title: "从容成熟的中坚",
      traits: ["沉稳可靠", "目标导向", "自律严谨", "深思熟虑"],
      strengths: ["强大的执行力", "情绪管理能力强", "值得信赖的伙伴"],
      blindSpots: ["可能过于严肃", "对新事物接受度需保持开放", "需要更多放松和娱乐"],
      keywords: ["稳重", "担当", "自律", "可靠"],
    },
    {
      condition: () => agreeable >= 55 && extra >= 40 && extra <= 70,
      type: "harmonizer",
      title: "温柔包容的协调者",
      traits: ["善解人意", "富有同理心", "重视关系", "合作共赢"],
      strengths: ["出色的人际敏感度", "能化解冲突", "团队中的润滑剂"],
      blindSpots: ["容易委屈自己", "在做决定时可能犹豫不决", "需要更多自我关怀"],
      keywords: ["温柔", "共情", "和谐", "合作"],
    },
    {
      condition: () => extra >= 60 && stable >= 45,
      type: "leader",
      title: "光芒四射的引领者",
      traits: ["自信表达", "富有感染力", "目标明确", "行动力强"],
      strengths: ["天生的领导力", "能激励他人", "果断决策的能力"],
      blindSpots: ["可能过于强势", "需要注意倾听不同声音", "要培养细腻的情感"],
      keywords: ["自信", "领导", "果断", "魅力"],
    },
    {
      condition: () => creative >= 55 && extra <= 50,
      type: "artist",
      title: "灵感充沛的艺术家",
      traits: ["富有灵性", "感知敏锐", "表达独特", "思想深邃"],
      strengths: ["超凡的审美感知", "富有想象力的思维", "深度情感体验"],
      blindSpots: ["可能过度内省", "在现实事务上需要更务实", "情绪管理需加强"],
      keywords: ["灵感", "审美", "内省", "独特"],
    },
    {
      condition: () => stable >= 55 && conscient >= 50 && extra <= 45,
      type: "analyst",
      title: "理性睿智的分析家",
      traits: ["逻辑清晰", "客观理性", "注重数据", "思维缜密"],
      strengths: ["出色的分析能力", "公正客观的判断", "严谨的思维方式"],
      blindSpots: ["情感表达可能不够", "社交中显得疏离", "需要更多感性体验"],
      keywords: ["理性", "分析", "逻辑", "缜密"],
    },
    {
      condition: () => open >= 50 && creative >= 45,
      type: "dreamer",
      title: "浪漫感性的梦想家",
      traits: ["富有想象力", "感性细腻", "理想主义", "富有情怀"],
      strengths: ["丰富的内心世界", "独到的审美眼光", "温暖的情感"],
      blindSpots: ["可能脱离现实", "在困难面前容易退缩", "需要更坚定的行动力"],
      keywords: ["浪漫", "梦想", "感性", "诗意"],
    },
    {
      condition: () => true,
      type: "balanced",
      title: "和谐平衡的追寻者",
      traits: ["灵活适应", "开放包容", "积极向上", "追求成长"],
      strengths: ["良好的适应能力", "愿意学习和改变", "健康的心态"],
      blindSpots: ["可能缺乏鲜明个性", "在需要坚定时容易妥协", "可以更有主见"],
      keywords: ["平衡", "成长", "适应", "和谐"],
    },
  ];

  for (const profile of profiles) {
    if (profile.condition()) {
      return {
        type: profile.type,
        title: profile.title,
        traits: profile.traits,
        strengths: profile.strengths,
        blindSpots: profile.blindSpots,
        keywords: profile.keywords,
      };
    }
  }

  return {
    type: "balanced",
    title: "和谐平衡的追寻者",
    traits: ["灵活适应", "开放包容", "积极向上"],
    strengths: ["良好的适应能力", "愿意学习和改变"],
    blindSpots: ["可能缺乏鲜明个性"],
    keywords: ["平衡", "成长"],
  };
}

function generateMatches(
  extra: number,
  agreeable: number,
  stable: number,
  open: number
): MatchRole[] {
  const roles: MatchRole[] = [
    {
      name: "灵魂伴侣",
      avatar: "💫",
      description: "与你心灵相通的人，彼此理解与成长。",
      matchRate: Math.min(98, Math.round((agreeable + stable) / 2 + 10)),
    },
    {
      name: "最佳拍档",
      avatar: "🎯",
      description: "在事业上默契配合，互补长短的合作伙伴。",
      matchRate: Math.min(96, Math.round((extra + open) / 2 + 15)),
    },
    {
      name: "挚友知己",
      avatar: "🤝",
      description: "可以信赖和依靠的知心朋友。",
      matchRate: Math.min(94, Math.round((agreeable + stable + open) / 3 + 12)),
    },
  ];

  return roles;
}

function generateAdvice(mentalAge: number, actualAge: number, type: string): string {
  const diff = mentalAge - actualAge;
  let base = "";

  if (diff >= 5) {
    base = `你的心理年龄比实际年龄成熟 ${diff} 岁，这意味着你拥有超越同龄人的洞察力和情绪管理能力。继续保持这份深度，同时记得给自己一些轻松的空间。`;
  } else if (diff <= -5) {
    base = `你的心理年龄比实际年龄年轻 ${Math.abs(diff)} 岁，这说明你保持着一颗年轻的心和对生活的热情。在保持这份活力的同时，也可以逐步培养一些沉稳的处事方式。`;
  } else {
    base = `你的心理年龄与实际年龄相当，这是一种非常健康的状态。你既能保持对生活的热情，也具备了相应的成熟度。继续在平衡中寻求成长。`;
  }

  const typeAdvice: Record<string, string> = {
    explorer: "建议尝试培养一项长期坚持的兴趣爱好，让探索的热情与深度并存。",
    pillar: "建议偶尔放下规划，给自己一些随性的时间，让生活多一些惊喜。",
    harmonizer: "建议在照顾他人的同时，也要关注自己的需求和感受。",
    leader: "建议在果断决策的同时，多倾听团队成员的意见，集思广益。",
    artist: "建议将创造力与执行力结合，让灵感能够落地生根。",
    analyst: "建议多关注自己的情感世界，培养一些感性的爱好来丰富内心。",
    dreamer: "建议在保持梦想的同时，也制定一些实际可行的小目标。",
    balanced: "建议继续保持这份平衡感，可以尝试挑战一些舒适区外的事物。",
  };

  return `${base} ${typeAdvice[type] || ""}`;
}
