import pool from '../config/db.js';

export const createUser = async (username, mobileNo, emailId, password) => {
    try {
        const sql = "INSERT INTO users (username, mobileNo, emailId, password) VALUES (?, ?, ?, ?)";
        const [results] = await pool.query(sql, [username, mobileNo, emailId, password]);
        return results;
    } catch (err) {
        throw new Error(`Database error in createUser: ${err.message}`);
    }
};

export const getUserByEmail = async (emailId) => {
    try {
        const sql = "SELECT * FROM users WHERE emailId = ?";
        const [rows] = await pool.query(sql, [emailId]);
        return rows.length>0 ? rows[0] : null;
    } catch (err) {
        throw new Error(`Database error in getUserByEmail: ${err.message}`);
    }
};