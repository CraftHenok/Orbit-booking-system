const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('demo.db');

exports.update = async (req, res) => {
    const doctorData = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        displayOrder: req.body.displayOrder,
        manageBlocks: req.body.manageBlocks,
        manageBooking: req.body.manageBooking,
        isDoctor: req.body.isDoctor
    };

    await db.run("update doctor set name=?,username=?,password=?,displayOrder=?,manageBlocks=?,manageBooking=?,isDoctor=? where seq=?",
        [doctorData.name, doctorData.username, doctorData.password, doctorData.displayOrder,
            doctorData.manageBlocks, doctorData.manageBooking, doctorData.isDoctor, req.params['seq']], function (err) {
            if (err) {
                res.json(err).status(404);
            } else {
                res.json(this.changes);
            }
        });
};

exports.deleteDoctorById = async (req, res) => {
    await db.run("DELETE from Doctor WHERE seq= ?", req.params['seq'], function (err) {
        if (err) {
            res.json(err.message).status(404);
        } else {
            res.json(this.changes);
        }
    });
};

exports.saveNewDoctor = async (req, res) => {
    const doctorData = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        displayOrder: req.body.displayOrder,
        manageBlocks: req.body.manageBlocks,
        manageBooking: req.body.manageBooking,
        isDoctor: req.body.isDoctor
    };

    await db.run("INSERT into Doctor(name,username,password,displayOrder,manageBlocks,manageBooking,isDoctor)\n" +
        "VALUES (?,?,?,?,?,?,?)", [doctorData.name, doctorData.username, doctorData.password,
        doctorData.displayOrder, doctorData.manageBlocks, doctorData.manageBooking,
        doctorData.isDoctor], (err) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json(doctorData);
        }

    });
};

exports.getDoctorByName = (req, res) => {
    db.all("SELECT * from Doctor WHERE name like ?", `%${req.params["name"]}%`, (err, row) => {
        if (err) {
            res.json(err).status(400);
        } else {
            res.json(row);
        }
    })
};

exports.getDoctorById = (req, res) => {
    db.get("Select * from doctor where seq = ?", req.params["seq"], (err, row) => {
        if (err) {
            res.json(err).status(400);
        } else {
            res.json(row);
        }
    })
};

exports.getAllDoctors = async (req, res) => {
    await db.all("SELECT * FROM doctor", function (err, rows) {
        return res.json(rows);
    });
};
