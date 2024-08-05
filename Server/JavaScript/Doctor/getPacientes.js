export const getPacientes = (app, db) => {
    app.get('/user/doctor/:id', (req, res) => {
        const { id } = req.params;
        const query = 'SELECT * FROM doctores d, usuarios u WHERE u.id_usuario = ? AND d.doc_id_user = u.id_usuario';
        db.query(query, [id], (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(results);
            }
        });
    });
} 