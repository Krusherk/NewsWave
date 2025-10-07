export default async function handler(req, res) {
  const { slug } = req.query;
  
  // Fetch article from Firebase
  const response = await fetch('https://newwave-6fe2d-default-rtdb.firebaseio.com/news.json');
  const articles = await response.json();
  
  // Find article by slug
  let article = null;
  for (let key in articles) {
    if (articles[key].slug === slug) {
      article = articles[key];
      break;
    }
  }
  
  if (!article) {
    return res.redirect(307, '/');
  }
  
  // Return HTML with meta tags
  res.setHeader('Content-Type', 'text/html');
  res.send(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${article.title} - NewsWave</title>
    <meta property="og:title" content="${article.title}">
    <meta property="og:description" content="${article.body.substring(0, 150).replace(/"/g, '&quot;')}...">
    <meta property="og:image" content="${article.image}">
    <meta property="og:url" content="https://newswave-seven.vercel.app/${slug}">
    <meta property="og:type" content="article">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${article.title}">
    <meta name="twitter:description" content="${article.body.substring(0, 150).replace(/"/g, '&quot;')}...">
    <meta name="twitter:image" content="${article.image}">
    <script>window.location.href='/#view-${slug}';</script>
</head>
<body><p>Loading...</p></body>
</html>
  `);
}
