<?php

class Submission extends Model
{
    public function create($formId, $data)
    {
        $jsonData = json_encode($data);
        $stmt = $this->db->prepare("INSERT INTO submissions (form_id, data) VALUES (?, ?)");
        return $stmt->execute([$formId, $jsonData]);
    }

    public function allByFormId($formId)
    {
        $stmt = $this->db->prepare("SELECT * FROM submissions WHERE form_id = ? ORDER BY created_at DESC");
        $stmt->execute([$formId]);
        return $stmt->fetchAll();
    }

    public function findById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM submissions WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    public function delete($ids)
    {
        if (is_array($ids)) {
            $placeholders = implode(',', array_fill(0, count($ids), '?'));
            $stmt = $this->db->prepare("DELETE FROM submissions WHERE id IN ($placeholders)");
            return $stmt->execute($ids);
        }
        $stmt = $this->db->prepare("DELETE FROM submissions WHERE id = ?");
        return $stmt->execute([$ids]);
    }
}
