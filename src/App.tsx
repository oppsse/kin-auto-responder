import React, { useState } from 'react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';

const templates = [
  "현대엘리베이터입니다. 문의하신 '{question}'에 대해 간단히 안내드립니다.",
  "현대엘리베이터는 승강기 교체부터 유지관리까지 원스톱으로 대응 가능한 종합 기업입니다.",
  "보다 정확한 안내를 위해 아래 링크를 통해 상담 요청해주세요. 감사합니다.",
  "📞 전화문의: 070-8015-1141 / 📩 상담 링크: bit.ly/현대엘리베이터설치문의"
];

function generateAnswer(question: string) {
  const intro = templates[0].replace('{question}', question);
  const body = templates.slice(1).join('\n');
  return `${intro}\n\n${body}`;
}

export default function KinAutoResponder() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleGenerate = () => {
    if (question.trim()) {
      const response = generateAnswer(question);
      setAnswer(response);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">지식인 자동 답변 생성기</h1>
      <Input
        placeholder="질문을 입력하세요"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Button onClick={handleGenerate} className="w-full">답변 생성</Button>
      {answer && (
        <Card>
          <CardContent className="whitespace-pre-wrap p-4">
            {answer}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
