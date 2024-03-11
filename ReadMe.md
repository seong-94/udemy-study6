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

# 가상돔

### 리액트와 가상 DOM (Virtual DOM)

리액트(React)는 사용자 인터페이스를 구축하기 위한 자바스크립트 라이브러리로, 특히 **동적인 데이터**를 다루는 웹 애플리케이션을 개발할 때 강력한 성능과 유연성을 제공합니다. 리액트의 핵심 특징 중 하나는 바로 '가상 DOM'을 사용한다는 점입니다.

#### 가상 DOM이란?

가상 DOM은 실제 DOM의 가벼운 복사본입니다. 실제 DOM은 HTML과 같은 마크업 언어로 만들어진 문서의 프로그래밍 인터페이스이며, 웹 페이지의 구조를 표현합니다. 반면, 가상 DOM은 이 실제 DOM을 추상화한 것으로, 메모리 내에서만 존재하며 실제 DOM의 상태를 효율적으로 업데이트하기 위해 사용됩니다.

#### 가상 DOM의 작동 원리

1. **데이터 업데이트 시**: 애플리케이션의 상태가 변경되면, 리액트는 먼저 가상 DOM에 그 변경사항을 반영합니다.
2. **가상 DOM 비교**: 리액트는 변경 전의 가상 DOM과 변경 후의 가상 DOM을 비교합니다(이 과정을 'Diffing'이라고 합니다).
3. **변경 사항 계산**: 두 가상 DOM의 비교를 통해 실제로 변경되어야 할 최소한의 요소들을 계산합니다.
4. **실제 DOM 업데이트**: 계산된 변경사항을 실제 DOM에 반영합니다. 이 과정은 가능한 한 효율적으로 수행되어, 사용자 인터페이스의 성능 저하를 최소화합니다.

#### 가상 DOM의 장점

- **성능 향상**: 모든 상태 변경에 대해 실제 DOM을 직접 조작하는 것보다 메모리 내에서 가상 DOM을 사용하는 것이 더 빠르며, 성능상의 이점을 제공합니다.
- **효율적인 DOM 업데이트**: 리액트는 변경사항을 효율적으로 계산하여 필요한 최소한의 DOM 조작만을 수행함으로써 렌더링 성능을 최적화합니다.
- **개발자 경험 개선**: 가상 DOM을 사용함으로써 개발자는 DOM 조작의 복잡성을 신경 쓰지 않고, 애플리케이션의 상태와 UI를 더 쉽게 관리할 수 있습니다.

#### 가상 DOM 사용의 단점

- **초기 렌더링 속도**: 가상 DOM 자체를 메모리에 구축해야 하므로, 매우 큰 애플리케이션에서는 초기 렌더링 속도가 느려질 수 있습니다.
- **메모리 사용량**: 가상 DOM은 실제 DOM의 복사본을 메모리에 유지하기 때문에, 애플리케이션의 크기에 따라 추가적인 메모리를 소비할 수 있습니다.

리액트와 가상 DOM의 사용은 현대 웹 애플리케이션 개발에서 매우 중요한 역할을 합니다.
