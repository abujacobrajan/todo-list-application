const express = require('express');
const router = express.Router();

let todos = [];

router.get('/',(req, res) => {
    try {
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id',(req, res) => {
    try {
        const todo = todos.find(todo => todo.id === parseInt(req.params.id));
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/',(req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = {
            id: todos.length + 1,
            title,
            description
        };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id',(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, description } = req.body;
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todos[todoIndex] = { id, title, description };
        res.status(200).json(todos[todoIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.patch('/:id',(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, description } = req.body;
        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        if (title) todo.title = title;
        if (description) todo.description = description;
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        const deletedTodo = todos.splice(todoIndex, 1)[0];
        res.status(200).json({ message: `Your task ${id} deleted`, deletedTodo });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;