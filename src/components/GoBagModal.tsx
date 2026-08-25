import React, { useState } from 'react';
import { X, Check, Plus, ShoppingBag, ShieldAlert, Sparkles } from 'lucide-react';
import { GoBagItem } from '../types';
import { playTapSound, playCorrectSound } from '../utils/audio';

interface GoBagModalProps {
  items: GoBagItem[];
  onUpdateItems: (items: GoBagItem[]) => void;
  onClose: () => void;
}

export const GoBagModal: React.FC<GoBagModalProps> = ({ items, onUpdateItems, onClose }) => {
  const [localItems, setLocalItems] = useState<GoBagItem[]>(items);
  const [newItemText, setNewItemText] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const checkedCount = localItems.filter((i) => i.checked).length;
  const readinessPercent = Math.round((checkedCount / Math.max(1, localItems.length)) * 100);

  const handleToggle = (id: string) => {
    playTapSound();
    const updated = localItems.map((item) => {
      if (item.id === id) {
        const next = !item.checked;
        if (next) playCorrectSound();
        return { ...item, checked: next };
      }
      return item;
    });
    setLocalItems(updated);
    onUpdateItems(updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    playTapSound();
    const newItem: GoBagItem = {
      id: `custom-${Date.now()}`,
      name: newItemText.trim(),
      category: 'tools',
      checked: true,
      essential: false,
    };
    const updated = [...localItems, newItem];
    setLocalItems(updated);
    onUpdateItems(updated);
    setNewItemText('');
  };

  const filtered = filterCategory === 'all'
    ? localItems
    : localItems.filter((i) => i.category === filterCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#fbf9f9] border-2 border-[#dbdad9] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-[#1e7e16] text-white p-4 rounded-t-2xl flex items-center justify-between border-b-4 border-[#114e0d]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-black tracking-widest text-[#87fe45] uppercase">
                Emergency Readiness
              </div>
              <h2 className="text-lg font-black leading-tight">72-Hour Go-Bag Checklist</h2>
            </div>
          </div>
          <button
            id="close-gobag-btn"
            onClick={() => {
              playTapSound();
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Readiness Meter */}
        <div className="p-4 bg-[#f0f4eb] border-b-2 border-[#becbb1]">
          <div className="flex items-center justify-between text-xs font-black text-[#2b6c00] mb-1.5">
            <span>Kit Readiness Status</span>
            <span className="text-sm font-black">{readinessPercent}%</span>
          </div>
          <div className="bg-[#dbdad9] h-3.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-[#58cc02] h-full rounded-full transition-all duration-300 relative shadow-sm"
              style={{ width: `${readinessPercent}%` }}
            >
              <div className="absolute top-0.5 left-2 right-2 h-0.5 bg-white/40 rounded-full" />
            </div>
          </div>
          <p className="text-[11px] font-medium text-[#3f4a36] mt-1.5">
            {checkedCount} of {localItems.length} essential items packed. Keep stored in an accessible exit area.
          </p>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 select-none ${
                item.checked
                  ? 'bg-white border-[#58cc02] border-b-4 border-b-[#46a302] text-[#1b1c1c]'
                  : 'bg-[#f5f3f3] border-[#dbdad9] border-b-2 text-[#6f7b64]'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-colors ${
                  item.checked
                    ? 'bg-[#58cc02] border-[#46a302] text-white'
                    : 'bg-white border-[#becbb1]'
                }`}
              >
                {item.checked && <Check className="w-4 h-4 stroke-[3]" />}
              </div>

              <div className="flex-1">
                <span
                  className={`text-sm font-bold block ${
                    item.checked ? 'text-[#1b1c1c]' : 'text-[#6f7b64] line-through opacity-75'
                  }`}
                >
                  {item.name}
                </span>
                {item.essential && (
                  <span className="text-[10px] font-extrabold text-[#ba1a1a] uppercase">
                    • Essential
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Quick Add Custom Item */}
          <form onSubmit={handleAddItem} className="mt-4 pt-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Add custom supply item..."
                className="flex-1 px-3 py-2 text-xs font-semibold bg-white border-2 border-[#dbdad9] rounded-xl focus:outline-none focus:border-[#2b6c00]"
              />
              <button
                type="submit"
                className="btn-3d-green text-white px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" /> Add
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#efeded] border-t-2 border-[#dbdad9] text-center">
          <button
            onClick={() => {
              playTapSound();
              onClose();
            }}
            className="w-full btn-3d-green text-white font-extrabold py-3 rounded-xl uppercase text-xs tracking-wider cursor-pointer"
          >
            Save Kit Status
          </button>
        </div>
      </div>
    </div>
  );
};
