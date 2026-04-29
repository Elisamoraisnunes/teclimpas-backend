const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o Supabase usando as variáveis do arquivo .env
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Rota para o front-end buscar os ecopontos
app.get('/ecopontos', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Ecopontos_lorena') 
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Porta para o Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});