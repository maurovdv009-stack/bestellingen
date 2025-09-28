// api/login.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Vul gebruikersnaam en wachtwoord in' });
    }

    // SheetDB API URL
    const SHEETDB_URL = 'https://sheetdb.io/api/v1/y49fs8yoxj64c';

    try {
        const response = await fetch(SHEETDB_URL);
        if (!response.ok) throw new Error('Kon gebruikerslijst niet ophalen');

        const users = await response.json();

        const match = users.find(u => u.username === username && u.password === password);

        if (match) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ success: false, message: 'Onjuiste gebruikersnaam of wachtwoord' });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Serverfout' });
    }
}
