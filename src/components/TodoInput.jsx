import React, { useState } from 'react';

function TodoInput({ addTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return alert("Lütfen boş bir görev bırakmayın!");
    addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-gray-700 placeholder-gray-400 transition-all font-medium text-sm"
        placeholder="Yeni bir görev yazın..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-200 hover:shadow-indigo-300 text-sm flex items-center shrink-0"
      >
        Ekle
      </button>
    </form>
  );
}

export default TodoInput;
