import React from "react";

export default function Logo({ size, showSub }) {
  return (
    <div className={`logo logo--${size}`}>
      <div className="logo__textBox">
        <div className="logo__textBox--text">Sticker Trader</div>
      </div>
      {showSub ? (
        <div className="logo__sub">Troque figurinhas e se divirta!</div>
      ) : null}
    </div>
  );
}
