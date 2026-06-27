export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { base64, mimeType } = req.body;
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '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',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mimeType, data: base64 } },
            { type: 'text', text: 'You are reading a nursing school syllabus or grading policy. Extract the grading structure and respond ONLY with valid JSON. Structure: {"school":"","program":"LPN","passingGrade":77,"courses":[{"name":"","hours":300,"categories":[{"name":"Unit Exams","weight":60,"pillar":"knowledge"},{"name":"Final Exam","weight":30,"pillar":"knowledge"},{"name":"Homework","weight":10,"pillar":"knowledge"},{"name":"Skills/Clinical","weight":100,"pillar":"skills"},{"name":"Professional Skills","weight":100,"pillar":"prof"}]}],"welcomeMessage":""}' }
          ]
        }]
      })
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '{}';
    const clean = text.replace(/```json|```/g, '').trim();
    
    try {
      return res.status(200).json(JSON.parse(clean));
    } catch {
      return res.status(200).json(null);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
