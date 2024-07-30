const express = require("express");
const router = express.Router();
let { users } = require("../server");

router.post("/", (req, res) => {
    const { username, password, fname, lname, age } = req.body;

    if (!username || !password || !fname || !lname || !age) {
        return res.status(400).json({
            msg: "Kerakli maydonlar yetarli emas",
            variant: "error",
            payload: null
        });
    }

    let userName = users.find(user => user.username === username);
    if (userName) {
        return res.status(400).json({
            msg: "Foydalanuvchi mavjud",
            variant: "warning",
            payload: null
        });
    }

    const newUser = {
        id: Date.now(),
        username,
        password,
        fname,
        lname,
        age,
        image: req.body.image || 'https://example.com/default-user-image.jpg'
    };
    users.unshift(newUser);
    res.status(201).json({
        msg: "Malumotlar saqlandi",
        variant: "success",
        payload: newUser
    });
});

router.get("/", (req, res) => {
    if (!users.length) {
        return res.status(400).json({
            msg: "Malumot topilmadi",
            variant: "error",
            payload: null
        });
    }
    res.status(200).json({
        msg: "Malumotlar topildi",
        variant: "success",
        payload: users
    });
});

router.delete("/:id", (req, res) => {
    const userId = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userId === -1) {
        return res.status(400).json({
            msg: "Foydalanuvchi topilmadi",
            variant: "error",
            payload: null
        });
    }
    users.splice(userId, 1);
    res.status(200).json({
        msg: "Malumot o'chirildi",
        variant: "success",
        payload: null
    });
});

module.exports = router;
