import React, { useState, useEffect } from 'react';

function App() {
  // LocalStorage desteği ile görevleri tutuyoruz
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [task, setTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Görevler her değiştiğinde LocalStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 1. EKLEME İŞLEMİ
  const handleAdd = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setTask('');
  };

  // 2. SİLME İŞLEMİ
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Güncelleme modunu açma
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  // 3. GÜNCELLEME İŞLEMİ (Kaydetme)
  const handleUpdate = (id) => {
    if (!editingText.trim()) return;
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editingText } : todo));
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      backgroundColor: "#f3f4f6",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "50px"
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        width: "100%",
        maxWidth: "480px"
      }}>
        <h1 style={{ color: "#1f2937", margin: "0 0 5px 0", fontSize: "24px", textAlign: "center" }}>Görev Yöneticisi</h1>
        <p style={{ color: "#9ca3af", margin: "0 0 20px 0", fontSize: "14px", textAlign: "center" }}>TODO APP v1.0</p>

        {/* Ekleme Formu */}
        <form onSubmit={handleAdd} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Yeni bir görev yazın..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              outline: "none"
            }}
          />
          <button type="submit" style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "15px"
          }}>Ekle</button>
        </form>

        {/* 4. LİSTELEME İŞLEMİ */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {todos.length === 0 ? (
            <p style={{ color: "#6b7280", textAlign: "center", fontSize: "15px", marginTop: "20px" }}>Henüz bir görev eklemediniz.</p>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "between",
                padding: "12px",
                borderBottom: "1px solid #f3f4f6",
                backgroundColor: "#f9fafb",
                borderRadius: "6px",
                marginBottom: "8px",
                gap: "10px"
              }}>
                {editingId === todo.id ? (
                  // Güncelleme Giriş Alanı
                  <div style={{ display: "flex", width: "100%", gap: "5px" }}>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      style={{ flex: 1, padding: "5px 10px", borderRadius: "4px", border: "1px solid #3b82f6" }}
                    />
                    <button onClick={() => handleUpdate(todo.id)} style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>Kaydet</button>
                    <button onClick={() => setEditingId(null)} style={{ backgroundColor: "#6b7280", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>İptal</button>
                  </div>
                ) : (
                  // Normal Liste Görünümü
                  <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#374151", fontSize: "15px", flex: 1 }}>{todo.text}</span>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button onClick={() => startEdit(todo)} style={{ backgroundColor: "#f59e0b", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}>Düzenle</button>
                      <button onClick={() => handleDelete(todo.id)} style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}>Sil</button>
                    </div>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
