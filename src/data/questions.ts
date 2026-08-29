export interface Question {
  id: number;
  text: string;
  options: Option[];
  category: string;
}

export interface Option {
  text: string;
  scores: Record<string, number>;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "周末终于到了，你最理想的度过方式是？",
    category: "social",
    options: [
      { text: "去游乐园或者热闹的聚会，哪怕通宵也没关系！", scores: { extroversion: 3, spontaneity: 3, energy: 2 } },
      { text: "约三两对好友去探店，打卡网红餐厅。", scores: { extroversion: 2, spontaneity: 2, energy: 2 } },
      { text: "在家处理一些积压的家务，或者通过学习提升自己。", scores: { introversion: 3, conscientiousness: 3, energy: 1 } },
      { text: "一个人安静地喝茶、看书，享受独处时光。", scores: { introversion: 3, reflectiveness: 3, energy: 1 } },
    ],
  },
  {
    id: 2,
    text: "面对一项新的工作任务，你的第一反应是？",
    category: "work",
    options: [
      { text: "立刻动手，边做边想，相信自己的直觉。", scores: { spontaneity: 3, energy: 2, conscientiousness: 1 } },
      { text: "先制定详细的计划，然后按部就班地执行。", scores: { conscientiousness: 3, reflectiveness: 2, stability: 2 } },
      { text: "先观察别人怎么做，再决定自己的方法。", scores: { introversion: 2, reflectiveness: 2, stability: 2 } },
      { text: "感到焦虑，担心自己做不好。", scores: { anxiety: 3, neuroticism: 2, stability: 1 } },
    ],
  },
  {
    id: 3,
    text: "在社交场合中，你通常是？",
    category: "social",
    options: [
      { text: "人群中的焦点，喜欢带动气氛。", scores: { extroversion: 3, leadership: 2, energy: 2 } },
      { text: "活跃的参与者，和很多人交流。", scores: { extroversion: 2, energy: 2, agreeableness: 1 } },
      { text: "和少数几个熟人深入交流。", scores: { introversion: 2, reflectiveness: 2, agreeableness: 2 } },
      { text: "躲在角落，尽量不被注意到。", scores: { introversion: 3, anxiety: 2, neuroticism: 2 } },
    ],
  },
  {
    id: 4,
    text: "当你遇到挫折时，通常会怎样？",
    category: "emotion",
    options: [
      { text: "立刻振作，把它当成挑战。", scores: { stability: 3, optimism: 3, leadership: 1 } },
      { text: "冷静分析原因，然后重新出发。", scores: { reflectiveness: 3, conscientiousness: 2, stability: 2 } },
      { text: "找朋友倾诉，寻求支持。", scores: { agreeableness: 2, extroversion: 2, neuroticism: 1 } },
      { text: "长时间情绪低落，难以自拔。", scores: { neuroticism: 3, anxiety: 2, stability: 1 } },
    ],
  },
  {
    id: 5,
    text: "以下哪种描述最接近你？",
    category: "personality",
    options: [
      { text: "充满活力，热情洋溢，喜欢冒险。", scores: { energy: 3, spontaneity: 3, extroversion: 2 } },
      { text: "踏实稳重，注重实际，脚踏实地。", scores: { stability: 3, conscientiousness: 3, introversion: 2 } },
      { text: "富有想象力，感性思维，追求艺术。", scores: { creativity: 3, reflectiveness: 2, neuroticism: 1 } },
      { text: "理性冷静，逻辑清晰，追求知识。", scores: { reflectiveness: 3, conscientiousness: 2, stability: 2 } },
    ],
  },
  {
    id: 6,
    text: "你的房间或办公桌通常是？",
    category: "lifestyle",
    options: [
      { text: "杂乱但有自己的逻辑。", scores: { spontaneity: 2, creativity: 2, conscientiousness: 1 } },
      { text: "整洁有序，东西各归其位。", scores: { conscientiousness: 3, stability: 2 } },
      { text: "有格调且温馨，注重氛围。", scores: { creativity: 3, agreeableness: 2 } },
      { text: "极简风格，只保留必需品。", scores: { reflectiveness: 2, stability: 2, introversion: 2 } },
    ],
  },
  {
    id: 7,
    text: "面对一个重要决定，你倾向于？",
    category: "decision",
    options: [
      { text: "快速决定，相信第一印象。", scores: { spontaneity: 3, energy: 2 } },
      { text: "列出利弊清单，仔细权衡。", scores: { conscientiousness: 3, reflectiveness: 2, stability: 2 } },
      { text: "询问身边人的意见。", scores: { agreeableness: 3, extroversion: 2, neuroticism: 1 } },
      { text: "反复纠结，难以取舍。", scores: { neuroticism: 3, anxiety: 2, stability: 1 } },
    ],
  },
  {
    id: 8,
    text: "你认为理想的生活节奏是？",
    category: "lifestyle",
    options: [
      { text: "充满变化和刺激，拒绝单调。", scores: { spontaneity: 3, energy: 3, creativity: 2 } },
      { text: "平衡工作与生活，有张有弛。", scores: { stability: 3, conscientiousness: 2, agreeableness: 2 } },
      { text: "悠闲自在，享受当下。", scores: { stability: 2, creativity: 2, reflectiveness: 2 } },
      { text: "严格规划，按时间表行事。", scores: { conscientiousness: 3, stability: 3 } },
    ],
  },
  {
    id: 9,
    text: "在团队合作中，你更常扮演的角色是？",
    category: "work",
    options: [
      { text: "领导者，负责规划和分配任务。", scores: { leadership: 3, extroversion: 2, conscientiousness: 2 } },
      { text: "执行者，专注完成自己的部分。", scores: { conscientiousness: 3, introversion: 2, stability: 2 } },
      { text: "协调者，关注每个人的感受。", scores: { agreeableness: 3, extroversion: 2, emotional_intelligence: 2 } },
      { text: "创新者，提供新想法和方案。", scores: { creativity: 3, spontaneity: 2, energy: 2 } },
    ],
  },
  {
    id: 10,
    text: "面对批评，你的反应通常是？",
    category: "emotion",
    options: [
      { text: "欣然接受，认为这是改进的机会。", scores: { openness: 3, stability: 3, agreeableness: 2 } },
      { text: "表面接受，内心有些不舒服。", scores: { stability: 2, neuroticism: 1, agreeableness: 2 } },
      { text: "会争辩或感到被冒犯。", scores: { neuroticism: 2, assertiveness: 2, stability: 1 } },
      { text: "深深自责，很久才能释怀。", scores: { neuroticism: 3, anxiety: 2, self_criticism: 2 } },
    ],
  },
  {
    id: 11,
    text: "以下哪种活动最能让你充电？",
    category: "lifestyle",
    options: [
      { text: "和朋友一起出去玩。", scores: { extroversion: 3, energy: 2, agreeableness: 2 } },
      { text: "独自散步或冥想。", scores: { introversion: 3, reflectiveness: 2, stability: 2 } },
      { text: "学习新技能或阅读。", scores: { conscientiousness: 2, reflectiveness: 2, creativity: 2 } },
      { text: "运动或身体活动。", scores: { energy: 3, conscientiousness: 2, stability: 2 } },
    ],
  },
  {
    id: 12,
    text: "关于钱，你的态度是？",
    category: "values",
    options: [
      { text: "赚得多花得多，享受当下。", scores: { spontaneity: 3, energy: 2, optimism: 2 } },
      { text: "有计划地储蓄和投资。", scores: { conscientiousness: 3, stability: 2, reflectiveness: 2 } },
      { text: "钱是工具，够用就行。", scores: { stability: 2, creativity: 2, reflectiveness: 2 } },
      { text: "对花钱很谨慎，经常犹豫不决。", scores: { conscientiousness: 2, neuroticism: 2, stability: 1 } },
    ],
  },
  {
    id: 13,
    text: "以下哪个描述最让你共鸣？",
    category: "personality",
    options: [
      { text: "生活就是要尽情体验。", scores: { spontaneity: 3, energy: 2, optimism: 2 } },
      { text: "未雨绸缪，凡事预则立。", scores: { conscientiousness: 3, stability: 2, reflectiveness: 2 } },
      { text: "听从内心的声音。", scores: { creativity: 3, introversion: 2, reflectiveness: 2 } },
      { text: "理性分析一切。", scores: { reflectiveness: 3, stability: 2, conscientiousness: 2 } },
    ],
  },
  {
    id: 14,
    text: "面对陌生人，你通常会？",
    category: "social",
    options: [
      { text: "主动搭话，很快熟络起来。", scores: { extroversion: 3, agreeableness: 2, energy: 2 } },
      { text: "微笑点头，等对方先开口。", scores: { agreeableness: 2, introversion: 2, stability: 2 } },
      { text: "保持距离，观察一段时间。", scores: { introversion: 3, reflectiveness: 2, stability: 2 } },
      { text: "感到不自在，尽量回避。", scores: { introversion: 3, anxiety: 2, neuroticism: 2 } },
    ],
  },
  {
    id: 15,
    text: "如果可以选择一种超能力，你会选？",
    category: "imagination",
    options: [
      { text: "瞬间移动，想去哪就去哪。", scores: { spontaneity: 3, energy: 2, creativity: 2 } },
      { text: "读心术，理解他人的想法。", scores: { emotional_intelligence: 3, agreeableness: 2, reflectiveness: 2 } },
      { text: "预知未来，做好万全准备。", scores: { conscientiousness: 3, stability: 2, reflectiveness: 2 } },
      { text: "治愈能力，帮助受伤的人。", scores: { agreeableness: 3, emotional_intelligence: 2, optimism: 2 } },
    ],
  },
  {
    id: 16,
    text: "你觉得自己是一个怎样的人？",
    category: "self_perception",
    options: [
      { text: "独一无二的，不愿随波逐流。", scores: { creativity: 3, assertiveness: 2, openness: 2 } },
      { text: "普通但快乐，知足常乐。", scores: { stability: 3, agreeableness: 2, optimism: 2 } },
      { text: "有目标有追求，不断进步。", scores: { conscientiousness: 3, leadership: 2, optimism: 2 } },
      { text: "还在寻找真正的自己。", scores: { reflectiveness: 3, openness: 2, neuroticism: 1 } },
    ],
  },
  {
    id: 17,
    text: "面对一项你不擅长的任务，你会？",
    category: "work",
    options: [
      { text: "硬着头皮上，边做边学。", scores: { spontaneity: 3, energy: 2, optimism: 2 } },
      { text: "花时间学习相关知识。", scores: { conscientiousness: 3, reflectiveness: 2, openness: 2 } },
      { text: "请教擅长的人。", scores: { agreeableness: 2, extroversion: 2, humility: 2 } },
      { text: "感到焦虑，想办法推脱。", scores: { neuroticism: 3, anxiety: 2, stability: 1 } },
    ],
  },
  {
    id: 18,
    text: "以下哪种电影类型最吸引你？",
    category: "preference",
    options: [
      { text: "动作冒险片，刺激热血。", scores: { energy: 3, spontaneity: 3 } },
      { text: "文艺剧情片，引人深思。", scores: { reflectiveness: 3, creativity: 2, introversion: 2 } },
      { text: "温馨治愈片，温暖人心。", scores: { agreeableness: 3, emotional_intelligence: 2, optimism: 2 } },
      { text: "悬疑烧脑片，考验智力。", scores: { reflectiveness: 3, conscientiousness: 2, stability: 2 } },
    ],
  },
  {
    id: 19,
    text: "你的朋友圈通常是？",
    category: "social",
    options: [
      { text: "范围广，各行各业都有。", scores: { extroversion: 3, leadership: 2, energy: 2 } },
      { text: "几个知心好友就够了。", scores: { introversion: 2, agreeableness: 2, reflectiveness: 2 } },
      { text: "同事关系为主。", scores: { conscientiousness: 2, stability: 2, introversion: 2 } },
      { text: "家人是最重要的。", scores: { agreeableness: 3, stability: 2, loyalty: 2 } },
    ],
  },
  {
    id: 20,
    text: "你觉得自己的性格更接近哪种动物？",
    category: "personality",
    options: [
      { text: "老鹰 - 敏锐而独立。", scores: { leadership: 3, introversion: 2, assertiveness: 2 } },
      { text: "海豚 - 聪明而友善。", scores: { extroversion: 2, agreeableness: 3, emotional_intelligence: 2 } },
      { text: "狐狸 - 机敏而适应力强。", scores: { openness: 3, reflectiveness: 2, assertiveness: 2 } },
      { text: "熊猫 - 温和而悠闲。", scores: { stability: 3, agreeableness: 2, optimism: 2 } },
    ],
  },
  {
    id: 21,
    text: "面对突如其来的变化，你通常？",
    category: "emotion",
    options: [
      { text: "兴奋，喜欢新鲜感。", scores: { spontaneity: 3, energy: 2, openness: 2 } },
      { text: "冷静应对，有条不紊。", scores: { stability: 3, conscientiousness: 2, reflectiveness: 2 } },
      { text: "有点焦虑，但很快适应。", scores: { neuroticism: 1, stability: 2, openness: 2 } },
      { text: "压力很大，需要时间消化。", scores: { neuroticism: 3, anxiety: 2, stability: 1 } },
    ],
  },
  {
    id: 22,
    text: "以下哪种场景最让你感到放松？",
    category: "lifestyle",
    options: [
      { text: "热闹的派对现场。", scores: { extroversion: 3, energy: 2, agreeableness: 2 } },
      { text: "咖啡馆的一角，看书写字。", scores: { introversion: 3, reflectiveness: 2, creativity: 2 } },
      { text: "山间小径徒步。", scores: { introversion: 2, openness: 3, stability: 2 } },
      { text: "舒适的家里，什么都不做。", scores: { introversion: 3, stability: 2, reflectiveness: 2 } },
    ],
  },
  {
    id: 23,
    text: "在压力下，你更倾向于？",
    category: "coping",
    options: [
      { text: "行动起来，用忙碌转移注意力。", scores: { energy: 3, conscientiousness: 2, stability: 1 } },
      { text: "冷静思考，找到根源。", scores: { reflectiveness: 3, stability: 2, conscientiousness: 2 } },
      { text: "向信任的人倾诉。", scores: { agreeableness: 3, emotional_intelligence: 2, extroversion: 2 } },
      { text: "需要独处来恢复。", scores: { introversion: 3, reflectiveness: 2, stability: 1 } },
    ],
  },
  {
    id: 24,
    text: "你对规则的态度是？",
    category: "values",
    options: [
      { text: "规则是可以打破的。", scores: { spontaneity: 3, assertiveness: 2, openness: 2 } },
      { text: "遵守必要的规则，但懂得变通。", scores: { stability: 3, conscientiousness: 2, openness: 2 } },
      { text: "严格遵守一切规则。", scores: { conscientiousness: 3, stability: 2, neuroticism: 1 } },
      { text: "看情况，灵活应对。", scores: { openness: 3, stability: 2, reflectiveness: 2 } },
    ],
  },
  {
    id: 25,
    text: "如果用一个词形容你的理想工作，那是？",
    category: "work",
    options: [
      { text: "自由 - 不受束缚。", scores: { spontaneity: 3, creativity: 2, openness: 2 } },
      { text: "稳定 - 按部就班。", scores: { stability: 3, conscientiousness: 2, introversion: 2 } },
      { text: "有意义 - 帮助他人。", scores: { agreeableness: 3, emotional_intelligence: 2, optimism: 2 } },
      { text: "有挑战 - 不断成长。", scores: { conscientiousness: 3, leadership: 2, openness: 2 } },
    ],
  },
  {
    id: 26,
    text: "你觉得自己和父母的关系？",
    category: "relationships",
    options: [
      { text: "亲密无间，无话不谈。", scores: { agreeableness: 3, emotional_intelligence: 2, extroversion: 2 } },
      { text: "关系不错，但保持一定距离。", scores: { stability: 2, introversion: 2, reflectiveness: 2 } },
      { text: "有些紧张，不太亲近。", scores: { neuroticism: 2, assertiveness: 2, stability: 1 } },
      { text: "复杂，一言难尽。", scores: { reflectiveness: 3, neuroticism: 1, openness: 2 } },
    ],
  },
  {
    id: 27,
    text: "面对爱情，你的态度是？",
    category: "love",
    options: [
      { text: "敢爱敢恨，轰轰烈烈。", scores: { spontaneity: 3, energy: 2, assertiveness: 2 } },
      { text: "慢热但深情，细水长流。", scores: { introversion: 2, agreeableness: 2, stability: 2 } },
      { text: "理性分析，慎重选择。", scores: { reflectiveness: 3, conscientiousness: 2, stability: 2 } },
      { text: "随缘就好，不强求。", scores: { stability: 2, openness: 2, creativity: 2 } },
    ],
  },
  {
    id: 28,
    text: "你最欣赏别人的哪种品质？",
    category: "values",
    options: [
      { text: "真诚坦率。", scores: { assertiveness: 3, openness: 2, honesty: 2 } },
      { text: "善良体贴。", scores: { agreeableness: 3, emotional_intelligence: 2, kindness: 2 } },
      { text: "聪明睿智。", scores: { reflectiveness: 3, conscientiousness: 2, intelligence: 2 } },
      { text: "幽默有趣。", scores: { energy: 3, extroversion: 2, optimism: 2 } },
    ],
  },
  {
    id: 29,
    text: "当你有一个想法，你通常会？",
    category: "creative",
    options: [
      { text: "立刻付诸实践。", scores: { spontaneity: 3, energy: 2, creativity: 2 } },
      { text: "先做详细的可行性分析。", scores: { conscientiousness: 3, reflectiveness: 2, stability: 2 } },
      { text: "和信任的人讨论。", scores: { agreeableness: 2, extroversion: 2, openness: 2 } },
      { text: "让想法在脑海中慢慢成熟。", scores: { reflectiveness: 3, creativity: 2, introversion: 2 } },
    ],
  },
  {
    id: 30,
    text: "你的生活更接近哪种状态？",
    category: "lifestyle",
    options: [
      { text: "忙碌而充实，时间不够用。", scores: { energy: 3, conscientiousness: 2, leadership: 2 } },
      { text: "节奏适中，有张有弛。", scores: { stability: 3, balance: 2, agreeableness: 2 } },
      { text: "悠闲自在，享受生活。", scores: { stability: 2, optimism: 2, creativity: 2 } },
      { text: "有些混乱，需要整理。", scores: { neuroticism: 2, spontaneity: 2, conscientiousness: 1 } },
    ],
  },
  {
    id: 31,
    text: "如果有一天时间可以自由支配，你会？",
    category: "lifestyle",
    options: [
      { text: "去冒险，体验新鲜事物。", scores: { spontaneity: 3, energy: 3, openness: 2 } },
      { text: "学习一直想学的东西。", scores: { conscientiousness: 2, reflectiveness: 2, creativity: 2 } },
      { text: "陪伴家人和朋友。", scores: { agreeableness: 3, emotional_intelligence: 2, loyalty: 2 } },
      { text: "什么都不做，彻底放空。", scores: { introversion: 3, stability: 2, reflectiveness: 2 } },
    ],
  },
  {
    id: 32,
    text: "你觉得成功的关键是？",
    category: "values",
    options: [
      { text: "勇于尝试，敢于冒险。", scores: { spontaneity: 3, energy: 2, optimism: 2 } },
      { text: "坚持不懈，踏实努力。", scores: { conscientiousness: 3, stability: 2, optimism: 2 } },
      { text: "人脉和合作。", scores: { extroversion: 2, agreeableness: 3, leadership: 2 } },
      { text: "找到自己热爱的事。", scores: { creativity: 3, openness: 2, reflectiveness: 2 } },
    ],
  },
  {
    id: 33,
    text: "你的情绪通常是？",
    category: "emotion",
    options: [
      { text: "积极乐观，很少低落。", scores: { optimism: 3, stability: 2, energy: 2 } },
      { text: "比较平稳，喜怒不形于色。", scores: { stability: 3, introversion: 2, reflectiveness: 2 } },
      { text: "丰富多变，情绪化。", scores: { neuroticism: 3, creativity: 2, emotional_intelligence: 2 } },
      { text: "有时会陷入负面情绪。", scores: { neuroticism: 2, anxiety: 2, stability: 1 } },
    ],
  },
  {
    id: 34,
    text: "以下哪种说法最接近你的睡眠习惯？",
    category: "lifestyle",
    options: [
      { text: "熬夜党，晚上精神最好。", scores: { spontaneity: 3, energy: 2, creativity: 2 } },
      { text: "规律作息，早睡早起。", scores: { conscientiousness: 3, stability: 2, health: 2 } },
      { text: "看情况，不固定。", scores: { openness: 2, spontaneity: 2, stability: 1 } },
      { text: "睡眠质量不太好。", scores: { neuroticism: 2, anxiety: 2, stability: 1 } },
    ],
  },
  {
    id: 35,
    text: "对于未来，你更倾向于？",
    category: "future",
    options: [
      { text: "充满期待，相信会更好。", scores: { optimism: 3, energy: 2, openness: 2 } },
      { text: "做好规划，稳步前进。", scores: { conscientiousness: 3, stability: 2, reflectiveness: 2 } },
      { text: "顺其自然，不做太多设想。", scores: { stability: 2, openness: 2, creativity: 2 } },
      { text: "有些担忧，不确定会怎样。", scores: { neuroticism: 3, anxiety: 2, stability: 1 } },
    ],
  },
  {
    id: 36,
    text: "你在做决定时更依赖什么？",
    category: "decision",
    options: [
      { text: "直觉和感觉。", scores: { spontaneity: 3, creativity: 2, openness: 2 } },
      { text: "逻辑和数据分析。", scores: { reflectiveness: 3, conscientiousness: 2, stability: 2 } },
      { text: "他人的建议和经验。", scores: { agreeableness: 2, extroversion: 2, humility: 2 } },
      { text: "过去的经验。", scores: { stability: 2, conscientiousness: 2, reflectiveness: 2 } },
    ],
  },
  {
    id: 37,
    text: "面对竞争，你的反应是？",
    category: "work",
    options: [
      { text: "兴奋，享受挑战。", scores: { energy: 3, leadership: 2, assertiveness: 2 } },
      { text: "专注做好自己的事。", scores: { conscientiousness: 3, introversion: 2, stability: 2 } },
      { text: "希望大家都能赢。", scores: { agreeableness: 3, emotional_intelligence: 2, optimism: 2 } },
      { text: "感到有压力。", scores: { neuroticism: 2, anxiety: 2, stability: 1 } },
    ],
  },
  {
    id: 38,
    text: "你觉得自己的社交能量来自？",
    category: "social",
    options: [
      { text: "和人互动。", scores: { extroversion: 3, energy: 2, agreeableness: 2 } },
      { text: "独处和思考。", scores: { introversion: 3, reflectiveness: 2, stability: 2 } },
      { text: "两者兼有，看情况。", scores: { openness: 3, balance: 2, adaptability: 2 } },
      { text: "不太确定。", scores: { neuroticism: 1, reflectiveness: 2, stability: 1 } },
    ],
  },
  {
    id: 39,
    text: "如果可以给年轻时的自己一个建议，那是？",
    category: "wisdom",
    options: [
      { text: "勇敢去尝试，不要怕失败。", scores: { spontaneity: 3, energy: 2, optimism: 2 } },
      { text: "多思考，想清楚再行动。", scores: { reflectiveness: 3, conscientiousness: 2, stability: 2 } },
      { text: "珍惜身边的人。", scores: { agreeableness: 3, emotional_intelligence: 2, loyalty: 2 } },
      { text: "不要太在意别人的眼光。", scores: { assertiveness: 3, openness: 2, self_confidence: 2 } },
    ],
  },
  {
    id: 40,
    text: "你觉得人生中最重要的是？",
    category: "values",
    options: [
      { text: "体验和经历。", scores: { spontaneity: 3, openness: 2, creativity: 2 } },
      { text: "成就和贡献。", scores: { conscientiousness: 3, leadership: 2, ambition: 2 } },
      { text: "爱和关系。", scores: { agreeableness: 3, emotional_intelligence: 2, loyalty: 2 } },
      { text: "自由和内心平静。", scores: { stability: 3, reflectiveness: 2, openness: 2 } },
    ],
  },
];
