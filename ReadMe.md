# 186

useEffect 의 cleanup 함수 에 대한 내용

### useEffect Cleanup 함수 사용 예

useEffect Hook은 React 컴포넌트가 렌더링될 때마다 특정 작업을 수행할 수 있도록 해주는 Hook입니다. 특히, useEffect 내에서 반환하는 함수는 "cleanup" 함수로서, 컴포넌트가 언마운트되거나 useEffect가 다시 호출되기 전에 실행됩니다. Cleanup 함수는 주로 이벤트 리스너를 제거하거나, 구독을 해지하는 등의 정리(clean-up) 작업에 사용됩니다.

```jsx
import React, { useState, useEffect } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 이벤트 리스너 등록
    const handleResize = () => {
      console.log("Window resized");
    };

    window.addEventListener("resize", handleResize);

    // Cleanup 함수
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 이벤트 리스너 등록

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default MyComponent;
```
