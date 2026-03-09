<?php

class Form extends Model
{
    public function create($userId, $name, $key)
    {
        $stmt = $this->db->prepare("INSERT INTO forms (user_id, form_name, form_key) VALUES (?, ?, ?)");
        return $stmt->execute([$userId, $name, $key]);
    }

    public function allByUserId($userId)
    {
        $stmt = $this->db->prepare("SELECT * FROM forms WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->execute([$userId]);
        return $stmt->fetchAll();
    }

    public function findByKey($key)
    {
        $stmt = $this->db->prepare("SELECT * FROM forms WHERE form_key = ?");
        $stmt->execute([$key]);
        return $stmt->fetch();
    }

    public function findById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM forms WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function delete($id, $userId)
    {
        $stmt = $this->db->prepare("DELETE FROM forms WHERE id = ? AND user_id = ?");
        return $stmt->execute([$id, $userId]);
    }
}
