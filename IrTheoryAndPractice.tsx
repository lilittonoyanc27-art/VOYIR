import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  MapPin, 
  PlayCircle, 
  CheckCircle2, 
  ChevronRight, 
  RotateCcw,
  Info,
  ArrowRight,
  Star
} from 'lucide-react';

// --- Types ---
interface Exercise {
  id: number;
  type: 'place' | 'action';
  sentence: string;
  hyMeaning: string;
  correct: string;
  options: string[];
}

// --- Data ---
const EXERCISES: Exercise[] = [
  {
    id: 1,
    type: 'place',
    sentence: "Yo voy ___ parque.",
    hyMeaning: "Ես գնում եմ այգի:",
    correct: "al",
    options: ["al", "a la", "a"]
  },
  {
    id: 2,
    type: 'action',
    sentence: "Tú vas ___ comer.",
    hyMeaning: "Դու պատրաստվում ես ուտել:",
    correct: "a",
    options: ["a", "al", "a la"]
  },
  {
    id: 3,
    type: 'place',
    sentence: "Ella va ___ playa.",
    hyMeaning: "Նա գնում է լողափ:",
    correct: "a la",
    options: ["a la", "al", "a"]
  },
  {
    id: 4,
    type: 'action',
    sentence: "Nosotros vamos ___ estudiar.",
    hyMeaning: "Մենք պատրաստվում ենք սովորել:",
    correct: "a",
    options: ["a", "al", "a la"]
  },
  {
    id: 5,
    type: 'place',
    sentence: "Ellos van ___ cine.",
    hyMeaning: "Նրանք գնում են կինոթատրոն:",
    correct: "al",
    options: ["al", "a la", "a"]
  },
  {
    id: 6,
    type: 'action',
    sentence: "Yo voy ___ dormir.",
    hyMeaning: "Ես պատրաստվում եմ քնել:",
    correct: "a",
    options: ["a", "al", "a la"]
  },
  {
    id: 7,
    type: 'place',
    sentence: "Vosotros vais ___ escuela.",
    hyMeaning: "Դուք գնում եք դպրոց:",
    correct: "a la",
    options: ["a la", "al", "a"]
  },
  {
    id: 8,
    type: 'action',
    sentence: "Él va ___ trabajar.",
    hyMeaning: "Նա պատրաստվում է աշխատել:",
    correct: "a",
    options: ["a", "al", "a la"]
  },
  {
    id: 9,
    type: 'place',
    sentence: "Nosotras vamos ___ tienda.",
    hyMeaning: "Մենք գնում ենք խանութ:",
    correct: "a la",
    options: ["a la", "al", "a"]
  },
  {
    id: 10,
    type: 'action',
    sentence: "Tú vas ___ jugar.",
    hyMeaning: "Դու պատրաստվում ես խաղալ:",
    correct: "a",
    options: ["a", "al", "a la"]
  }
];

