const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// 임시 데이터 저장 (간단한 메모리 저장 방식)
let posts = [];

// 게시글 목록 조회
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// 게시글 작성
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const newPost = { id: posts.length + 1, title, content, createdAt: new Date() };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// 게시글 삭제
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  posts = posts.filter((post) => post.id !== postId);
  res.status(200).json({ message: 'Post deleted' });
});

// 정적 파일 제공 (예: 프론트엔드 HTML, JS, CSS 파일)
app.use(express.static('public'));

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
