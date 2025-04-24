import React, { useState } from 'react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

async function generateAnswer(question: string): Promise<string> {
  if (!question.trim()) return '';

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "당신은 유용하고 간결한 답변을 제공하는 도우미입니다." },
          { role: "user", content: question }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '죄송합니다. 답변을 생성하지 못했습니다.';
  } catch (err) {
    console.error(err);
    return '⚠️ 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
}

export default function KinAutoResponder() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (question.trim()) {
      setLoading(true);
      const response = await generateAnswer(question);
      setAnswer(response);
      setLoading(false);
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
      <Button onClick={handleGenerate} className="w-full" disabled={loading}>
        {loading ? '생성 중...' : '답변 생성'}
      </Button>
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
