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
}
