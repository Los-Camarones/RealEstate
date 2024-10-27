import React, { useEffect, useRef } from 'react';
import styles from './QuickSearchWidget.module.css';

const QuickSearchWidget = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (widgetRef.current) {
      const script = document.createElement('script');
      script.innerHTML = `
        document.currentScript.replaceWith(ihfKestrel.render({
          "component": "quickSearchWidget",
          "style": "horizontal"
        }));
      `;
      widgetRef.current.appendChild(script);
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = ''; // Clear widget
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>FIND YOUR DREAM HOME</h2>
        <div className={styles.underline}></div>
      </div>
      <div ref={widgetRef} className={styles.widget}>
        {/* Quick Search widget will render here */}
      </div>
    </div>
  );
};

export default QuickSearchWidget;
