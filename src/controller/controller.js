const express = require('express');
const Employee = require('../model/emp-model.js');
const validator = require('validator')

const create = async (req, res) => {
    try {
        const emp = await Employee(req.body);
        const { workMail } = emp;
        if (!validator.isEmail(workMail)) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        const existingEmp = await Employee.findOne({ workMail: workMail }).lean();
        if (existingEmp) {
            return res.status(400).json({ message: 'Work Mail is already exists' });
        }
        await emp.save();
        res.status(200).json({ message: 'Employee Created', emp })
    }
    catch (error) {
        res.status(500).send('internal server error');
    }
}

const fetch = async (req, res) => {
    const filterValue = req.query.filterValue;
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder;
    const match = {};

    if (filterValue) {
        if (!isNaN(filterValue)) {
            match['age'] = +filterValue;
        } else {
            // Construct a regex pattern to match the filter value case-insensitively
            const regexPattern = new RegExp(filterValue, 'i');

            // Update the match object to check for matches in any of the fields
            match.$or = [
                { name: regexPattern },
                { workMail: regexPattern },
                { position: regexPattern },
                { team: regexPattern }
            ];
        }
    }
    try {
        let employees;
        if (sortBy && sortOrder) {
            // If sortBy and sortOrder are provided, sort the users
            employees = await Employee.find(match).sort({ [sortBy]: sortOrder }).lean();
        } else {
            // Otherwise, just find users without sorting
            employees = await Employee.find(match).lean();
        }
        res.send(employees);
    }
    catch (error) {
        res.status(500).send('internal server error');
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const emp = await Employee.findOne({ _id: id });
        if (!emp) {
            return res.status(404).json({ error: 'Employee not found!' });
        }

        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'age', 'position', 'team'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(400).json({ error: 'Invalid updates!' });
        }

        updates.forEach(update => emp[update] = req.body[update]);
        await Employee.findByIdAndUpdate(id, { $set: req.body });
        res.status(200).json({ message: 'Employee updated successfully' });
    }
    catch (error) {
        res.status(500).send('internal server error');
    }
}

const deleteEmp = async (req, res) => {
    try {
        const id = req.params.id;
        const emp = await Employee.findById(id).lean();
        if (!emp) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        await Employee.deleteOne({ _id: id }).lean();
        res.status(202).json({ message: "User deleted successfully!" });
    }
    catch (error) {
        res.status(500).send('internal server error');
    }
}

module.exports = {
    create,
    fetch,
    update,
    deleteEmp
}