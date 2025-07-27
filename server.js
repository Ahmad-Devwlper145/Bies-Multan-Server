const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/check-result', async (req, res) => {
  try {
    const form = new URLSearchParams();
    form.append("rno", req.body.rno);
    form.append("g-recaptcha-response", "");
    form.append("bs4", "true");
    form.append("ci_csrf_token", "");

    const response = await axios.post(
      'https://results.bisemultan.edu.pk/index.php/portal/responsenext',
      form.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://results.bisemultan.edu.pk/',
          'Origin': 'https://results.bisemultan.edu.pk/'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
