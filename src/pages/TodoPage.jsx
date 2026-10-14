import React from 'react';

function TodoPage({ todos, addTodo, updateTodo, deleteTodo, TodoInput, TodoItem }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl shadow-indigo-100/50 w-full max-w-md border border-gray-100">
        
        {/* Modern Başlık Alanı */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 tracking-tight">
            Görev Yöneticisi
          </h1>
          <p className="text-gray-400 text-xs mt-1 font-medium tracking-wide uppercase">TODO APP v1.0</p>
        </div>

        {/* Görev Ekleme Form Bileşeni */}
        <TodoInput addTodo={addTodo} />

        {/* Listeleme Bölümü */}
        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 mt-6 custom-scrollbar">
          {todos.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
              <span className="text-4xl block mb-2">✨</span>
              <p className="text-gray-400 text-sm font-medium">Henüz bir görev eklemediniz.</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            ))
          )}
        </div>

        {/* Bilgi Alt Çubuğu */}
        {todos.length > 0 && (
          <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 font-semibold tracking-wide">
            <span>📊 Toplam: {todos.length} Görev</span>
            <span className="text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">Aktif Liste</span>
          </div>
        )}

      </div>
    </div>
  );
}

export default TodoPage;
