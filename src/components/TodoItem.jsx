import React, { useState } from 'react';

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    if (!editText.trim()) return alert('Görev içeriği boş olamaz!');
    updateTodo(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200 group">
      
      {isEditing ? (
        /* GÜNCELLEME MODU AKTİFKEN */
        <div className="flex gap-2 flex-1 mr-2">
          <input 
            type="text" 
            value={editText} 
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-3 py-1.5 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium text-gray-700"
          />
          <button 
            onClick={handleUpdate}
            className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm shadow-amber-100"
          >
            Kaydet
          </button>
        </div>
      ) : (
        /* NORMAL LİSTELEME MODU */
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 shrink-0"></div>
          <span className="text-gray-700 font-semibold text-sm truncate block select-none">
            {todo.text}
          </span>
        </div>
      )}

      {/* İŞLEM BUTONLARI (DÜZENLE VE SİL) */}
      <div className="flex gap-1 ml-2 opacity-80 group-hover:opacity-100 transition-opacity">
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-600 font-bold px-2.5 py-1.5 rounded-lg transition-all"
            title="Görevi Düzenle"
          >
            Düzenle
          </button>
        )}
        <button 
          onClick={() => {
            if(window.confirm("Bu görevi silmek istediğinize emin misiniz?")) {
              deleteTodo(todo.id);
            }
          }}
          className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-bold px-2.5 py-1.5 rounded-lg transition-all"
          title="Görevi Sil"
        >
          Sil
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