export default function IrTheoryAndPractice() {
  const [view, setView] = useState<'theory' | 'practice' | 'result'>('theory');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentEx = EXERCISES[currentIndex];

  const handleAnswer = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
    if (option === currentEx.correct) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      if (currentIndex < EXERCISES.length - 1) {
        setCurrentIndex(c => c + 1);
      } else {
        setView('result');
      }
    }, 1500);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setView('theory');
  };

  return (
    <div className="min-h-screen bg-[#00AEEF] text-slate-900 font-sans p-4 md:p-8 flex flex-col items-center justify-start">
      <div className="max-w-4xl w-full">
        
        {/* Header */}
        <div className="bg-[#FFF200] p-6 rounded-[2rem] shadow-xl border-4 border-white flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6 text-[#00AEEF]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter">IR ԲԱՅԻ ԿԱՆՈՆՆԵՐԸ</h1>
              <p className="text-[10px] font-bold text-[#00AEEF] uppercase tracking-widest">Theory & Practice</p>
            </div>
          </div>
          <div className="bg-white px-4 py-2 rounded-full font-black text-[#00AEEF] shadow-inner">
            {view === 'practice' ? `${currentIndex + 1} / ${EXERCISES.length}` : 'ՏԵՍՈՒԹՅՈՒՆ'}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'theory' ? (
            <motion.div
              key="theory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Theory Card 1: To a Place */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-[#FFF200] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <MapPin className="w-24 h-24" />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#00AEEF] rounded-full flex items-center justify-center">
                    <span className="text-white font-black">1</span>
                  </div>
                  <h2 className="text-2xl font-black uppercase">Գնալ մի տեղ (Place)</h2>
                </div>
                <p className="text-lg leading-relaxed mb-6">
                  Երբ ասում ենք, որ գնում ենք ինչ-որ տեղ, օգտագործում ենք <b>Ir + a</b> կառույցը:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100">
                    <p className="text-sm font-black text-blue-400 uppercase mb-2">Արական (Male)</p>
                    <p className="text-xl font-black">a + el = <span className="text-[#00AEEF]">al</span></p>
                    <p className="text-sm italic text-slate-500 mt-1">Voy <span className="font-bold">al</span> parque (Գնում եմ այգի)</p>
                  </div>
                  <div className="bg-pink-50 p-6 rounded-2xl border-2 border-pink-100">
                    <p className="text-sm font-black text-pink-400 uppercase mb-2">Իգական (Female)</p>
                    <p className="text-xl font-black">a + la = <span className="text-pink-500">a la</span></p>
                    <p className="text-sm italic text-slate-500 mt-1">Voy <span className="font-bold">a la</span> playa (Գնում եմ լողափ)</p>
                  </div>
                </div>
              </div>

              {/* Theory Card 2: To do something */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-[#FFF200] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <PlayCircle className="w-24 h-24" />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#00AEEF] rounded-full flex items-center justify-center">
                    <span className="text-white font-black">2</span>
                  </div>
                  <h2 className="text-2xl font-black uppercase">Պատրաստվել անել մի բան (Action)</h2>
                </div>
                <p className="text-lg leading-relaxed mb-6">
                  Երբ ուզում ենք ասել, որ պատրաստվում ենք ինչ-որ բան անել (ապառնի ժամանակ), օգտագործում ենք <b>Ir + a + անորոշ դերբայ</b>:
                </p>
                <div className="bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-100">
                  <p className="text-xl font-black">Ir + <span className="text-[#00AEEF]">a</span> + Verb</p>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm italic text-slate-600">Voy <span className="font-bold text-[#00AEEF]">a</span> comer (Պատրաստվում եմ ուտել)</p>
                    <p className="text-sm italic text-slate-600">Vas <span className="font-bold text-[#00AEEF]">a</span> estudiar (Պատրաստվում ես սովորել)</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setView('practice')}
                className="w-full py-6 bg-[#FFF200] text-slate-900 rounded-full font-black text-2xl uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl flex items-center justify-center gap-4 group"
              >
                ՍԿՍԵԼ ՎԱՐԺՈՒԹՅՈՒՆԸ
                <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          ) : view === 'practice' ? (
            <motion.div
              key="practice"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-white relative">
                <div className="text-center mb-10">
                  <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 ${
                    currentEx.type === 'place' ? 'bg-blue-100 text-blue-500' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {currentEx.type === 'place' ? 'ՏԵՂԱՆՈՒՆ (PLACE)' : 'ԳՈՐԾՈՂՈՒԹՅՈՒՆ (ACTION)'}
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-black text-slate-800 italic tracking-tighter mb-4">
                    {currentEx.sentence.split('___')[0]}
                    <span className="text-[#00AEEF] border-b-4 border-dashed border-[#00AEEF] px-4 mx-2">
                      {selectedOption || '___'}
                    </span>
                    {currentEx.sentence.split('___')[1]}
                  </h2>
                  <p className="text-xl font-bold text-slate-400 italic">
                    ({currentEx.hyMeaning})
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentEx.options.map((option, i) => (
                    <button
                      key={i}
                      disabled={!!feedback}
                      onClick={() => handleAnswer(option)}
                      className={`py-6 rounded-2xl border-4 transition-all text-2xl font-black shadow-lg ${
                        selectedOption === option
                          ? feedback === 'correct'
                            ? 'bg-emerald-500 border-white text-white scale-105'
                            : 'bg-red-500 border-white text-white scale-105'
                          : feedback && option === currentEx.correct
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-600'
                          : 'bg-slate-50 border-slate-100 text-slate-700 hover:border-[#FFF200] hover:bg-white'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-4 bg-white/30 rounded-full overflow-hidden border-2 border-white">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / EXERCISES.length) * 100}%` }}
                  className="h-full bg-[#FFF200]"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 md:p-20 rounded-[4rem] border-8 border-[#FFF200] text-center shadow-2xl relative overflow-hidden"
            >
              <Star className="w-24 h-24 text-[#FFF200] mx-auto mb-8 drop-shadow-lg animate-bounce" />
              <h2 className="text-5xl font-black text-slate-800 italic uppercase tracking-tighter mb-4">ՀԻԱՆԱԼԻ Է!</h2>
              <p className="text-2xl font-bold text-[#00AEEF] italic mb-12 uppercase tracking-widest">ԴՈՒ ՍՈՎՈՐԵՑԻՐ IR ԲԱՅԻ ԿԱՆՈՆՆԵՐԸ</p>
              
              <div className="bg-slate-50 p-10 rounded-[3rem] border-4 border-slate-100 mb-12">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">ՔՈ ԱՐԴՅՈՒՆՔԸ</p>
                <div className="flex justify-center items-baseline gap-2">
                  <span className="text-9xl font-black text-[#00AEEF] drop-shadow-lg">{score}</span>
                  <span className="text-4xl font-black text-slate-300">/ {EXERCISES.length}</span>
                </div>
              </div>

              <button 
                onClick={restart}
                className="w-full py-8 bg-[#FFF200] text-slate-900 rounded-full font-black text-3xl uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl border-b-8 border-yellow-600 active:translate-y-2 active:border-b-0 flex items-center justify-center gap-6 group"
              >
                <RotateCcw className="w-10 h-10 group-hover:rotate-180 transition-transform duration-700" />
                ԿՐԿՆԵԼ
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          margin: 0;
        }
      `}} />
    </div>
  );
}
