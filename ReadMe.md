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

# 187

useEffect Hook을 사용할 때 의존성 배열(dependency array)에 함수를 포함시키는 경우, 함수가 컴포넌트의 렌더링마다 새로 생성되기 때문에 useEffect가 예상치 못하게 너무 자주 호출될 수 있습니다. 이를 방지하기 위해, 함수를 의존성 배열에 직접 포함시키기보다는 useCallback Hook을 사용하여 함수를 메모이제이션 해야한다

# useEffect에서 함수 의존성을 다루는 방법

`useEffect` Hook에서 함수를 의존성 배열에 포함할 때 주의해야 할 점과 이를 해결하기 위한 `useCallback` Hook의 사용 예시입니다.

```jsx
import React, { useState, useEffect, useCallback } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);

  // useCallback을 사용하여 함수를 메모이제이션
  const incrementCount = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // 의존성 배열이 빈 배열이므로 컴포넌트가 마운트될 때만 함수 생성

  useEffect(() => {
    // 메모이제이션된 함수를 사용
    console.log("Component did mount or incrementCount changed");
  }, [incrementCount]); // incrementCount를 의존성 배열에 포함

  return (
    <div>
      <p>{count}</p>
      <button onClick={incrementCount}>Increase</button>
    </div>
  );
}

export default MyComponent;
```

# 190

useEffect와 setInterval을 함께 사용할 때, 컴포넌트가 언마운트된 후에도 setInterval에 의해 상태 업데이트가 시도되어 메모리 누수가 발생할 수 있습니다. 이를 방지하기 위해서는 컴포넌트가 언마운트될 때 setInterval을 정리(clean-up)해야 합니다. 아래 예시와 같이 useEffect 내에서 clearInterval을 사용하여 이를 처리할 수 있습니다.

# useEffect와 setInterval을 사용하여 불필요한 상태 업데이트 방지하기

`useEffect`와 `setInterval`을 사용할 때, 컴포넌트 언마운트 후에도 상태 업데이트가 시도되는 것을 방지하는 예시입니다.

```jsx
import { useState, useEffect } from "react";

function TimerComponent() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // 컴포넌트 언마운트 시 clearInterval을 호출하여 메모리 누수 방지
    return () => clearInterval(intervalId);
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트 마운트 시에만 setInterval 실행

  return <div>Seconds: {seconds}</div>;
}

export default TimerComponent;
```
