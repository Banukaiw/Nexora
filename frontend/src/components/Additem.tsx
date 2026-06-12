import React, { useState, useEffect } from "react";
import { getItems, addItem } from "../api";
//import Navbar from "./Navbar";

const Additem: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async (): Promise<void> => {
    try {
      const data = await getItems();
      setItems(data.items);
    } catch (err) {
      setError("Failed to fetch items from the server.");
    }
  };

  const handleAddItem = async (): Promise<void> => {
    if (inputValue.trim() === "") {
      setError("Please enter a valid item.");
      setSuccessMessage("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const data = await addItem(inputValue.trim());

      if (data.success) {
        setItems(data.items);
        setSuccessMessage(data.message || "Item added successfully!");
        setInputValue("");
      }
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .im-root {
          min-height: 100vh;
          background-color: #0a0a0f;
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139, 92, 246, 0.08), transparent);
          font-family: 'Syne', sans-serif;
          color: #e2e8f0;
          padding: 40px 20px 80px;
        }

        .im-container {
          max-width: 640px;
          margin: 0 auto;
        }
        

        /* Header */
        .im-header {
          margin-bottom: 48px;
          animation: fadeSlideDown 0.6s ease both;
        }

        .im-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #818cf8;
          margin-bottom: 16px;
          padding: 6px 12px;
          border: 1px solid rgba(129, 140, 248, 0.25);
          border-radius: 100px;
          background: rgba(129, 140, 248, 0.06);
        }

        .im-eyebrow::before {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #818cf8;
          animation: pulse 2s ease-in-out infinite;
        }

        .im-title {
          font-size: clamp(32px, 6vw, 48px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #f1f5f9;
          margin-bottom: 10px;
        }

        .im-title span {
          background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .im-subtitle {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: #475569;
          font-weight: 300;
          letter-spacing: 0.01em;
        }

        /* Input card */
        .im-card {
          background: rgba(15, 15, 25, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 16px;
          backdrop-filter: blur(12px);
          animation: fadeSlideUp 0.6s ease 0.1s both;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03) inset,
            0 24px 48px rgba(0,0,0,0.4);
        }

        .im-input-row {
          display: flex;
          gap: 12px;
          align-items: stretch;
        }

        .im-input-wrap {
          flex: 1;
          position: relative;
        }

        .im-input-wrap::before {
          content: '⌘';
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
          color: #334155;
          pointer-events: none;
          font-family: 'DM Mono', monospace;
        }

        .im-input {
          width: 100%;
          padding: 15px 16px 15px 40px;
          font-size: 15px;
          font-family: 'Syne', sans-serif;
          font-weight: 400;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: #e2e8f0;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          letter-spacing: 0.01em;
        }

        .im-input::placeholder {
          color: #334155;
          font-weight: 400;
        }

        .im-input:focus {
          border-color: rgba(129, 140, 248, 0.5);
          background: rgba(129, 140, 248, 0.04);
          box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.1);
        }

        .im-btn {
          padding: 15px 24px;
          font-size: 14px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          letter-spacing: 0.03em;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.35);
          position: relative;
          overflow: hidden;
        }

        .im-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.1), transparent);
          border-radius: inherit;
        }

        .im-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(99, 102, 241, 0.45);
        }

        .im-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .im-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .im-btn-loading {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .im-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* Alerts */
        .im-alert {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 14px 18px;
          border-radius: 12px;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          margin-bottom: 16px;
          animation: fadeSlideUp 0.3s ease both;
          line-height: 1.5;
          font-weight: 300;
        }

        .im-alert-error {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #fca5a5;
        }

        .im-alert-success {
          background: rgba(52, 211, 153, 0.08);
          border: 1px solid rgba(52, 211, 153, 0.2);
          color: #6ee7b7;
        }

        .im-alert-icon {
          font-size: 15px;
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* List section */
        .im-list-card {
          background: rgba(15, 15, 25, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(12px);
          animation: fadeSlideUp 0.6s ease 0.2s both;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03) inset,
            0 24px 48px rgba(0,0,0,0.4);
        }

        .im-list-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .im-list-title {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #64748b;
        }

        .im-badge {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          color: #818cf8;
          background: rgba(129, 140, 248, 0.12);
          border: 1px solid rgba(129, 140, 248, 0.2);
          border-radius: 100px;
          padding: 3px 10px;
        }

        .im-empty {
          padding: 60px 28px;
          text-align: center;
          color: #334155;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 300;
          line-height: 1.8;
        }

        .im-empty-icon {
          font-size: 32px;
          display: block;
          margin-bottom: 12px;
          opacity: 0.4;
        }

        .im-list {
          list-style: none;
          padding: 0;
        }

        .im-list-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          transition: background 0.15s;
          animation: fadeSlideUp 0.4s ease both;
        }

        .im-list-item:last-child {
          border-bottom: none;
        }

        .im-list-item:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .im-item-num {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          color: #1e293b;
          width: 24px;
          flex-shrink: 0;
          text-align: right;
        }

        .im-item-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(99, 102, 241, 0.4);
        }

        .im-item-text {
          font-size: 15px;
          font-weight: 400;
          color: #cbd5e1;
          letter-spacing: 0.01em;
          flex: 1;
        }

        /* Animations */
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>

      <div className="im-root">
        <div className="im-container">

          {/* Header */}
          <header className="im-header">
            <div className="im-eyebrow">REST API</div>
            <h1 className="im-title">
              Item <span>Manager</span>
            </h1>
            <p className="im-subtitle">React + Node.js — v1.0.0</p>
          </header>

          {/* Input Card */}
          <div className="im-card">
            <div className="im-input-row">
              <div className="im-input-wrap">
                <input
                  type="text"
                  className="im-input"
                  placeholder="Enter an item (e.g. Apple)"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <button
                className="im-btn"
                onClick={handleAddItem}
                disabled={loading}
              >
                {loading ? (
                  <span className="im-btn-loading">
                    <span className="im-spinner" />
                    Adding
                  </span>
                ) : (
                  "Add Item"
                )}
              </button>
            </div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="im-alert im-alert-error">
              <span className="im-alert-icon">✕</span>
              {error}
            </div>
          )}
          {successMessage && (
            <div className="im-alert im-alert-success">
              <span className="im-alert-icon">✓</span>
              {successMessage}
            </div>
          )}

          {/* List Card */}
          <div className="im-list-card">
            <div className="im-list-header">
              <span className="im-list-title">All Items</span>
              <span className="im-badge">{items.length}</span>
            </div>

            {items.length === 0 ? (
              <div className="im-empty">
                <span className="im-empty-icon">◫</span>
                No items yet.<br />Add your first item above.
              </div>
            ) : (
              <ul className="im-list">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="im-list-item"
                    style={{ animationDelay: `${index * 0.04}s` }}
                  >
                    <span className="im-item-num">{String(index + 1).padStart(2, "0")}</span>
                    <span className="im-item-dot" />
                    <span className="im-item-text">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Additem;
