const express = require('express');
const cors = require('cors');
const musicRoutes = require('./routes/music');

const app = express();
app.use(cors());
app.use('/api/music', musicRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
